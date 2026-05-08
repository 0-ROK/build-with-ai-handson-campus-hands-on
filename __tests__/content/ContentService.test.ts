import { describe, expect, it, vi, beforeEach } from "vitest";
import { ContentService } from "../../src/content/services/ContentService";
import { ContentSource } from "../../src/content/sources/ContentSource";
import { Post } from "../../src/content/domain/models";

describe("ContentService", () => {
  let mockSource: ContentSource;
  let service: ContentService;

  beforeEach(() => {
    mockSource = {
      listPosts: vi.fn(),
      getPostBySlug: vi.fn(),
      listTags: vi.fn(),
      listSeries: vi.fn(),
    };
    service = new ContentService(mockSource);
  });

  it("should get published posts", async () => {
    await service.getPublishedPosts();
    expect(mockSource.listPosts).toHaveBeenCalledWith(
      expect.objectContaining({ status: "published" }),
    );
  });

  it("should return null for non-existent post", async () => {
    vi.mocked(mockSource.getPostBySlug).mockResolvedValue(null);
    const post = await service.getPostPage("missing");
    expect(post).toBeNull();
  });

  it("should return null for non-published post", async () => {
    vi.mocked(mockSource.getPostBySlug).mockResolvedValue({
      status: "draft",
    } as Post);
    const post = await service.getPostPage("draft-slug");
    expect(post).toBeNull();
  });

  it("should return post if published", async () => {
    const mockPost = { status: "published", slug: "published-slug" } as Post;
    vi.mocked(mockSource.getPostBySlug).mockResolvedValue(mockPost);
    const post = await service.getPostPage("published-slug");
    expect(post).toEqual(mockPost);
  });

  it("should proxy listTags and listSeries", async () => {
    await service.getTags();
    expect(mockSource.listTags).toHaveBeenCalled();
    await service.getSeries();
    expect(mockSource.listSeries).toHaveBeenCalled();
  });
});
