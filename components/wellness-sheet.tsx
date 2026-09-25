"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { WELLNESS_LONG, WELLNESS_SHORT } from "@/lib/wellness";

export function WellnessSheet({ onDismiss }: { onDismiss: () => Promise<void> }) {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function dismiss() {
    setSaving(true);
    setError(null);
    try {
      await onDismiss();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
      setSaving(false);
    }
  }

  return (
    <div className="sheet-backdrop">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wellness-sheet-title"
        className="sheet-panel"
      >
        <h2 id="wellness-sheet-title" className="font-display text-2xl leading-tight">
          Wellness support only
        </h2>
        <p className="mt-3 text-base leading-relaxed">{WELLNESS_SHORT}</p>
        <p className="mt-3 text-base leading-relaxed text-muted">{WELLNESS_LONG}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          You can read this again at the bottom of Progress.
        </p>
        {error ? (
          <p className="mt-3 text-base text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          type="button"
          className="mt-4 w-full"
          disabled={saving}
          autoFocus
          onClick={() => void dismiss()}
        >
          {saving ? "Saving…" : "I understand"}
        </Button>
      </div>
    </div>
  );
}
