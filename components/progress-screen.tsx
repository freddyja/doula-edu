"use client";

import Link from "next/link";
import { getModule, getSession } from "@/lib/content";
import { localDateKey } from "@/lib/dates";
import { formatWhen } from "@/lib/format";
import { PREP_DAY_COUNT, getPrepDay, prepDaysDone, prepStreak } from "@/lib/prep";
import { pillarMeta, stageLabel } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { ButtonLink, ScreenHero, StickyHeading } from "@/components/ui";
import { Glyph, pillarVisual, tileClass, type Tone } from "@/components/visual";
import type { Completion } from "@/lib/types";
import { WELLNESS_LONG, WELLNESS_SHORT } from "@/lib/wellness";

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
    <div className="space-y-4">
      <ScreenHero tone="plum" title="Progress" kicker={stageLabel(profile.stage)}>
        Marked done on this device.
      </ScreenHero>

      <div className="grid grid-cols-3 gap-2">
        <Stat value={prepDone} label="Prep days" tone="blush" />
        <Stat value={lessons.length} label="Lessons" tone="sky" />
        <Stat value={movement.length} label="Sessions" tone="sage" />
      </div>

      <p className="text-sm leading-snug text-muted">
        <Link href="/" className="inline-flex min-h-11 items-center font-bold text-accent">
          Change stage
        </Link>
      </p>

      <section aria-labelledby="progress-prep" className="space-y-2">
        <StickyHeading id="progress-prep" tone="blush">
          Prep
        </StickyHeading>
        <p className="text-sm leading-snug text-muted">
          {started
            ? `${prepDone} of ${PREP_DAY_COUNT} days · ${streak}-day streak.`
            : "Prep has not been started on this device."}
        </p>
        <ButtonLink href="/prep" variant="secondary" className="w-full">
          Open the 8-week path
        </ButtonLink>
        <CompletionList
          items={prep}
          empty="When you mark a prep card done, it will show up here with your note."
          hrefFor={(item) => `/prep#${item.itemId}`}
          titleFor={(item) => getPrepDay(item.itemId)?.title ?? "Prep card"}
          toneFor={(item) => {
            const day = getPrepDay(item.itemId);
            return day ? pillarVisual(day.pillar).tone : "blush";
          }}
          glyphFor={(item) => {
            const day = getPrepDay(item.itemId);
            return day ? pillarVisual(day.pillar).glyph : "spark";
          }}
          detailFor={(item) => {
            const day = getPrepDay(item.itemId);
            if (!day) return null;
            const pillar = pillarMeta(day.pillar)?.label ?? day.pillar;
            return `Week ${day.week} · Day ${day.day} · ${pillar}`;
          }}
        />
      </section>

      <section aria-labelledby="progress-lessons" className="space-y-2">
        <StickyHeading id="progress-lessons" tone="sky">
          Lessons
        </StickyHeading>
        <CompletionList
          items={lessons}
          empty="When you mark a lesson done, it will show up here with your note."
          hrefFor={(item) => `/learn/${item.itemId}`}
          titleFor={(item) => getModule(item.itemId)?.title ?? "Lesson"}
          toneFor={() => "sky"}
          glyphFor={() => "book"}
        />
      </section>

      <section aria-labelledby="progress-movement" className="space-y-2">
        <StickyHeading id="progress-movement" tone="sage">
          Movement
        </StickyHeading>
        <CompletionList
          items={movement}
          empty="When you mark a session done, it will show up here with your note."
          hrefFor={(item) => `/move/${item.itemId}`}
          titleFor={(item) => getSession(item.itemId)?.title ?? "Session"}
          toneFor={() => "sage"}
          glyphFor={() => "move"}
        />
      </section>

      <section className="space-y-2 rounded-2xl bg-accent-soft p-3.5" aria-label="Wellness note">
        <h2 className="font-display text-base font-extrabold tracking-tight">Wellness note</h2>
        <p className="text-sm leading-relaxed">{WELLNESS_SHORT}</p>
        <p className="text-sm leading-relaxed text-muted">{WELLNESS_LONG}</p>
        <p className="text-xs leading-snug text-muted">
          Notes stay in this browser. Clearing site data removes them.
        </p>
        <ButtonLink href="/today" variant="secondary" className="w-full">
          Back to today
        </ButtonLink>
      </section>
    </div>
  );
}

function Stat({ value, label, tone }: { value: number; label: string; tone: Tone }) {
  return (
    <div className={`rounded-2xl px-2 py-3 text-center ${tileClass[tone]}`}>
      <p className="font-display text-2xl font-extrabold leading-none tracking-tight">{value}</p>
      <p className="mt-1 text-[0.7rem] font-bold leading-tight text-ink">{label}</p>
    </div>
  );
}

function CompletionList({
  items,
  empty,
  hrefFor,
  titleFor,
  detailFor,
  toneFor,
  glyphFor,
}: {
  items: Completion[];
  empty: string;
  hrefFor: (item: Completion) => string;
  titleFor: (item: Completion) => string;
  detailFor?: (item: Completion) => string | null;
  toneFor: (item: Completion) => Tone;
  glyphFor: (item: Completion) => Parameters<typeof Glyph>[0]["name"];
}) {
  if (items.length === 0) {
    return <p className="text-sm leading-snug text-muted">{empty}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const detail = detailFor?.(item);
        return (
          <li key={item.id} className="rounded-2xl border border-line bg-surface p-2.5 shadow-card">
            <Link href={hrefFor(item)} className="flex min-h-12 items-center gap-3">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tileClass[toneFor(item)]}`}
              >
                <Glyph name={glyphFor(item)} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-extrabold leading-tight tracking-tight">
                  {titleFor(item)}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Marked done {formatWhen(item.completedAt)}
                  {detail ? ` · ${detail}` : ""}
                </span>
              </span>
            </Link>
            <p className="mt-2 px-1 text-sm leading-relaxed">
              {item.note ? item.note : <span className="text-muted">No note yet.</span>}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
