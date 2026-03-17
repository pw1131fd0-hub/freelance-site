import test from "node:test";
import assert from "node:assert";
import { InquirySchema } from "./schemas.ts";

test("InquirySchema should validate valid data", () => {
  const data = {
    name: "John Doe",
    email: "john@example.com",
    description: "I want to build a website for my business.",
    budget: "1000-2000",
  };
  const result = InquirySchema.safeParse(data);
  assert.strictEqual(result.success, true);
});

test("InquirySchema should fail with empty name", () => {
  const data = {
    name: "",
    email: "john@example.com",
    description: "I want to build a website for my business.",
  };
  const result = InquirySchema.safeParse(data);
  assert.strictEqual(result.success, false);
  if (!result.success) {
    assert.strictEqual(result.error.issues[0].message, "姓名為必填");
  }
});

test("InquirySchema should fail with invalid email", () => {
  const data = {
    name: "John Doe",
    email: "invalid-email",
    description: "I want to build a website for my business.",
  };
  const result = InquirySchema.safeParse(data);
  assert.strictEqual(result.success, false);
  if (!result.success) {
    assert.strictEqual(result.error.issues[0].message, "Email 格式不正確");
  }
});

test("InquirySchema should fail with short description", () => {
  const data = {
    name: "John Doe",
    email: "john@example.com",
    description: "Too short",
  };
  const result = InquirySchema.safeParse(data);
  assert.strictEqual(result.success, false);
  if (!result.success) {
    assert.strictEqual(result.error.issues[0].message, "需求描述至少需要 10 個字");
  }
});
