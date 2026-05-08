import { describe, expect, it } from "vitest";
import {
  validateFrontmatter,
  ValidationError,
} from "../../src/content/validation/schemas";

describe("validateFrontmatter", () => {
  it("should validate correct frontmatter", () => {
    const data = {
      canonicalUrl: "https://example.com/test",
      heroImage: "/hero.png",
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "2026-05-08",
      updatedAt: "2026-05-09",
      status: "published",
      series: "series",
      tags: ["test"],
    };
    const validated = validateFrontmatter(data);
    expect(validated).toMatchObject(data);
  });

  it("should validate frontmatter without optional fields", () => {
    const data = {
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "2026-05-08",
      status: "published",
      tags: ["test"],
    };

    const validated = validateFrontmatter(data);

    expect(validated.updatedAt).toBeUndefined();
  });

  it("should throw error for missing frontmatter", () => {
    expect(() => validateFrontmatter(null)).toThrow(ValidationError);
  });

  it("should throw error for missing fields", () => {
    const data = { id: "test" };
    expect(() => validateFrontmatter(data)).toThrow(ValidationError);
  });

  it("should throw error for invalid status", () => {
    const data = {
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "2026-05-08",
      status: "invalid",
      tags: ["test"],
    };
    expect(() => validateFrontmatter(data)).toThrow(ValidationError);
  });

  it("should throw error for invalid tags", () => {
    const data = {
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "2026-05-08",
      status: "published",
      tags: [1],
    };
    expect(() => validateFrontmatter(data)).toThrow(ValidationError);
  });

  it("should throw error for invalid publishedAt", () => {
    const data = {
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "not-a-date",
      status: "published",
      tags: ["test"],
    };
    expect(() => validateFrontmatter(data)).toThrow(ValidationError);
  });

  it("should throw error for invalid updatedAt", () => {
    const data = {
      id: "test",
      slug: "test",
      title: "Test",
      description: "Test",
      publishedAt: "2026-05-08",
      updatedAt: "not-a-date",
      status: "published",
      tags: ["test"],
    };
    expect(() => validateFrontmatter(data)).toThrow(ValidationError);
  });
});
