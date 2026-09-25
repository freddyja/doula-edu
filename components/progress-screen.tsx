"use client";

import Link from "next/link";
import { getModule, getSession } from "@/lib/content";
import { formatWhen } from "@/lib/format";
import { stageLabel } from "@/lib/stages";
import { useDoulaState } from "@/lib/store";
import { ButtonLink, Card, ScreenIntro, StickyHeading } from "@/components/ui";
import type { Completion } from "@/lib/types";
import { WELLNESS_SHORT } from "@/lib/wellness";

export function ProgressScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const lessons = completions
    .filter((item) => item.kind === "lesson")
    .toSorted((a, b) => b.completedAt.localeCompare(a.completedAt));
  const movement = completions
    .filter((item) => item.kind === "session")
    .toSorted((a, b) => b.completedAt.localeCompare(a.completedAt));

  return (
    <div className="space-y-5">
      <ScreenIntro>
        {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"} and {movement.length}{" "}
        {movement.length === 1 ? "movement session" : "movement sessions"} marked done on this
        device.
      </ScreenIntro>
      <p className="text-sm leading-relaxed text-muted">
        Stage: {stageLabel(profile.stage)}.{" "}
        <Link href="/" className="font-bold text-accent">
          Change stage
        </Link>
        .
      </p>

      <section aria-labelledby="progress-lessons" className="space-y-2">
        <StickyHeading id="progress-lessons">Lessons</StickyHeading>
        <CompletionList
          items={lessons}
          empty="When you mark a lesson done, it will show up here with your note."
          hrefFor={(item) => `/learn/${item.itemId}`}
          titleFor={(item) => getModule(item.itemId)?.title ?? "Lesson"}
        />
      </section>

      <section aria-labelledby="progress-movement" className="space-y-2">
        <StickyHeading id="progress-movement">Movement</StickyHeading>
        <CompletionList
          items={movement}
          empty="When you mark a session done, it will show up here with your note."
          hrefFor={(item) => `/move/${item.itemId}`}
          titleFor={(item) => getSession(item.itemId)?.title ?? "Session"}
        />
      </section>

      <Card>
        <p className="text-base leading-relaxed">
          Notes stay in this browser. Clearing site data removes them.
        </p>
        <p className="mt-3 rounded-2xl bg-accent-soft px-3 py-2 text-sm leading-relaxed text-ink">
          {WELLNESS_SHORT}
        </p>
        <div className="mt-4">
          <ButtonLink href="/today" variant="secondary">
            Back to today
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}

function CompletionList({
  items,
  empty,
  hrefFor,
  titleFor,
}: {
  items: Completion[];
  empty: string;
  hrefFor: (item: Completion) => string;
  titleFor: (item: Completion) => string;
}) {
  if (items.length === 0) {
    return <p className="mt-3 text-base leading-relaxed text-muted">{empty}</p>;
  }

  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm text-muted">Marked done {formatWhen(item.completedAt)}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">{titleFor(item)}</h3>
          <p className="mt-3 text-base leading-relaxed">
            {item.note ? item.note : <span className="text-muted">No note yet.</span>}
          </p>
          <Link
            href={hrefFor(item)}
            className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent"
          >
            Open
          </Link>
        </li>
      ))}
    </ul>
  );
}
