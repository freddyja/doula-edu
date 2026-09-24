import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-4xl">That page is not here</h1>
      <p className="text-lg leading-relaxed text-muted">
        The lesson or session may have moved. You can start again from Home.
      </p>
      <ButtonLink href="/">Go to welcome</ButtonLink>
    </div>
  );
}
