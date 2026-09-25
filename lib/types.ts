export const STAGE_IDS = [
  "first",
  "second",
  "third",
  "postpartum-early",
  "postpartum-later",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export const TRACK_IDS = [
  "stages",
  "labor",
  "comfort",
  "position",
  "habits",
  "nourishment",
  "readiness",
  "evidence",
  "mind",
  "partner",
  "planning",
  "newborn",
] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export const PILLAR_IDS = ["mindset", "movement", "nutrition", "partner", "birth"] as const;

export type PillarId = (typeof PILLAR_IDS)[number];

export const PELVIC_LEVEL_IDS = ["inlet", "mid", "outlet", "release", "positioning"] as const;

export type PelvicLevel = (typeof PELVIC_LEVEL_IDS)[number];

export type ModuleGroup = {
  heading: string;
  items: string[];
};

export type Module = {
  id: string;
  title: string;
  track: TrackId;
  stages: StageId[];
  minutes: number;
  summary: string;
  points: string[];
  groups?: ModuleGroup[];
  tryThis: string;
  priority: number;
};

export type SessionStep = {
  title: string;
  body: string;
};

export type Session = {
  id: string;
  title: string;
  stages: StageId[];
  minutes: number;
  focus: "Breathing" | "Gentle mobility" | "Pelvic floor awareness";
  pelvicLevel?: PelvicLevel;
  summary: string;
  pelvisNote?: string;
  equipment?: string[];
  modifications?: string[];
  steps: SessionStep[];
  stopIf: string[];
  providerCue: string;
  priority: number;
};

export type PrepDay = {
  id: string;
  week: number;
  day: number;
  pillar: PillarId;
  title: string;
  action: string;
  learnId?: string;
  moveId?: string;
};

export type CompletionKind = "lesson" | "session" | "prep";

export type Profile = {
  id: "profile";
  stage: StageId;
  disclaimerAcknowledged: true;
  acknowledgedAt: string;
  prepStartedOn?: string | null;
};

export type Completion = {
  id: string;
  itemId: string;
  kind: CompletionKind;
  completedAt: string;
  note: string;
};

export type UiSettings = {
  id: "ui";
  installHintDismissed: boolean;
  wellnessSheetDismissed: boolean;
};
