import { test } from "node:test";
import assert from "node:assert/strict";
import { filterTools, tools } from "../app.js";

test("finds platforms from the tool description and combines query with category", () => {
  assert.equal(filterTools("小红书", "domestic")[0].name, "CreatorHub");
  assert.equal(filterTools(" 小红书 ", "commerce")[0].name, "千瓜数据");
  assert.equal(filterTools("GITHUB", "reports").length, 1);
  assert.equal(filterTools("抖音", "overseas").length, 0);
});

test("all configured destinations are public HTTPS URLs and project tools are not marked as integrated", () => {
  for (const tool of tools) assert.equal(new URL(tool.url).protocol, "https:");
  assert.equal(tools.filter((tool) => tool.status === "报告已接入").length, 2);
  assert.equal(
    tools.find((tool) => tool.name === "CreatorHub").status,
    "项目入口",
  );
  assert.equal(
    tools.find((tool) => tool.name === "social-account-doctor").status,
    "项目入口",
  );
});
