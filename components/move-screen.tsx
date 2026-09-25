"use client";

import Link from "next/link";
import { sessions } from "@/lib/content";
import { forStage } from "@/lib/select";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { ScreenIntro, cardLinkClass } from "@/components/ui";

export function MoveScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const items = forStage(sessions, profile.stage).toSorted(
    (a, b) => a.priority - b.priority || a.title.localeCompare(b.title),
  );
  const done = completedIdSet(completions, "session");

  return (
    <div className="space-y-3">
      <ScreenIntro>
        Gentle sessions for the stage you chose: mobility, breathing, and pelvic floor awareness.
        Stop if something feels wrong, and talk with your provider about movement that fits you.
      </ScreenIntro>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/move/${item.id}`} className={cardLinkClass}>
              <span className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-bold text-accent">
                  {item.focus}
                </span>
                {done.has(item.id) ? (
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-bold">Done</span>
                ) : null}
                <span className="text-muted">About {item.minutes} min</span>
              </span>
              <h3 className="mt-2 font-display text-xl leading-tight">{item.title}</h3>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
