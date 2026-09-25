"use client";

import { useState } from "react";
import Link from "next/link";
import { localDateKey } from "@/lib/dates";
import { formatDateKey } from "@/lib/format";
import {
  PREP_DAY_COUNT,
  prepDateForIndex,
  prepDays,
  prepDaysDone,
  prepStreak,
  todayPrepIndex,
} from "@/lib/prep";
import { pillarMeta } from "@/lib/stages";
import {
  completedIdSet,
  findCompletion,
  markComplete,
  removeCompletion,
  startPrepPath,
  useDoulaState,
} from "@/lib/store";
import { Badge, Button, ButtonLink, Card } from "@/components/ui";

const prominentCard =
  "rounded-3xl border-2 border-accent bg-surface p-5 shadow-[0_10px_30px_-22px_rgba(42,36,30,0.45)]";

export function PrepTodayCard() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const started = profile.prepStartedOn;
  if (!started) return <PrepOffer />;

  const today = localDateKey();
  const cursor = todayPrepIndex(started, today);
  const doneIds = completedIdSet(completions, "prep");
  const doneCount = prepDaysDone(doneIds);
  const streak = prepStreak(started, doneIds, today);

  if (cursor === "invalid") {
    return (
      <section className={prominentCard}>
        <p className="text-sm font-semibold text-accent">Prep</p>
        <h2 className="mt-2 font-display text-2xl">The start date needs a reset</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          The date saved on this device could not be read. Starting again sets today as day 1.
          Cards you already marked stay saved.
        </p>
        <div className="mt-4">
          <StartButton label="Start again from today" />
        </div>
      </section>
    );
  }

  if (cursor === "before") {
    const startLabel = formatDateKey(started);
    return (
      <Card>
        <p className="text-sm font-semibold text-accent">Prep</p>
        <h2 className="mt-2 font-display text-2xl">Your path has not reached today</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {startLabel
            ? `The start date on this device is ${startLabel}.`
            : "The start date on this device is still ahead."}{" "}
          You can read the cards, and day 1 will be ready on that date.
        </p>
        <div className="mt-4">
          <ButtonLink href="/prep" variant="secondary">
            Review the path
          </ButtonLink>
        </div>
      </Card>
    );
  }

  if (cursor === "after") {
    return (
      <section className={prominentCard}>
        <p className="text-sm font-semibold text-accent">Prep</p>
        <h2 className="mt-2 font-display text-2xl">The 8 weeks are complete</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {doneCount} of {PREP_DAY_COUNT} days are marked done on this device.
          {streak > 0 ? ` Closing streak: ${streak} days.` : " There is no new card today."} You
          can still open a card and add a note.
        </p>
        <div className="mt-4">
          <ButtonLink href="/prep" variant="secondary">
            Review the path
          </ButtonLink>
        </div>
      </section>
    );
  }

  const day = prepDays[cursor];
  if (!day) return null;
  const pillar = pillarMeta(day.pillar);
  const dateLabel = formatDateKey(prepDateForIndex(started, cursor) ?? "");
  const existing = findCompletion(completions, "prep", day.id);

  return (
    <section className={prominentCard}>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge>{pillar?.label ?? "Prep"}</Badge>
        {existing ? <Badge tone="plain">Done</Badge> : null}
        <span className="text-muted">
          Week {day.week} · Day {day.day}
          {dateLabel ? ` · ${dateLabel}` : ""}
        </span>
      </div>
      <h2 className="mt-3 font-display text-3xl leading-tight">{day.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{pillar?.blurb}</p>
      <p className="mt-3 text-base leading-relaxed">{day.action}</p>
      <p className="mt-3 text-sm text-muted">
        {doneCount} of {PREP_DAY_COUNT} days · {streak}-day streak
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {day.learnId ? (
          <Link href={`/learn/${day.learnId}`} className="inline-flex min-h-11 items-center font-semibold text-accent">
            Related lesson
          </Link>
        ) : null}
        {day.moveId ? (
          <Link href={`/move/${day.moveId}`} className="inline-flex min-h-11 items-center font-semibold text-accent">
            Longer session
          </Link>
        ) : null}
      </div>
      <TodayActions itemId={day.id} done={Boolean(existing)} note={existing?.note ?? ""} />
    </section>
  );
}

function TodayActions({ itemId, done, note }: { itemId: string; done: boolean; note: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onMark() {
    setPending(true);
    setError(null);
    try {
      await markComplete("prep", itemId, note);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
    } finally {
      setPending(false);
    }
  }

  async function onUndo() {
    setPending(true);
    setError(null);
    try {
      await removeCompletion("prep", itemId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3">
        {done ? (
          <Button type="button" variant="secondary" disabled={pending} onClick={() => void onUndo()}>
            {pending ? "Saving…" : "Undo today"}
          </Button>
        ) : (
          <Button type="button" disabled={pending} onClick={() => void onMark()}>
            {pending ? "Saving…" : "Mark done"}
          </Button>
        )}
        <ButtonLink href={`/prep#${itemId}`} variant="secondary">
          8-week path
        </ButtonLink>
      </div>
      {error ? (
        <p className="mt-3 text-base text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PrepOffer() {
  return (
    <section className={prominentCard}>
      <p className="text-sm font-semibold text-accent">Prep · optional</p>
      <h2 className="mt-2 font-display text-2xl">An 8-week daily card</h2>
      <p className="mt-2 text-base leading-relaxed">
        One small card a day across mindset, movement, nutrition, partner support, and birth
        education. Nutrition cards are wellness tips, not meal plans. The path is written with
        pregnancy in mind. If you have already given birth, keep the cards that help and skip the
        rest.
      </p>
      <p className="mt-2 text-base leading-relaxed text-muted">
        You can skip Prep and still use Learn and Move. Nothing is sent to a server.
      </p>
      <div className="mt-4">
        <StartButton label="Start 8-week prep" />
      </div>
    </section>
  );
}

function StartButton({ label }: { label: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onStart() {
    setPending(true);
    setError(null);
    try {
      await startPrepPath();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
      setPending(false);
    }
  }

  return (
    <>
      <Button type="button" disabled={pending} onClick={() => void onStart()}>
        {pending ? "Saving…" : label}
      </Button>
      {error ? (
        <p className="mt-3 text-base text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
