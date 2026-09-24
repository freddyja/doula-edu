import type { StageId, TrackId } from "@/lib/types";

export const STAGES: { id: StageId; label: string; blurb: string }[] = [
  {
    id: "first",
    label: "1st trimester",
    blurb: "Early pregnancy",
  },
  {
    id: "second",
    label: "2nd trimester",
    blurb: "The middle months",
  },
  {
    id: "third",
    label: "3rd trimester",
    blurb: "Later pregnancy",
  },
  {
    id: "postpartum-early",
    label: "Postpartum, early",
    blurb: "The first weeks after birth",
  },
  {
    id: "postpartum-later",
    label: "Postpartum, later",
    blurb: "When days start to widen",
  },
];

export const TRACKS: { id: TrackId; title: string; description: string }[] = [
  {
    id: "stages",
    title: "Stages",
    description:
      "Plain-language notes on what this part of pregnancy or postpartum is often like.",
  },
  {
    id: "comfort",
    title: "Comfort measures",
    description:
      "Simple comfort ideas people try at home or in labor. Stop anything that feels worse.",
  },
  {
    id: "partner",
    title: "Partner support",
    description: "Concrete ways a support person can help, without taking over.",
  },
  {
    id: "newborn",
    title: "Newborn basics",
    description:
      "Feeding, diapers, and sleep setup to talk through with your baby's care provider.",
  },
];

export function stageLabel(stage: StageId): string {
  return STAGES.find((item) => item.id === stage)?.label ?? stage;
}

export function trackTitle(track: TrackId): string {
  return TRACKS.find((item) => item.id === track)?.title ?? track;
}
