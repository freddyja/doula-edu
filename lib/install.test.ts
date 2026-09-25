import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { detectInstallPlatform, installInstructions } from "./install.ts";

describe("install guidance", () => {
  it("gives Safari steps on iPhone", () => {
    const platform = detectInstallPlatform({
      ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)",
    });
    assert.equal(platform, "ios");
    assert.match(installInstructions(platform).body, /Share/);
    assert.match(installInstructions(platform).body, /Home Screen/);
  });

  it("treats iPadOS desktop UA as iOS", () => {
    const platform = detectInstallPlatform({
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      platform: "MacIntel",
      maxTouchPoints: 5,
    });
    assert.equal(platform, "ios");
  });

  it("gives menu steps on Android", () => {
    const platform = detectInstallPlatform({ ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8)" });
    assert.equal(platform, "android");
    assert.match(installInstructions(platform).body, /Install app/);
    assert.match(installInstructions(platform).body, /Add to Home screen/);
  });

  it("gives a desktop install hint otherwise", () => {
    const platform = detectInstallPlatform({
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      platform: "MacIntel",
      maxTouchPoints: 0,
    });
    assert.equal(platform, "other");
    assert.match(installInstructions(platform).body, /install/i);
  });
});
