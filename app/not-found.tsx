import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">That page is not here</h1>
      <p className="text-sm leading-relaxed text-muted">
        The lesson or session may have moved. You can start again from Today.
      </p>
      <ButtonLink href="/today">Go to today</ButtonLink>
    </div>
  );
}
