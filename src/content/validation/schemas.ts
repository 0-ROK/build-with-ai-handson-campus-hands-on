import { PostFrontmatter } from "../domain/models";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateFrontmatter(data: unknown): PostFrontmatter {
  if (!data || typeof data !== "object")
    throw new ValidationError("Frontmatter is missing");

  const record = data as Record<string, unknown>;
  const requiredStrings = ["id", "slug", "title", "description", "publishedAt"];
  for (const field of requiredStrings) {
    if (typeof record[field] !== "string") {
      throw new ValidationError(
        `Field '${field}' is required and must be a string`,
      );
    }
  }

  if (
    typeof record.status !== "string" ||
    !["draft", "published", "archived"].includes(record.status)
  ) {
    throw new ValidationError(
      `Field 'status' must be 'draft', 'published', or 'archived'`,
    );
  }

  if (
    !Array.isArray(record.tags) ||
    !record.tags.every((t: unknown) => typeof t === "string")
  ) {
    throw new ValidationError(
      `Field 'tags' is required and must be an array of strings`,
    );
  }

  // Validate dates
  if (
    typeof record.publishedAt !== "string" ||
    isNaN(Date.parse(record.publishedAt))
  ) {
    throw new ValidationError(
      `Field 'publishedAt' must be a valid date string`,
    );
  }

  if (record.updatedAt !== undefined) {
    if (
      typeof record.updatedAt !== "string" ||
      isNaN(Date.parse(record.updatedAt))
    ) {
      throw new ValidationError(
        `Field 'updatedAt' must be a valid date string`,
      );
    }
  }

  return {
    id: record.id as string,
    slug: record.slug as string,
    title: record.title as string,
    description: record.description as string,
    publishedAt: record.publishedAt as string,
    status: record.status as "draft" | "published" | "archived",
    tags: record.tags as string[],
    updatedAt: record.updatedAt as string | undefined,
    series: record.series as string | undefined,
    heroImage: record.heroImage as string | undefined,
    canonicalUrl: record.canonicalUrl as string | undefined,
  };
}
