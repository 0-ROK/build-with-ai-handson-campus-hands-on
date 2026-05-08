import { ContentSource } from "../sources/ContentSource";
import { Post, PostSummary, Tag, Series } from "../domain/models";

export class ContentService {
  constructor(private readonly source: ContentSource) {}

  async getPublishedPosts(): Promise<PostSummary[]> {
    return this.source.listPosts({
      status: "published",
      orderBy: "publishedAt",
      order: "desc",
    });
  }

  async getPostPage(slug: string): Promise<Post | null> {
    const post = await this.source.getPostBySlug(slug);

    if (!post) return null;
    if (post.status !== "published") return null;

    return post;
  }

  async getTags(): Promise<Tag[]> {
    return this.source.listTags();
  }

  async getSeries(): Promise<Series[]> {
    return this.source.listSeries();
  }
}
