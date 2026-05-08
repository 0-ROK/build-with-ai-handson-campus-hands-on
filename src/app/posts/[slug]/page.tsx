import { contentService } from "@/content";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await contentService.getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await contentService.getPostPage(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center flex-wrap gap-4 text-muted border-b border-border pb-8">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.readingTime && (
            <span className="reading-time">{post.readingTime} min read</span>
          )}
          {post.series && (
            <span className="series-badge">Series: {post.series}</span>
          )}
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main>
        <MarkdownRenderer content={post.body} />
      </main>

      <footer className="mt-16 pt-8 border-t border-border">
        <div className="bg-surface-container rounded-card p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Thanks for reading!</h3>
          <p className="text-muted">
            Stay tuned for more technical articles and insights.
          </p>
        </div>
      </footer>
    </article>
  );
}
