import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getModule, modules, sessions } from "./content.ts";
import { prepDays } from "./prep.ts";
import { forStage, nextIncomplete } from "./select.ts";
import { PELVIC_LEVEL_IDS, STAGE_IDS, TRACK_IDS, type StageId } from "./types.ts";

const banned = [
  "studies show",
  "research shows",
  "clinical trial",
  "randomized",
  "peer-reviewed",
  "et al",
  "pubmed",
  "guaranteed to",
  "this cures",
  "we diagnose",
];

describe("seed content", () => {
  it("covers prep, learn, and move", () => {
    assert.ok(modules.length >= 36 && modules.length <= 48);
    assert.ok(sessions.length >= 18 && sessions.length <= 28);
    assert.equal(prepDays.length, 56);

    for (const track of TRACK_IDS) {
      assert.ok(
        modules.some((item) => item.track === track),
        track,
      );
    }

    const packing = getModule("packing-list");
    const plan = getModule("birth-plan-questions");
    assert.ok(packing?.groups && packing.groups.length >= 3);
    assert.ok(plan?.groups && plan.groups.length >= 4);
    assert.match(`${plan?.summary} ${plan?.points.join(" ")}`, /provider/i);
    assert.match(`${plan?.summary} ${plan?.points.join(" ")}`, /not a clinical/i);
  });

  it("uses unique ids and real stages", () => {
    const moduleIds = new Set(modules.map((item) => item.id));
    const sessionIds = new Set(sessions.map((item) => item.id));
    assert.equal(moduleIds.size, modules.length);
    assert.equal(sessionIds.size, sessions.length);

    for (const item of [...modules, ...sessions]) {
      assert.ok(item.stages.length > 0);
      for (const stage of item.stages) {
        assert.ok(STAGE_IDS.includes(stage));
      }
    }
  });

  it("covers every stage and keeps movement safety copy", () => {
    for (const stage of STAGE_IDS) {
      assert.ok(forStage(modules, stage).length > 0, stage);
      assert.ok(forStage(sessions, stage).length > 0, stage);
    }

    for (const session of sessions) {
      assert.ok(session.stopIf.length >= 2);
      assert.match(session.providerCue, /provider/i);
      assert.match(session.providerCue, /talk/i);
      assert.ok(session.steps.length >= 3);

      if (session.pelvicLevel) {
        assert.ok(PELVIC_LEVEL_IDS.includes(session.pelvicLevel));
        assert.ok(session.minutes >= 15 && session.minutes <= 30);
        assert.ok(session.equipment && session.equipment.length >= 1);
        assert.ok(session.modifications && session.modifications.length >= 2);
        assert.ok(session.steps.length >= 5);
        assert.match(session.pelvisNote ?? "", /does not open the whole pelvis/i);
      } else {
        assert.ok(session.minutes <= 12);
      }
    }

    for (const level of PELVIC_LEVEL_IDS) {
      const levelSessions = sessions.filter((item) => item.pelvicLevel === level);
      assert.ok(levelSessions.length >= 2, level);
    }

    const release = JSON.stringify(
      sessions.filter((item) => item.pelvicLevel === "release"),
    ).toLowerCase();
    assert.match(release, /kegel/);
    assert.match(release, /not the (point|goal)/);

    const outlet = JSON.stringify(
      sessions.filter((item) => item.pelvicLevel === "outlet"),
    ).toLowerCase();
    assert.match(outlet, /do not practice pushing|pushing practice/);

    for (const lesson of modules) {
      assert.ok(lesson.points.length >= 3);
      assert.ok(lesson.tryThis.length > 20);
    }

    const positioning = sessions.filter((item) => item.pelvicLevel === "positioning");
    assert.ok(positioning.length >= 3);
    const positioningText = JSON.stringify(positioning).toLowerCase();
    assert.match(positioningText, /does not turn a baby|do not turn a baby/);
    assert.match(positioningText, /pain/);
  });

  it("keeps the wellness tracks educational and non-promissory", () => {
    const tracks = ["position", "habits", "nourishment", "readiness", "evidence"] as const;
    for (const track of tracks) {
      const lessons = modules.filter((item) => item.track === track);
      assert.ok(lessons.length >= 1, track);
      for (const lesson of lessons) {
        const text = `${lesson.summary} ${lesson.points.join(" ")} ${lesson.tryThis}`;
        assert.match(text, /provider/i, lesson.id);
      }
    }

    for (const lesson of modules.filter((item) => item.track === "nourishment")) {
      assert.match(lesson.summary, /not a meal plan/i, lesson.id);
      assert.match(lesson.summary, /follow your care provider/i, lesson.id);
    }

    const readiness = JSON.stringify(
      modules.filter((item) => item.track === "readiness"),
    ).toLowerCase();
    assert.match(readiness, /folklore/);
    assert.match(readiness, /nothing here starts labor on a schedule/);
    assert.equal(readiness.includes("will start labor"), false);
    assert.equal(readiness.includes("guaranteed"), false);

    const evidence = JSON.stringify(
      modules.filter((item) => item.track === "evidence"),
    ).toLowerCase();
    assert.match(evidence, /bishop/);
    assert.match(evidence, /cascade/);
    assert.match(evidence, /not a recommendation/);
    assert.equal(evidence.includes("%"), false);

    const habits = modules.filter((item) => item.track === "habits").map((item) => item.id);
    assert.ok(habits.includes("rest-water-movement"));
    assert.ok(habits.includes("discuss-before-you-add"));
    assert.ok(prepDays.some((day) => day.learnId === "rest-water-movement"));
    assert.ok(prepDays.some((day) => day.learnId === "discuss-before-you-add"));
  });

  it("does not invent study citations, cure language, or competitor brands", () => {
    const blob = JSON.stringify({ modules, sessions, prepDays }).toLowerCase();
    for (const phrase of banned) {
      assert.equal(blob.includes(phrase), false, phrase);
    }
    const brands = [
      "spinning babies",
      "hypnobirth",
      "lamaze",
      "bradley method",
      "mama natural",
      "birth boot camp",
      "miles circuit",
    ];
    for (const phrase of brands) {
      assert.equal(blob.includes(phrase), false, phrase);
    }
  });

  it("picks the next unfinished item for the selected stage", () => {
    const stage: StageId = "first";
    const first = nextIncomplete(modules, stage, new Set());
    assert.equal(first?.id, "early-weeks");

    const second = nextIncomplete(modules, stage, new Set(["early-weeks"]));
    assert.equal(second?.id, "questions-for-visits");

    const movement = nextIncomplete(sessions, "postpartum-early", new Set(["slow-breathing"]));
    assert.equal(movement?.id, "early-reconnect");
    assert.equal(
      forStage(sessions, "first").some((item) => item.id === "early-reconnect"),
      false,
    );
  });
});
