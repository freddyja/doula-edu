"use client";

import { ListGroup, PosterRow, ScreenHero, SectionHero } from "@/components/ui";
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
    <div className="space-y-5">
      <ScreenHero tone="sky" title="Learn" kicker="Lessons">
        Your stage comes first. Others stay open if you want to read ahead.
      </ScreenHero>
      {TRACKS.map((track) => {
        const items = browseOrder(
          modules.filter((item) => item.track === track.id),
          profile.stage,
        );
        const visual = trackVisual(track.id);
        return (
          <section key={track.id} aria-labelledby={`track-${track.id}`} className="space-y-2">
            <SectionHero id={`track-${track.id}`} title={track.title} tone={visual.tone}>
              {track.description}
            </SectionHero>
            <ListGroup>
              {items.map((item) => {
                const matches = item.stages.includes(profile.stage);
                const complete = done.has(item.id);
                return (
                  <li key={item.id}>
                    <PosterRow
                      href={`/learn/${item.id}`}
                      title={item.title}
                      meta={`${item.minutes} min · ${matches ? "Your stage" : "Other stage"}${
                        complete ? " · Done" : ""
                      }`}
                      tone={visual.tone}
                      glyph={visual.glyph}
                      done={complete}
                    />
                  </li>
                );
              })}
            </ListGroup>
          </section>
        );
      })}
    </div>
  );
}
