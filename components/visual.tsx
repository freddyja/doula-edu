import type { ReactNode } from "react";
import type { PelvicLevel, PillarId, StageId, TrackId } from "@/lib/types";

export const TONES = ["terra", "sage", "sky", "plum", "blush", "gold"] as const;
export type Tone = (typeof TONES)[number];

export const heroClass: Record<Exclude<Tone, "gold">, string> = {
  terra: "hero-block hero-terra",
  sage: "hero-block hero-sage",
  sky: "hero-block hero-sky",
  plum: "hero-block hero-plum",
  blush: "hero-block hero-blush",
};

export const tileClass: Record<Tone, string> = {
  terra: "bg-accent-soft text-accent",
  sage: "bg-sage-soft text-sage",
  sky: "bg-sky-soft text-sky",
  plum: "bg-plum-soft text-plum",
  blush: "bg-blush-soft text-blush",
  gold: "bg-gold-soft text-gold",
};

export const dotClass: Record<Tone, string> = {
  terra: "bg-accent",
  sage: "bg-sage",
  sky: "bg-sky",
  plum: "bg-plum",
  blush: "bg-blush",
  gold: "bg-gold",
};

const stageTone: Record<StageId, Tone> = {
  first: "blush",
  second: "sage",
  third: "terra",
  "postpartum-early": "sky",
  "postpartum-later": "gold",
};

const stageGlyph: Record<StageId, GlyphName> = {
  first: "seed",
  second: "leaf",
  third: "bloom",
  "postpartum-early": "cradle",
  "postpartum-later": "sun",
};

const trackTone: Record<TrackId, Tone> = {
  stages: "blush",
  labor: "terra",
  comfort: "sage",
  mind: "plum",
  partner: "gold",
  planning: "sky",
  newborn: "sky",
};

const trackGlyph: Record<TrackId, GlyphName> = {
  stages: "bloom",
  labor: "path",
  comfort: "breath",
  mind: "spark",
  partner: "hands",
  planning: "bag",
  newborn: "cradle",
};

const pillarToneMap: Record<PillarId, Tone> = {
  mindset: "plum",
  movement: "sage",
  nutrition: "gold",
  partner: "blush",
  birth: "terra",
};

const pillarGlyph: Record<PillarId, GlyphName> = {
  mindset: "spark",
  movement: "move",
  nutrition: "bowl",
  partner: "hands",
  birth: "path",
};

const levelTone: Record<PelvicLevel, Tone> = {
  inlet: "terra",
  mid: "gold",
  outlet: "sky",
  release: "sage",
};

const levelGlyph: Record<PelvicLevel, GlyphName> = {
  inlet: "inlet",
  mid: "mid",
  outlet: "outlet",
  release: "breath",
};

export function stageVisual(stage: StageId) {
  return { tone: stageTone[stage], glyph: stageGlyph[stage] };
}

export function trackVisual(track: TrackId) {
  return { tone: trackTone[track], glyph: trackGlyph[track] };
}

export function pillarVisual(pillar: PillarId) {
  return { tone: pillarToneMap[pillar], glyph: pillarGlyph[pillar] };
}

export function levelVisual(level: PelvicLevel) {
  return { tone: levelTone[level], glyph: levelGlyph[level] };
}

type GlyphName =
  | "seed"
  | "leaf"
  | "bloom"
  | "cradle"
  | "sun"
  | "path"
  | "breath"
  | "spark"
  | "hands"
  | "bag"
  | "bowl"
  | "move"
  | "inlet"
  | "mid"
  | "outlet"
  | "book"
  | "check";

export function Glyph({
  name,
  className = "size-6",
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphPaths[name]}
    </svg>
  );
}

