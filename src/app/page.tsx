import { contentService } from "@/content";
import { PostCard } from "@/components/blog/PostCard";

export default async function Home() {
  const posts = await contentService.getPublishedPosts();

  return (
    <div className="container max-w-4xl">
      <header className="home-header">
        <h1 className="home-title">
          Engineering <span className="text-primary">Blog</span>
        </h1>
        <p className="home-subtitle">
          개발자의 기술 글, 프로젝트 회고, 아키텍처 사고, 커리어 기록
        </p>
      </header>

      <main>
        <section>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            최신 글
          </h2>
          <div className="posts-grid">
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
