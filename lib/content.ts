import type { Module, Session } from "./types";

const pauseForWorry =
  "You feel pain, dizziness, shortness of breath, chest tightness, a headache, bleeding, fluid leaking, or contractions that concern you.";

const pauseForStrain =
  "The movement feels like straining, bearing down, or simply not right.";

const talkWithProvider =
  "Talk with your care provider about which movement fits you right now, and anytime something about your body worries you. This session is general education, not a plan for your pregnancy or recovery.";

export const modules: Module[] = [
  {
    id: "early-weeks",
    title: "The early weeks, in plain language",
    track: "stages",
    stages: ["first"],
    minutes: 4,
    summary:
      "What many people notice at the start of pregnancy, and a few ordinary ways to get through a day.",
    points: [
      "Tiredness, nausea, tender breasts, and a shorter fuse are common topics in early pregnancy. How strong they are varies a lot from person to person, and from week to week.",
      "Small, frequent snacks and a rest when you can take one are reasonable experiments. If smells, motion, or an empty stomach make nausea worse, notice that and plan around it.",
      "Keep the prenatal visits you have been offered. Write questions down between appointments so you do not have to remember them in the room.",
      "Movement can stay gentle. If something was already part of your life, ask your provider whether to keep it, change it, or pause it.",
    ],
    tryThis:
      "Tonight, put two questions for your next visit in a note on your phone. One can be about symptoms. One can be about daily activity.",
    priority: 10,
  },
  {
    id: "middle-months",
    title: "A rhythm for the middle months",
    track: "stages",
    stages: ["second"],
    minutes: 4,
    summary:
      "Energy often shifts in the second trimester. Comfort, sleep, and practice can shift with it.",
    points: [
      "Some people feel steadier in these months. It is still fine to pace the day and to say no to extra plans.",
      "Clothes, a pillow between the knees, and side-lying rest are simple comfort changes. Heartburn, backache, and nasal stuffiness are common things to mention at a visit if they bother you.",
      "This is a useful time to learn a slow breath and one or two positions you might want later in labor. Practice when you are calm, not only when you are uncomfortable.",
      "If you want a support person at the birth, talk about what help would actually look like: a hand on the back, quiet, or someone else to speak with the staff.",
    ],
    tryThis:
      "Practice six slow breaths in the position you sleep in. Notice whether a longer exhale feels calming or makes you lightheaded.",
    priority: 10,
  },
  {
    id: "later-pregnancy",
    title: "Getting ready for labor and the first days",
    track: "stages",
    stages: ["third"],
    minutes: 5,
    summary:
      "Practical preparation: a small bag, a few questions, and comfort skills you have already tried.",
    points: [
      "A small bag can hold lip balm, a warm layer, a snack you like, a phone charger, and anything that helps you feel like yourself. Leave room to add things your provider suggests.",
      "Ask how to reach the practice after hours, who can be with you in labor, and how pain relief is usually offered where you plan to give birth. Write the answers in your own words.",
      "Changing position, slow breathing, and a support person's steady hands are comfort skills. They sit alongside medical care. They do not replace it.",
      "The first days with a baby are often a blur of feeding, diapers, and short sleep. Lining up one person for a meal or a household task is real preparation.",
    ],
    tryThis:
      "Make a list of three comfort items and one person you could text when labor starts or when you get home.",
    priority: 10,
  },
  {
    id: "early-postpartum",
    title: "The first weeks after birth",
    track: "stages",
    stages: ["postpartum-early"],
    minutes: 5,
    summary:
      "Rest, food, help, and a place to put questions. Recovery does not follow a single calendar.",
    points: [
      "Sleep in short stretches is common. A protected nap, a handed-off meal, or someone else holding the baby while you shower can matter more than a perfect routine.",
      "Bleeding, soreness, sweating, and strong emotions are things to review with your midwife, obstetric provider, or the clinician following you. You do not have to decide alone whether a change is expected.",
      "Feeding — nursing, pumping, formula, or a mix — is a skill with support available. Pain with feeding, worry about intake, or a baby who seems hard to wake for feeds are reasons to ask for help promptly.",
      "Visitors can wait. It is reasonable for a support person to manage the door and the group chat.",
    ],
    tryThis:
      "Write down the after-hours number for your own provider and for the baby's provider. Put both somewhere you can find half-asleep.",
    priority: 10,
  },
  {
    id: "later-postpartum",
    title: "Later postpartum, at your own pace",
    track: "stages",
    stages: ["postpartum-later"],
    minutes: 4,
    summary:
      "Days start to open up differently for everyone. Gentle movement and continued help both belong here.",
    points: [
      "There is no single week when everyone feels like themselves. Work, sleep, feeding, and healing all move on different clocks.",
      "Walking, easy breathing, and pelvic floor awareness are general options. Timing belongs in a conversation with your provider, especially if you are still bleeding, in pain, or were told to limit activity.",
      "Leaking, a feeling of heaviness in the pelvis, pain with sex, or mood that feels heavy are worth naming at a visit. This app cannot tell you what they mean.",
      "Asking for help can continue past the first weeks. Meals, childcare for an older child, and a ride to an appointment still count.",
    ],
    tryThis:
      "Pick one daily task to hand off this week, and one question to take to your next visit.",
    priority: 10,
  },
  {
    id: "questions-for-visits",
    title: "Questions worth bringing to a visit",
    track: "stages",
    stages: [
      "first",
      "second",
      "third",
      "postpartum-early",
      "postpartum-later",
    ],
    minutes: 3,
    summary:
      "A short list you can edit. Your provider can answer for your situation. This page cannot.",
    points: [
      "What should I call about during the day, and what should I call about at night?",
      "What movement is appropriate for me right now? Is there anything you want me to avoid?",
      "If you are pregnant: how will we know labor has started, and where do I go?",
      "If you have given birth: how is bleeding, pain, mood, and feeding going, and when should I be seen again? Who follows the baby?",
    ],
    tryThis:
      "Save your own version of these questions in the note on this lesson, in the words you will actually say out loud.",
    priority: 20,
  },
  {
    id: "comfort-at-home",
    title: "Comfort measures you can try",
    track: "comfort",
    stages: [
      "first",
      "second",
      "third",
      "postpartum-early",
      "postpartum-later",
    ],
    minutes: 4,
    summary:
      "Warmth, position, breath, and company. General ideas, not a treatment plan.",
    points: [
      "A warm shower or bath is a common comfort measure if your provider has not asked you to avoid it. Have a way to get out safely, and stop if you feel dizzy.",
      "Slow breathing: in through the nose, out through the mouth a little longer, at a quiet pace. If you get lightheaded, go back to your usual breath.",
      "Changing position often can help — sit, stand and sway, lean forward on a table, or rest on your side. There is no position you have to hold.",
      "Some people like firm, steady pressure from a support person's hands on the low back during a cramp. It should feel useful, not painful. Agree on the word \"stop\" before you start.",
    ],
    tryThis:
      "Try one measure today for two minutes: warmth, a slower exhale, or a position change. Keep it only if it feels helpful.",
    priority: 30,
  },
  {
    id: "labor-positions",
    title: "Positions people often use in labor",
    track: "comfort",
    stages: ["second", "third"],
    minutes: 4,
    summary:
      "A rehearsal of a few positions. On the day, you and the people caring for you decide what is possible.",
    points: [
      "Upright options include standing, slow swaying, and sitting on a ball or chair. Some people like gravity and the freedom to move. Others need to lie down. Both are reasonable.",
      "Hands and knees, or leaning over a bed, is a position some people use when sensation is mostly in the back. Skip it if your wrists hurt or you have been told to avoid it.",
      "Side-lying with a pillow is a rest position between contractions. A pillow between the knees can make the hips more comfortable.",
      "Practice with your support person while you are not in labor. Short cues work better than long speeches: \"press here,\" \"slower,\" \"stop.\"",
    ],
    tryThis:
      "Spend one minute in each of two positions. Tell your support person one thing that helped and one thing to skip.",
    priority: 35,
  },
  {
    id: "partner-pregnancy",
    title: "How a support person can help in pregnancy",
    track: "partner",
    stages: ["first", "second", "third"],
    minutes: 4,
    summary:
      "Specific tasks beat \"let me know if you need anything.\" Useful whether you are the pregnant person or the person helping.",
    points: [
      "Take a named job: meals, laundry, the pharmacy line, or driving to visits. A standing job is easier to rely on than a vague offer.",
      "Learn one breathing rhythm and one comfort hold together. Practice once when nobody is in pain, and agree on how to say stop.",
      "Come to a visit with a question of your own, and write down what the provider says. Memory is worse in a busy room.",
      "Protect rest without policing it. Offer a nap or a quieter evening. The pregnant person decides what their body needs.",
    ],
    tryThis:
      "Name one weekly task a support person will own through the end of pregnancy. Put it in the note here so it is explicit.",
    priority: 40,
  },
  {
    id: "partner-postpartum",
    title: "Support in the weeks after birth",
    track: "partner",
    stages: ["postpartum-early", "postpartum-later"],
    minutes: 4,
    summary:
      "Shift sleep, handle the logistics, and take worry seriously without trying to diagnose it.",
    points: [
      "Split the night in whatever way fits your household. Even one protected stretch of sleep can change the next day.",
      "The support person can take visitors, dishes, older children, and messages. Asking \"what can I do?\" every hour adds work. Pick a task and do it.",
      "Feeding support can look like bringing water, keeping company, washing pump parts, or preparing a bottle. Follow the feeding parent's lead.",
      "If either of you feels hopeless, unable to rest even when there is a chance, or unsafe, contact your care provider. If someone is in immediate danger, contact local emergency services.",
    ],
    tryThis:
      "Agree on one overnight window and one daytime chore for the support person this week.",
    priority: 40,
  },
  {
    id: "newborn-feeding",
    title: "Newborn feeding, without a script",
    track: "newborn",
    stages: ["third", "postpartum-early", "postpartum-later"],
    minutes: 5,
    summary:
      "Babies eat often. The useful checks are diapers, weight, and how feeding feels — with a real person who can watch a feed.",
    points: [
      "Newborns commonly feed many times in 24 hours, including at night. A clock schedule from an app is not a substitute for looking at your baby with your pediatric provider.",
      "Nursing, pumping, formula, or a combination can all feed a baby. Pain, cracked skin, or dread of the next feed are reasons to ask for hands-on help, not to push through alone.",
      "Wet and soiled diapers, and weight checks at pediatric visits, are the usual way feeding is followed. Bring your questions to those visits or to a lactation counselor.",
      "A support person can watch for your hunger and thirst. Feeding goes better when the parent has actually eaten.",
    ],
    tryThis:
      "Save the number for a lactation counselor or the nurse line you would call if feeding hurts or you are worried the baby is not getting enough.",
    priority: 50,
  },
  {
    id: "newborn-daily-care",
    title: "Diapers, sleep setup, and asking for help",
    track: "newborn",
    stages: ["third", "postpartum-early", "postpartum-later"],
    minutes: 5,
    summary:
      "Everyday baby care, plus the sleep setup pediatric organizations commonly describe.",
    points: [
      "Change diapers when they are wet or soiled. Clean gently, dry the skin, and then put on a fresh diaper. If the skin looks very red or raw, ask the baby's provider.",
      "Sleep cues can include yawning, turning away, and slower movements. Many newborns still wake often. A dark, quieter room is a reasonable wind-down, not a promise of long sleep.",
      "A sleep arrangement commonly recommended in public pediatric guidance is: baby on their back, on a firm flat surface, in their own sleep space, with no pillows, blankets, bumper pads, or soft toys. Follow what your baby's provider tells you, including any exception they have discussed with you.",
      "You can ask for help before you are at the end of your rope. A fed parent and a watched baby are both part of care.",
    ],
    tryThis:
      "Look at the place the baby will sleep and remove soft items from that surface. If you are unsure about a product, ask the pediatric provider before you use it.",
    priority: 60,
  },
];

