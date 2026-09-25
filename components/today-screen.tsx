"use client";

import Link from "next/link";
import { InstallHint } from "@/components/install-hint";
import { PrepTodayCard } from "@/components/prep-today-card";
import { modules, sessions } from "@/lib/content";
import { pelvicLevelMeta, trackTitle } from "@/lib/stages";
import { nextIncomplete } from "@/lib/select";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { ButtonLink, Card, ScreenIntro, cardLinkClass } from "@/components/ui";

export function TodayScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const stage = profile.stage;
  const nextLesson = nextIncomplete(modules, stage, completedIdSet(completions, "lesson"));
  const nextSession = nextIncomplete(sessions, stage, completedIdSet(completions, "session"));

  return (
    <div className="space-y-3">
      <ScreenIntro>
        Today&apos;s prep card, then the next lesson and movement session for this stage. This is
        not a plan made for you.
      </ScreenIntro>
      <InstallHint />
      <PrepTodayCard />

      {nextLesson ? (
        <Link href={`/learn/${nextLesson.id}`} className={cardLinkClass}>
          <p className="text-sm font-bold text-accent">Next lesson</p>
          <h2 className="mt-1 font-display text-xl leading-tight">{nextLesson.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{nextLesson.summary}</p>
          <p className="mt-2 text-sm text-muted">
            {nextLesson.minutes} min · {trackTitle(nextLesson.track)}
          </p>
        </Link>
      ) : (
        <Card>
          <h2 className="font-display text-xl">Lessons for this stage are marked done</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            You can read them again anytime.
          </p>
          <div className="mt-3">
            <ButtonLink href="/learn" variant="secondary">
              Browse lessons
            </ButtonLink>
          </div>
        </Card>
      )}

      {nextSession ? (
        <Link href={`/move/${nextSession.id}`} className={cardLinkClass}>
          <p className="text-sm font-bold text-accent">Next movement</p>
          <h2 className="mt-1 font-display text-xl leading-tight">{nextSession.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{nextSession.summary}</p>
          <p className="mt-2 text-sm text-muted">
            About {nextSession.minutes} min
            {nextSession.pelvicLevel
              ? ` · ${pelvicLevelMeta(nextSession.pelvicLevel)?.title}`
              : ""}
            {" · "}
            {nextSession.focus}
          </p>
        </Link>
      ) : (
        <Card>
          <h2 className="font-display text-xl">Movement for this stage is marked done</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Repeat a session whenever you want a gentle option.
          </p>
          <div className="mt-3">
            <ButtonLink href="/move" variant="secondary">
              Browse movement
            </ButtonLink>
          </div>
        </Card>
      )}
    </div>
  );
}
