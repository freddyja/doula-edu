import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { addDays, daysBetween } from "./dates.ts";
import { getModule, getSession } from "./content.ts";
import {
  PREP_DAY_COUNT,
  PREP_RHYTHM,
  prepDays,
  prepDaysDone,
  prepStreak,
  todayPrepIndex,
} from "./prep.ts";
import { PILLAR_IDS } from "./types.ts";

describe("prep path", () => {
  it("is eight weeks with every pillar in the daily rhythm", () => {
    assert.equal(PREP_DAY_COUNT, 56);
    assert.equal(prepDays.length, 56);
    assert.equal(PREP_RHYTHM.length, 7);
    for (const pillar of PILLAR_IDS) {
      assert.ok(PREP_RHYTHM.includes(pillar), pillar);
    }

    const ids = new Set<string>();
    for (let week = 1; week <= 8; week += 1) {
      const days = prepDays.filter((day) => day.week === week);
      assert.equal(days.length, 7, `week ${week}`);
      assert.deepEqual(
        days.map((day) => day.day),
        [1, 2, 3, 4, 5, 6, 7],
      );
      assert.deepEqual(
        days.map((day) => day.pillar),
        [...PREP_RHYTHM],
      );
      for (const day of days) {
        assert.equal(day.id, `w${week}d${day.day}`);
        assert.equal(ids.has(day.id), false);
        ids.add(day.id);
        assert.ok(day.title.length > 3);
        assert.ok(day.action.length > 20);
      }
    }
  });

  it("links only to lessons and sessions that exist", () => {
    for (const day of prepDays) {
      if (day.learnId) assert.ok(getModule(day.learnId), day.learnId);
      if (day.moveId) assert.ok(getSession(day.moveId), day.moveId);
    }
  });

  it("keeps nutrition cards as wellness tips", () => {
    const nutrition = prepDays.filter((day) => day.pillar === "nutrition");
    assert.equal(nutrition.length, 8);
    for (const day of nutrition) {
      const action = day.action.toLowerCase();
      assert.equal(action.includes("calorie"), false, day.id);
      assert.equal(action.includes("gestational"), false, day.id);
      assert.equal(action.includes("you must eat"), false, day.id);
      assert.equal(action.includes("meal plan"), false, day.id);
    }
  });

  it("maps start dates onto today's card", () => {
    assert.equal(addDays("2026-01-01", 55), "2026-02-25");
    assert.equal(daysBetween("2026-01-01", "2026-02-25"), 55);
    assert.equal(daysBetween("2026-02-31", "2026-03-01"), null);

    assert.equal(todayPrepIndex("2026-01-01", "2026-01-01"), 0);
    assert.equal(todayPrepIndex("2026-01-01", "2026-01-08"), 7);
    assert.equal(todayPrepIndex("2026-01-01", "2026-02-25"), 55);
    assert.equal(todayPrepIndex("2026-01-01", "2026-02-26"), "after");
    assert.equal(todayPrepIndex("2026-01-02", "2026-01-01"), "before");
    assert.equal(todayPrepIndex("nope", "2026-01-01"), "invalid");
  });

  it("counts a streak through yesterday when today is still open", () => {
    const ids = new Set(["w1d1", "w1d2"]);
    assert.equal(prepStreak("2026-03-01", ids, "2026-03-03"), 2);
    assert.equal(prepStreak("2026-03-01", ids, "2026-03-02"), 2);
    assert.equal(prepStreak("2026-03-01", new Set(["w1d1"]), "2026-03-03"), 0);
    assert.equal(prepStreak("2026-03-01", new Set(["w1d1", "w1d2", "w1d3"]), "2026-03-03"), 3);
    assert.equal(prepStreak("2026-03-01", new Set(), "2026-03-01"), 0);
    assert.equal(prepDaysDone(ids), 2);
  });

  it("ends the streak once the path has been over for more than a day", () => {
    const all = new Set(prepDays.map((day) => day.id));
    assert.equal(prepStreak("2026-01-01", all, "2026-02-25"), 56);
    assert.equal(prepStreak("2026-01-01", all, "2026-02-26"), 56);
    assert.equal(prepStreak("2026-01-01", all, "2026-02-27"), 0);
    assert.equal(prepStreak("not-a-date", all, "2026-02-27"), 0);
  });
});
