"use client";

import Link from "next/link";
import { getModule, getSession } from "@/lib/content";
import { formatWhen } from "@/lib/format";
import { stageLabel } from "@/lib/stages";
import { useDoulaState } from "@/lib/store";
import { ButtonLink, Card, PageHeader } from "@/components/ui";
import type { Completion } from "@/lib/types";

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
    <div className="space-y-6">
      <PageHeader eyebrow={stageLabel(profile.stage)} title="Progress">
        {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"} and {movement.length}{" "}
        {movement.length === 1 ? "movement session" : "movement sessions"} marked done on this
        device.
      </PageHeader>
      <p className="text-base leading-relaxed text-muted">
        Stage: {stageLabel(profile.stage)}.{" "}
        <Link href="/" className="font-semibold text-accent">
          Change stage on Home
        </Link>
        .
      </p>

      <section aria-labelledby="progress-lessons">
        <h2 id="progress-lessons" className="font-display text-2xl">
          Lessons
        </h2>
        <CompletionList
          items={lessons}
          empty="When you mark a lesson done, it will show up here with your note."
          hrefFor={(item) => `/learn/${item.itemId}`}
          titleFor={(item) => getModule(item.itemId)?.title ?? "Lesson"}
        />
      </section>

      <section aria-labelledby="progress-movement">
        <h2 id="progress-movement" className="font-display text-2xl">
          Movement
        </h2>
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
        <li key={item.id} className="rounded-3xl border border-line bg-surface p-5">
          <p className="text-sm text-muted">Marked done {formatWhen(item.completedAt)}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight">{titleFor(item)}</h3>
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
