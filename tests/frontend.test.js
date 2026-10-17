import { test } from "node:test";
import assert from "node:assert";
import { existsSync, readFileSync } from "node:fs";

const pages = ["home", "auth", "dashboard"];

for (const page of pages) {
  test(`frontend/index/${page}.html exists`, () => {
    assert.ok(existsSync(`frontend/index/${page}.html`));
  });

  test(`${page}.html is not empty`, () => {
    const html = readFileSync(`frontend/index/${page}.html`, "utf8").trim();
    assert.ok(html.length > 0);
  });
}

test("home.html has the main container and items list", () => {
  const html = readFileSync("frontend/index/home.html", "utf8");
  assert.ok(html.includes('class="container"'));
  assert.ok(html.includes('id="items"'));
});

test("README.md exists and is not empty", () => {
  assert.ok(readFileSync("README.md", "utf8").trim().length > 0);
});
