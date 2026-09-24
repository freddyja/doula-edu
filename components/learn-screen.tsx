"use client";

import Link from "next/link";
import { modules } from "@/lib/content";
import { browseOrder } from "@/lib/select";
import { TRACKS, stageLabel } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { PageHeader, cardLinkClass } from "@/components/ui";

export function LearnScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const done = completedIdSet(completions, "lesson");

  return (
    <div className="space-y-8">
      <PageHeader eyebrow={stageLabel(profile.stage)} title="Learn">
        Browse by topic. Lessons marked for your stage come first. Others stay available if you
        want to read ahead or look back.
      </PageHeader>
      {TRACKS.map((track) => {
        const items = browseOrder(
          modules.filter((item) => item.track === track.id),
          profile.stage,
        );
        return (
          <section key={track.id} aria-labelledby={`track-${track.id}`}>
            <h2 id={`track-${track.id}`} className="font-display text-2xl">
              {track.title}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">{track.description}</p>
            <ul className="mt-4 space-y-3">
              {items.map((item) => {
                const matches = item.stages.includes(profile.stage);
                const complete = done.has(item.id);
                return (
                  <li key={item.id}>
                    <Link href={`/learn/${item.id}`} className={cardLinkClass}>
                      <span className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent">
                          {matches ? "For your stage" : "Other stage"}
                        </span>
                        {complete ? (
                          <span className="rounded-full border border-line px-3 py-1 font-semibold">
                            Done
                          </span>
                        ) : null}
                        <span className="text-muted">{item.minutes} min</span>
                      </span>
                      <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
                      <span className="mt-2 block text-base leading-relaxed text-muted">
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
