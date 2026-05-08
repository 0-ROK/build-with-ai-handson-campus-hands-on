export interface PostFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  updatedAt?: string;
  series?: string;
  heroImage?: string;
  canonicalUrl?: string;
}

export interface ContentSourceMeta {
  type: "filesystem" | "database" | "cms" | "remote";
  path?: string;
  commitHash?: string;
  version?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  format: "md" | "mdx" | "json";
  status: "draft" | "published" | "archived";
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  series?: string;
  heroImage?: string;
  readingTime?: number;
  source: ContentSourceMeta;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  series?: string;
  heroImage?: string;
  readingTime?: number;
}

export interface Tag {
  slug: string;
  name: string;
  postCount: number;
}

export interface Series {
  slug: string;
  title: string;
  description?: string;
  posts: PostSummary[];
}

export interface ListPostsParams {
  tag?: string;
  series?: string;
  status?: "published" | "draft" | "archived";
  limit?: number;
  offset?: number;
  orderBy?: "publishedAt" | "updatedAt";
  order?: "asc" | "desc";
}
