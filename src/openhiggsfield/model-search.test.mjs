// Run with: node --experimental-strip-types --test src/openhiggsfield/model-search.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { filterModels, matchesModelQuery } from "./model-search.ts";

const models = [
  { id: "veo-3", label: "Veo 3", desc: "Video from a prompt, with audio, up to 4K" },
  { id: "flux-pro", label: "Flux Pro", desc: "Images from a prompt" },
  { id: "kling-2", label: "Kling 2", desc: "Video from a prompt, references" },
];
const describe = (m) => m.desc;

test("empty or whitespace query keeps every model in catalog order", () => {
  assert.deepEqual(filterModels(models, describe, "").map((m) => m.id), ["veo-3", "flux-pro", "kling-2"]);
  assert.deepEqual(filterModels(models, describe, "   ").map((m) => m.id), ["veo-3", "flux-pro", "kling-2"]);
});

test("matches label, id and description case-insensitively", () => {
  assert.deepEqual(filterModels(models, describe, "FLUX").map((m) => m.id), ["flux-pro"]);
  assert.deepEqual(filterModels(models, describe, "kling-2").map((m) => m.id), ["kling-2"]);
  assert.deepEqual(filterModels(models, describe, "4k").map((m) => m.id), ["veo-3"]);
  assert.deepEqual(filterModels(models, describe, "references").map((m) => m.id), ["kling-2"]);
});

test("query is trimmed before matching", () => {
  assert.equal(matchesModelQuery({ id: "a", label: "Alpha" }, "", "  alpha  "), true);
});

test("no match returns an empty list", () => {
  assert.deepEqual(filterModels(models, describe, "nonexistent"), []);
});
