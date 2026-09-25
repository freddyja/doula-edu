import { addDays, daysBetween } from "./dates.ts";
import type { PillarId, PrepDay } from "./types";

/** One card a day. Movement and mindset repeat so all five pillars appear each week. */
export const PREP_RHYTHM: readonly PillarId[] = [
  "mindset",
  "movement",
  "nutrition",
  "partner",
  "birth",
  "movement",
  "mindset",
];

export type PrepWeek = {
  week: number;
  title: string;
  blurb: string;
};

type CardInput = {
  title: string;
  action: string;
  learnId?: string;
  moveId?: string;
};

const RAW: { title: string; blurb: string; cards: CardInput[] }[] = [
  {
    title: "Settle in",
    blurb: "A number to call, a breath, and one named task.",
    cards: [
      {
        title: "A sentence of support",
        action:
          "Write one sentence about the kind of support you want. It can be practical. It does not have to describe a perfect birth.",
      },
      {
        title: "Six easy breaths",
        action:
          "Sit with both feet supported. Take 6 easy breaths and unclench your jaw. Stop if you feel dizzy or short of breath.",
      },
      {
        title: "Water where you can see it",
        action:
          "Put a water bottle where you will notice it, and sip when you do. There is no target to hit. This is a reminder, not a fluid prescription.",
        learnId: "rest-water-movement",
      },
      {
        title: "One named task",
        action:
          "Ask a support person — a partner, friend, or family member — to own one task this week, such as a meal, a pharmacy call, or a ride.",
      },
      {
        title: "The number to call",
        action:
          "Save the daytime and after-hours numbers for your care provider somewhere you can find half-asleep. If you do not have them yet, that is the question for the next visit.",
      },
      {
        title: "Shoulders, slowly",
        action:
          "Roll both shoulders slowly up, back, and down, about 5 times. Skip any motion that pinches. Sit down if you were standing and feel unsteady.",
      },
      {
        title: "One worry, one question",
        action:
          "Name one worry in a sentence. Turn it into one question you could ask a person at your next visit.",
      },
    ],
  },
  {
    title: "Notice",
    blurb: "What your days actually feel like, without fixing all of it.",
    cards: [
      {
        title: "Feet on the floor",
        action:
          "For one minute, notice your feet on the floor. When your mind wanders, come back to the feet. That is the whole practice.",
      },
      {
        title: "A one-minute sway",
        action:
          "Stand beside a chair and sway side to side for about a minute. Take a few easy breaths. Sit if you feel unsteady or strained.",
      },
      {
        title: "What sat well",
        action:
          "Notice one food that sat well today and one that did not. You do not have to rebuild the way you eat. Mention a pattern that worries you to your provider.",
      },
      {
        title: "Say what you like",
        action:
          "Tell a support person one kind of help you like — quiet, a hand on the back, or space — and agree that \"stop\" means stop.",
      },
      {
        title: "Three labor words",
        action:
          "Write the words early, active, and pushing. Add one question you have about any of them. The lesson can wait until you want it.",
        learnId: "how-labor-unfolds",
      },
      {
        title: "Side-lying for a minute",
        action:
          "Lie on your side with a pillow between your knees and take 4 easy breaths. Roll to the other side only if turning feels okay.",
      },
      {
        title: "One thing you already did",
        action:
          "Name one small rest you already took this week. The point is to notice it, not to add another task.",
      },
    ],
  },
  {
    title: "Breath",
    blurb: "A slower exhale, practiced while things are still calm.",
    cards: [
      {
        title: "A slightly longer exhale",
        action:
          "Breathe in through your nose and out a little slower, about 5 times, as if you are cooling tea. If you feel lightheaded, return to your usual breath.",
      },
      {
        title: "A small spinal move",
        action:
          "On hands and knees, or leaning your forearms on a table, gently round and soften your back for 4 breaths. Skip this if you were told to avoid the position or it feels wrong.",
      },
      {
        title: "A snack within reach",
        action:
          "Keep a small snack you already tolerate near the part of the day you usually feel empty. This is only a reminder to make that snack easy to reach.",
      },
      {
        title: "Breathe at the same pace",
        action:
          "With a support person, take 6 slow breaths together. They follow your pace. Either of you can stop.",
      },
      {
        title: "How you will reach them",
        action:
          "Write how you will reach your provider if you think labor has started, in the words they gave you. If you have not been told yet, write that question down.",
      },
      {
        title: "Lean and sway",
        action:
          "Rest your forearms on a counter or the back of a chair and sway for one minute. A birth ball is optional. Stop if you feel strain or dizziness.",
      },
      {
        title: "One breath after a hard moment",
        action:
          "The next time something feels like a lot, put a hand on your chest and take one easy breath. Then carry on. One breath counts.",
      },
    ],
  },
  {
    title: "Sharing the work",
    blurb: "Specific help, agreed out loud.",
    cards: [
      {
        title: "Two things to put down",
        action:
          "List two tasks that someone else can hold this week. Leave them off your list on purpose.",
      },
      {
        title: "A short flat walk",
        action:
          "If your provider has not limited activity, walk on flat ground at a pace where you can talk. A few minutes is enough. Turn around if you feel pain, heaviness, bleeding, or you are simply done.",
      },
      {
        title: "A question before a new remedy",
        action:
          "If supplements, teas, or nausea remedies are confusing, write one question for your provider. Wait for their answer before adding something new.",
        learnId: "discuss-before-you-add",
      },
      {
        title: "A standing job",
        action:
          "A support person picks one job they will keep doing and writes it where you both can see it. A standing job is easier to trust than a vague offer.",
      },
      {
        title: "Who is in the room",
        action:
          "Write who you want with you in labor, and that the staff can still ask people to step out. You can change the list.",
      },
      {
        title: "Small hip circles",
        action:
          "Sit on a chair, or on a birth ball if it feels steady with a hand on a wall. Circle your hips slowly and small, about 30 seconds each way. Stop if it strains.",
      },
      {
        title: "One firm hope, one loose one",
        action:
          "Say one preference that matters to you, and one you can hold loosely if the day changes. Both can be true.",
      },
    ],
  },
  {
    title: "Labor, plainly",
    blurb: "Words people use, and the questions that belong to your provider.",
    cards: [
      {
        title: "Labor is not a test",
        action:
          "Remind yourself, out loud if you want, that labor is not a performance. You can ask for an explanation, for company, or for pain relief.",
      },
      {
        title: "Three positions, briefly",
        action:
          "Spend about 30 seconds each in a standing sway, a forward lean, and side-lying. Note which you liked. Skip any position that feels wrong.",
      },
      {
        title: "Something that keeps",
        action:
          "Choose one snack you already like that would survive in a bag. You can change it later. This is not a required labor menu.",
      },
      {
        title: "One job during a contraction",
        action:
          "Agree on one job for a support person during a contraction: quiet company, a steady hand on the low back, or breathing with you. Practice the word stop.",
      },
      {
        title: "When to call, in your words",
        action:
          "Write what you have been told about when to call or go in. If you do not know, the lesson is a prompt for that question, not an answer.",
        learnId: "early-labor-at-home",
      },
      {
        title: "Soften, do not bear down",
        action:
          "Rest on your side for 8 easy breaths. Let the belly soften as you exhale. Do not hold your breath or practice pushing.",
      },
      {
        title: "Fear as a question",
        action:
          "If fear shows up, write it as a question for your provider or another trusted person. A feeling is not a verdict about your body.",
      },
    ],
  },
  {
    title: "Comfort",
    blurb: "A short menu of things to try, and things to skip.",
    cards: [
      {
        title: "A word you can drop",
        action:
          "Choose a word or an image that feels steady. You can change it or abandon it. It is a tool, not a requirement for labor.",
      },
      {
        title: "Warmth, if it is allowed",
        action:
          "If your provider has said showers or warmth are okay, try a warm shower or a warm pack on your back for two minutes. Stop if you feel dizzy. Skip this if you were told to avoid heat or baths.",
      },
      {
        title: "Food for the bag and the first day",
        action:
          "Name one easy food for a bag and one for the first day home. Simple counts. Ask your provider what the birth place usually offers before you buy a lot.",
      },
      {
        title: "A sentence for the staff",
        action:
          "Practice one sentence a support person can use: \"We have a question about ___.\" Fill in the blank with something you actually want to know.",
      },
      {
        title: "Three comfort ideas",
        action:
          "List three comfort ideas you might want nearby: movement, breath, water, sound, or company. Cross off one you do not want people to push.",
        learnId: "a-coping-menu",
      },
      {
        title: "A quiet sigh",
        action:
          "Take 5 breaths with a quiet sigh on the exhale and a soft jaw. Do not squeeze the pelvic floor. Stop if you feel lightheaded.",
        moveId: "release-soften",
      },
      {
        title: "Asking without an apology",
        action:
          "Say once, out loud: \"I want to talk about pain relief.\" You can ask even if you are unsure what you will choose. Your provider explains the options.",
      },
    ],
  },
  {
    title: "Details",
    blurb: "The bag, the route, and the list you will actually use.",
    cards: [
      {
        title: "A shorter list",
        action:
          "Cross three things off a packing idea that you can borrow, buy later, or skip. A short list is easier to use than a perfect one.",
      },
      {
        title: "Read the stop lines first",
        action:
          "Open one Move session and read the stop-if lines before you do anything else. If a line already applies, skip the session and tell your provider what you noticed.",
      },
      {
        title: "Ignore a diet rule",
        action:
          "Set out water and a snack you will actually want. If a diet rule from social media is making you anxious, leave it. Food questions that worry you belong with your provider.",
      },
      {
        title: "Bag, charger, route",
        action:
          "Ask a support person to locate the bag, a phone charger, and the route or ride plan. Those three jobs do not all have to sit with you.",
      },
      {
        title: "Start from what you own",
        action:
          "Open the packing list and mark what you already have. Add anything your provider or the birth place specifically asked you to bring.",
        learnId: "packing-list",
      },
      {
        title: "Repeat a favorite position",
        action:
          "Spend one minute in a position that felt okay on an earlier day: sway, lean, or side-lying. Skip anything that felt wrong then or feels wrong now.",
      },
      {
        title: "Hope, and a handoff",
        action:
          "Write one thing you hope for, and one decision you will let the people caring for you make on the day. You can still ask questions about it.",
      },
    ],
  },
  {
    title: "A small close",
    blurb: "Rehearse once, then let the eight weeks be enough.",
    cards: [
      {
        title: "A way to ask",
        action:
          "You do not need to feel ready. Write the question you most want answered before labor, and who you will ask.",
      },
      {
        title: "A tiny rehearsal",
        action:
          "Take 4 breaths while swaying, 4 while leaning forward, and 4 while side-lying. Tell someone which you wanted first. Stop early if anything feels wrong.",
      },
      {
        title: "Who offers food and water",
        action:
          "Name who will offer you water and food in labor and at home. If nobody is named, ask a person, or ask what the birth place usually provides. This is logistics, not a nutrition plan.",
      },
      {
        title: "Three things to review",
        action:
          "With your support person, review the stop word, the after-hours number, and one chore for the first day home.",
      },
      {
        title: "Three questions, not thirty",
        action:
          "Open the birth-plan questions and mark three you will actually ask. Leave the rest for another visit if you want them.",
        learnId: "birth-plan-questions",
      },
      {
        title: "Stop while it is easy",
        action:
          "Take 5 easy breaths with a soft exhale. Then stop on purpose, while it still feels easy. Rest is part of the practice.",
      },
      {
        title: "A thank-you, then done",
        action:
          "Write one thank-you to yourself or to the person helping you. The daily path can end here. Lessons and movement stay available.",
      },
    ],
  },
];

