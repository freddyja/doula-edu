import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { basePath } from "./base-path.ts";

describe("GitHub Pages base path", () => {
  it("is the project-site prefix", () => {
    assert.equal(basePath, "/doula-edu");
  });

  it("matches the service worker prefix", () => {
    const source = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");
    assert.match(source, new RegExp(`const BASE = "${basePath}";`));
  });
});
