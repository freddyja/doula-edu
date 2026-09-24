"use client";

import { BottomNav, SideNav } from "@/components/nav";
import { ServiceWorkerRegistrar } from "@/components/service-worker";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p
        role="note"
        className="sticky top-0 z-40 border-b border-line bg-accent-soft px-4 py-3 text-center text-sm leading-snug text-ink sm:text-base"
      >
        Educational wellness support only. Not medical advice, a diagnosis, or a treatment plan.
        Follow your care provider.
      </p>
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <SideNav />
        <div className="min-w-0 flex-1 px-4 py-6 pb-28 md:px-8 md:py-10 md:pb-16">
          <main id="main" className="mx-auto w-full max-w-2xl">
            {children}
          </main>
        </div>
      </div>
      <BottomNav />
      <ServiceWorkerRegistrar />
    </>
  );
}
