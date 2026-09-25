import { CompletePanel } from "@/components/complete-panel";
import { EducationNote } from "@/components/safety-note";
import { trackTitle } from "@/lib/stages";
import { trackVisual, tileClass, Glyph, HeroArt } from "@/components/visual";
import type { Module } from "@/lib/types";

export function LessonDetail({ lesson }: { lesson: Module }) {
  const visual = trackVisual(lesson.track);
  return (
    <article className="space-y-4">
      <header className="hero-block hero-sky px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold">
              {trackTitle(lesson.track)} · {lesson.minutes} min read
            </p>
            <h1 className="mt-1 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight">
              {lesson.title}
            </h1>
          </div>
          <div className="h-16 w-20 shrink-0" aria-hidden="true">
            <HeroArt tone="sky" />
          </div>
        </div>
      </header>
      <p className="text-sm leading-relaxed text-muted">{lesson.summary}</p>
      <EducationNote />
      <div>
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <span className={`grid size-8 place-items-center rounded-xl ${tileClass[visual.tone]}`}>
            <Glyph name={visual.glyph} className="size-4" />
          </span>
          In general
        </h2>
        <ul className="mt-3 space-y-2">
          {lesson.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      {lesson.groups
        ? lesson.groups.map((group) => (
            <section key={group.heading} className="rounded-2xl border border-line bg-surface p-3.5 shadow-card">
              <h2 className="font-display text-lg font-extrabold tracking-tight">{group.heading}</h2>
              <ul className="mt-2 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))
        : null}
      <section className="rounded-2xl bg-gold-soft p-3.5">
        <h2 className="font-display text-lg font-extrabold tracking-tight text-gold">A small thing to try</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">{lesson.tryThis}</p>
      </section>
      <CompletePanel kind="lesson" itemId={lesson.id} />
    </article>
  );
}
