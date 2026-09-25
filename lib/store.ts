"use client";

import { useSyncExternalStore } from "react";
import { localDateKey } from "@/lib/dates";
import {
  deleteCompletion,
  readCompletions,
  readProfile,
  readSettings,
  writeCompletion,
  writeProfile,
  writeSettings,
} from "@/lib/db";
import { completionKey } from "@/lib/format";
import { todayPrepIndex } from "@/lib/prep";
import type { Completion, CompletionKind, Profile, StageId, UiSettings } from "@/lib/types";

const NOTE_LIMIT = 400;

export type DoulaSnapshot = {
  ready: boolean;
  profile: Profile | null;
  completions: Completion[];
  settings: UiSettings;
  storageError: string | null;
};

export const DEFAULT_SETTINGS: UiSettings = {
  id: "ui",
  installHintDismissed: false,
  wellnessSheetDismissed: false,
};

const EMPTY: DoulaSnapshot = {
  ready: false,
  profile: null,
  completions: [],
  settings: DEFAULT_SETTINGS,
  storageError: null,
};

let snapshot: DoulaSnapshot = EMPTY;
const listeners = new Set<() => void>();
let started = false;

function emit(next: DoulaSnapshot) {
  snapshot = next;
  for (const listener of listeners) listener();
}

function freshSettings(settings?: UiSettings): UiSettings {
  return settings ? { ...settings } : { ...DEFAULT_SETTINGS };
}

async function hydrate() {
  try {
    const [profile, completions, settings] = await Promise.all([
      readProfile(),
      readCompletions(),
      readSettings(),
    ]);
    emit({
      ready: true,
      profile: profile ?? null,
      completions,
      settings: freshSettings(settings),
      storageError: null,
    });
  } catch {
    emit({
      ready: true,
      profile: null,
      completions: [],
      settings: freshSettings(),
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
    prepStartedOn: snapshot.profile?.prepStartedOn ?? null,
  };
  try {
    await writeProfile(profile);
  } catch {
    throw new Error("Could not save on this device. Check that site data is allowed, then try again.");
  }
  emit({ ...snapshot, profile, storageError: null, ready: true });
}

export async function startPrepPath(): Promise<void> {
  const current = snapshot.profile;
  if (!current) {
    throw new Error("Choose a stage on the welcome page first.");
  }
  if (current.prepStartedOn && todayPrepIndex(current.prepStartedOn, localDateKey()) !== "invalid") {
    return;
  }
  const profile: Profile = { ...current, prepStartedOn: localDateKey() };
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

async function saveSettings(patch: Partial<UiSettings>): Promise<void> {
  const next: UiSettings = { ...snapshot.settings, ...patch, id: "ui" };
  try {
    await writeSettings(next);
  } catch {
    throw new Error("Could not save on this device. Check that site data is allowed, then try again.");
  }
  emit({ ...snapshot, settings: next, storageError: null, ready: true });
}

export function dismissInstallHint(): Promise<void> {
  return saveSettings({ installHintDismissed: true });
}

export function dismissWellnessSheet(): Promise<void> {
  return saveSettings({ wellnessSheetDismissed: true });
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
