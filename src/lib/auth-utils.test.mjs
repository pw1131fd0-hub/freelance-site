import test from "node:test";
import assert from "node:assert";
import { hashPassword, comparePassword } from "../../dist/lib/auth-utils.js";

test("hashPassword should return a salted and hashed password", () => {
  const password = "mysecretpassword";
  const stored = hashPassword(password);
  
  assert.ok(stored.includes(":"), "Stored password should contain a colon separator");
  const [salt, hash] = stored.split(":");
  assert.strictEqual(salt.length, 32, "Salt should be 32 hex chars (16 bytes)");
  assert.strictEqual(hash.length, 128, "Hash should be 128 hex chars (64 bytes for scrypt output)");
});

test("comparePassword should return true for correct password", () => {
  const password = "correctpassword";
  const stored = hashPassword(password);
  
  assert.strictEqual(comparePassword(password, stored), true, "Should be true for correct password");
});

test("comparePassword should return false for incorrect password", () => {
  const password = "correctpassword";
  const stored = hashPassword(password);
  
  assert.strictEqual(comparePassword("wrongpassword", stored), false, "Should be false for incorrect password");
});
