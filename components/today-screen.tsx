"use client";

import Link from "next/link";
import { modules, sessions } from "@/lib/content";
import { stageLabel, trackTitle } from "@/lib/stages";
import { nextIncomplete } from "@/lib/select";
import { completedIdSet, useDoulaState } from "@/lib/store";
import { ButtonLink, Card, PageHeader, cardLinkClass } from "@/components/ui";

export function TodayScreen() {
  const { profile, completions } = useDoulaState();
  if (!profile) return null;

  const stage = profile.stage;
  const nextLesson = nextIncomplete(modules, stage, completedIdSet(completions, "lesson"));
  const nextSession = nextIncomplete(sessions, stage, completedIdSet(completions, "session"));

  return (
    <div className="space-y-5">
      <PageHeader eyebrow={stageLabel(stage)} title="Today">
        One lesson and one movement session for the stage you picked. This is not a plan made for
        you.
      </PageHeader>

      {nextLesson ? (
        <Link href={`/learn/${nextLesson.id}`} className={cardLinkClass}>
          <p className="text-sm font-semibold text-accent">Next lesson</p>
          <h2 className="mt-2 font-display text-2xl leading-tight">{nextLesson.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{nextLesson.summary}</p>
          <p className="mt-3 text-sm text-muted">
            {nextLesson.minutes} min · {trackTitle(nextLesson.track)}
          </p>
        </Link>
      ) : (
        <Card>
          <h2 className="font-display text-2xl">Lessons for this stage are marked done</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">
            You can read them again anytime.
          </p>
          <div className="mt-4">
            <ButtonLink href="/learn" variant="secondary">
              Browse lessons
            </ButtonLink>
          </div>
        </Card>
      )}

      {nextSession ? (
        <Link href={`/move/${nextSession.id}`} className={cardLinkClass}>
          <p className="text-sm font-semibold text-accent">Next movement</p>
          <h2 className="mt-2 font-display text-2xl leading-tight">{nextSession.title}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{nextSession.summary}</p>
          <p className="mt-3 text-sm text-muted">
            About {nextSession.minutes} min · {nextSession.focus}
          </p>
        </Link>
      ) : (
        <Card>
          <h2 className="font-display text-2xl">Movement for this stage is marked done</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Repeat a session whenever you want a gentle option.
          </p>
          <div className="mt-4">
            <ButtonLink href="/move" variant="secondary">
              Browse movement
            </ButtonLink>
          </div>
        </Card>
      )}
    </div>
  );
}
