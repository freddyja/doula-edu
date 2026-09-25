"use client";

import { useState, useSyncExternalStore } from "react";
import { HomeIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import {
  detectInstallPlatform,
  installInstructions,
  isStandaloneDisplay,
  type InstallPlatform,
} from "@/lib/install";
import { dismissInstallHint, useDoulaState } from "@/lib/store";

function subscribe() {
  return () => {};
}

let cachedPlatform: InstallPlatform | null = null;
let cachedCopy: { title: string; body: string } | null = null;

function installCopy() {
  const platform = detectInstallPlatform({
    ua: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints,
  });
  if (cachedCopy && cachedPlatform === platform) return cachedCopy;
  cachedPlatform = platform;
  cachedCopy = installInstructions(platform);
  return cachedCopy;
}

export function InstallHint() {
  const { ready, settings } = useDoulaState();
  const standalone = useSyncExternalStore(subscribe, isStandaloneDisplay, () => true);
  const copy = useSyncExternalStore(subscribe, installCopy, () => null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!ready || standalone || !copy || settings.installHintDismissed) return null;

  async function onDismiss() {
    setSaving(true);
    setError(null);
    try {
      await dismissInstallHint();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
      setSaving(false);
    }
  }

  return (
    <section
      className="rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_24px_-18px_rgba(42,36,30,0.45)]"
      aria-label="Add to Home Screen"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <HomeIcon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl leading-tight">{copy.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{copy.body}</p>
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-2 flex justify-end">
        <Button type="button" variant="quiet" disabled={saving} onClick={() => void onDismiss()}>
          {saving ? "Saving…" : "Not now"}
        </Button>
      </div>
    </section>
  );
}
