"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, LearnIcon, MoveIcon, ProgressIcon, TodayIcon } from "@/components/icons";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/today", label: "Today", icon: TodayIcon },
  { href: "/learn", label: "Learn", icon: LearnIcon },
  { href: "/move", label: "Move", icon: MoveIcon },
  { href: "/progress", label: "Progress", icon: ProgressIcon },
] as const;

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

function isCurrent(pathname: string, href: string) {
  const current = normalize(pathname);
  const target = normalize(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20 hidden h-[calc(100dvh-5rem)] w-56 shrink-0 flex-col px-4 py-6 md:flex">
      <Link href="/" className="mb-8 flex min-h-12 items-center gap-3 rounded-2xl px-2">
        <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-ink">
          D
        </span>
        <span className="font-display text-2xl leading-none">Doula</span>
      </Link>
      <nav aria-label="Primary" className="flex flex-col gap-1">
        {items.map((item) => {
          const current = isCurrent(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-base font-semibold ${
                current ? "bg-accent-soft text-accent" : "text-ink hover:bg-accent-soft"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const current = isCurrent(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[0.8125rem] font-semibold ${
                  current ? "text-accent" : "text-muted"
                }`}
              >
                <Icon className="size-6" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
