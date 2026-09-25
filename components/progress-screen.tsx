"use client";

import Link from "next/link";
import { getModule, getSession } from "@/lib/content";
import { localDateKey } from "@/lib/dates";
import { formatWhen } from "@/lib/format";
import { PREP_DAY_COUNT, getPrepDay, prepDaysDone, prepStreak } from "@/lib/prep";
import { pillarMeta, stageLabel } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
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
  const prep = completions
    .filter((item) => item.kind === "prep")
    .toSorted((a, b) => a.itemId.localeCompare(b.itemId));
  const prepIds = completedIdSet(completions, "prep");
  const prepDone = prepDaysDone(prepIds);
  const started = profile.prepStartedOn;
  const streak = started ? prepStreak(started, prepIds, localDateKey()) : 0;

  return (
    <div className="space-y-5">
      <ScreenIntro>
        {prepDone} prep {prepDone === 1 ? "day" : "days"}, {lessons.length}{" "}
        {lessons.length === 1 ? "lesson" : "lessons"}, and {movement.length}{" "}
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

      <section aria-labelledby="progress-prep" className="space-y-2">
        <StickyHeading id="progress-prep">Prep</StickyHeading>
        <p className="text-sm leading-relaxed text-muted">
          {started
            ? `${prepDone} of ${PREP_DAY_COUNT} days · ${streak}-day streak.`
            : "Prep has not been started on this device."}
        </p>
        <div>
          <ButtonLink href="/prep" variant="secondary">
            Open the 8-week path
          </ButtonLink>
        </div>
        <CompletionList
          items={prep}
          empty="When you mark a prep card done, it will show up here with your note."
          hrefFor={(item) => `/prep#${item.itemId}`}
          titleFor={(item) => getPrepDay(item.itemId)?.title ?? "Prep card"}
          detailFor={(item) => {
            const day = getPrepDay(item.itemId);
            if (!day) return null;
            const pillar = pillarMeta(day.pillar)?.label ?? day.pillar;
            return `Week ${day.week} · Day ${day.day} · ${pillar}`;
          }}
        />
      </section>

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
  detailFor,
}: {
  items: Completion[];
  empty: string;
  hrefFor: (item: Completion) => string;
  titleFor: (item: Completion) => string;
  detailFor?: (item: Completion) => string | null;
}) {
  if (items.length === 0) {
    return <p className="mt-1 text-sm leading-relaxed text-muted">{empty}</p>;
  }

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm text-muted">
            Marked done {formatWhen(item.completedAt)}
            {detailFor?.(item) ? ` · ${detailFor(item)}` : ""}
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight">{titleFor(item)}</h3>
          <p className="mt-2 text-base leading-relaxed">
            {item.note ? item.note : <span className="text-muted">No note yet.</span>}
          </p>
          <Link
            href={hrefFor(item)}
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-accent"
          >
            Open
          </Link>
        </li>
      ))}
    </ul>
  );
}
