import { contentService } from "@/content";
import { PostCard } from "@/components/blog/PostCard";

export default async function Home() {
  const posts = await contentService.getPublishedPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Engineering Blog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          개발자의 기술 글, 프로젝트 회고, 아키텍처 사고, 커리어 기록
        </p>
      </header>

      <main>
        <section>
          <h2 className="text-2xl font-bold mb-6">최신 글</h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {posts.length === 0 && <p>아직 작성된 글이 없습니다.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
