"use client";

import { useSyncExternalStore } from "react";
import {
  deleteCompletion,
  readCompletions,
  readProfile,
  writeCompletion,
  writeProfile,
} from "@/lib/db";
import { completionKey } from "@/lib/format";
import type { Completion, CompletionKind, Profile, StageId } from "@/lib/types";

const NOTE_LIMIT = 400;

export type DoulaSnapshot = {
  ready: boolean;
  profile: Profile | null;
  completions: Completion[];
  storageError: string | null;
};

const EMPTY: DoulaSnapshot = {
  ready: false,
  profile: null,
  completions: [],
  storageError: null,
};

let snapshot: DoulaSnapshot = EMPTY;
const listeners = new Set<() => void>();
let started = false;

function emit(next: DoulaSnapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

async function hydrate() {
  try {
    const [profile, completions] = await Promise.all([readProfile(), readCompletions()]);
    emit({
      ready: true,
      profile: profile ?? null,
      completions,
      storageError: null,
    });
  } catch {
    emit({
      ready: true,
      profile: null,
      completions: [],
      storageError:
        "This browser could not open on-device storage. Private mode sometimes blocks it. Your stage and notes stay on this device only.",
    });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    void hydrate();
  }
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useDoulaState(): DoulaSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function findCompletion(
  completions: readonly Completion[],
  kind: CompletionKind,
  itemId: string,
): Completion | null {
  const id = completionKey(kind, itemId);
  return completions.find((item) => item.id === id) ?? null;
}

export function completedIdSet(
  completions: readonly Completion[],
  kind: CompletionKind,
): Set<string> {
  const ids = new Set<string>();
  for (const item of completions) {
    if (item.kind === kind) ids.add(item.itemId);
  }
  return ids;
}

export async function saveSetup(stage: StageId): Promise<void> {
  const profile: Profile = {
    id: "profile",
    stage,
    disclaimerAcknowledged: true,
    acknowledgedAt: snapshot.profile?.acknowledgedAt ?? new Date().toISOString(),
  };
  try {
    await writeProfile(profile);
  } catch {
    throw new Error("Could not save on this device. Check that site data is allowed, then try again.");
  }
  emit({ ...snapshot, profile, storageError: null, ready: true });
}

export async function markComplete(
  kind: CompletionKind,
  itemId: string,
  note: string,
): Promise<void> {
  const id = completionKey(kind, itemId);
  const existing = snapshot.completions.find((item) => item.id === id);
  const completion: Completion = {
    id,
    itemId,
    kind,
    completedAt: existing?.completedAt ?? new Date().toISOString(),
    note: note.trim().slice(0, NOTE_LIMIT),
  };
  try {
    await writeCompletion(completion);
  } catch {
    throw new Error("Could not save on this device. Check that site data is allowed, then try again.");
  }
  emit({
    ...snapshot,
    completions: [completion, ...snapshot.completions.filter((item) => item.id !== id)],
  });
}

export async function removeCompletion(kind: CompletionKind, itemId: string): Promise<void> {
  const id = completionKey(kind, itemId);
  try {
    await deleteCompletion(id);
  } catch {
    throw new Error("Could not update on-device storage.");
  }
  emit({
    ...snapshot,
    completions: snapshot.completions.filter((item) => item.id !== id),
  });
}

export { NOTE_LIMIT };