function buildPrep(): { days: PrepDay[]; weeks: PrepWeek[] } {
  const days: PrepDay[] = [];
  const weeks: PrepWeek[] = [];

  RAW.forEach((week, weekIndex) => {
    const weekNumber = weekIndex + 1;
    if (week.cards.length !== PREP_RHYTHM.length) {
      throw new Error(`Prep week ${weekNumber} should have ${PREP_RHYTHM.length} cards.`);
    }
    weeks.push({ week: weekNumber, title: week.title, blurb: week.blurb });
    week.cards.forEach((card, dayIndex) => {
      const dayNumber = dayIndex + 1;
      days.push({
        id: `w${weekNumber}d${dayNumber}`,
        week: weekNumber,
        day: dayNumber,
        pillar: PREP_RHYTHM[dayIndex] ?? "mindset",
        title: card.title,
        action: card.action,
        learnId: card.learnId,
        moveId: card.moveId,
      });
    });
  });

  return { days, weeks };
}

const built = buildPrep();

export const prepDays: PrepDay[] = built.days;
export const prepWeeks: PrepWeek[] = built.weeks;
export const PREP_DAY_COUNT = prepDays.length;

const prepById = new Map(prepDays.map((day) => [day.id, day]));

export function getPrepDay(id: string): PrepDay | null {
  return prepById.get(id) ?? null;
}

