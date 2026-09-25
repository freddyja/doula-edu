"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CompletePanel } from "@/components/complete-panel";
import { Badge, Button, Card, ScreenHero, StickyHeading } from "@/components/ui";
import { Glyph, pillarVisual, tileClass } from "@/components/visual";
import { localDateKey } from "@/lib/dates";
import { formatDateKey } from "@/lib/format";
import {
  PREP_DAY_COUNT,
  PREP_RHYTHM,
  prepDateForIndex,
  prepDayIsOpen,
  prepDays,
  prepDaysDone,
  prepStreak,
  prepWeeks,
  todayPrepIndex,
  type PrepCursor,
} from "@/lib/prep";
import { PILLARS, pillarMeta } from "@/lib/stages";
import {
  completedIdSet,
  findCompletion,
  markComplete,
  startPrepPath,
  useDoulaState,
} from "@/lib/store";
import type { PrepDay } from "@/lib/types";

export function PrepScreen() {
  const { profile, completions } = useDoulaState();
  const [chosenId, setChosenId] = useState<string | "auto">("auto");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const started = profile?.prepStartedOn ?? null;
  const today = localDateKey();
  const cursor: PrepCursor = started ? todayPrepIndex(started, today) : "before";
  const todayId = typeof cursor === "number" ? (prepDays[cursor]?.id ?? null) : null;
  const hashId = typeof window === "undefined" ? "" : window.location.hash.replace("#", "");
  const openId = chosenId === "auto" ? hashId || todayId : chosenId;

  useEffect(() => {
    if (!hashId) return;
    document.getElementById(hashId)?.scrollIntoView({ block: "center" });
  }, [hashId]);

  if (!profile) return null;

  const doneIds = completedIdSet(completions, "prep");
  const doneCount = prepDaysDone(doneIds);
  const streak = started ? prepStreak(started, doneIds, today) : 0;

  async function onQuickMark(day: PrepDay) {
    const existing = findCompletion(completions, "prep", day.id);
    setSavingId(day.id);
    setError(null);
    try {
      await markComplete("prep", day.id, existing?.note ?? "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <ScreenHero tone="blush" title="Prep" kicker="Optional">
        One card a day for eight weeks. Movement and mindset each show up twice.
      </ScreenHero>
      <ul className="flex flex-wrap gap-1.5">
        {PILLARS.map((pillar) => {
          const visual = pillarVisual(pillar.id);
          return (
            <li
              key={pillar.id}
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${tileClass[visual.tone]}`}
            >
              {pillar.label}
            </li>
          );
        })}
      </ul>
      <p className="text-sm leading-snug text-muted">
        {started
          ? `${doneCount} of ${PREP_DAY_COUNT} days marked done · ${streak}-day streak. `
          : "Prep has not been started on this device. "}
        Missed days stay here so you can mark them later. Future days wait.
      </p>

      {!started ? <StartBlock /> : null}
      {cursor === "invalid" ? (
        <Card>
          <p className="text-base leading-relaxed">
            The start date on this device could not be read. You can start again from today.
            Cards already marked stay saved.
          </p>
          <div className="mt-4">
            <RestartButton />
          </div>
        </Card>
      ) : null}

      {error ? (
        <p className="text-base text-accent" role="alert">
          {error}
        </p>
      ) : null}

      {prepWeeks.map((week) => {
        const days = prepDays.filter((day) => day.week === week.week);
        return (
          <section key={week.week} aria-labelledby={`prep-week-${week.week}`} className="space-y-3">
            <StickyHeading id={`prep-week-${week.week}`} tone="blush">
              Week {week.week} · {week.title}
            </StickyHeading>
            <p className="text-sm leading-snug text-muted">{week.blurb}</p>
            <ul className="space-y-3">
              {days.map((day) => {
                const index = (day.week - 1) * 7 + day.day - 1;
                const available = started ? prepDayIsOpen(index, cursor) : false;
                const dateKey = started ? prepDateForIndex(started, index) : null;
                return (
                  <li key={day.id} id={day.id} className="scroll-mt-4">
                    <PrepDayRow
                      day={day}
                      dateLabel={dateKey ? formatDateKey(dateKey) : ""}
                      isToday={day.id === todayId}
                      open={openId === day.id}
                      done={doneIds.has(day.id)}
                      available={available}
                      waiting={Boolean(started) && cursor !== "invalid" && !available}
                      saving={savingId === day.id}
                      onToggle={() =>
                        setChosenId((current) => {
                          const active = current === "auto" ? hashId || todayId : current;
                          return active === day.id ? "" : day.id;
                        })
                      }
                      onQuickMark={() => void onQuickMark(day)}
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

function PrepDayRow({
  day,
  dateLabel,
  isToday,
  open,
  done,
  available,
  waiting,
  saving,
  onToggle,
  onQuickMark,
}: {
  day: PrepDay;
  dateLabel: string;
  isToday: boolean;
  open: boolean;
  done: boolean;
  available: boolean;
  waiting: boolean;
  saving: boolean;
  onToggle: () => void;
  onQuickMark: () => void;
}) {
  const pillar = pillarMeta(day.pillar);
  const visual = pillarVisual(day.pillar);
  return (
    <article
      className={`rounded-2xl border bg-surface p-3 shadow-card ${
        isToday ? "border-2 border-accent" : "border-line"
      } ${available ? "" : "opacity-80"}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tileClass[visual.tone]}`}
        >
          <Glyph name={visual.glyph} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-muted">
              Day {day.day}
              {dateLabel ? ` · ${dateLabel}` : ""}
            </span>
            <Badge>{pillar?.label ?? day.pillar}</Badge>
            {done ? <Badge tone="plain">Done</Badge> : null}
            {isToday ? <Badge tone="plain">Today</Badge> : null}
          </div>
          <h3 className="mt-0.5 font-display text-base font-extrabold leading-tight tracking-tight">
            {day.title}
          </h3>
        </div>
      </div>
      {open ? (
        <div className="mt-3 space-y-3">
          <p className="text-sm leading-relaxed text-muted">{pillar?.blurb}</p>
          <p className="text-base leading-relaxed">{day.action}</p>
          <div className="flex flex-wrap gap-4">
            {day.learnId ? (
              <Link
                href={`/learn/${day.learnId}`}
                className="inline-flex min-h-11 items-center font-semibold text-accent"
              >
                Related lesson
              </Link>
            ) : null}
            {day.moveId ? (
              <Link
                href={`/move/${day.moveId}`}
                className="inline-flex min-h-11 items-center font-semibold text-accent"
              >
                Longer session
              </Link>
            ) : null}
          </div>
          {available ? <CompletePanel kind="prep" itemId={day.id} /> : null}
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={onToggle}>
          {open ? "Hide" : "Read"}
        </Button>
        {available && !open ? (
          done ? null : (
            <Button type="button" disabled={saving} onClick={onQuickMark}>
              {saving ? "Saving…" : "Mark done"}
            </Button>
          )
        ) : null}
        {waiting ? <span className="self-center text-sm text-muted">Opens later</span> : null}
      </div>
    </article>
  );
}

function StartBlock() {
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
    <Card className="bg-blush-soft">
      <h2 className="font-display text-xl font-extrabold tracking-tight">Start when you want</h2>
      <p className="mt-1.5 text-sm leading-relaxed">
        Day 1 is the day you tap start. The rhythm each week is{" "}
        {PREP_RHYTHM.map((pillar) => pillarMeta(pillar)?.label ?? pillar).join(", ")}.
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        Nutrition tips are general wellness, not a meal plan. Movement cards are short. Stop if
        something feels wrong.
      </p>
      <div className="mt-3">
        <Button type="button" disabled={pending} onClick={() => void onStart()} className="w-full">
          {pending ? "Saving…" : "Start 8-week prep"}
        </Button>
      </div>
      {error ? (
        <p className="mt-3 text-base text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </Card>
  );
}

function RestartButton() {
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
        {pending ? "Saving…" : "Start again from today"}
      </Button>
      {error ? (
        <p className="mt-3 text-base text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
