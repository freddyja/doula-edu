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
  | { mode: "brand" }
  | { mode: "tab"; title: string }
  | { mode: "detail"; backHref: string; backLabel: string }
  | { mode: "plain"; title: string };

function routeChrome(pathname: string): Chrome {
  const path = normalizePath(pathname);
  if (path === "/") return { mode: "brand" };
  if (path === "/today") return { mode: "tab", title: "Today" };
  if (path === "/learn") return { mode: "tab", title: "Learn" };
  if (path === "/move") return { mode: "tab", title: "Move" };
  if (path === "/progress") return { mode: "tab", title: "Progress" };
  if (path.startsWith("/learn/")) return { mode: "detail", backHref: "/learn", backLabel: "Learn" };
  if (path.startsWith("/move/")) return { mode: "detail", backHref: "/move", backLabel: "Move" };
  return { mode: "plain", title: "Doula" };
}

function AppBar({ chrome, stage }: { chrome: Chrome; stage: string | null }) {
  if (chrome.mode === "detail") {
    return (
      <header className="app-bar">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <Link
            href={chrome.backHref}
            className="pressable -ml-2 inline-flex min-h-11 items-center gap-0.5 rounded-full pr-3 text-accent"
            aria-label={`Back to ${chrome.backLabel}`}
          >
            <ChevronLeft className="size-6" />
            <span className="text-base font-bold">{chrome.backLabel}</span>
          </Link>
          {stage ? <p className="truncate text-xs font-bold text-muted">{stage}</p> : null}
        </div>
      </header>
    );
  }

  if (chrome.mode === "brand") {
    return (
      <header className="app-bar">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-accent-ink">
              D
            </span>
            <p className="font-display text-2xl leading-none">Doula</p>
          </div>
          {stage ? <p className="truncate text-xs font-bold text-muted">{stage}</p> : null}
        </div>
      </header>
    );
  }

  const title = chrome.title;
  return (
    <header className="app-bar">
      <div className="min-w-0 py-0.5">
        {stage ? <p className="text-xs font-bold text-accent">{stage}</p> : null}
        {chrome.mode === "tab" ? (
          <h1 className="font-display text-[1.65rem] leading-none text-ink">{title}</h1>
        ) : (
          <p className="font-display text-[1.65rem] leading-none text-ink">{title}</p>
        )}
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
  const hideTabs = chrome.mode === "brand" && !hasProfile;
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
          <AppBar chrome={chrome} stage={stage} />
          <main id="main" ref={mainRef} tabIndex={-1} className="phone-scroll">
            <div key={pathname} className="screen-enter px-4 pt-3 pb-5">
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
