export function EducationNote() {
  return (
    <p className="rounded-2xl bg-accent-soft px-4 py-3 text-base leading-relaxed text-ink">
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
    <aside className="rounded-3xl border border-accent/25 bg-accent-soft p-5" aria-label="Safety">
      <h2 className="font-display text-2xl">Pause and check in</h2>
      <p className="mt-3 font-semibold">Stop if…</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed">
        {stopIf.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-base leading-relaxed">{providerCue}</p>
    </aside>
  );
}
