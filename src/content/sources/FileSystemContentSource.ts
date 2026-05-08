import fs from "fs/promises";
import path from "path";
import { ContentSource } from "./ContentSource";
import {
  ListPostsParams,
  Post,
  PostSummary,
  Series,
  Tag,
} from "../domain/models";
import { validateFrontmatter } from "../validation/schemas";
import { parseMarkdown } from "../utils/markdown";

export class FileSystemContentSource implements ContentSource {
  private contentDir: string;

  constructor(
    contentDir: string = path.join(process.cwd(), "content", "posts"),
  ) {
    this.contentDir = contentDir;
  }

  private async ensureDir() {
    try {
      await fs.access(this.contentDir);
    } catch {
      await fs.mkdir(this.contentDir, { recursive: true });
    }
  }

  private calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  async listPosts(params?: ListPostsParams): Promise<PostSummary[]> {
    await this.ensureDir();
    const files = await fs.readdir(this.contentDir);

    let summaries: PostSummary[] = [];

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

      const filePath = path.join(this.contentDir, file);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const { data, content } = parseMarkdown(fileContent);

      try {
        const frontmatter = validateFrontmatter(data);

        // Filter by status early
        if (params?.status && frontmatter.status !== params.status) continue;
        // Filter by tag
        if (params?.tag && !frontmatter.tags.includes(params.tag)) continue;
        // Filter by series
        if (params?.series && frontmatter.series !== params.series) continue;

        summaries.push({
          id: frontmatter.id,
          slug: frontmatter.slug,
          title: frontmatter.title,
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt,
          updatedAt: frontmatter.updatedAt,
          tags: frontmatter.tags,
          series: frontmatter.series,
          heroImage: frontmatter.heroImage,
          readingTime: this.calculateReadingTime(content),
        });
      } catch {
        console.warn(`Skipping invalid file ${file}`);
      }
    }

    // Sort
    const orderBy = params?.orderBy || "publishedAt";
    const order = params?.order || "desc";

    summaries.sort((a, b) => {
      const aDate = new Date(a[orderBy] || a.publishedAt).getTime();
      const bDate = new Date(b[orderBy] || b.publishedAt).getTime();
      return order === "desc" ? bDate - aDate : aDate - bDate;
    });

    // Pagination
    const offset = params?.offset || 0;
    const limit = params?.limit;
    if (limit !== undefined) {
      summaries = summaries.slice(offset, offset + limit);
    } else if (offset > 0) {
      summaries = summaries.slice(offset);
    }

    return summaries;
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    await this.ensureDir();
    const files = await fs.readdir(this.contentDir);

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

      const filePath = path.join(this.contentDir, file);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const { data, content } = parseMarkdown(fileContent);

      try {
        const frontmatter = validateFrontmatter(data);

        if (frontmatter.slug === slug) {
          return {
            id: frontmatter.id,
            slug: frontmatter.slug,
            title: frontmatter.title,
            description: frontmatter.description,
            body: content,
            format: file.endsWith(".mdx") ? "mdx" : "md",
            status: frontmatter.status,
            publishedAt: frontmatter.publishedAt,
            updatedAt: frontmatter.updatedAt,
            tags: frontmatter.tags,
            series: frontmatter.series,
            heroImage: frontmatter.heroImage,
            readingTime: this.calculateReadingTime(content),
            source: {
              type: "filesystem",
              path: filePath,
            },
          };
        }
      } catch {
        // invalid file, ignore
      }
    }
    return null;
  }

  async listTags(): Promise<Tag[]> {
    const posts = await this.listPosts();
    const tagMap = new Map<string, Tag>();

    for (const post of posts) {
      for (const tag of post.tags) {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.postCount++;
        } else {
          tagMap.set(tag, {
            slug: tag,
            name: tag, // could format name nicely later
            postCount: 1,
          });
        }
      }
    }

    return Array.from(tagMap.values());
  }

  async listSeries(): Promise<Series[]> {
    const posts = await this.listPosts({
      orderBy: "publishedAt",
      order: "asc",
    });
    const seriesMap = new Map<string, Series>();

    for (const post of posts) {
      if (!post.series) continue;

      const existing = seriesMap.get(post.series);
      if (existing) {
        existing.posts.push(post);
      } else {
        seriesMap.set(post.series, {
          slug: post.series,
          title: post.series,
          posts: [post],
        });
      }
    }

    return Array.from(seriesMap.values());
  }
}
