import { PostSummary } from "@/content/domain/models";

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
      <a href={`/posts/${post.slug}`} className="block">
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}
