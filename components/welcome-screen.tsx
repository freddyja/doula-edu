"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { CheckIcon } from "@/components/icons";
import { Button, LoadingState, StorageError } from "@/components/ui";
import { Glyph, HeroArt, stageVisual, tileClass } from "@/components/visual";
import { STAGES } from "@/lib/stages";
import { saveSetup, useDoulaState } from "@/lib/store";
import type { StageId } from "@/lib/types";
import { WELLNESS_LONG, WELLNESS_SHORT } from "@/lib/wellness";

function subscribeDock() {
  return () => {};
}

function readDock() {
  return document.getElementById("app-dock");
}

export function WelcomeScreen() {
  const { ready, profile, storageError } = useDoulaState();

  if (!ready) return <LoadingState />;
  if (storageError) return <StorageError message={storageError} />;

  return (
    <WelcomeForm
      initialStage={profile?.stage ?? null}
      initialAcknowledged={Boolean(profile?.disclaimerAcknowledged)}
      dockedAboveTabs={Boolean(profile?.disclaimerAcknowledged && profile.stage)}
    />
  );
}

function WelcomeForm({
  initialStage,
  initialAcknowledged,
  dockedAboveTabs,
}: {
  initialStage: StageId | null;
  initialAcknowledged: boolean;
  dockedAboveTabs: boolean;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<StageId | null>(initialStage);
  const [acknowledged, setAcknowledged] = useState(initialAcknowledged);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dock = useSyncExternalStore(subscribeDock, readDock, () => null);
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
    <form id="welcome-form" onSubmit={onSubmit} className="space-y-3">
      <header className="hero-block hero-terra px-4 pt-4 pb-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold">Wellness support only</p>
          <div className="h-16 w-20 shrink-0" aria-hidden="true">
            <HeroArt tone="terra" />
          </div>
        </div>
        <h1 className="mt-1 font-display text-[1.9rem] font-extrabold leading-[1.08] tracking-tight">
          Prep a little.
          <br />
          Learn a little.
          <br />
          Move a little.
        </h1>
      </header>

      <p className="text-sm leading-snug text-muted">
        A daily card, short lessons, and gentle movement for the stage you choose. Saved on this
        device. Not a personal plan.
      </p>

      <ul className="grid grid-cols-3 gap-2">
        {[
          ["Prep", "Daily card", "blush"],
          ["Learn", "Short lessons", "sky"],
          ["Move", "Gentle sessions", "sage"],
        ].map(([label, detail, tone]) => (
          <li
            key={label}
            className={`rounded-2xl px-2 py-2.5 text-center ${tileClass[tone as "blush" | "sky" | "sage"]}`}
          >
            <span className="block text-sm font-extrabold">{label}</span>
            <span className="mt-0.5 block text-[0.7rem] font-bold text-ink">{detail}</span>
          </li>
        ))}
      </ul>

      <fieldset className="space-y-2">
        <legend className="text-base font-extrabold text-ink">Choose your stage</legend>
        <p className="text-sm leading-snug text-muted">
          This only filters lessons and sessions. It is not a medical category.
        </p>
        <div className="grid gap-2">
          {STAGES.map((item) => {
            const selected = stage === item.id;
            const visual = stageVisual(item.id);
            return (
              <label
                key={item.id}
                className={`choice flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-2.5 py-2 ${
                  selected ? "border-accent bg-accent-soft" : "border-line bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="stage"
                  value={item.id}
                  checked={selected}
                  onChange={() => setStage(item.id)}
                  className="sr-only"
                />
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tileClass[visual.tone]}`}
                >
                  <Glyph name={visual.glyph} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold leading-tight">{item.label}</span>
                  <span className="block text-sm text-muted">{item.blurb}</span>
                </span>
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                    selected
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line bg-surface text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <CheckIcon className="size-3.5" />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <p className="rounded-2xl bg-accent-soft px-3 py-2.5 text-sm leading-snug text-ink">
          {WELLNESS_SHORT}
        </p>
        <label className="choice flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-2">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
          />
          <span
            className="grid size-7 shrink-0 place-items-center rounded-lg border-2 border-accent/35 text-transparent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink"
            aria-hidden="true"
          >
            <CheckIcon className="size-4" />
          </span>
          <span className="text-sm font-semibold leading-snug">
            I understand this is educational wellness support, and I will follow my care provider.
          </span>
        </label>
        <details className="wellness-note rounded-2xl border border-line bg-surface px-3">
          <summary className="flex min-h-11 cursor-pointer items-center text-sm font-bold text-accent">
            Read the full wellness note
          </summary>
          <p className="pb-3 text-sm leading-relaxed text-muted">{WELLNESS_LONG}</p>
        </details>
      </div>

      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      {dock
        ? createPortal(
            <div
              className={`border-t border-line bg-surface px-3.5 pt-2 ${
                dockedAboveTabs ? "pb-2" : "pb-[max(0.5rem,env(safe-area-inset-bottom))]"
              }`}
            >
              <Button
                type="submit"
                form="welcome-form"
                disabled={!canContinue || saving}
                className="w-full"
              >
                {saving ? "Saving…" : "Continue"}
              </Button>
              <p className="mt-1.5 text-center text-xs leading-snug text-muted">
                {canContinue
                  ? "Saved on this device only. You can change your stage anytime."
                  : "Acknowledge the note and choose a stage to continue."}
              </p>
            </div>,
            dock,
          )
        : null}
    </form>
  );
}
