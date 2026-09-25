"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, LoadingState, StorageError } from "@/components/ui";
import { STAGES } from "@/lib/stages";
import { saveSetup, useDoulaState } from "@/lib/store";
import type { StageId } from "@/lib/types";
import { WELLNESS_LONG } from "@/lib/wellness";

export function WelcomeScreen() {
  const { ready, profile, storageError } = useDoulaState();

  if (!ready) return <LoadingState />;
  if (storageError) return <StorageError message={storageError} />;

  return (
    <WelcomeForm
      initialStage={profile?.stage ?? null}
      initialAcknowledged={Boolean(profile?.disclaimerAcknowledged)}
    />
  );
}

function WelcomeForm({
  initialStage,
  initialAcknowledged,
}: {
  initialStage: StageId | null;
  initialAcknowledged: boolean;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<StageId | null>(initialStage);
  const [acknowledged, setAcknowledged] = useState(initialAcknowledged);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canContinue = Boolean(stage) && acknowledged;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stage || !acknowledged) return;
    setSaving(true);
    setError(null);
    try {
      await saveSetup(stage);
      router.push("/today");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-bold leading-snug text-accent">
          Wellness support only · not medical advice
        </p>
        <h1 className="font-display text-3xl leading-tight text-balance">
          Prep a little. Learn a little. Move a little.
        </h1>
        <p className="text-base leading-relaxed text-muted">
          An optional daily prep card, short lessons, and gentle movement for the stage you
          choose. Nothing here is a personal plan, and nothing is sent to a server.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <Card>
          <h2 className="font-display text-xl">Wellness disclaimer</h2>
          <p className="mt-2 text-base leading-relaxed">{WELLNESS_LONG}</p>
          <label className="mt-4 flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-bg px-4 py-3">
            <input
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-accent"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
            />
            <span className="text-base leading-relaxed">
              I understand this is educational wellness support, and I will follow my care provider.
            </span>
          </label>
        </Card>

        <fieldset>
          <legend className="font-display text-xl">Where are you in the journey?</legend>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            This only filters lessons and sessions. It is not a medical category.
          </p>
          <div className="mt-3 grid gap-2">
            {STAGES.map((item) => {
              const selected = stage === item.id;
              return (
                <label
                  key={item.id}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2.5 ${
                    selected ? "border-accent bg-accent-soft" : "border-line bg-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="stage"
                    value={item.id}
                    checked={selected}
                    onChange={() => setStage(item.id)}
                    className="size-5 shrink-0 accent-accent"
                  />
                  <span>
                    <span className="block text-base font-semibold">{item.label}</span>
                    <span className="block text-base text-muted">{item.blurb}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <p className="text-base text-muted">
          {canContinue
            ? "Saved on this device only. You can change your stage anytime."
            : "To continue, acknowledge the disclaimer and choose a stage."}
        </p>
        {error ? (
          <p className="text-base text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={!canContinue || saving} className="w-full">
          {saving ? "Saving…" : "Continue to today"}
        </Button>
      </form>
    </div>
  );
}
