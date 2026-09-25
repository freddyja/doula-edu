"use client";

import { useState } from "react";
import Link from "next/link";
import { sessions } from "@/lib/content";
import { forStage } from "@/lib/select";
import { PELVIC_LEVELS, pelvicLevelMeta, stageLabel } from "@/lib/stages";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { Badge, Card, PageHeader, cardLinkClass } from "@/components/ui";
import type { PelvicLevel, Session } from "@/lib/types";

type MoveFilter = "all" | PelvicLevel;

const filters: { id: MoveFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...PELVIC_LEVELS.map((level) => ({ id: level.id, label: level.title })),
];

function byPriority(items: readonly Session[]): Session[] {
  return items.toSorted((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
}

function SessionList({ items, done }: { items: Session[]; done: Set<string> }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => {
        const level = item.pelvicLevel ? pelvicLevelMeta(item.pelvicLevel) : null;
        return (
          <li key={item.id}>
            <Link href={`/move/${item.id}`} className={cardLinkClass}>
              <span className="flex flex-wrap items-center gap-2 text-sm">
                <Badge>{level ? level.title : item.focus}</Badge>
                {done.has(item.id) ? <Badge tone="plain">Done</Badge> : null}
                <span className="text-muted">About {item.minutes} min</span>
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
              <span className="mt-2 block text-base leading-relaxed text-muted">{item.summary}</span>
            </Link>
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
  const visible =
    filter === "all" ? items : leveled.filter((item) => item.pelvicLevel === filter);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={stageLabel(profile.stage)} title="Move">
        Birth-prep sessions by pelvic level, plus shorter practices. Follow the written steps.
        There is no video. Stop if something feels wrong, and talk with your provider about
        movement that fits you.
      </PageHeader>

      <Card>
        <h2 className="font-display text-2xl">Pelvic levels</h2>
        <p className="mt-2 text-base leading-relaxed">
          Inlet is the top, midpelvis is the middle, and outlet is the bottom. Release sessions
          are for letting the pelvic floor soften. No single move opens the whole pelvis.
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted">
          {PELVIC_LEVELS.map((level) => (
            <li key={level.id}>
              <span className="font-semibold text-ink">{level.title}. </span>
              {level.description}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by pelvic level">
        {filters.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${
                selected
                  ? "bg-accent text-accent-ink"
                  : "border border-line bg-surface text-ink hover:bg-accent-soft"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        <div className="space-y-8">
          {leveled.length === 0 ? (
            <p className="text-base leading-relaxed text-muted">
              Pelvic-level sessions in this app are aimed at pregnancy and later postpartum. This
              stage keeps the short practices below. Ask your provider before you add more.
            </p>
          ) : (
            PELVIC_LEVELS.map((level) => {
              const group = leveled.filter((item) => item.pelvicLevel === level.id);
              if (group.length === 0) return null;
              return (
                <section key={level.id} aria-labelledby={`level-${level.id}`}>
                  <h2 id={`level-${level.id}`} className="font-display text-2xl">
                    {level.title}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">{level.description}</p>
                  <SessionList items={group} done={done} />
                </section>
              );
            })
          )}
          {shorts.length > 0 ? (
            <section aria-labelledby="short-practices">
              <h2 id="short-practices" className="font-display text-2xl">
                Short practices
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                Breathing and smaller movements, usually under 10 minutes. They are not organized
                by pelvic level.
              </p>
              <SessionList items={shorts} done={done} />
            </section>
          ) : null}
        </div>
      ) : visible.length > 0 ? (
        <SessionList items={visible} done={done} />
      ) : (
        <Card>
          <h2 className="font-display text-2xl">Nothing in this level for your stage</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">
            {pelvicLevelMeta(filter)?.title} sessions are not listed for the stage you chose. Short
            practices are still under All.
          </p>
        </Card>
      )}
    </div>
  );
}
