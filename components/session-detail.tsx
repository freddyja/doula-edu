import Link from "next/link";
import { CompletePanel } from "@/components/complete-panel";
import { MovementSafety } from "@/components/safety-note";
import type { Session } from "@/lib/types";

export function SessionDetail({ session }: { session: Session }) {
  return (
    <article className="space-y-6">
      <p>
        <Link href="/move" className="inline-flex min-h-11 items-center font-semibold text-accent">
          Back to Move
        </Link>
      </p>
      <header>
        <p className="text-sm font-semibold text-accent">
          {session.focus} · about {session.minutes} min
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-balance">{session.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{session.summary}</p>
      </header>
      <MovementSafety stopIf={session.stopIf} providerCue={session.providerCue} />
      <div>
        <h2 className="font-display text-2xl">Follow along</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Stop at any step that does not feel okay. You can also stop early and still mark the
          session done.
        </p>
        <ol className="mt-4 space-y-4">
          {session.steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-accent">Step {index + 1}</p>
              <h3 className="mt-1 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <CompletePanel kind="session" itemId={session.id} />
    </article>
  );
}
