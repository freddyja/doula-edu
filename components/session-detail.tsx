import { CompletePanel } from "@/components/complete-panel";
import { MovementSafety } from "@/components/safety-note";
import { Badge } from "@/components/ui";
import { HeroArt } from "@/components/visual";
import { pelvicLevelMeta } from "@/lib/stages";
import type { Session } from "@/lib/types";

export function SessionDetail({ session }: { session: Session }) {
  return (
    <article className="space-y-4">
      <header className="hero-block hero-sage px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 text-xs font-bold">
              {session.pelvicLevel ? <Badge>{pelvicLevelMeta(session.pelvicLevel)?.title}</Badge> : null}
              <span className="rounded-full bg-accent-ink px-2.5 py-0.5 text-sage">{session.focus}</span>
              <span>About {session.minutes} min</span>
            </p>
            <h1 className="mt-2 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight">
              {session.title}
            </h1>
          </div>
          <div className="h-16 w-20 shrink-0" aria-hidden="true">
            <HeroArt tone="sage" />
          </div>
        </div>
      </header>
      <p className="text-sm leading-relaxed text-muted">{session.summary}</p>
      {session.pelvisNote ? <p className="text-sm leading-relaxed">{session.pelvisNote}</p> : null}
      <MovementSafety stopIf={session.stopIf} providerCue={session.providerCue} />
      {session.equipment && session.equipment.length > 0 ? (
        <section className="rounded-2xl border border-line bg-surface p-3.5 shadow-card">
          <h2 className="font-display text-lg font-extrabold tracking-tight">At home</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            A chair or a bed is enough. Other items are optional.
          </p>
          <ul className="mt-2 space-y-1.5">
            {session.equipment.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {session.modifications && session.modifications.length > 0 ? (
        <section className="rounded-2xl border border-line bg-surface p-3.5 shadow-card">
          <h2 className="font-display text-lg font-extrabold tracking-tight">Ways to make it smaller</h2>
          <ul className="mt-2 space-y-1.5">
            {session.modifications.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div>
        <h2 className="font-display text-lg font-extrabold tracking-tight">Follow along</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Follow the written steps at your own pace. There is no video. Stop at any step that does
          not feel okay. You can also stop early and still mark the session done.
        </p>
        <ol className="mt-3 space-y-2">
          {session.steps.map((step, index) => (
            <li key={step.title} className="flex gap-3 rounded-2xl border border-line bg-surface p-3 shadow-card">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-sm font-extrabold text-accent-ink">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <CompletePanel kind="session" itemId={session.id} />
    </article>
  );
}
