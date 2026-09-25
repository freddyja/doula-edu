"use client";

import { InstallHint } from "@/components/install-hint";
import { PrepTodayCard } from "@/components/prep-today-card";
import { ButtonLink, Card, MediaRow, ScreenHero, SectionLabel } from "@/components/ui";
import { levelVisual, trackVisual } from "@/components/visual";
import { modules, sessions } from "@/lib/content";
import { pelvicLevelMeta, trackTitle } from "@/lib/stages";
import { nextIncomplete } from "@/lib/select";
import { completedIdSet, useDoulaState } from "@/lib/store";

export function TodayScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const stage = profile.stage;
  const nextLesson = nextIncomplete(modules, stage, completedIdSet(completions, "lesson"));
  const nextSession = nextIncomplete(sessions, stage, completedIdSet(completions, "session"));
  const lessonVisual = nextLesson ? trackVisual(nextLesson.track) : null;

  return (
    <div className="space-y-3">
      <ScreenHero tone="terra" title="Today" kicker="On this device">
        Prep, then the next lesson and session. Not a plan made for you.
      </ScreenHero>
      <PrepTodayCard />

      <section className="space-y-2" aria-labelledby="up-next">
        <SectionLabel id="up-next" tone="sky">
          Up next
        </SectionLabel>
        {nextLesson && lessonVisual ? (
          <MediaRow
            href={`/learn/${nextLesson.id}`}
            title={nextLesson.title}
            meta={`${nextLesson.minutes} min · ${trackTitle(nextLesson.track)} · ${nextLesson.summary}`}
            tone={lessonVisual.tone}
            glyph={lessonVisual.glyph}
          />
        ) : (
          <Card>
            <h3 className="font-display text-lg font-extrabold tracking-tight">
              Lessons for this stage are marked done
            </h3>
            <p className="mt-1 text-sm leading-snug text-muted">You can read them again anytime.</p>
            <div className="mt-3">
              <ButtonLink href="/learn" variant="secondary" className="w-full">
                Browse lessons
              </ButtonLink>
            </div>
          </Card>
        )}
        {nextSession ? (
          <MediaRow
            href={`/move/${nextSession.id}`}
            title={nextSession.title}
            meta={`About ${nextSession.minutes} min${
              nextSession.pelvicLevel
                ? ` · ${pelvicLevelMeta(nextSession.pelvicLevel)?.title}`
                : ""
            } · ${nextSession.focus}`}
            tone={nextSession.pelvicLevel ? levelVisual(nextSession.pelvicLevel).tone : "plum"}
            glyph={nextSession.pelvicLevel ? levelVisual(nextSession.pelvicLevel).glyph : "breath"}
          />
        ) : (
          <Card>
            <h3 className="font-display text-lg font-extrabold tracking-tight">
              Movement for this stage is marked done
            </h3>
            <p className="mt-1 text-sm leading-snug text-muted">
              Repeat a session whenever you want a gentle option.
            </p>
            <div className="mt-3">
              <ButtonLink href="/move" variant="secondary" className="w-full">
                Browse movement
              </ButtonLink>
            </div>
          </Card>
        )}
      </section>

      <InstallHint />
    </div>
  );
}
