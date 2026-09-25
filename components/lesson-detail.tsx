import { CompletePanel } from "@/components/complete-panel";
import { EducationNote } from "@/components/safety-note";
import { trackTitle } from "@/lib/stages";
import type { Module } from "@/lib/types";

export function LessonDetail({ lesson }: { lesson: Module }) {
  return (
    <article className="space-y-4">
      <header>
        <p className="text-sm font-bold text-accent">
          {trackTitle(lesson.track)} · {lesson.minutes} min read
        </p>
        <h1 className="mt-1 font-display text-3xl leading-tight text-balance">{lesson.title}</h1>
        <p className="mt-2 text-base leading-relaxed text-muted">{lesson.summary}</p>
      </header>
      <EducationNote />
      <div>
        <h2 className="font-display text-2xl">In general</h2>
        <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-relaxed">
          {lesson.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      {lesson.groups
        ? lesson.groups.map((group) => (
            <section key={group.heading}>
              <h2 className="font-display text-xl">{group.heading}</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))
        : null}
      <section className="rounded-2xl border border-line bg-surface p-4">
        <h2 className="font-display text-xl">A small thing to try</h2>
        <p className="mt-3 text-base leading-relaxed">{lesson.tryThis}</p>
      </section>
      <CompletePanel kind="lesson" itemId={lesson.id} />
    </article>
  );
}