const glyphPaths: Record<GlyphName, ReactNode> = {
  seed: (
    <>
      <path d="M12 20c0-6 2.2-9 6.5-10.5C16 14 14 17 12 20Z" />
      <path d="M12 20c0-6-2.2-9-6.5-10.5C8 14 10 17 12 20Z" />
      <path d="M12 20V11" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 15.5C5 9 10 5 19 5c0 9-4 14-10.5 14-1.2 0-2.3-.3-3.5-.9" />
      <path d="M9 15c2-2 4.2-3.2 7-4" />
    </>
  ),
  bloom: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 4.5c1.6 2.2 1.6 4 0 5.2-1.6-1.2-1.6-3 0-5.2Z" />
      <path d="M12 19.5c-1.6-2.2-1.6-4 0-5.2 1.6 1.2 1.6 3 0 5.2Z" />
      <path d="M4.5 12c2.2-1.6 4-1.6 5.2 0-1.2 1.6-3 1.6-5.2 0Z" />
      <path d="M19.5 12c-2.2 1.6-4 1.6-5.2 0 1.2-1.6 3-1.6 5.2 0Z" />
    </>
  ),
  cradle: (
    <>
      <path d="M4 14.5h16" />
      <path d="M6 14.5c.4 3 2.4 4.5 6 4.5s5.6-1.5 6-4.5" />
      <path d="M8 14.5V9.8a4 4 0 0 1 8 0v4.7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M17.6 6.4l-1.4 1.4M7.8 16.2 6.4 17.6" />
    </>
  ),
  path: (
    <>
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 8.5c3 1 4 3.5 4 6" />
      <path d="M13 14.5 15 17" />
    </>
  ),
  breath: (
    <>
      <path d="M4 15c2.2-4 4.2-4 6.2 0s4 4 6.2 0 4-4 3.6 0" />
      <path d="M4 9.5c2.2-3 4.2-3 6.2 0s4 3 6.2 0 4-3 3.6 0" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.4 9 19 10.5 13.4 12 12 17.5 10.6 12 5 10.5 10.6 9 12 3.5Z" />
    </>
  ),
  hands: (
    <>
      <path d="M8 13.5V7.8a1.3 1.3 0 0 1 2.6 0V12" />
      <path d="M10.6 11.2V6.6a1.3 1.3 0 0 1 2.6 0v5" />
      <path d="M13.2 11.5V8.2a1.3 1.3 0 0 1 2.6 0v6.2c0 3-1.6 5.1-4.6 5.1-2.6 0-4.2-1.4-4.7-3.4L5.2 12a1.3 1.3 0 0 1 2.4-.8l.4 2.3" />
    </>
  ),
  bag: (
    <>
      <path d="M7 9h10l-.7 10.2a1.5 1.5 0 0 1-1.5 1.3H9.2a1.5 1.5 0 0 1-1.5-1.3L7 9Z" />
      <path d="M9 9V7.8A3 3 0 0 1 12 4.8 3 3 0 0 1 15 7.8V9" />
    </>
  ),
  bowl: (
    <>
      <path d="M5 10h14c-.6 5-3.2 8-7 8s-6.4-3-7-8Z" />
      <path d="M12 18v2M9 20h6" />
      <path d="M8 7c.6-1.2 1.6-1.2 2.2 0" />
    </>
  ),
  move: (
    <>
      <circle cx="12" cy="5" r="1.5" />
      <path d="M8.2 21.2 10.4 14l-2.2-2.4c1.8-1.5 5.8-1.5 7.6 0L13.6 14l2.2 7.2" />
      <path d="M9.4 12.2 7.2 9.4M14.6 12.2 17 10" />
    </>
  ),
  inlet: (
    <>
      <path d="M4 15c2.2-5 13.8-5 16 0" />
      <path d="M7 15v3M17 15v3" />
    </>
  ),
  mid: (
    <>
      <circle cx="9" cy="12" r="3" />
      <circle cx="15" cy="12" r="3" />
    </>
  ),
  outlet: (
    <>
      <path d="M6 9c0 5 2.4 8 6 8s6-3 6-8" />
      <path d="M8 18h8" />
    </>
  ),
  book: (
    <>
      <path d="M5 6.2A2.2 2.2 0 0 1 7.2 4H19v14.2H7.2A2.2 2.2 0 0 0 5 20.4z" />
      <path d="M5 6.2V18.6" />
    </>
  ),
  check: <path d="m6.5 12.2 3.2 3.2 7.8-8" />,
};

export function HeroArt({ tone }: { tone: Exclude<Tone, "gold"> }) {
  const accent =
    tone === "sage"
      ? "#d7f3e4"
      : tone === "sky"
        ? "#d7eef8"
        : tone === "plum"
          ? "#f0e2f8"
          : tone === "blush"
            ? "#fde3ec"
            : "#f8ecd2";
  return (
    <svg viewBox="0 0 180 150" className="size-full" aria-hidden="true">
      <circle cx="132" cy="74" r="54" fill="white" fillOpacity="0.14" />
      <circle cx="156" cy="40" r="26" fill={accent} fillOpacity="0.95" />
      <circle cx="104" cy="108" r="16" fill="white" fillOpacity="0.28" />
      <circle cx="148" cy="112" r="9" fill={accent} fillOpacity="0.8" />
      <path
        d="M92 86c16-26 46-30 64-6"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
