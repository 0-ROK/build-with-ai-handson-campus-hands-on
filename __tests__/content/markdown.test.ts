import { describe, expect, it } from "vitest";
import { parseMarkdown } from "../../src/content/utils/markdown";

describe("parseMarkdown", () => {
  it("should parse frontmatter and content", () => {
    const fileContent = `---
title: Hello
description: "Quoted value"
tags:
  - test
  - nextjs

ignored line
---
Body content`;
    const parsed = parseMarkdown(fileContent);
    expect(parsed.data.title).toBe("Hello");
    expect(parsed.data.description).toBe("Quoted value");
    expect(parsed.data.tags).toEqual(["test", "nextjs"]);
    expect(parsed.content.trim()).toBe("Body content");
  });

  it("should ignore array items without a current array key", () => {
    const fileContent = `---
- orphan
title: Hello
---
Body content`;
    const parsed = parseMarkdown(fileContent);

    expect(parsed.data).toEqual({ title: "Hello" });
  });

  it("should return empty data if no frontmatter", () => {
    const fileContent = "Just content";
    const parsed = parseMarkdown(fileContent);
    expect(parsed.data).toEqual({});
    expect(parsed.content).toBe("Just content");
  });
});
