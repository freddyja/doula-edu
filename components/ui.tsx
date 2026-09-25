import Link from "next/link";

const buttonBase =
  "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-accent-soft",
  quiet: "min-h-11 rounded-xl px-3 text-accent hover:bg-accent-soft",
} as const;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return <button className={`${buttonBase} ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ScreenIntro({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.9375rem] leading-snug text-balance text-muted">{children}</p>;
}

export function StickyHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="sticky top-0 z-10 -mx-4 border-b border-line/80 bg-bg/95 px-4 py-2 font-display text-xl leading-tight backdrop-blur"
    >
      {children}
    </h2>
  );
}

const cardSurface =
  "rounded-2xl border border-line bg-surface p-4 shadow-[0_8px_24px_-18px_rgba(42,36,30,0.45)]";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`${cardSurface} ${className}`}>{children}</section>;
}

export const cardLinkClass = `pressable block ${cardSurface} transition-colors hover:border-accent active:bg-accent-soft`;

export function LoadingState() {
  return (
    <p className="text-lg text-muted" role="status">
      Opening your saved place…
    </p>
  );
}

export function StorageError({ message }: { message: string }) {
  return (
    <Card>
      <h1 className="font-display text-3xl">Storage is unavailable</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{message}</p>
    </Card>
  );
}
