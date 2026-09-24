import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { modules, sessions } from "./content.ts";
import { forStage, nextIncomplete } from "./select.ts";
import { STAGE_IDS, type StageId } from "./types.ts";

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
  it("stays within the MVP library size", () => {
    assert.ok(modules.length >= 8 && modules.length <= 12);
    assert.ok(sessions.length >= 6 && sessions.length <= 8);
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
    }

    for (const lesson of modules) {
      assert.ok(lesson.points.length >= 3);
      assert.ok(lesson.tryThis.length > 20);
    }
  });

  it("does not invent study citations or cure language", () => {
    const blob = JSON.stringify({ modules, sessions }).toLowerCase();
    for (const phrase of banned) {
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
