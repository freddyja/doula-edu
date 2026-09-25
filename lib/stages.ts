import type { PelvicLevel, PillarId, StageId, TrackId } from "@/lib/types";

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
    id: "labor",
    title: "Labor",
    description:
      "How labor is often described, from early signs through the first hour. Your provider's instructions come first.",
  },
  {
    id: "comfort",
    title: "Comfort and breath",
    description:
      "Breath, position, and other comfort ideas. Stop anything that feels worse.",
  },
  {
    id: "mind",
    title: "Mental prep",
    description: "Worry, attention, and mood. Feelings are not a grade, and this is not counseling.",
  },
  {
    id: "partner",
    title: "Partner support",
    description: "Concrete ways a support person can help, without taking over.",
  },
  {
    id: "planning",
    title: "Packing and questions",
    description:
      "A packing list and questions to discuss with your provider. Not a clinical birth plan.",
  },
  {
    id: "newborn",
    title: "Newborn basics",
    description:
      "Feeding, diapers, and sleep setup to talk through with your baby's care provider.",
  },
];

export const PILLARS: { id: PillarId; label: string; blurb: string }[] = [
  {
    id: "mindset",
    label: "Mindset",
    blurb: "A small attention practice. It is not a test of how calm you are.",
  },
  {
    id: "movement",
    label: "Movement",
    blurb: "A short, gentle option. Stop if it feels wrong.",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    blurb: "A wellness tip only. Not a meal plan, a diet, or medical nutrition advice.",
  },
  {
    id: "partner",
    label: "Partner",
    blurb: "One concrete way a support person can share the load.",
  },
  {
    id: "birth",
    label: "Birth education",
    blurb: "A question or idea to take to your care provider.",
  },
];

export const PELVIC_LEVELS: { id: PelvicLevel; title: string; description: string }[] = [
  {
    id: "inlet",
    title: "Inlet · top",
    description:
      "Positions some people practice around the top of the pelvis. Often a little wider at the knees, with room to lean forward.",
  },
  {
    id: "mid",
    title: "Mid · middle",
    description:
      "Side-to-side and uneven positions some people practice for the middle of the pelvis.",
  },
  {
    id: "outlet",
    title: "Outlet · bottom",
    description:
      "Smaller, supported positions some people practice for the bottom of the pelvis. These sessions do not include pushing practice.",
  },
  {
    id: "release",
    title: "Release",
    description:
      "Breath and mobility for letting the pelvic floor soften. A kegel routine is not the goal.",
  },
];

export function stageLabel(stage: StageId): string {
  return STAGES.find((item) => item.id === stage)?.label ?? stage;
}

export function trackTitle(track: TrackId): string {
  return TRACKS.find((item) => item.id === track)?.title ?? track;
}

export function pillarMeta(pillar: PillarId) {
  return PILLARS.find((item) => item.id === pillar);
}

export function pelvicLevelMeta(level: PelvicLevel) {
  return PELVIC_LEVELS.find((item) => item.id === level);
}
