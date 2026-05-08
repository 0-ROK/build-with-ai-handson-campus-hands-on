import {
  ListPostsParams,
  Post,
  PostSummary,
  Series,
  Tag,
} from "../domain/models";

export interface ContentSource {
  listPosts(params?: ListPostsParams): Promise<PostSummary[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  listTags(): Promise<Tag[]>;
  listSeries(): Promise<Series[]>;
  searchPosts?(query: string): Promise<PostSummary[]>;
}