export type PrepCursor = number | "before" | "after" | "invalid";

export function todayPrepIndex(startedOn: string, todayKey: string): PrepCursor {
  const diff = daysBetween(startedOn, todayKey);
  if (diff === null) return "invalid";
  if (diff < 0) return "before";
  if (diff >= prepDays.length) return "after";
  return diff;
}

export function prepDateForIndex(startedOn: string, index: number): string | null {
  return addDays(startedOn, index);
}

export function prepDaysDone(completedIds: ReadonlySet<string>): number {
  let count = 0;
  for (const day of prepDays) {
    if (completedIds.has(day.id)) count += 1;
  }
  return count;
}

/**
 * Consecutive marked prep days ending today, or ending yesterday when today
 * is still open. After the path has been over for more than a day, the streak is 0.
 */
export function prepStreak(
  startedOn: string,
  completedIds: ReadonlySet<string>,
  todayKey: string,
): number {
  const todayIndex = daysBetween(startedOn, todayKey);
  if (todayIndex === null || todayIndex < 0 || prepDays.length === 0) return 0;

  let index: number;
  if (todayIndex >= prepDays.length) {
    const daysAfterLast = todayIndex - (prepDays.length - 1);
    if (daysAfterLast > 1) return 0;
    index = prepDays.length - 1;
  } else if (completedIds.has(prepDays[todayIndex].id)) {
    index = todayIndex;
  } else {
    index = todayIndex - 1;
  }

  let streak = 0;
  for (; index >= 0; index -= 1) {
    if (!completedIds.has(prepDays[index].id)) break;
    streak += 1;
  }
  return streak;
}

export function prepDayIsOpen(dayIndex: number, cursor: PrepCursor): boolean {
  if (cursor === "after") return true;
  if (typeof cursor === "number") return dayIndex <= cursor;
  return false;
}
