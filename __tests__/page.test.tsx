import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Page from "../src/app/page";

const getPublishedPostsMock = vi.hoisted(() => vi.fn());

// Mock the contentService
vi.mock("@/content", () => ({
  contentService: {
    getPublishedPosts: getPublishedPostsMock,
  },
}));

describe("Home Page", () => {
  beforeEach(() => {
    getPublishedPostsMock.mockResolvedValue([
      {
        description: "Description",
        id: "1",
        publishedAt: "2026-05-08",
        slug: "test-post",
        tags: ["test"],
        title: "Test Post",
      },
    ]);
  });

  test("renders the blog title and posts", async () => {
    // For Server Components, we can call them as functions in tests
    const PageComponent = await Page();
    render(PageComponent);

    expect(screen.getByText(/Engineering/i)).toBeDefined();
    expect(screen.getByText(/Blog/i)).toBeDefined();
    expect(screen.getByText("Test Post")).toBeDefined();
  });

  test("renders an empty state without posts", async () => {
    getPublishedPostsMock.mockResolvedValue([]);

    const PageComponent = await Page();
    render(PageComponent);

    expect(screen.getByText("아직 작성된 글이 없습니다.")).toBeDefined();
  });
});
