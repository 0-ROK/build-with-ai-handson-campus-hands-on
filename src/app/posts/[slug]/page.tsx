import { contentService } from "@/content";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await contentService.getPostPage(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-500 mb-6">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }} // TODO: Render markdown properly
      />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await contentService.getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
