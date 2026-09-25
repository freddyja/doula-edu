import Link from "next/link";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

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

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-6">
      {eyebrow ? <p className="mb-2 text-sm font-semibold text-accent">{eyebrow}</p> : null}
      <h1 className="font-display text-[2rem] leading-tight text-balance text-ink sm:text-4xl">
        {title}
      </h1>
      {children ? (
        <div className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{children}</div>
      ) : null}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-line bg-surface p-5 shadow-[0_10px_30px_-22px_rgba(42,36,30,0.45)] ${className}`}
    >
      {children}
    </section>
  );
}

export const cardLinkClass =
  "block rounded-3xl border border-line bg-surface p-5 shadow-[0_10px_30px_-22px_rgba(42,36,30,0.45)] transition-colors hover:border-accent";

export function Badge({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "plain";
}) {
  const className =
    tone === "accent"
      ? "rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent"
      : "rounded-full border border-line px-3 py-1 font-semibold";
  return <span className={className}>{children}</span>;
}

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
