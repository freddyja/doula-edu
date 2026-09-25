"use client";

import { useState, useSyncExternalStore } from "react";
import { CloseIcon, HomeIcon } from "@/components/icons";
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
    <section className="flex flex-wrap items-start gap-2 rounded-2xl bg-gold-soft px-3 py-2" aria-label="Add to Home Screen">
      <HomeIcon className="mt-1 size-4 shrink-0 text-gold" />
      <p className="line-clamp-2 min-w-0 flex-1 pt-1 text-sm leading-snug text-ink">
        <span className="font-bold">{copy.title}. </span>
        <span className="text-muted">{copy.body}</span>
      </p>
      <button
        type="button"
        className="pressable -mr-1 grid size-11 shrink-0 place-items-center rounded-full text-muted"
        aria-label="Not now"
        disabled={saving}
        onClick={() => void onDismiss()}
      >
        <CloseIcon className="size-4" />
      </button>
      {error ? (
        <p className="basis-full text-xs text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
