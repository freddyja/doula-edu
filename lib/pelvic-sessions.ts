import type { Session } from "./types";

const pauseForWorry =
  "You feel pain, dizziness, shortness of breath, chest tightness, a headache, bleeding, fluid leaking, or contractions that concern you.";

const pauseForStrain =
  "The movement feels like straining, bearing down, or simply not right.";

const talkWithProvider =
  "Talk with your care provider about which movement fits you right now, and anytime something about your body worries you. This session is general education, not a plan for your pregnancy or recovery.";

const wholePelvis =
  "No single movement opens the whole pelvis. This session does not open the whole pelvis, change a baby's position, or tell you how low the baby is.";

const breatheInstead =
  "If movement does not feel okay, stop and stay with easy breathing. Breathing counts as completing the session.";

export const pelvicSessions: Session[] = [
  {
    id: "inlet-sit-and-lean",
    title: "Sit, circle, and lean",
    stages: ["second", "third"],
    minutes: 20,
    focus: "Gentle mobility",
    pelvicLevel: "inlet",
    summary:
      "A chair-based practice with small hip circles and a forward lean. Wider knees are an option, not a rule.",
    pelvisNote: `${wholePelvis} A wider-knee position is one way people move around the top of the pelvis. It is one option for this level only.`,
    equipment: [
      "A sturdy chair",
      "A wall or counter within reach",
      "Birth ball, optional, and only if it feels steady",
      "A folded blanket or yoga block, optional, if you want a little height",
    ],
    modifications: [
      breatheInstead,
      "Stay on the chair for every step if a birth ball feels unsteady.",
      "Make the circles tiny, or rest your hands on your thighs and only rock your weight.",
      "Skip any lean that bothers your back, wrists, or belly. Sitting tall and breathing is enough.",
    ],
    steps: [
      {
        title: "Set the room up",
        body: "Put the chair where you can touch a wall. Wear clothes you can move in. Read the stop-if lines before you start. This takes about 2 minutes. If any line already applies, do not start.",
      },
      {
        title: "Sit and breathe",
        body: "Sit with your feet supported. If you use a ball, your hips should feel stable and one hand stays on the wall or chair. Take easy breaths for about 3 minutes. Unclench your jaw. There is no deep breath to force.",
      },
      {
        title: "Small circles",
        body: "Circle your hips slowly, a comfortable size, for about 2 minutes one way and 2 minutes the other. Keep the movement smooth. If your belly grips or you feel pressure downward, make it smaller or stop the circles.",
      },
      {
        title: "A forward lean",
        body: "Rest your forearms on your thighs or on a counter. Let your back round a little. Stay about 4 minutes, shifting your weight side to side if that feels pleasant. Come up if your head feels heavy or you get dizzy.",
      },
      {
        title: "Knees a little wider, only if it is easy",
        body: "From sitting, let your knees rest a bit wider than usual for about 3 minutes, feet still supported. This is not a deep squat and not a stretch to the end of your range. If the hips complain, bring the knees back in.",
      },
      {
        title: "Rest",
        body: "Sit or lie on your side for about 3 minutes. Let the breath settle. You are done. Nothing in this session needs to be held as a final position.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "You feel unsteady, the ball rolls, or you cannot keep a hand on something solid.",
      "You feel pelvic pressure, hip pain, or a headache.",
    ],
    providerCue: talkWithProvider,
    priority: 60,
  },
  {
    id: "inlet-supported-rest",
    title: "Supported rest at the top",
    stages: ["second", "third"],
    minutes: 16,
    focus: "Gentle mobility",
    pelvicLevel: "inlet",
    summary:
      "Pillows, a short rock, and an optional light band for feedback. The band is never required.",
    pelvisNote: `${wholePelvis} This is a rest-sized practice for the top of the pelvis, not a way to make more room on demand.`,
    equipment: [
      "A bed or couch",
      "Pillows",
      "A light loop band, optional",
      "A chair nearby if you want to sit instead",
    ],
    modifications: [
      breatheInstead,
      "Skip the band. The practice is complete without it.",
      "Stay side-lying the whole time if hands-and-knees or a wide-knee rest does not appeal.",
      "Use a pillow under the belly or between the knees so you are not holding yourself up.",
    ],
    steps: [
      {
        title: "Get supported",
        body: "Lie on your side with a pillow under your head, one between your knees, and one under the belly if that feels good. Spend about 3 minutes on easy breaths.",
      },
      {
        title: "Optional band, then take it off",
        body: "If you have a light band, sit and place it just above the knees for about 2 minutes of small knee-opens, only as wide as is comfortable. It should feel like a hint, not a workout. Then take it off. Skip this entire step if you have no band or any pressure feels wrong.",
      },
      {
        title: "Hands and knees, or stay down",
        body: "If it is comfortable and allowed for you, come to hands and knees for about 4 minutes and rock your weight slightly toward your heels and back to neutral. Wrists can be fists, or you can lean on a stack of pillows. If you would rather not, remain side-lying and rock nothing.",
      },
      {
        title: "Wide only a little",
        body: "On the bed, you can let the top knee rest forward on a pillow for about 3 minutes. The range is small. This is not a groin stretch to chase.",
      },
      {
        title: "Finish lying down",
        body: "Return to side-lying for about 4 minutes. Soften the belly as you exhale. Stop while you still feel comfortable.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "The band feels tight, numb, or painful. Take it off.",
      "Kneeling bothers your wrists, knees, or makes you dizzy.",
    ],
    providerCue: `${talkWithProvider} Ask before you add a band or any position you were told to avoid.`,
    priority: 62,
  },
  {
    id: "mid-shift-and-lunge",
    title: "Shifts and a short lunge",
    stages: ["second", "third"],
    minutes: 22,
    focus: "Gentle mobility",
    pelvicLevel: "mid",
    summary:
      "Weight shifts and a short, supported lunge. Asymmetry is a practice, not a correction.",
    pelvisNote: `${wholePelvis} Side-to-side movement is one way people practice the middle of the pelvis. It does not fix a baby's position.`,
    equipment: [
      "A clear spot of floor or a firm bed",
      "A chair or wall for balance",
      "A pillow or yoga block for the back knee, optional",
      "Shoes or bare feet, whichever feels more stable",
    ],
    modifications: [
      breatheInstead,
      "Hold the chair with both hands. Skip the lunge and only shift your weight.",
      "Shorten the stance so the back knee barely bends.",
      "Do one side only if the other side feels different in a way you do not like.",
    ],
    steps: [
      {
        title: "Stand near support",
        body: "Face a chair or wall, close enough to hold it. Soften your knees. Take a minute to notice your breath. About 2 minutes total for arriving.",
      },
      {
        title: "Shift side to side",
        body: "Rock your weight from one foot to the other for about 4 minutes. The sway can be small. Keep breathing. Sit if you feel unsteady.",
      },
      {
        title: "A figure-eight, small",
        body: "With both hands on the chair, trace a small figure-eight with your hips for about 4 minutes. Think of polishing a plate, not of a big circle. Stop if your low back grips.",
      },
      {
        title: "Short lunge, first side",
        body: "Step one foot forward and rest the back knee on a pillow or the floor, or keep the back knee lifted if kneeling is unpleasant. Tuck nothing hard. Stay about 3 minutes, gently shifting forward and back a few centimeters. Hold the chair. This is not a deep lunge.",
      },
      {
        title: "Second side, or skip it",
        body: "Change sides for about 3 minutes only if the first side felt okay. If it did not, lie down instead.",
      },
      {
        title: "Side-lying close",
        body: "Lie on your side with pillows for about 4 minutes. Let both hips get heavy. You do not need to feel a stretch.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "You feel unsteady, hip pain, pelvic pressure, or a pull you have to endure.",
      "Kneeling hurts the knee even with padding.",
    ],
    providerCue: talkWithProvider,
    priority: 64,
  },
  {
    id: "mid-side-lying-flow",
    title: "Side-lying flow",
    stages: ["second", "third", "postpartum-later"],
    minutes: 18,
    focus: "Gentle mobility",
    pelvicLevel: "mid",
    summary:
      "Mostly on your side, with a small knee move. A calmer way to practice the middle of the pelvis.",
    pelvisNote: `${wholePelvis} Staying on your side is a full practice. You do not have to add range to make it useful.`,
    equipment: [
      "A bed",
      "Two or three pillows",
      "A wall or headboard to steady yourself as you roll",
    ],
    modifications: [
      breatheInstead,
      "Keep the top knee stacked on the bottom knee. The forward slide is optional.",
      "Do not roll to the second side if turning feels like work.",
      "After birth, skip this until your provider has said gentle movement is okay, even if this stage is selected.",
    ],
    steps: [
      {
        title: "Build the pillow nest",
        body: "Head pillow, a pillow between the knees, and one in front of your chest or under the belly. Settle for about 3 minutes of quiet breathing.",
      },
      {
        title: "Breathe into the sides",
        body: "For about 3 minutes, notice the ribcage widening a little on the inhale and softening on the exhale. Do not force the belly flat.",
      },
      {
        title: "Slide the top knee a little",
        body: "Let the top knee move slightly forward on its pillow, only as far as it goes without a pull you must hold. Stay about 3 minutes. Bring it back if the hip complains.",
      },
      {
        title: "Rest there",
        body: "Stop adjusting. Stay about 3 minutes. If you want, a support person can rest a steady hand on your shoulder or hip only if you ask, and only until you say stop.",
      },
      {
        title: "Roll, or do not",
        body: "Use your arms to roll to the other side if that sounds okay, and repeat a shorter version for about 4 minutes. If the first side was enough, stay and finish there.",
      },
      {
        title: "Sit up slowly",
        body: "When you are ready, roll to your side and use your arms to sit. Pause for a few breaths in case the room feels swimmy. Then you are done.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "Turning causes pain, dizziness, or a headache.",
      "You are newly postpartum and have not been told that gentle movement is okay.",
    ],
    providerCue: talkWithProvider,
    priority: 66,
  },
  {
    id: "outlet-rock-and-rest",
    title: "Rock and rest, low and small",
    stages: ["second", "third"],
    minutes: 18,
    focus: "Gentle mobility",
    pelvicLevel: "outlet",
    summary:
      "All-fours rocking and a supported rest. Knees can be closer if that feels easy. Do not practice pushing.",
    pelvisNote: `${wholePelvis} A smaller knee position is one option people try around the bottom of the pelvis. Do not practice pushing or bearing down.`,
    equipment: [
      "Floor or a firm bed",
      "A folded towel for the knees",
      "A chair or sofa to lean on if you do not want to kneel",
      "Pillows for the rest at the end",
    ],
    modifications: [
      breatheInstead,
      "Lean your chest on the seat of a chair instead of using hands and knees.",
      "Keep the knees wherever they already feel easy. Closer knees are optional.",
      "Skip rocking and hold a still, supported position.",
    ],
    steps: [
      {
        title: "Agree with yourself: no pushing",
        body: "This session does not include practice pushes, breath-holding, or bearing down. Spend the first minute reading that twice. If you feel an urge to push, stop and contact your provider rather than rehearsing it.",
      },
      {
        title: "Set up low",
        body: "Come to hands and knees with a towel under the knees, or lean your forearms and chest on a chair. Take about 3 minutes to find a height that does not hurt your wrists or back.",
      },
      {
        title: "Rock slowly",
        body: "Shift your weight a little back and a little forward for about 4 minutes. The rock is small. Exhale without force. If your belly feels like it is pushing down, stop the rock and rest.",
      },
      {
        title: "Knees closer, if it is easy",
        body: "You may bring the knees a bit closer and let the feet rest a little wider, only inside a range that feels ordinary. Stay about 3 minutes. If it feels like a strain or a squat you must endure, return to a comfortable width.",
      },
      {
        title: "Stillness",
        body: "Stop rocking. Stay supported for about 3 minutes with a quiet exhale. Jaw soft. Shoulders soft.",
      },
      {
        title: "Side-lying rest",
        body: "Lie on your side with pillows for about 4 minutes. You are finished. Do not end with pushes or a long hold of the breath.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "You feel an urge to push, pressure bearing down, or you start holding your breath.",
      "Kneeling or leaning causes pain, dizziness, or wrist pain that padding does not fix.",
    ],
    providerCue: `${talkWithProvider} Do not use this session as pushing practice.`,
    priority: 68,
  },
  {
    id: "outlet-supported-sit",
    title: "A supported seat",
    stages: ["second", "third"],
    minutes: 16,
    focus: "Gentle mobility",
    pelvicLevel: "outlet",
    summary:
      "Sitting with support, a smaller knee position if it feels fine, and a long rest. No deep squat and no pushing.",
    pelvisNote: `${wholePelvis} Sitting supported is enough. Do not practice pushing or hold your breath to create force.`,
    equipment: [
      "A chair, bed, or birth ball that feels stable",
      "A wall to keep a hand on",
      "A cushion if you want the seat higher",
    ],
    modifications: [
      breatheInstead,
      "Use a chair with a back. Skip the ball.",
      "Keep your usual knee width. The closer-knee idea is optional.",
      "Lie on your side instead of sitting if sitting is tiring.",
    ],
    steps: [
      {
        title: "Sit higher if you need to",
        body: "Choose a seat where your feet reach the floor or a book, and your hips are not jammed lower than your knees unless that is clearly comfortable. Hold a wall if you are on a ball. Arrive for about 3 minutes.",
      },
      {
        title: "Easy breath",
        body: "For about 3 minutes, inhale quietly and exhale a little longer. If you get lightheaded, breathe normally. Do not bear down on the exhale.",
      },
      {
        title: "Knees, only a small change",
        body: "If it feels easy, let the knees rest slightly closer than your practice in the inlet sessions, feet still supported. Stay about 3 minutes. There is no correct angle. Pain means go back.",
      },
      {
        title: "A gentle rock",
        body: "Rock forward and back an inch or two for about 3 minutes, or skip the rock and stay still. Keep the jaw loose.",
      },
      {
        title: "Rest and stand up carefully",
        body: "Sit still for about 4 minutes, then stand by leaning forward and using your legs, with a hand on the chair. If standing makes you dizzy, stay seated until it passes, and contact your provider if it does not.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "You notice yourself holding your breath, pushing, or chasing a deep squat.",
      "The ball feels unstable.",
    ],
    providerCue: `${talkWithProvider} Do not practice pushing in this position.`,
    priority: 70,
  },
  {
    id: "release-soften",
    title: "Soften and sigh",
    stages: ["first", "second", "third", "postpartum-later"],
    minutes: 20,
    focus: "Pelvic floor awareness",
    pelvicLevel: "release",
    summary:
      "Breath, a soft jaw, and positions that let the pelvic floor rest. Squeezing is not the goal.",
    pelvisNote: `${wholePelvis} A squeeze-and-lift, sometimes called a kegel, is not the point of this session and is not required birth preparation. If your provider gave you a pelvic floor program, follow that.`,
    equipment: [
      "A bed or a supportive chair",
      "Pillows",
      "A blanket if you get cool while resting",
    ],
    modifications: [
      breatheInstead,
      "Skip any position and stay with the sighing breath.",
      "After birth, wait until your provider has said gentle rest and breathing are okay. Skip anything that feels like effort.",
      "If you notice yourself squeezing, holding your breath, or tucking hard, let that go.",
    ],
    steps: [
      {
        title: "Choose rest",
        body: "Lie on your side or recline with pillows. Unclench your jaw and your hands. Spend about 3 minutes doing nothing else. If you are early postpartum and have not been cleared for movement, this breathing is the whole session — and only if rest feels okay.",
      },
      {
        title: "Sigh the exhale",
        body: "Inhale through the nose. Exhale with a quiet sigh for about 4 minutes. The belly can soften. You are not pushing the belly out or pulling it in.",
      },
      {
        title: "A soft jaw and open hands",
        body: "For about 3 minutes, notice the jaw, the tongue, and the hands. When they grip, let them rest. Pelvic floor release is often easier when the jaw is not working hard. This is a comfort idea, not a claim about anatomy you must achieve.",
      },
      {
        title: "Knees supported, if you want",
        body: "Still lying down, you can rest the knees apart on pillows for about 4 minutes, only as far as they fall without a stretch you hold. If that feels vulnerable or painful, keep the knees stacked and continue breathing.",
      },
      {
        title: "No lift",
        body: "For about 3 minutes, do not add a pelvic floor lift. If a squeeze happens out of habit, let it go on the next exhale. Strength work is a different conversation, one to have with your provider or a pelvic floor clinician.",
      },
      {
        title: "End",
        body: "Stay for about 3 more minutes or stop earlier. Roll to sit slowly. The session is complete even if you felt nothing in particular. This app cannot interpret that.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "You feel pain, pressure pushing down, leaking that worries you, or you cannot soften without gripping.",
      "You feel lightheaded from the longer exhale.",
    ],
    providerCue:
      "Talk with your care provider before pelvic floor exercises, especially if you have pain, heaviness, leaking you are unsure about, or you are postpartum. This session asks you to soften. It cannot tell you whether a pelvic floor is tight or weak.",
    priority: 72,
  },
  {
    id: "release-heavy-hips",
    title: "Let the hips be heavy",
    stages: ["second", "third", "postpartum-later"],
    minutes: 18,
    focus: "Pelvic floor awareness",
    pelvicLevel: "release",
    summary:
      "Supported hip positions and easy breathing. Mobility for letting go, without a kegel set.",
    pelvisNote: `${wholePelvis} The aim is ease. A kegel is not the goal, and letting the hips be heavy does not diagnose or treat the pelvic floor.`,
    equipment: [
      "A bed or floor with a mat",
      "Pillows or a yoga block to support the knees",
      "A wall so the feet can rest, optional",
    ],
    modifications: [
      breatheInstead,
      "Stay side-lying if a knees-apart rest does not feel good.",
      "Put more pillows under the knees so the hips do less work.",
      "Skip this session after birth until a provider has said this kind of gentle movement is okay.",
    ],
    steps: [
      {
        title: "Side-lying start",
        body: "Lie on your side with pillows for about 3 minutes. Breathe quietly. Notice the hip on the bed getting heavy.",
      },
      {
        title: "Roll to your back only if it feels fine",
        body: "If lying on your back feels unpleasant, breathless, or wrong, skip it and stay on your side. If it feels okay, recline with pillows behind you so you are not flat and straining. Settle for about 2 minutes.",
      },
      {
        title: "Knees rest outward",
        body: "Place pillows under both knees so they can rest apart without you holding them. Stay about 4 minutes. There is no stretch to deepen. Pain, pulling, or pressure means bring the knees back up.",
      },
      {
        title: "Ankles rest, optional",
        body: "You may rest the soles of the feet together only if the hips stay comfortable, for about 3 minutes. Otherwise leave the feet where they are. A block or pillow under each knee keeps this from becoming a hanging stretch.",
      },
      {
        title: "Return to your side",
        body: "Roll to your side and stay about 4 minutes. Sigh on a few exhales. Do not add squeezes.",
      },
      {
        title: "A note for your provider, if you want",
        body: "If something felt like heaviness, pain, or leaking, write a plain description in the note and mention it to your provider. Do not try to name the cause from this session. Then stop.",
      },
    ],
    stopIf: [
      pauseForWorry,
      pauseForStrain,
      "Lying back makes you dizzy, breathless, or unwell.",
      "You feel pain, a bulge sensation, or pressure that worries you.",
    ],
    providerCue:
      "Talk with your care provider about pelvic floor symptoms such as pain, heaviness, or leaking. This session is general mobility and cannot assess them.",
    priority: 74,
  },
];
