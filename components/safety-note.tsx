export function EducationNote() {
  return (
    <p className="rounded-2xl bg-accent-soft px-3 py-2.5 text-sm leading-relaxed text-ink">
      General education only. It is not a diagnosis or a treatment plan. Your care provider knows
      your situation. This app does not.
    </p>
  );
}

export function MovementSafety({
  stopIf,
  providerCue,
}: {
  stopIf: string[];
  providerCue: string;
}) {
  return (
    <aside className="rounded-2xl bg-blush-soft p-3.5" aria-label="Safety">
      <h2 className="font-display text-lg font-extrabold tracking-tight text-blush">Pause and check in</h2>
      <p className="mt-2 text-sm font-bold">Stop if…</p>
      <ul className="mt-1.5 space-y-1.5">
        {stopIf.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blush" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed">{providerCue}</p>
    </aside>
  );
}
