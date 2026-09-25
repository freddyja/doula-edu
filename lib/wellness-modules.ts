import type { Module } from "./types";

const education =
  "This is general wellness education, not medical advice, a diagnosis, or a treatment plan. Follow your care provider.";

const nutritionNote =
  "This is general wellness education, not a meal plan, a diet, or medical nutrition advice. Follow your care provider.";

const noSchedule =
  "Nothing here starts labor on a schedule. Labor timing is a conversation with your care provider.";

export const wellnessModules: Module[] = [
  {
    id: "why-fetal-position",
    title: "Why fetal position comes up",
    track: "position",
    stages: ["second", "third"],
    minutes: 4,
    summary: `How a baby is lying is something people discuss in late pregnancy. Position varies, and it can change. ${education}`,
    points: [
      "Care providers sometimes talk about whether a baby is head-down, and which way the back of the head is facing. Those details can matter to them on the day. They are not a grade you can see from the outside.",
      "Position is not fixed for the whole pregnancy. A baby can be in one lie at a visit and another later. This page cannot tell you which one is yours.",
      "You may hear that some positions are more favorable for labor. Many babies are still born from positions that were not the one in the diagram. A diagram is a teaching picture, not a promise.",
      "Breech, sideways, or a baby who seems not to be head-down are topics for your provider. Do not try to diagnose them from kicks, a photo, or an app.",
      "Forward-leaning rest, side-lying, gentle hip movement, pelvic tilts, and hands and knees are positions people sometimes practice for comfort. Move has a Positioning group with those ideas, including when to stop. They do not turn a baby, and they do not open the whole pelvis.",
    ],
    tryThis:
      "Write one question for your next visit: how the baby is lying, and whether any movement is off-limits for you. The Positioning practices can wait until you want them.",
    priority: 110,
  },
  {
    id: "rest-water-movement",
    title: "Rest, water, and gentle movement",
    track: "habits",
    stages: ["first", "second", "third"],
    minutes: 4,
    summary: `Everyday habits people often hear about in pregnancy: rest, drinking, and movement you can still talk through. ${education}`,
    points: [
      "Rest is a reasonable plan, not a luxury you have to earn. A nap, an earlier night, or a task you hand off can matter more than a perfect routine.",
      "Keeping water where you will see it is a simple reminder to sip. There is no amount this app can assign you. Thirst, a dry mouth, and what your provider says are better guides than a number from a stranger.",
      "Movement that lets you talk in full sentences is the kind many people continue, if their provider has not limited activity. Walking, easy breathing, and the short practices in Move are options. Stop if something hurts, and ask before you add intensity.",
      "Lying on your side with a pillow between the knees is a common comfort position later in pregnancy. It is not a rule you fail if you wake up on your back.",
      "If friends offer strict rules about sleep position, step counts, or how much you must drink, you can leave them. Your provider can tell you what applies to you.",
    ],
    tryThis:
      "Put water where you will notice it, and name one rest you can actually take this week. Skip any movement that already feels wrong.",
    priority: 120,
  },
  {
    id: "discuss-before-you-add",
    title: "Substances to discuss before you use them",
    track: "habits",
    stages: ["first", "second", "third"],
    minutes: 5,
    summary: `Alcohol, nicotine, cannabis, caffeine, medicines, and supplements are provider conversations. This page does not clear anything for you. ${education}`,
    points: [
      "Public health guidance commonly advises avoiding alcohol in pregnancy. If stopping is hard, or you are unsure what you have already had, tell your provider. You do not have to sort the risk alone, and this app will not rank drinks.",
      "Cigarettes, vaping, and cannabis are things to name out loud at a visit. People are often advised to stop. Ask what support exists if stopping is not simple.",
      "Caffeine is something many providers ask about. Ask yours what amount, if any, they are comfortable with for you. A number from a post is not a prescription.",
      "Do not stop a prescribed medicine because a friend, a forum, or this app made you nervous. Call the prescriber or your prenatal provider and ask. Bring a list of what you take, including pain relievers and anything you buy without a prescription.",
      "Teas, powders, and supplements marketed for pregnancy still need a question first. \"Is this okay for me?\" is a complete question. Natural on a label is not the same as appropriate for you.",
    ],
    tryThis:
      "List what you drink, smoke, vape, or take in a week, including supplements. Take that list to your next visit instead of deciding from a search.",
    priority: 122,
  },
  {
    id: "when-people-call",
    title: "When people are often told to call",
    track: "habits",
    stages: ["first", "second", "third"],
    minutes: 5,
    summary: `A general list of reasons prenatal teams often want a call. It is not a diagnosis, and it is not a complete list for you. ${education}`,
    points: [
      "Your own practice should tell you what to phone about during the day and at night. Their list wins. If they have not given you one, ask. Use their instructions, not a timing rule from an app.",
      "You do not have to be sure something is serious before you call. \"I am worried and I want you to know\" is a valid reason.",
      "The examples below are common themes in prenatal education. They are not a way to name a condition, and they do not cover every situation.",
      "If someone is in immediate danger, or you have thoughts of harming yourself or the baby, contact local emergency services. For urgent medical worry, use the after-hours number you saved.",
    ],
    groups: [
      {
        heading: "Themes people are often told to report",
        items: [
          "Bleeding, or fluid leaking",
          "A baby who is moving less than what is usual for you, once you have been told how to pay attention to movement",
          "A severe headache, changes in vision, sudden swelling, or pain high in the belly that worries you",
          "Chest pain, trouble breathing, fainting, or a fever",
          "Contractions, pain, or vomiting that concern you, including before you expected labor",
          "Pain or burning when you urinate, or an illness you would have called about when you were not pregnant",
          "A feeling that something is wrong, even if you cannot name it neatly",
        ],
      },
    ],
    tryThis:
      "Save the daytime and after-hours numbers, and ask at your next visit: \"What should I call about that is not already on your list?\"",
    priority: 124,
  },
  {
    id: "eating-early-pregnancy",
    title: "Eating in early pregnancy",
    track: "nourishment",
    stages: ["first"],
    minutes: 4,
    summary: `Nausea, small snacks, and the prenatal-vitamin conversation. ${nutritionNote}`,
    points: [
      "Tiredness and nausea are common topics early on. How strong they are varies. Small, frequent bites are a reasonable experiment if an empty stomach makes you feel worse. They are not a rule.",
      "Eat what you can keep down while you and your provider sort the rest. Crackers, fruit, yogurt, toast, or whatever already sits well can be enough on a hard day. A perfect plate is not the assignment.",
      "Many people are offered a prenatal vitamin. Ask which one, if any, your provider wants you to take, and what to do if it worsens nausea. Do not stack extra supplements on top without asking.",
      "Folate is a nutrient prenatal visits commonly cover, because it is part of early development conversations. Food sources people mention include leafy greens, beans, and fortified grains. The form and amount for you belong with your provider, not with an app.",
      "Sip fluids in whatever way works: water, ice, or a broth. If you cannot keep fluids down, that is a reason to call, not a reason to try a stricter plan.",
    ],
    tryThis:
      "Notice one food that sat well today. If nausea is getting in the way of drinking or of daily life, put that on the list for your provider.",
    priority: 130,
  },
  {
    id: "eating-middle-pregnancy",
    title: "Eating in the middle months",
    track: "nourishment",
    stages: ["second"],
    minutes: 4,
    summary: `Appetite often shifts. A loose pattern of foods is plenty. ${nutritionNote}`,
    points: [
      "Some people feel hungrier in the middle months. You can answer hunger with ordinary meals and snacks. You do not have to count, and you do not have to earn food with exercise.",
      "A balanced pattern many people use is simple: some protein, some plants, some grains or starchy food you tolerate, and some fat you already cook with. That is a sketch, not a plate you must match.",
      "Protein is a theme in pregnancy nutrition conversations. Eggs, dairy, beans, lentils, tofu, fish, poultry, and meat are examples people use. Which of those fit you is a preference and, if you have restrictions, a provider question.",
      "Iron, calcium, and fluids stay on the list of things to ask about if you are curious or tired in a way that worries you. This page will not set a target in milligrams.",
      "Heartburn can show up. Smaller meals, staying upright after eating, and mentioning it at a visit are reasonable. An antacid or tea from the internet still needs a question first.",
    ],
    tryThis:
      "Plan one meal this week that you already like and that includes a protein and a vegetable. Leave the rest of the week alone.",
    priority: 132,
  },
  {
    id: "eating-later-pregnancy",
    title: "Eating later in pregnancy",
    track: "nourishment",
    stages: ["third"],
    minutes: 4,
    summary: `Less room, more heartburn for some people, and the same reminder: no required menu. ${nutritionNote}`,
    points: [
      "The belly takes up space. Smaller meals and a snack can feel better than a large plate. That is comfort, not a diet.",
      "Keep drinking in a way you can sustain. Constipation is a common complaint. Fruit, vegetables, beans, whole grains, fluids, and a walk if you are allowed one are ordinary experiments. Tell your provider if nothing is moving and you are uncomfortable. Do not start a laxative on your own.",
      "Iron is something people often discuss late in pregnancy, especially if they have been told they are low. Food ideas include beans, lentils, leafy greens, fortified grains, and meat if you eat it. Ask before you add an iron pill. Iron is not a casual extra.",
      "Calcium shows up in dairy, fortified plant milks, tofu set with calcium, and some greens. Protein still matters. You do not need a special pregnancy menu to include them.",
      "Foods people are often asked about include unpasteurized cheeses and juices, undercooked meat and eggs, and some kinds of fish. Your provider can give you their list. This page is not that list, and it is not a reason to panic about a meal you already ate. Ask if you are unsure.",
    ],
    tryThis:
      "Set out water and one snack you will actually want. If a food rule from social media is making you anxious, leave it and ask your provider.",
    priority: 134,
  },
  {
    id: "nutrients-to-ask-about",
    title: "Nutrients people often ask about",
    track: "nourishment",
    stages: ["first", "second", "third"],
    minutes: 5,
    summary: `Folate, iron, calcium, protein, and omega-3s as conversation themes. No doses, and no required shopping list. ${nutritionNote}`,
    points: [
      "Folate or folic acid is part of early-pregnancy counseling for many people. Ask what your provider recommends, including if a prenatal vitamin already covers it. More is not automatically better.",
      "Iron carries oxygen in the blood, which is why it comes up in pregnancy labs. If someone told you that you are low, ask what they want you to do. Do not add iron because a friend did.",
      "Calcium is part of bone conversations for you and for the pregnancy. Food is a reasonable place to start. A separate calcium pill is a question, especially if you already take other supplements.",
      "Protein helps with the everyday work of building. Spread it through meals you already eat. A protein target from a video is not a plan.",
      "Omega-3 fats, including those in some fish and in some algal oils, are a theme people raise. Fish also comes with questions about which kinds and how often. Ask your provider before you start an oil or a high-dose product.",
      "A prenatal vitamin does not replace food, and food does not replace advice when you have a lab result, a restricted diet, or a symptom that worries you.",
    ],
    tryThis:
      "Write down the supplements you already take and one nutrient you want explained. Bring both to your next visit.",
    priority: 136,
  },
  {
    id: "late-pregnancy-comfort",
    title: "Comfort habits late in pregnancy",
    track: "readiness",
    stages: ["third"],
    minutes: 5,
    summary: `Walking, rest, and closeness, as comfort. ${noSchedule} ${education}`,
    points: [
      "Late pregnancy is a reasonable time to rest on purpose. A short nap, an earlier bedtime, and one less errand are preparation. They do not make labor begin.",
      "An easy walk on flat ground, at a pace where you can talk, is a common way to move if your provider has not limited activity. Turn around if you feel pain, heaviness, bleeding, dizziness, or you are simply done. Walking is not a technique for starting labor tonight.",
      "If your provider has said sex is okay for you, some people find it a way to feel close and to relax. You may hear folklore that orgasm or semen starts labor. That is not a way to book a birth date. Skip sex if you were told to avoid it, if your water has broken, if you are bleeding, or if it does not feel okay.",
      "Know how you will reach your provider, who is coming with you, and where the bag is. Those are readiness tasks. They sit alongside medical care. They do not replace a conversation about induction if one has been recommended.",
      "If someone offers a routine that promises labor will start, you can decline. Ask your provider before you try anything aimed at your cervix, your contractions, or your due date.",
    ],
    tryThis:
      "Choose one comfort for today: a rest, a short walk if you are allowed one, or a check that the after-hours number is saved. Leave labor's timing alone.",
    priority: 140,
  },
  {
    id: "labor-start-folklore",
    title: "Stories about starting labor",
    track: "readiness",
    stages: ["third"],
    minutes: 5,
    summary: `Dates, pineapple, spicy food, and similar ideas are folklore. Evidence for them is weak or absent, and none of them schedule labor. ${noSchedule} ${education}`,
    points: [
      "You will hear birth stories that credit a food, a walk, or a long stair for the night labor started. Stories are not a method. Labor often begins near the time people are trying everything, which makes the last thing they tried look powerful.",
      "Dates and pineapple are the examples people pass around most. Even where dates are discussed in connection with the cervix, that discussion is not permission to eat a set amount, and it is not a way to induce labor at home. Pineapple is a food. It is not a plan. Ask your provider before you change how you eat, especially if blood sugar is part of your care.",
      "Spicy food, bumpy car rides, and extra stairs belong in the same category: folklore. They can also leave you uncomfortable, sore, or short on sleep. Discomfort is not progress.",
      "Herbal teas, evening primrose, and castor oil are sometimes suggested outside of medical care. Do not experiment with them. Castor oil in particular can cause severe diarrhea and dehydration. If a clinician brings up a method, ask what it is, what the downsides are, and whether it applies to you.",
      "Nipple stimulation and other home techniques aimed at contractions are sometimes described in classes. This app will not give you a protocol. If you are curious, ask your provider. Do not try to start labor because you are tired of being pregnant, unless the people caring for you are part of that decision.",
      "An induction, if one is offered, is a medical plan with medicines or procedures and a reason. It is not the same as a snack. Questions to ask: why it is being recommended, what happens if you wait, and what the alternatives are.",
    ],
    tryThis:
      "If a tip promises labor will start, write \"folklore\" next to it and one question for your provider. Do not turn it into a to-do.",
    priority: 142,
  },
  {
    id: "induction-and-cesarean",
    title: "Why induction and cesarean birth are discussed together",
    track: "evidence",
    stages: ["second", "third"],
    minutes: 5,
    summary: `A calm look at a conversation clinicians and childbirth educators often have. No rates, and no verdict on your birth. ${education}`,
    points: [
      "Induction means a care team is working to start labor, usually with medicines or procedures, for a reason they should be able to explain. A cesarean birth is birth by surgery. They are different events. People talk about them together because one decision is sometimes followed by others.",
      "That chain is sometimes called a cascade of interventions. An example people describe is extra monitoring, then medicines to strengthen contractions, then a recommendation to change the plan. It is a conversation topic. It is not a rule that one step always leads to the next, and it is not a reason to refuse care that your provider believes you need.",
      "Induction is also sometimes the care that is recommended, including when waiting has risks of its own. A due date, a blood-pressure concern, a baby who is not moving as expected, or a bag of waters that has broken are examples of topics that come up. Only your team can say whether any of them apply to you.",
      "Useful questions, when there is time to ask them: what problem is this recommendation trying to solve, what are the alternatives, what happens if we wait, and how will we keep checking in? In an emergency, the team may act and explain as they go.",
      "This page does not cite a percentage on purpose. Rates vary by place, year, and who is being counted. A number from a headline is a poor substitute for the explanation in your own chart.",
    ],
    tryThis:
      "Save three questions you would want answered if induction were recommended: why, what else, and what waiting would mean.",
    priority: 150,
  },
  {
    id: "what-a-bishop-score-is",
    title: "What a Bishop score is",
    track: "evidence",
    stages: ["second", "third"],
    minutes: 4,
    summary: `A bedside tally some providers use when they are talking about induction and how ready the cervix looks. You do not calculate it at home. ${education}`,
    points: [
      "A Bishop score is a way some clinicians summarize a cervical exam before an induction. It is a clinical tool. It is not a homework score, and a high or low number is not a comment on your effort.",
      "The pieces they are usually looking at include how open the cervix is, how thin it is, how low the baby is, how the cervix feels, and which way it faces. Your provider can tell you which details they are using.",
      "A higher tally is often described as a cervix that looks more ready for labor. A lower tally is often described as less ready. Neither one promises that an induction will work, or that labor will start on its own by a certain day.",
      "You cannot reliably score yourself, and this app will not give you the point system. Exams belong to a trained clinician. If an exam would be painful or you want to decline it, say so. Consent still applies.",
      "If induction is on the table, you can ask: what is my Bishop score, what does it mean for me, and what are we hoping an induction will do that waiting would not?",
    ],
    tryThis:
      "Write the question \"What does my cervical exam mean for an induction, if we are considering one?\" and leave the arithmetic to your provider.",
    priority: 152,
  },
  {
    id: "midwifery-and-home-birth",
    title: "Midwifery care and planned home birth",
    track: "evidence",
    stages: ["second", "third"],
    minutes: 5,
    summary: `Themes people discuss about midwives and about planned home birth for carefully screened pregnancies. This is not a recommendation to give birth at home. ${education}`,
    points: [
      "Midwives care for many people in hospitals, birth centers, and home settings. What a midwife is licensed to do depends on the place and on their credentials. Ask who would care for you, and who they call if they want a physician involved.",
      "Conversations about planned home birth usually focus on pregnancies that were screened as lower risk, with a qualified midwife, a transfer plan, and a hospital that can be reached. Themes people discuss include fewer interventions for those who stay in that lower-risk group, and the need to leave home quickly if something changes.",
      "Eligibility is not the same for everyone. A prior cesarean, a baby who is breech, twins, high blood pressure, diabetes, and many other situations change the conversation. Screening is the point. A preference is not the same as a green light.",
      "Benefits people hope for — a familiar room, fewer routine procedures, uninterrupted support — are real wishes. They do not erase the reasons a hospital exists. Transfer is part of a responsible home-birth plan, not a failure.",
      "This page is not advising you to choose home, a birth center, or a hospital. Ask whether you are a candidate for the setting you are considering, what transfer looks like, how long it would take, and who pays attention if risk changes late in pregnancy.",
    ],
    tryThis:
      "Write the setting you are curious about and two questions: am I a candidate, and what is the plan if we need to go to the hospital?",
    priority: 154,
  },
];
