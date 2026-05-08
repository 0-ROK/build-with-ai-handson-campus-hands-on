import { PostSummary } from "@/content/domain/models";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <a href={`/posts/${post.slug}`} style={{ textDecoration: "none" }}>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-description">{post.description}</p>
        <div className="post-card-footer">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}
