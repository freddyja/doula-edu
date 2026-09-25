"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LearnIcon, MoveIcon, ProgressIcon, TodayIcon } from "@/components/icons";

const items = [
  { href: "/today", label: "Today", icon: TodayIcon },
  { href: "/learn", label: "Learn", icon: LearnIcon },
  { href: "/move", label: "Move", icon: MoveIcon },
  { href: "/progress", label: "Progress", icon: ProgressIcon },
] as const;

export function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

function isCurrent(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="tab-bar">
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const current = isCurrent(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`pressable flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-bold leading-none ${
                  current ? "bg-accent-soft text-accent" : "text-muted"
                }`}
              >
                <Icon active={current} className="size-6" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
