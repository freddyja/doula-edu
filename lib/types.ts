export const STAGE_IDS = [
  "first",
  "second",
  "third",
  "postpartum-early",
  "postpartum-later",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export const TRACK_IDS = ["stages", "comfort", "partner", "newborn"] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export type Module = {
  id: string;
  title: string;
  track: TrackId;
  stages: StageId[];
  minutes: number;
  summary: string;
  points: string[];
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
  summary: string;
  steps: SessionStep[];
  stopIf: string[];
  providerCue: string;
  priority: number;
};

export type CompletionKind = "lesson" | "session";

export type Profile = {
  id: "profile";
  stage: StageId;
  disclaimerAcknowledged: true;
  acknowledgedAt: string;
};

export type Completion = {
  id: string;
  itemId: string;
  kind: CompletionKind;
  completedAt: string;
  note: string;
};
