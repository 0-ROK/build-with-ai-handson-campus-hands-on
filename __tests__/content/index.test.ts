import { describe, expect, it } from "vitest";
import { contentService } from "../../src/content";
import { ContentService } from "../../src/content/services/ContentService";

describe("content index", () => {
  it("exports the configured content service", () => {
    expect(contentService).toBeInstanceOf(ContentService);
  });
});