export const sessions: Session[] = [
  {
    id: "slow-breathing",
    title: "Slow breathing",
    stages: [
      "first",
      "second",
      "third",
      "postpartum-early",
      "postpartum-later",
    ],
    minutes: 6,
    focus: "Breathing",
    summary:
      "A quiet breath with a slightly longer exhale. Stop if you feel lightheaded.",
    steps: [
      {
        title: "Settle",
        body: "Sit with both feet supported, or lie on your side with a pillow under your head and one between your knees. Unclench your jaw.",
      },
      {
        title: "Find an easy breath",
        body: "Rest one hand on your chest and one on your belly. Breathe in through your nose only as deep as feels easy. Do not try to force the breath low.",
      },
      {
        title: "Lengthen the exhale",
        body: "Breathe out through your mouth a little slower than the breath in, as if you are cooling tea. Keep the breath quiet.",
      },
      {
        title: "Stay for a few breaths",
        body: "Continue for about 8 to 10 breaths. If you feel lightheaded, drop the long exhale and breathe in your usual way. Sit up if the room feels swimmy.",
      },
      {
        title: "Finish",
        body: "Let the breath return to whatever pace it wants. Notice your shoulders. You are done.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel lightheaded, numb around the mouth, or like you cannot get a satisfying breath.",
      pauseForStrain,
    ],
    providerCue: talkWithProvider,
    priority: 10,
  },
  {
    id: "early-reconnect",
    title: "Early postpartum quiet reconnect",
    stages: ["postpartum-early"],
    minutes: 7,
    focus: "Breathing",
    summary:
      "Supported breathing, with an optional very gentle pelvic floor notice. Skip the lift until a provider has said gentle movement is okay.",
    steps: [
      {
        title: "Get supported",
        body: "Lie on your side or recline with pillows behind you. If the baby is in your arms, put them in their usual safe spot first so your hands are free.",
      },
      {
        title: "Breathe into the ribs",
        body: "Inhale and feel the sides of your ribcage widen a little. Exhale and let the belly soften. Do about 8 breaths. There is no need for a big breath.",
      },
      {
        title: "Optional notice, only if you have been told gentle movement is okay",
        body: "On an exhale, imagine the muscles you would use to hold back gas drawing in very slightly, then fully letting go. Three times is enough. If you have not had that conversation with your provider yet, skip this step and stay with breathing.",
      },
      {
        title: "Rest",
        body: "Stop while it still feels easy. Bleeding that increases, pain, dizziness, or a sense that something is wrong means you stop and contact your provider.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "Bleeding gets heavier while you are moving or just after.",
      "You feel pressure bearing down, pain, or you are unsure whether movement is okay yet.",
    ],
    providerCue:
      "Talk with your care provider before adding effort after birth. Until you have been told gentle movement is okay, use only the breathing steps. This is not a recovery program and not a check of whether you are healing on time.",
    priority: 14,
  },
  {
    id: "side-lying-rest",
    title: "Side-lying rest",
    stages: ["second", "third", "postpartum-early", "postpartum-later"],
    minutes: 6,
    focus: "Gentle mobility",
    summary:
      "A rest position with pillows, and a small optional shift of the top knee. Nothing is forced.",
    steps: [
      {
        title: "Lie on your side",
        body: "Use a pillow under your head, one between your knees, and another under the belly or the top arm if that feels supportive.",
      },
      {
        title: "Breathe",
        body: "Stay here for 4 to 6 easy breaths. Let the top shoulder drop forward a little if that feels restful.",
      },
      {
        title: "A small knee shift, optional",
        body: "Slide the top knee slightly forward, only as far as it moves without a pull you have to hold. Then let it rest. This is not a stretch to the end of your range.",
      },
      {
        title: "Switch if you want",
        body: "Roll to the other side only if turning feels okay. Use your arms to help. Skip the second side if the first was enough.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "Turning or the hip position causes pain, dizziness, or a headache.",
    ],
    providerCue: talkWithProvider,
    priority: 18,
  },
  {
    id: "pelvic-floor-awareness",
    title: "Pelvic floor awareness",
    stages: [
      "first",
      "second",
      "third",
      "postpartum-early",
      "postpartum-later",
    ],
    minutes: 7,
    focus: "Pelvic floor awareness",
    summary:
      "A few gentle lifts and full releases. This is awareness, not a strength plan and not a diagnosis.",
    steps: [
      {
        title: "Choose a position",
        body: "Sit supported, or lie on your side. After birth, skip the lift in the next step unless your provider has said this kind of gentle effort is okay. Breathing only is a complete session.",
      },
      {
        title: "A small lift",
        body: "Imagine the muscles you would use to stop urine or hold back gas drawing gently up and in. Use very little effort. If your belly grips, your breath holds, or you feel pressure downward, let go. That is too much effort for this practice.",
      },
      {
        title: "Release for longer",
        body: "Hold the gentle lift for about 3 seconds only if it feels easy, then release completely and wait at least that long. The letting-go matters as much as the lift. Repeat a few times — about 5 — and stop sooner if you want.",
      },
      {
        title: "If you feel nothing in particular",
        body: "That can happen. It is not a score, and this app cannot interpret it. You can mention it to your provider or a pelvic floor clinician. Finish with a few easy breaths.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel pain, pressure pushing down, or leaking that worries you.",
      pauseForStrain,
    ],
    providerCue:
      "Talk with your care provider before pelvic floor exercises, especially in early postpartum or if you have pain, heaviness, or leaking you are unsure about. This session cannot tell you what those sensations mean.",
    priority: 20,
  },
  {
    id: "cat-cow",
    title: "Small cat and cow",
    stages: ["first", "second", "third", "postpartum-later"],
    minutes: 6,
    focus: "Gentle mobility",
    summary:
      "A small spinal movement on hands and knees. Stay in a comfortable range. Skip it if you were told to avoid this position.",
    steps: [
      {
        title: "Set up",
        body: "Hands under shoulders, knees under hips. If your wrists complain, make fists or rest on your forearms. A folded towel under the knees can help.",
      },
      {
        title: "Round",
        body: "As you exhale, gently round your back and let your head hang a little. Keep the movement small.",
      },
      {
        title: "Soften",
        body: "As you inhale, let the belly and chest soften toward the floor only as far as is comfortable. Do not push into a deep backbend.",
      },
      {
        title: "Repeat slowly",
        body: "Move through about 6 to 8 rounds, one breath each way. Stop earlier if you feel shaky, dizzy, or if the position is unpleasant.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You have been told to avoid hands-and-knees, or this position causes pain, dizziness, or a headache.",
      pauseForStrain,
    ],
    providerCue: talkWithProvider,
    priority: 25,
  },
  {
    id: "seated-shoulders",
    title: "Seated shoulders and upper back",
    stages: [
      "first",
      "second",
      "third",
      "postpartum-early",
      "postpartum-later",
    ],
    minutes: 5,
    focus: "Gentle mobility",
    summary:
      "Slow shoulder rolls and an optional open-arm breath. Skip any range that pinches.",
    steps: [
      {
        title: "Sit",
        body: "Feet supported, on a chair or the side of the bed. If you are early postpartum, stay reclined or side-lying instead and only do the breathing if sitting is tiring.",
      },
      {
        title: "Shoulder rolls",
        body: "Roll both shoulders slowly up, back, and down. About 5 rolls. Keep the jaw soft.",
      },
      {
        title: "Round the upper back",
        body: "Clasp hands loosely in front of you and let the upper back round slightly, as if you are hugging a beach ball. Two breaths. Skip this if it bothers the neck.",
      },
      {
        title: "Open only if it is easy",
        body: "Let the arms open a little to the sides, no higher than comfort. If it pinches, go back to shoulder rolls. Finish sitting quietly for 3 breaths.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel a pinch, numbness, or pain in the neck, shoulder, or chest.",
      pauseForStrain,
    ],
    providerCue: talkWithProvider,
    priority: 30,
  },
  {
    id: "labor-position-practice",
    title: "Labor-position practice",
    stages: ["second", "third"],
    minutes: 8,
    focus: "Gentle mobility",
    summary:
      "One minute each in three positions people use in labor, with a slow breath. Rehearsal only.",
    steps: [
      {
        title: "Standing sway",
        body: "Stand with a chair or wall nearby. Sway side to side or rock your weight for about a minute. Take 4 slow breaths. Sit if you feel unsteady.",
      },
      {
        title: "Lean or hands and knees",
        body: "Lean your forearms on a counter or bed, or come to hands and knees if that is comfortable and allowed for you. Stay about a minute. A support person can rest steady hands on your low back only if you ask, and only until you say stop.",
      },
      {
        title: "Side-lying",
        body: "Lie on your side with pillows and take 4 slow breaths. This is the rest position in the rehearsal.",
      },
      {
        title: "Debrief in one sentence",
        body: "Tell your support person which position you would want first, and the word you will use to stop a touch. This practice does not lock in a labor plan.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel unsteady, dizzy, or contractions that concern you.",
      pauseForStrain,
    ],
    providerCue:
      "Talk with your care provider about movement in labor, including anything you have been told to avoid. The nurses, midwives, or physicians with you on the day guide what is safe then. This rehearsal is general education.",
    priority: 40,
  },
  {
    id: "easy-walk",
    title: "Easy walk and a short reset",
    stages: ["second", "third", "postpartum-later"],
    minutes: 10,
    focus: "Gentle mobility",
    summary:
      "A short flat walk at a talking pace, with a minute of breathing before and after. Turn around early if you need to.",
    steps: [
      {
        title: "Before you step out",
        body: "Do 4 slow shoulder rolls and 4 easy breaths. Wear shoes that feel stable. Skip the walk if you have been told to limit activity and have not asked about walking.",
      },
      {
        title: "Walk",
        body: "Choose flat ground. Go at a pace where you can talk in full sentences. There is no distance to hit. A few minutes counts.",
      },
      {
        title: "Turn around early",
        body: "Head back if you notice pelvic heaviness, pain, dizziness, bleeding, leaking that worries you, or you are simply done. Those are reasons to stop, not to push to a landmark.",
      },
      {
        title: "After",
        body: "Sit or lie on your side for a minute. Let the breath settle. If anything worried you on the walk, mention it to your provider rather than guessing what it means.",
      },
    ],
    stopIf: [
      pauseForWorry,
      "You feel pelvic heaviness, pain, new leaking that worries you, or you cannot keep a conversation.",
      pauseForStrain,
    ],
    providerCue: talkWithProvider,
    priority: 50,
  },
];

const moduleById = new Map(modules.map((item) => [item.id, item]));
const sessionById = new Map(sessions.map((item) => [item.id, item]));

export function getModule(id: string): Module | null {
  return moduleById.get(id) ?? null;
}

export function getSession(id: string): Session | null {
  return sessionById.get(id) ?? null;
}
