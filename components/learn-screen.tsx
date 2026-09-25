"use client";

import { MediaRow, ScreenHero, StickyHeading } from "@/components/ui";
import { trackVisual } from "@/components/visual";
import { modules } from "@/lib/content";
import { browseOrder } from "@/lib/select";
import { TRACKS } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";

export function LearnScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const done = completedIdSet(completions, "lesson");

  return (
    <div className="space-y-4">
      <ScreenHero tone="sky" title="Learn" kicker="Lessons">
        Your stage comes first. Other lessons stay open if you want to read ahead or look back.
      </ScreenHero>
      {TRACKS.map((track) => {
        const items = browseOrder(
          modules.filter((item) => item.track === track.id),
          profile.stage,
        );
        const visual = trackVisual(track.id);
        return (
          <section key={track.id} aria-labelledby={`track-${track.id}`} className="space-y-2">
            <StickyHeading id={`track-${track.id}`} tone={visual.tone}>
              {track.title}
            </StickyHeading>
            <p className="text-sm leading-snug text-muted">{track.description}</p>
            <ul className="space-y-2">
              {items.map((item) => {
                const matches = item.stages.includes(profile.stage);
                const complete = done.has(item.id);
                return (
                  <li key={item.id}>
                    <MediaRow
                      href={`/learn/${item.id}`}
                      title={item.title}
                      meta={`${matches ? "For your stage" : "Other stage"}${complete ? " · Done" : ""} · ${item.minutes} min · ${item.summary}`}
                      tone={visual.tone}
                      glyph={visual.glyph}
                    />
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
