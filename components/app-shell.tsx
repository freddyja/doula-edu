"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "@/components/icons";
import { BottomNav, normalizePath } from "@/components/nav";
import { ServiceWorkerRegistrar } from "@/components/service-worker";
import { WellnessSheet } from "@/components/wellness-sheet";
import { stageLabel } from "@/lib/stages";
import { dismissWellnessSheet, useDoulaState } from "@/lib/store";

type Chrome =
  | { mode: "home" }
  | { mode: "detail"; backHref: string; backLabel: string };

function routeChrome(pathname: string): Chrome {
  const path = normalizePath(pathname);
  if (path.startsWith("/learn/")) return { mode: "detail", backHref: "/learn", backLabel: "Learn" };
  if (path.startsWith("/move/")) return { mode: "detail", backHref: "/move", backLabel: "Move" };
  return { mode: "home" };
}

function BrandBar({ stage }: { stage: string | null }) {
  return (
    <header className="app-bar">
      <div className="flex min-h-11 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-accent text-sm font-extrabold text-accent-ink">
            D
          </span>
          <p className="font-display text-lg font-extrabold leading-none tracking-tight">Doula</p>
        </div>
        {stage ? (
          <p className="max-w-[11rem] truncate rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">
            {stage}
          </p>
        ) : null}
      </div>
    </header>
  );
}

function DetailBar({
  backHref,
  backLabel,
  stage,
}: {
  backHref: string;
  backLabel: string;
  stage: string | null;
}) {
  return (
    <header className="app-bar">
      <div className="flex min-h-11 items-center justify-between gap-3">
        <Link
          href={backHref}
          className="pressable -ml-2 inline-flex min-h-11 items-center gap-0.5 rounded-full pr-3 text-accent"
          aria-label={`Back to ${backLabel}`}
        >
          <ChevronLeft className="size-6" />
          <span className="text-base font-bold">{backLabel}</span>
        </Link>
        {stage ? (
          <p className="max-w-[9rem] truncate text-xs font-bold text-muted">{stage}</p>
        ) : null}
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const { ready, profile, settings } = useDoulaState();
  const chrome = routeChrome(pathname);
  const hasProfile = Boolean(profile?.disclaimerAcknowledged && profile.stage);
  const stage = hasProfile && profile ? stageLabel(profile.stage) : null;
  const hideTabs = normalizePath(pathname) === "/" && !hasProfile;
  const showWellness =
    ready && hasProfile && !settings.wellnessSheetDismissed && normalizePath(pathname) === "/today";

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.scrollTo(0, 0);
    if (!showWellness) main.focus({ preventScroll: true });
  }, [pathname, showWellness]);

  return (
    <div className="app-canvas">
      <div className="phone-frame">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div inert={showWellness ? true : undefined} className="flex min-h-0 flex-1 flex-col">
          {chrome.mode === "detail" ? (
            <DetailBar backHref={chrome.backHref} backLabel={chrome.backLabel} stage={stage} />
          ) : (
            <BrandBar stage={stage} />
          )}
          <main id="main" ref={mainRef} tabIndex={-1} className="phone-scroll">
            <div key={pathname} className="screen-enter px-3.5 pt-2.5 pb-4">
              {children}
            </div>
          </main>
          {hideTabs ? null : <BottomNav />}
        </div>
        {showWellness ? <WellnessSheet onDismiss={dismissWellnessSheet} /> : null}
      </div>
      <ServiceWorkerRegistrar />
    </div>
  );
}
