"use client";

import { useState } from "react";
import { Card, ListGroup, PosterRow, ScreenHero, SectionHero } from "@/components/ui";
import { Glyph, heroClass, levelVisual, type Tone } from "@/components/visual";
import { sessions } from "@/lib/content";
import { forStage } from "@/lib/select";
import { PELVIC_LEVELS, pelvicLevelMeta } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
import type { PelvicLevel, Session } from "@/lib/types";

type MoveFilter = "all" | PelvicLevel;

function byPriority(items: readonly Session[]): Session[] {
  return items.toSorted((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
}

function SessionList({ items, done }: { items: Session[]; done: Set<string> }) {
  return (
    <ListGroup>
      {items.map((item) => {
        const level = item.pelvicLevel ? pelvicLevelMeta(item.pelvicLevel) : null;
        const visual = item.pelvicLevel ? levelVisual(item.pelvicLevel) : null;
        const complete = done.has(item.id);
        return (
          <li key={item.id}>
            <PosterRow
              href={`/move/${item.id}`}
              title={item.title}
              meta={`About ${item.minutes} min · ${level ? level.title : item.focus}${
                complete ? " · Done" : ""
              }`}
              tone={visual?.tone ?? "plum"}
              glyph={visual?.glyph ?? "breath"}
              done={complete}
            />
          </li>
        );
      })}
    </ListGroup>
  );
}

export function MoveScreen() {
  const { profile, completions } = useDoulaState();
  const [filter, setFilter] = useState<MoveFilter>("all");
  if (!profile) return null;

  const items = byPriority(forStage(sessions, profile.stage));
  const done = completedIdSet(completions, "session");
  const leveled = items.filter((item) => item.pelvicLevel);
  const shorts = items.filter((item) => !item.pelvicLevel);
  const visible = filter === "all" ? items : leveled.filter((item) => item.pelvicLevel === filter);

  return (
    <div className="space-y-4">
      <ScreenHero tone="sage" title="Move" kicker="Follow along">
        Written steps, no video. Stop if something feels wrong, and ask your provider what fits you.
      </ScreenHero>

      <div
        className="no-scrollbar -mx-3.5 flex snap-x gap-3 overflow-x-auto px-3.5 py-1"
        role="group"
        aria-label="Filter by pelvic level"
      >
        <LevelPoster
          label="All"
          pressed={filter === "all"}
          onClick={() => setFilter("all")}
          tone="sage"
          glyph="move"
        />
        {PELVIC_LEVELS.map((level) => {
          const visual = levelVisual(level.id);
          const short = level.title.split("·")[0]?.trim() ?? level.title;
          return (
            <LevelPoster
              key={level.id}
              label={short}
              pressed={filter === level.id}
              onClick={() => setFilter(level.id)}
              tone={visual.tone}
              glyph={visual.glyph}
              pressedLabel={level.title}
            />
          );
        })}
      </div>

      {filter === "all" ? (
        <div className="space-y-5">
          {leveled.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted">
              Pelvic-level sessions in this app are aimed at pregnancy and later postpartum. This
              stage keeps the short practices below. Ask your provider before you add more.
            </p>
          ) : (
            PELVIC_LEVELS.map((level) => {
              const group = leveled.filter((item) => item.pelvicLevel === level.id);
              if (group.length === 0) return null;
              return (
                <section key={level.id} aria-labelledby={`level-${level.id}`} className="space-y-2">
                  <SectionHero
                    id={`level-${level.id}`}
                    title={level.title}
                    tone={levelVisual(level.id).tone}
                  >
                    {level.description}
                  </SectionHero>
                  <SessionList items={group} done={done} />
                </section>
              );
            })
          )}
          {shorts.length > 0 ? (
            <section aria-labelledby="short-practices" className="space-y-2">
              <SectionHero id="short-practices" title="Short practices" tone="plum">
                Breathing and smaller movements, usually under 10 minutes. They are not organized
                by pelvic level.
              </SectionHero>
              <SessionList items={shorts} done={done} />
            </section>
          ) : null}
        </div>
      ) : visible.length > 0 ? (
        <section className="space-y-2" aria-labelledby="filtered-level">
          <SectionHero id="filtered-level" title={pelvicLevelMeta(filter)?.title ?? "Sessions"} tone={levelVisual(filter).tone}>
            {pelvicLevelMeta(filter)?.description}
          </SectionHero>
          <SessionList items={visible} done={done} />
        </section>
      ) : (
        <Card>
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            Nothing in this level for your stage
          </h2>
          <p className="mt-1 text-sm leading-snug text-muted">
            {pelvicLevelMeta(filter)?.title} sessions are not listed for the stage you chose.{" "}
            {pelvicLevelMeta(filter)?.description} Short practices are still under All.
          </p>
        </Card>
      )}
    </div>
  );
}

function LevelPoster({
  label,
  pressed,
  onClick,
  tone,
  glyph,
  pressedLabel,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  tone: Tone;
  glyph: Parameters<typeof Glyph>[0]["name"];
  pressedLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={pressedLabel ?? label}
      onClick={onClick}
      className="pressable flex w-[4.75rem] shrink-0 snap-start flex-col items-center gap-1.5"
    >
      <span
        className={`grid size-[4.75rem] place-items-center overflow-hidden rounded-[1.2rem] ${heroClass[tone]} ${
          pressed ? "ring-2 ring-ink ring-offset-2 ring-offset-bg" : ""
        }`}
      >
        <Glyph name={glyph} className="size-7" />
      </span>
      <span className={`text-center text-xs leading-tight ${pressed ? "font-extrabold text-ink" : "font-bold text-muted"}`}>
        {label}
      </span>
    </button>
  );
}
