import test from "node:test";
import assert from "node:assert";
import { cn } from "./utils.ts";

test("cn should merge classes correctly", () => {
  assert.strictEqual(cn("a", "b"), "a b");
  assert.strictEqual(cn("a", { b: true, c: false }), "a b");
  assert.strictEqual(cn("p-4", "p-8"), "p-8");
});
