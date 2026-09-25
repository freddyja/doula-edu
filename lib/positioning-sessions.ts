import type { Session } from "./types";

const pauseForWorry =
  "You feel pain, dizziness, shortness of breath, chest tightness, a headache, bleeding, fluid leaking, or contractions that concern you.";

const pauseForStrain =
  "The movement feels like straining, bearing down, or simply not right.";

const talkWithProvider =
  "Talk with your care provider about fetal position and which movement fits you. These practices do not turn a baby, start labor, or replace an exam. Stop if you feel pain, and ask your provider before you continue.";

const wholePelvis =
  "No single movement opens the whole pelvis. This session does not open the whole pelvis, turn a baby, or tell you how the baby is lying.";

const breatheInstead =
  "If movement does not feel okay, stop and stay with easy breathing. Breathing counts as completing the session.";

export const positioningSessions: Session[] = [
  {
    id: "position-forward-rest",
    title: "Forward-leaning rest",
    stages: ["second", "third"],
    minutes: 18,
    focus: "Gentle mobility",
    pelvicLevel: "positioning",
    summary:
      "A supported lean and a side-lying finish. People sometimes rest this way when they are thinking about how a baby is lying. It is comfort and practice, not a way to move a baby.",
    pelvisNote: `${wholePelvis} A forward lean is one rest position. It is not a correction.`,
    equipment: [
      "A sturdy chair, bed, or counter you can lean on",
      "Pillows or a folded towel for your head, chest, or knees",
      "A wall nearby if you want a handhold",
    ],
    modifications: [
      breatheInstead,
      "Sit and rest your forearms on your thighs if a counter or bed is too far.",
      "Skip the lean entirely and stay side-lying if your back, wrists, or head complain.",
      "Keep your eyes open and your head higher if leaning down makes you dizzy.",
    ],
    steps: [
      {
        title: "Read the stop lines, then arrive",
        body: "Put a chair or the bed where you can reach it. Wear clothes you can move in. Read the pause lines before you start. This takes about 2 minutes. If any line already applies, do not start. Tell your provider what you noticed.",
      },
      {
        title: "Sit and breathe",
        body: "Sit with both feet supported for about 3 minutes. Unclench your jaw. Breathe in a way that feels easy. There is no deep breath to force, and no position you have to earn.",
      },
      {
        title: "Lean forward onto support",
        body: "Rest your forearms and, if it feels good, your forehead on a pillow over a bed, a counter, or the back of a chair. Let your belly hang a little if that is comfortable. Stay about 5 minutes. Come up slowly if your head feels heavy, you get dizzy, or anything hurts. Pain is a reason to stop.",
      },
      {
        title: "A small sway, only if it is easy",
        body: "Still leaning, shift your weight a little side to side for about 3 minutes. The sway can be tiny. Skip it if your back, hips, or belly complain. Sitting tall and breathing is a complete version of this step.",
      },
      {
        title: "Finish on your side",
        body: "Lie on your side for about 5 minutes with a pillow under your head and one between your knees. A pillow under the belly is optional. Let the breath settle. You are done. This rest does not tell you where the baby is.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel pain in your back, hips, belly, or head. Stop and ask your provider rather than pushing through.",
      pauseForStrain,
      "Leaning forward makes you dizzy, short of breath, or unsteady.",
    ],
    providerCue: talkWithProvider,
    priority: 84,
  },
  {
    id: "position-side-and-hips",
    title: "Side-lying and gentle hips",
    stages: ["second", "third"],
    minutes: 18,
    focus: "Gentle mobility",
    pelvicLevel: "positioning",
    summary:
      "Pillows, a small knee rest, and easy hip rocks. A comfortable side is enough. This does not aim the baby.",
    pelvisNote: `${wholePelvis} Side-lying with support is a rest. Hip rocks are a small movement, not a method for changing position.`,
    equipment: [
      "A bed or couch",
      "Pillows for your head, knees, and belly",
      "A chair if you would rather sit for the hip rocks",
    ],
    modifications: [
      breatheInstead,
      "Stay on the side that feels better. You do not have to switch.",
      "Make the knee rest smaller, or skip it and only breathe.",
      "Do the hip rocks seated, or skip them if circles bother your hips.",
    ],
    steps: [
      {
        title: "Set up on your side",
        body: "Lie on whichever side feels easier, with a pillow under your head, one between your knees, and one under the belly if you want it. Spend about 3 minutes on easy breaths. If lying down causes pain, stop.",
      },
      {
        title: "Rest the top knee forward",
        body: "Slide the top knee slightly forward onto a pillow, only as far as it moves without a pull you have to hold. Stay about 4 minutes. This is not a stretch to the end of your range. Bring the knee back if the hip, groin, or back complains.",
      },
      {
        title: "The other side, if turning feels okay",
        body: "Roll with your arms helping you, and repeat a short version on the other side for about 4 minutes: pillow between the knees, optional small knee rest. Skip this side if turning feels wrong or the first side was enough.",
      },
      {
        title: "Seated hip rocks",
        body: "Sit on a chair with your feet supported. Rock your pelvis in a small, slow circle for about 4 minutes, or simply shift your weight. Keep the movement tiny. If your belly grips or you feel pressure downward, stop the rocks and breathe.",
      },
      {
        title: "Rest again",
        body: "Return to side-lying, or stay seated, for about 3 minutes. Soften your jaw. Nothing in this session needs a final pose, and nothing in it reports the baby's position.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel pain, pelvic pressure, or a pull you would have to force.",
      pauseForStrain,
      "Turning, the knee rest, or the hip rocks make you dizzy or uneasy.",
    ],
    providerCue: talkWithProvider,
    priority: 86,
  },
  {
    id: "position-tilts-and-knees",
    title: "Pelvic tilts and hands and knees",
    stages: ["second", "third"],
    minutes: 16,
    focus: "Gentle mobility",
    pelvicLevel: "positioning",
    summary:
      "Small pelvic tilts, then hands and knees only if that position is comfortable and allowed for you. Skip the floor version and stay seated if you prefer.",
    pelvisNote: `${wholePelvis} A pelvic tilt is a small rock of the pelvis. Hands and knees is optional. Neither one decides how the baby is lying.`,
    equipment: [
      "A sturdy chair",
      "A clear spot of floor or a firm bed, only if you want hands and knees",
      "A folded towel for your knees",
      "Pillows, if you would rather lean on your forearms",
    ],
    modifications: [
      breatheInstead,
      "Do every tilt seated or standing. Hands and knees is optional.",
      "Rest on your forearms, or make fists, if your wrists complain.",
      "Skip any rock toward your heels. Sitting and breathing finishes the session.",
    ],
    steps: [
      {
        title: "A small pelvic tilt, seated",
        body: "Sit with your feet supported. Gently rock your pelvis so your low back rounds a little, then returns toward neutral, for about 3 minutes. The movement is small. Do not hold your breath, brace your belly, or chase a big arch. Stop if you feel pain.",
      },
      {
        title: "Choose the floor, or stay seated",
        body: "If hands and knees is comfortable and your provider has not told you to avoid it, come to the floor or a firm bed: hands under shoulders, knees under hips, towel under the knees. Spend about 3 minutes settling and breathing. If you would rather not kneel, stay on the chair for the rest of the session.",
      },
      {
        title: "Tilts where you are",
        body: "From hands and knees, or still seated, repeat the small pelvic rock for about 4 minutes. Exhale as you gently round, inhale as you return toward neutral. Do not push into a deep backbend. A few slow rocks count. Pain means you stop.",
      },
      {
        title: "An optional rock, then leave it",
        body: "If you are on hands and knees and it still feels easy, rock your weight slightly back toward your heels and return to neutral for about 3 minutes. This is not a deep squat and not a stretch to hold. Skip the whole step if your wrists, knees, or belly object. Seated breathing is enough.",
      },
      {
        title: "Side-lying close",
        body: "Lie on your side with pillows for about 3 minutes. Let the belly soften as you exhale. You are done. Ask your provider if you want to know how the baby is lying. This practice cannot tell you.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel pain, or you were told to avoid hands and knees.",
      pauseForStrain,
      "Kneeling makes you dizzy, shaky, or short of breath. Sit or lie down.",
    ],
    providerCue: talkWithProvider,
    priority: 88,
  },
];
