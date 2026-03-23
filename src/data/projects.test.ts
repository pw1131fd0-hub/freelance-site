import test from "node:test";
import assert from "node:assert";
import { projects } from "./projects.ts";

test("Projects Data - should have a list of projects", () => {
  assert.ok(projects.length > 0, "projects array should not be empty");
});

test("Projects Data - should have required fields for each project", () => {
  projects.forEach(project => {
    assert.ok(project.id, "project.id is required");
    assert.ok(project.name, "project.name is required");
    assert.ok(project.description, "project.description is required");
    assert.ok(project.techStack, "project.techStack is required");
    assert.ok(project.githubUrl, "project.githubUrl is required");
    assert.ok(project.status, "project.status is required");
    assert.ok(project.emoji, "project.emoji is required");
  });
});

test("Projects Data - should have CycleGAN project", () => {
  const cyclegan = projects.find(p => p.id === 'cyclegan-style-transfer');
  assert.ok(cyclegan, "CycleGAN project should exist");
  assert.strictEqual(cyclegan?.name, 'CycleGAN 圖像風格轉換');
});
