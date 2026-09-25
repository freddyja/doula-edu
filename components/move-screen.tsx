"use client";

import { useState } from "react";
import { Card, MediaRow, ScreenHero, StickyHeading } from "@/components/ui";
import { Glyph, levelVisual, tileClass } from "@/components/visual";
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
    <ul className="space-y-2">
      {items.map((item) => {
        const level = item.pelvicLevel ? pelvicLevelMeta(item.pelvicLevel) : null;
        const visual = item.pelvicLevel ? levelVisual(item.pelvicLevel) : null;
        return (
          <li key={item.id}>
            <MediaRow
              href={`/move/${item.id}`}
              title={item.title}
              meta={`${level ? level.title : item.focus}${done.has(item.id) ? " · Done" : ""} · About ${item.minutes} min · ${item.summary}`}
              tone={visual?.tone ?? "plum"}
              glyph={visual?.glyph ?? "breath"}
            />
          </li>
        );
      })}
    </ul>
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
    <div className="space-y-3">
      <ScreenHero tone="sage" title="Move" kicker="Follow along">
        Written steps, no video. Stop if something feels wrong, and ask your provider what fits you.
      </ScreenHero>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Filter by pelvic level">
        <FilterTile
          label="All sessions"
          detail="Pelvic levels and short practices"
          selected={filter === "all"}
          onClick={() => setFilter("all")}
          className="col-span-2"
        />
        {PELVIC_LEVELS.map((level) => {
          const visual = levelVisual(level.id);
          const short = level.title.split("·")[0]?.trim() ?? level.title;
          return (
            <button
              key={level.id}
              type="button"
              aria-pressed={filter === level.id}
              onClick={() => setFilter(level.id)}
              className={`pressable flex min-h-16 items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left ${
                filter === level.id ? "border-sage bg-sage-soft" : "border-line bg-surface"
              }`}
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ${tileClass[visual.tone]}`}
              >
                <Glyph name={visual.glyph} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-tight">{short}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                  {level.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        <div className="space-y-4">
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
                  <StickyHeading id={`level-${level.id}`} tone={levelVisual(level.id).tone}>
                    {level.title}
                  </StickyHeading>
                  <p className="text-sm leading-snug text-muted">{level.description}</p>
                  <SessionList items={group} done={done} />
                </section>
              );
            })
          )}
          {shorts.length > 0 ? (
            <section aria-labelledby="short-practices" className="space-y-2">
              <StickyHeading id="short-practices" tone="plum">
                Short practices
              </StickyHeading>
              <p className="text-sm leading-snug text-muted">
                Breathing and smaller movements, usually under 10 minutes. They are not organized
                by pelvic level.
              </p>
              <SessionList items={shorts} done={done} />
            </section>
          ) : null}
        </div>
      ) : visible.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm leading-snug text-muted">{pelvicLevelMeta(filter)?.description}</p>
          <SessionList items={visible} done={done} />
        </div>
      ) : (
        <Card>
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            Nothing in this level for your stage
          </h2>
          <p className="mt-1 text-sm leading-snug text-muted">
            {pelvicLevelMeta(filter)?.title} sessions are not listed for the stage you chose. Short
            practices are still under All sessions.
          </p>
        </Card>
      )}
    </div>
  );
}

function FilterTile({
  label,
  detail,
  selected,
  onClick,
  className = "",
}: {
  label: string;
  detail: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`pressable min-h-12 rounded-2xl border px-3 py-2 text-left ${
        selected ? "border-sage bg-sage text-accent-ink" : "border-line bg-surface text-ink"
      } ${className}`}
    >
      <span className="block text-sm font-extrabold leading-tight">{label}</span>
      <span className={`mt-0.5 block text-xs leading-snug ${selected ? "text-accent-ink" : "text-muted"}`}>
        {detail}
      </span>
    </button>
  );
}
