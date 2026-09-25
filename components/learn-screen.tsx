"use client";

import Link from "next/link";
import { modules } from "@/lib/content";
import { browseOrder } from "@/lib/select";
import { TRACKS } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { ScreenIntro, StickyHeading, cardLinkClass } from "@/components/ui";

export function LearnScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const done = completedIdSet(completions, "lesson");

  return (
    <div className="space-y-5">
      <ScreenIntro>
        Browse by topic. Lessons marked for your stage come first. Others stay available if you
        want to read ahead or look back.
      </ScreenIntro>
      {TRACKS.map((track) => {
        const items = browseOrder(
          modules.filter((item) => item.track === track.id),
          profile.stage,
        );
        return (
          <section key={track.id} aria-labelledby={`track-${track.id}`} className="space-y-2">
            <StickyHeading id={`track-${track.id}`}>{track.title}</StickyHeading>
            <p className="text-sm leading-snug text-muted">{track.description}</p>
            <ul className="space-y-2.5">
              {items.map((item) => {
                const matches = item.stages.includes(profile.stage);
                const complete = done.has(item.id);
                return (
                  <li key={item.id}>
                    <Link href={`/learn/${item.id}`} className={cardLinkClass}>
                      <span className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-bold text-accent">
                          {matches ? "For your stage" : "Other stage"}
                        </span>
                        {complete ? (
                          <span className="rounded-full border border-line px-2.5 py-0.5 font-bold">
                            Done
                          </span>
                        ) : null}
                        <span className="text-muted">{item.minutes} min</span>
                      </span>
                      <h3 className="mt-2 font-display text-xl leading-tight">{item.title}</h3>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {item.summary}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
