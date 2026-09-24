"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui";
import { formatWhen } from "@/lib/format";
import { findCompletion, markComplete, NOTE_LIMIT, removeCompletion, useDoulaState } from "@/lib/store";
import type { CompletionKind } from "@/lib/types";

export function CompletePanel({
  kind,
  itemId,
}: {
  kind: CompletionKind;
  itemId: string;
}) {
  const { ready, completions } = useDoulaState();
  if (!ready) return null;
  const existing = findCompletion(completions, kind, itemId);
  return (
    <CompleteForm
      key={itemId}
      kind={kind}
      itemId={itemId}
      initialNote={existing?.note ?? ""}
      completedAt={existing?.completedAt ?? null}
    />
  );
}

function CompleteForm({
  kind,
  itemId,
  initialNote,
  completedAt,
}: {
  kind: CompletionKind;
  itemId: string;
  initialNote: string;
  completedAt: string | null;
}) {
  const [note, setNote] = useState(initialNote);
  const [message, setMessage] = useState<string | null>(
    completedAt ? `Marked done ${formatWhen(completedAt)}.` : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  async function onSave() {
    setSaving(true);
    setError(null);
    try {
      await markComplete(kind, itemId, note);
      setMessage(completedAt ? "Note saved." : "Marked done. You can find it on Progress.");
      setConfirmRemove(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function onRemove() {
    setSaving(true);
    setError(null);
    try {
      await removeCompletion(kind, itemId);
      setNote("");
      setMessage("Removed from Progress.");
      setConfirmRemove(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="rounded-3xl border border-line bg-surface p-5"
      onSubmit={(event) => {
        event.preventDefault();
        void onSave();
      }}
    >
      <label htmlFor="personal-note" className="block text-base font-semibold">
        Note for yourself
        <span className="font-normal text-muted"> (optional)</span>
      </label>
      <textarea
        id="personal-note"
        value={note}
        maxLength={NOTE_LIMIT}
        rows={4}
        onChange={(event) => setNote(event.target.value)}
        placeholder="A reminder, a question for your provider, or how this felt."
        className="mt-2 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-base leading-relaxed text-ink"
      />
      <p className="mt-1 text-sm text-muted">
        {note.length}/{NOTE_LIMIT}. Saved only on this device.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : completedAt ? "Save note" : "Mark complete"}
        </Button>
        <ButtonLink href="/progress" variant="secondary">
          Progress
        </ButtonLink>
      </div>
      {completedAt ? (
        <div className="mt-4">
          {confirmRemove ? (
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" disabled={saving} onClick={() => void onRemove()}>
                Confirm remove
              </Button>
              <Button type="button" variant="quiet" onClick={() => setConfirmRemove(false)}>
                Keep it
              </Button>
            </div>
          ) : (
            <Button type="button" variant="quiet" onClick={() => setConfirmRemove(true)}>
              Remove from progress
            </Button>
          )}
        </div>
      ) : null}
      <div aria-live="polite" className="mt-3 text-base">
        {message ? <p className="text-ink">{message}</p> : null}
        {error ? <p className="text-accent">{error}</p> : null}
      </div>
    </form>
  );
}
