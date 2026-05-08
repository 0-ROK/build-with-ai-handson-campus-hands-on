import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PostPage, { generateStaticParams } from "../src/app/posts/[slug]/page";

const getPostPageMock = vi.hoisted(() => vi.fn());
const getPublishedPostsMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn());

vi.mock("@/content", () => ({
  contentService: {
    getPostPage: getPostPageMock,
    getPublishedPosts: getPublishedPostsMock,
  },
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

describe("PostPage", () => {
  it("renders a published post", async () => {
    getPostPageMock.mockResolvedValue({
      body: "<p>Hello body</p>",
      id: "hello",
      publishedAt: "2026-05-08",
      readingTime: 3,
      slug: "hello",
      tags: ["nextjs", "blog"],
      title: "Hello Post",
    });

    const page = await PostPage({
      params: Promise.resolve({ slug: "hello" }),
    });
    render(page);

    expect(screen.getByRole("heading", { name: "Hello Post" })).toBeDefined();
    expect(screen.getByText("#nextjs")).toBeDefined();
    expect(screen.getByText("#blog")).toBeDefined();
    expect(screen.getByText("3 min read")).toBeDefined();
    expect(screen.getByText("Hello body")).toBeDefined();
  });

  it("renders a post with a series", async () => {
    getPostPageMock.mockResolvedValue({
      body: "Series post content",
      id: "series-post",
      publishedAt: "2026-05-08",
      slug: "series-post",
      tags: ["test"],
      title: "Series Post",
      series: "My Series",
    });

    const page = await PostPage({
      params: Promise.resolve({ slug: "series-post" }),
    });
    render(page);

    expect(screen.getByText("Series: My Series")).toBeDefined();
  });

  it("delegates missing posts to Next notFound", async () => {
    getPostPageMock.mockResolvedValue(null);
    notFoundMock.mockImplementation(() => {
      throw new Error("not found");
    });

    await expect(
      PostPage({
        params: Promise.resolve({ slug: "missing" }),
      }),
    ).rejects.toThrow("not found");
  });

  it("generates static params from published posts", async () => {
    getPublishedPostsMock.mockResolvedValue([
      { id: "hello", slug: "hello" },
      { id: "world", slug: "world" },
    ]);

    await expect(generateStaticParams()).resolves.toEqual([
      { slug: "hello" },
      { slug: "world" },
    ]);
  });
});
