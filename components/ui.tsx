import Link from "next/link";
import { CheckIcon, ChevronRight } from "@/components/icons";
import { Glyph, HeroArt, dotClass, heroClass, tileClass, type Tone } from "@/components/visual";

const buttonBase =
  "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 font-display text-base font-bold tracking-tight disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-accent-soft",
  quiet: "min-h-11 rounded-xl px-3 font-sans text-sm font-bold text-accent hover:bg-accent-soft",
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

export function ScreenHero({
  title,
  tone,
  kicker,
  children,
}: {
  title: string;
  tone: Tone;
  kicker?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={`${heroClass[tone]} px-4 py-4`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {kicker ? <p className="text-xs font-bold">{kicker}</p> : null}
          <h1 className="font-display text-[2.05rem] font-extrabold leading-[1.02] tracking-tight">
            {title}
          </h1>
        </div>
        <div className="h-20 w-24 shrink-0" aria-hidden="true">
          <HeroArt tone={tone} />
        </div>
      </div>
      {children ? <div className="mt-2 text-sm font-semibold leading-snug">{children}</div> : null}
    </header>
  );
}

export function SectionLabel({
  id,
  children,
  tone = "terra",
}: {
  id?: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <h2 id={id} className="flex min-h-11 items-center gap-2 text-base font-extrabold text-ink">
      <span className={`size-2.5 rounded-full ${dotClass[tone]}`} aria-hidden="true" />
      {children}
    </h2>
  );
}

export function StickyHeading({
  id,
  children,
  tone = "terra",
}: {
  id?: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <h2
      id={id}
      className="sticky top-0 z-10 -mx-3.5 flex min-h-11 items-center gap-2 bg-bg/95 px-3.5 py-1.5 text-base font-extrabold text-ink backdrop-blur"
    >
      <span className={`size-2.5 shrink-0 rounded-full ${dotClass[tone]}`} aria-hidden="true" />
      {children}
    </h2>
  );
}

const cardSurface = "rounded-2xl border border-line bg-surface p-3.5 shadow-card";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`${cardSurface} ${className}`}>{children}</section>;
}

export function SectionHero({
  id,
  title,
  tone,
  children,
}: {
  id?: string;
  title: string;
  tone: Tone;
  children?: React.ReactNode;
}) {
  return (
    <div className={`${heroClass[tone]} flex items-center gap-3 px-3.5 py-3`}>
      <div className="min-w-0 flex-1">
        <h2 id={id} className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight">
          {title}
        </h2>
        {children ? <div className="mt-1.5 text-xs font-semibold leading-snug">{children}</div> : null}
      </div>
      <div className="h-14 w-16 shrink-0" aria-hidden="true">
        <HeroArt tone={tone} />
      </div>
    </div>
  );
}

export function ListGroup({ children }: { children: React.ReactNode }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-[1.25rem] border border-line bg-surface shadow-card">
      {children}
    </ul>
  );
}

export function PosterRow({
  href,
  title,
  meta,
  tone = "terra",
  glyph,
  done = false,
}: {
  href: string;
  title: string;
  meta: string;
  tone?: Tone;
  glyph: Parameters<typeof Glyph>[0]["name"];
  done?: boolean;
}) {
  return (
    <Link href={href} className="pressable flex min-h-[4.75rem] items-center gap-3 px-2.5 py-2">
      <span
        className={`relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl ${heroClass[tone]}`}
      >
        <span className="absolute -top-3 -right-3 size-10 rounded-full bg-white/20" />
        <span className="absolute -bottom-3 -left-3 size-8 rounded-full bg-white/15" />
        <Glyph name={glyph} className="relative size-7" />
        {done ? (
          <span className="absolute right-1 bottom-1 grid size-4 place-items-center rounded-full bg-accent-ink text-ink">
            <CheckIcon className="size-3" />
          </span>
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-display text-base font-extrabold leading-tight tracking-tight text-ink">
          {title}
        </h3>
        <span className="mt-1 block text-xs font-bold text-muted">{meta}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted" />
    </Link>
  );
}

export function MediaRow({
  href,
  title,
  meta,
  tone = "terra",
  glyph,
  heading = "h3",
}: {
  href: string;
  title: string;
  meta: string;
  tone?: Tone;
  glyph: Parameters<typeof Glyph>[0]["name"];
  heading?: "h2" | "h3";
}) {
  const Title = heading;
  return (
    <Link
      href={href}
      className="pressable flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-surface px-2.5 py-2 shadow-card"
    >
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tileClass[tone]}`}>
        <Glyph name={glyph} />
      </span>
      <span className="min-w-0 flex-1">
        <Title className="font-display text-base font-extrabold leading-tight tracking-tight text-ink">
          {title}
        </Title>
        <span className="mt-0.5 line-clamp-1 block text-sm text-muted">{meta}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted" />
    </Link>
  );
}

export function Badge({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "plain";
}) {
  const className =
    tone === "accent"
      ? "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent"
      : "rounded-full border border-line px-2.5 py-0.5 text-xs font-bold";
  return <span className={className}>{children}</span>;
}

export function LoadingState() {
  return (
    <p className="text-base text-muted" role="status">
      Opening your saved place…
    </p>
  );
}

export function StorageError({ message }: { message: string }) {
  return (
    <Card>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Storage is unavailable</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
    </Card>
  );
}
