# 개발자 블로그 PRD Spec v0.3

## 1. 제품 개요

### 제품명

가칭: **Engineering Blog**

### 제품 설명

개발자의 기술 글, 프로젝트 회고, 아키텍처 사고, 커리어 기록을 발행하기 위한 개인 개발자 블로그다.

초기 버전은 관리자 페이지 없이 **Git 커밋 기반 콘텐츠 발행 방식**을 사용한다. 글은 Markdown, MDX, JSON 등 정적 파일로 관리한다.

다만 내부 구조는 향후 DB, Headless CMS, 검색 인덱스, 디자인 교체 워크플로로 확장할 수 있도록 콘텐츠 접근 계층과 UI 계층을 분리한다.

---

## 2. 제품 목적

이 블로그의 목적은 단순히 글을 나열하는 사이트가 아니라, 장기적으로 확장 가능한 **개인 기술 미디어 플랫폼**을 구축하는 것이다.

핵심 목적은 다음과 같다.

1. 기술적 사고와 프로젝트 경험을 체계적으로 기록한다.
2. Git 기반 발행을 통해 글의 변경 이력과 버전 관리를 명확히 한다.
3. 초기에는 정적 콘텐츠 기반으로 빠르게 출시한다.
4. 향후 콘텐츠 저장소를 DB나 CMS로 교체할 수 있도록 설계한다.
5. 디자인을 쉽게 교체할 수 있도록 컴포넌트 경계와 디자인 토큰을 명확히 한다.
6. Stitch MCP와 코딩 에이전트를 활용한 디자인 개선 워크플로에 대응할 수 있는 구조를 만든다.

---

## 3. 이번 버전의 초점

이번 버전은 **읽기 중심의 정적 개발자 블로그**를 목표로 한다.

운영자는 Git으로 글을 작성하고 발행한다.  
독자는 글 목록, 글 상세, 태그, 시리즈를 통해 콘텐츠를 탐색한다.  
개발자는 콘텐츠 소스와 UI를 분리하여 향후 DB, CMS, 디자인 교체, AI 기반 코드 개선에 대응할 수 있다.

---

## 4. 핵심 사용자

### 4.1 블로그 운영자

블로그를 직접 운영하는 개발자다.

운영자는 다음을 할 수 있어야 한다.

- Markdown 또는 MDX 파일로 글을 작성한다.
- Git commit과 merge를 통해 글을 발행한다.
- 글의 제목, 설명, 태그, 시리즈, 발행일을 frontmatter로 관리한다.
- 빌드 과정에서 콘텐츠 스키마 오류를 확인한다.
- 디자인이나 컴포넌트 구조를 점진적으로 개선한다.

### 4.2 독자

블로그 글을 읽는 사용자다.

독자는 다음을 할 수 있어야 한다.

- 최신 글을 확인한다.
- 글 상세 페이지에서 본문을 읽는다.
- 태그를 통해 관심 주제의 글을 탐색한다.
- 시리즈 단위로 연속된 글을 읽는다.
- RSS 또는 검색 엔진을 통해 글을 발견한다.

### 4.3 개발자 / 코딩 에이전트 사용자

블로그를 유지보수하고 고도화하는 개발자다.

개발자는 다음을 할 수 있어야 한다.

- 콘텐츠 저장 방식을 파일 시스템에서 DB/CMS로 교체할 수 있다.
- 컴포넌트의 역할과 props 계약을 명확히 파악할 수 있다.
- Stitch MCP, 코딩 에이전트, 디자인 생성 도구를 활용해 UI를 개선할 수 있다.
- 디자인 변경이 콘텐츠 로직을 망가뜨리지 않도록 안전하게 작업할 수 있다.

---

## 5. 핵심 사용자 시나리오

### 5.1 글 작성 및 발행

운영자는 `content/posts` 디렉토리에 새 글 파일을 추가한다.

예시:

```txt
content/posts/2026-05-08-dev-blog-architecture.md
```

글 상단에는 frontmatter를 작성한다.

```md
---
id: dev-blog-architecture
slug: dev-blog-architecture
title: 개발자 블로그 아키텍처 설계
description: Git 기반 정적 콘텐츠에서 DB 기반 CMS까지 확장 가능한 블로그 설계
publishedAt: 2026-05-08
updatedAt: 2026-05-08
status: published
tags:
  - architecture
  - blog
  - nextjs
series: personal-platform
heroImage: /images/posts/dev-blog-architecture.png
---

# 개발자 블로그 아키텍처 설계

본문 내용...
```

운영자는 이 파일을 commit하고 main 브랜치에 merge한다.  
배포 파이프라인은 콘텐츠를 검증한 뒤 블로그를 새로 빌드한다.

---

### 5.2 글 목록 탐색

독자는 `/posts` 페이지에서 발행된 글 목록을 확인한다.

글 목록에는 다음 정보가 표시된다.

- 제목
- 설명
- 발행일
- 수정일
- 태그
- 시리즈
- 읽는 데 걸리는 시간
- 대표 이미지

---

### 5.3 글 상세 읽기

독자는 `/posts/[slug]` 페이지에서 글을 읽는다.

글 상세 페이지는 다음 정보를 제공한다.

- 글 제목
- 글 설명
- 발행일
- 수정일
- 태그
- 시리즈
- 본문
- 목차
- 이전/다음 글
- 관련 글

---

### 5.4 태그 기반 탐색

독자는 특정 태그를 클릭하여 해당 태그가 붙은 글 목록을 볼 수 있다.

예시 경로:

```txt
/tags/architecture
/tags/frontend
/tags/ai
```

---

### 5.5 시리즈 기반 탐색

운영자는 여러 글을 하나의 시리즈로 묶을 수 있다.

독자는 시리즈 페이지에서 글을 순서대로 탐색할 수 있다.

예시 경로:

```txt
/series/software-architecture
/series/ai-engineering
```

---

### 5.6 디자인 교체

운영자는 Stitch 같은 디자인 생성 도구나 직접 만든 UI 시안을 바탕으로 블로그 디자인을 바꿀 수 있다.

이때 콘텐츠 로딩 로직은 변경하지 않는다.  
주로 다음 단위가 교체 대상이 된다.

- `PostCard`
- `PostList`
- `PostHeader`
- `TagBadge`
- `SeriesBadge`
- `SiteHeader`
- `SiteFooter`
- `HomeHero`

디자인 교체는 컴포넌트 props 계약과 디자인 토큰을 기준으로 수행한다.

---

### 5.7 AI 기반 디자인 개선 워크플로

운영자는 향후 Stitch MCP와 코딩 에이전트를 활용하여 블로그 디자인을 빠르게 실험하고 교체할 수 있다.

이 블로그 자체가 MCP 서버를 제공하는 것은 아니다.  
MCP는 개발 과정에서 코딩 에이전트가 Stitch 같은 외부 도구와 연결되어 UI 개선 작업을 수행하는 맥락에서 사용된다.

이를 위해 블로그는 다음 정보를 명확하게 유지한다.

- 주요 페이지 구조
- 컴포넌트 목록
- 컴포넌트 props 계약
- 교체 가능한 컴포넌트와 안정적으로 유지해야 하는 컴포넌트의 구분
- 디자인 토큰
- 콘텐츠 모델
- 콘텐츠 소스 인터페이스

예상 워크플로는 다음과 같다.

```txt
Stitch에서 UI 시안 생성
  ↓
코딩 에이전트가 시안 또는 디자인 의도를 해석
  ↓
components.manifest.json을 참고해 교체 대상 컴포넌트 파악
  ↓
PostCard, HomeHero, SiteHeader 등 replaceable 컴포넌트 수정
  ↓
design-tokens.json 또는 CSS variables 조정
  ↓
typecheck / lint / build 실행
  ↓
커밋 또는 PR로 반영
```

---

## 6. 기능 요구사항

### 6.1 콘텐츠 작성

운영자는 정적 파일을 통해 글을 작성할 수 있어야 한다.

지원 형식은 다음을 우선 고려한다.

- Markdown
- MDX
- JSON

초기 우선순위는 Markdown 또는 MDX다.

---

### 6.2 콘텐츠 메타데이터

각 글은 frontmatter를 통해 메타데이터를 가져야 한다.

필수 필드:

```ts
interface PostFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  status: "draft" | "published" | "archived";
  tags: string[];
}
```

선택 필드:

```ts
interface OptionalPostFrontmatter {
  updatedAt?: string;
  series?: string;
  heroImage?: string;
  canonicalUrl?: string;
}
```

---

### 6.3 콘텐츠 검증

빌드 과정에서 콘텐츠 스키마를 검증해야 한다.

검증 항목은 다음과 같다.

- 필수 필드 존재 여부
- slug 중복 여부
- 날짜 형식 유효성
- status 값 유효성
- tags 배열 형식
- series 참조 유효성
- heroImage 경로 유효성

콘텐츠 검증에 실패하면 빌드가 실패해야 한다.

---

### 6.4 글 목록

시스템은 발행된 글 목록을 최신순으로 보여줘야 한다.

글 목록은 `PostSummary` 모델을 기반으로 렌더링한다.

```ts
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
```

---

### 6.5 글 상세

시스템은 slug를 기준으로 글 상세 페이지를 렌더링해야 한다.

글 상세는 `Post` 모델을 기반으로 한다.

```ts
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
```

```ts
export interface ContentSourceMeta {
  type: "filesystem" | "database" | "cms" | "remote";
  path?: string;
  commitHash?: string;
  version?: string;
}
```

---

### 6.6 태그 탐색

시스템은 전체 글에서 태그를 수집하고, 태그별 글 목록을 제공해야 한다.

```ts
export interface Tag {
  slug: string;
  name: string;
  postCount: number;
}
```

---

### 6.7 시리즈 탐색

시스템은 여러 글을 하나의 시리즈로 묶어 보여줄 수 있어야 한다.

```ts
export interface Series {
  slug: string;
  title: string;
  description?: string;
  posts: PostSummary[];
}
```

시리즈 내 글은 발행일 또는 명시적 순서 값을 기준으로 정렬할 수 있어야 한다.

---

### 6.8 코드 블록 렌더링

기술 블로그 특성상 코드 블록의 가독성이 중요하다.

코드 블록은 다음을 지원해야 한다.

- syntax highlighting
- filename 표시
- line number 표시
- copy button
- 긴 코드의 overflow 처리

예시:

```tsx
<CodeBlock language="tsx" filename="PostCard.tsx" code={code} />
```

---

### 6.9 목차

글 상세 페이지는 heading 구조를 기반으로 목차를 생성할 수 있어야 한다.

목차는 다음 정보를 가진다.

```ts
export interface TocItem {
  id: string;
  text: string;
  depth: number;
}
```

---

### 6.10 관련 글

글 상세 페이지 하단에는 관련 글을 표시할 수 있어야 한다.

초기 관련 글 기준은 다음을 사용한다.

1. 같은 시리즈의 글
2. 같은 태그를 가진 글
3. 최신 글

관련 글 추천 로직은 별도 서비스로 분리한다.

```ts
export interface RelatedPostService {
  getRelatedPosts(post: Post, limit?: number): Promise<PostSummary[]>;
}
```

---

### 6.11 SEO 메타데이터

각 페이지는 SEO 메타데이터를 생성해야 한다.

글 상세 페이지는 다음 정보를 가진다.

- title
- description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- published time
- modified time
- tags

---

### 6.12 RSS

시스템은 발행된 글을 기준으로 RSS feed를 생성해야 한다.

경로:

```txt
/rss.xml
```

RSS에는 다음 정보가 포함된다.

- title
- description
- link
- publishedAt
- updatedAt
- author
- tags

---

### 6.13 Sitemap

시스템은 주요 페이지와 글 상세 페이지를 포함한 sitemap을 생성해야 한다.

경로:

```txt
/sitemap.xml
```

포함 대상:

- 홈
- 글 목록
- 글 상세
- 태그 페이지
- 시리즈 페이지
- About 페이지

---

## 7. 콘텐츠 소스 설계

### 7.1 핵심 원칙

UI는 콘텐츠가 파일 시스템에 있는지, DB에 있는지, CMS에 있는지 알면 안 된다.

UI는 오직 `ContentSource` 인터페이스를 통해 콘텐츠를 가져온다.

---

### 7.2 ContentSource 인터페이스

```ts
export interface ContentSource {
  listPosts(params?: ListPostsParams): Promise<PostSummary[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  listTags(): Promise<Tag[]>;
  listSeries(): Promise<Series[]>;
  searchPosts?(query: string): Promise<PostSummary[]>;
}
```

```ts
export interface ListPostsParams {
  tag?: string;
  series?: string;
  status?: "published" | "draft" | "archived";
  limit?: number;
  offset?: number;
  orderBy?: "publishedAt" | "updatedAt";
  order?: "asc" | "desc";
}
```

---

### 7.3 FileSystemContentSource

초기 구현체는 파일 시스템 기반이다.

```ts
export class FileSystemContentSource implements ContentSource {
  async listPosts(params?: ListPostsParams): Promise<PostSummary[]> {
    // content/posts 디렉토리 읽기
    // frontmatter 파싱
    // schema validation
    // status 필터링
    // 날짜 정렬
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    // slug에 해당하는 글 파일 찾기
    // 본문과 metadata 반환
  }

  async listTags(): Promise<Tag[]> {
    // 모든 글의 tags 집계
  }

  async listSeries(): Promise<Series[]> {
    // series metadata와 글 목록 조합
  }
}
```

---

### 7.4 향후 DatabaseContentSource

향후 DB 기반 콘텐츠 저장소를 도입할 때는 같은 인터페이스를 구현한다.

```ts
export class DatabaseContentSource implements ContentSource {
  async listPosts(params?: ListPostsParams): Promise<PostSummary[]> {
    // DB query
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    // DB query
  }

  async listTags(): Promise<Tag[]> {
    // DB aggregation
  }

  async listSeries(): Promise<Series[]> {
    // DB query
  }
}
```

---

### 7.5 ContentService

`ContentService`는 UI와 `ContentSource` 사이의 응용 계층이다.

역할:

- published 글만 노출
- 관련 글 계산
- 읽기 시간 계산
- 정렬 규칙 적용
- SEO metadata 생성에 필요한 데이터 제공

```ts
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
}
```

---

## 8. 페이지 구조

### 8.1 Home

경로:

```txt
/
```

역할:

- 블로그 소개
- 최신 글 노출
- 주요 시리즈 노출
- 대표 프로젝트 또는 소개 링크 제공

주요 컴포넌트:

- `HomeHero`
- `FeaturedPostList`
- `RecentPostList`
- `SeriesPreviewList`
- `ProfileSummary`

---

### 8.2 Posts

경로:

```txt
/posts
```

역할:

- 전체 글 목록 표시
- 태그 필터 제공
- 시리즈 필터 제공

주요 컴포넌트:

- `PostListPage`
- `PostFilterBar`
- `PostList`
- `PostCard`
- `TagFilter`
- `SeriesFilter`

---

### 8.3 Post Detail

경로:

```txt
/posts/[slug]
```

역할:

- 글 본문 표시
- 글 메타데이터 표시
- 목차 표시
- 관련 글 표시
- 이전/다음 글 표시

주요 컴포넌트:

- `PostDetailPage`
- `PostHeader`
- `PostMeta`
- `PostContent`
- `TableOfContents`
- `TagList`
- `RelatedPosts`
- `PostNavigation`

---

### 8.4 Tags

경로:

```txt
/tags
/tags/[tag]
```

역할:

- 전체 태그 목록 표시
- 특정 태그의 글 목록 표시

주요 컴포넌트:

- `TagListPage`
- `TagPage`
- `TagBadge`
- `PostList`

---

### 8.5 Series

경로:

```txt
/series
/series/[seriesSlug]
```

역할:

- 전체 시리즈 목록 표시
- 특정 시리즈의 글 목록 표시
- 시리즈 내 글 순서 표시

주요 컴포넌트:

- `SeriesListPage`
- `SeriesPage`
- `SeriesCard`
- `SeriesPostList`

---

### 8.6 About

경로:

```txt
/about
```

역할:

- 운영자 소개
- 기술 관심사
- 프로젝트
- 발표, 글, 경력 링크 제공

주요 컴포넌트:

- `AboutProfile`
- `ProjectList`
- `CareerSummary`
- `ExternalLinks`

---

## 9. 컴포넌트 설계

### 9.1 설계 원칙

컴포넌트는 역할에 따라 다음 세 계층으로 나눈다.

```txt
Page Components
  ↓
Domain UI Components
  ↓
Primitive / Design Components
```

콘텐츠 로딩은 컴포넌트 내부에 넣지 않는다.  
컴포넌트는 props로 받은 데이터를 렌더링한다.

---

### 9.2 Layout Components

```txt
AppShell
SiteHeader
SiteFooter
MainContainer
PageHeader
```

역할:

- 전체 레이아웃 구성
- 공통 네비게이션 제공
- 페이지 폭과 여백 관리

---

### 9.3 Blog Components

```txt
PostCard
PostList
PostHeader
PostMeta
PostContent
PostNavigation
RelatedPosts
TableOfContents
TagBadge
SeriesBadge
```

역할:

- 글 목록과 글 상세 화면 구성
- 블로그 도메인에 특화된 UI 제공

---

### 9.4 Content Rendering Components

```txt
MarkdownRenderer
MDXRenderer
CodeBlock
Callout
ImageBlock
QuoteBlock
Heading
```

역할:

- 본문 렌더링
- 코드, 이미지, 인용, 콜아웃 등 콘텐츠 블록 처리

---

### 9.5 Discovery Components

```txt
SearchBox
TagFilter
SeriesFilter
ArchiveList
```

역할:

- 콘텐츠 탐색 경험 제공
- 태그, 시리즈, 검색, 아카이브 탐색 지원

초기 검색은 정적 검색 또는 클라이언트 필터 수준으로 시작할 수 있다.

---

## 10. 디자인 교체 가능성

### 10.1 핵심 원칙

디자인은 바뀔 수 있지만, 콘텐츠 모델과 콘텐츠 소스는 쉽게 바뀌면 안 된다.

따라서 다음을 분리한다.

```txt
Content Logic
Rendering Logic
Design Components
Design Tokens
```

디자인 교체는 주로 `Design Components`와 `Design Tokens`에서 이루어진다.

---

### 10.2 디자인 토큰

디자인 토큰은 별도 파일로 관리한다.

예시:

```json
{
  "color": {
    "background": "#ffffff",
    "foreground": "#111111",
    "muted": "#666666",
    "primary": "#2563eb",
    "border": "#e5e7eb"
  },
  "font": {
    "sans": "Inter, Pretendard, sans-serif",
    "mono": "JetBrains Mono, monospace"
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px"
  },
  "spacing": {
    "pageX": "24px",
    "sectionY": "64px"
  }
}
```

---

### 10.3 컴포넌트 Manifest

코딩 에이전트와 개발자가 컴포넌트 구조를 쉽게 이해할 수 있도록 manifest를 둔다.

파일명:

```txt
components.manifest.json
```

예시:

```json
{
  "components": [
    {
      "name": "PostCard",
      "path": "src/components/blog/PostCard.tsx",
      "purpose": "글 목록에서 하나의 글 요약을 카드 형태로 보여준다.",
      "replaceable": true,
      "props": {
        "post": "PostSummary"
      },
      "designNotes": [
        "콘텐츠 데이터 접근 로직을 포함하지 않는다.",
        "클릭 시 /posts/[slug]로 이동한다.",
        "카드형, 리스트형, 미니멀형 디자인으로 교체 가능해야 한다."
      ]
    },
    {
      "name": "PostContent",
      "path": "src/components/blog/PostContent.tsx",
      "purpose": "Markdown 또는 MDX로 변환된 본문을 렌더링한다.",
      "replaceable": false,
      "props": {
        "post": "Post"
      },
      "designNotes": [
        "본문 렌더링 안정성이 중요하므로 직접 교체보다는 typography token으로 스타일을 조정한다."
      ]
    }
  ]
}
```

---

### 10.4 교체 우선순위

디자인을 변경할 때는 다음 순서로 변경한다.

1. 디자인 토큰 변경
2. replaceable 컴포넌트 교체
3. 레이아웃 컴포넌트 교체
4. 렌더링 계층 변경

핵심 콘텐츠 로직과 `ContentSource`는 디자인 변경의 영향을 받지 않아야 한다.

---

## 11. AI 기반 디자인 개선 전략

### 11.1 목적

블로그의 디자인은 시간이 지나며 여러 번 바뀔 수 있다.

초기에는 직접 구현한 디자인으로 시작하지만, 향후 Stitch 같은 UI 생성 도구와 코딩 에이전트를 활용해 디자인을 더 빠르게 실험하고 교체할 수 있도록 한다.

이때 중요한 것은 블로그 자체에 MCP 기능을 넣는 것이 아니라, **외부 코딩 에이전트가 프로젝트 구조를 쉽게 이해할 수 있게 만드는 것**이다.

---

### 11.2 Stitch MCP 활용 맥락

Stitch MCP는 블로그 앱의 런타임 기능이 아니라, 개발자가 디자인을 개선하는 과정에서 사용할 수 있는 외부 개발 도구로 간주한다.

예상 흐름은 다음과 같다.

```txt
Stitch에서 UI 시안 생성
  ↓
코딩 에이전트가 시안 또는 디자인 의도를 해석
  ↓
components.manifest.json 확인
  ↓
교체 가능한 컴포넌트 식별
  ↓
컴포넌트 수정
  ↓
디자인 토큰 수정
  ↓
검증 명령 실행
  ↓
커밋 또는 PR 반영
```

---

### 11.3 코딩 에이전트가 이해해야 하는 구조

```txt
src/components/layout
src/components/blog
src/components/content
src/components/discovery
design-tokens.json
components.manifest.json
src/content/domain
src/content/sources
src/content/services
```

각 영역의 책임은 다음과 같다.

```txt
콘텐츠 로딩: src/content/sources
콘텐츠 가공: src/content/services
본문 렌더링: src/components/content
블로그 UI: src/components/blog
공통 레이아웃: src/components/layout
디자인 기준: design-tokens.json
컴포넌트 설명: components.manifest.json
```

---

### 11.4 우선 교체 대상 컴포넌트

디자인 도구와 코딩 에이전트가 우선적으로 수정할 수 있는 컴포넌트는 다음과 같다.

```txt
HomeHero
PostCard
PostList
PostHeader
PostMeta
TagBadge
SeriesBadge
SiteHeader
SiteFooter
ProfileSummary
SeriesCard
```

이 컴포넌트들은 props 계약을 유지하는 한 자유롭게 디자인을 바꿀 수 있다.

---

### 11.5 안정적으로 유지해야 하는 영역

다음 영역은 디자인 교체 과정에서 안정성을 우선한다.

```txt
ContentSource
FileSystemContentSource
ContentService
postSchema
MarkdownRenderer
MDXRenderer
SEO metadata generation
route structure
```

이 영역들은 블로그의 데이터 흐름과 렌더링 안정성을 담당한다.

---

## 12. 추천 폴더 구조

```txt
src/
  app/
    page.tsx
    posts/
      page.tsx
      [slug]/
        page.tsx
    tags/
      page.tsx
      [tag]/
        page.tsx
    series/
      page.tsx
      [seriesSlug]/
        page.tsx
    about/
      page.tsx
    rss.xml/
      route.ts
    sitemap.xml/
      route.ts

  components/
    layout/
      AppShell.tsx
      SiteHeader.tsx
      SiteFooter.tsx
      MainContainer.tsx

    blog/
      PostCard.tsx
      PostList.tsx
      PostHeader.tsx
      PostMeta.tsx
      PostContent.tsx
      PostNavigation.tsx
      RelatedPosts.tsx
      TableOfContents.tsx
      TagBadge.tsx
      SeriesBadge.tsx

    content/
      MarkdownRenderer.tsx
      MDXRenderer.tsx
      CodeBlock.tsx
      Callout.tsx
      ImageBlock.tsx
      QuoteBlock.tsx

    discovery/
      SearchBox.tsx
      TagFilter.tsx
      SeriesFilter.tsx
      ArchiveList.tsx

  content/
    domain/
      Post.ts
      Tag.ts
      Series.ts

    sources/
      ContentSource.ts
      FileSystemContentSource.ts
      DatabaseContentSource.ts

    services/
      ContentService.ts
      ReadingTimeService.ts
      RelatedPostService.ts
      TocService.ts

    validation/
      postSchema.ts
      validateContent.ts

  design/
    tokens.ts
    theme.ts

  config/
    site.config.ts

content/
  posts/
  series/
  authors/

components.manifest.json
design-tokens.json
```

---

## 13. 기술 요구사항

### 13.1 콘텐츠 검증

콘텐츠 검증은 빌드 전에 수행한다.

검증 실패 시 빌드가 실패해야 한다.

```txt
pnpm validate:content
pnpm build
```

---

### 13.2 타입 안정성

콘텐츠 모델, 컴포넌트 props, 서비스 계층은 TypeScript 타입으로 정의한다.

중요한 타입은 다음에 위치한다.

```txt
src/content/domain
src/content/sources
src/content/services
```

---

### 13.3 렌더링 전략

정적으로 생성 가능한 페이지는 정적 생성한다.

대상:

- 홈
- 글 목록
- 글 상세
- 태그 페이지
- 시리즈 페이지
- About
- RSS
- Sitemap

---

### 13.4 성능

블로그는 다음 성능 기준을 만족해야 한다.

- 글 목록은 빠르게 렌더링되어야 한다.
- 글 상세 페이지는 정적 생성되어야 한다.
- 이미지 최적화를 적용해야 한다.
- 코드 하이라이팅으로 인해 초기 번들이 과도하게 커지지 않아야 한다.
- 클라이언트 컴포넌트 사용을 최소화해야 한다.

---

### 13.5 접근성

블로그는 다음 접근성 기준을 고려한다.

- heading 구조를 올바르게 유지한다.
- 키보드 탐색이 가능해야 한다.
- 링크와 버튼의 역할이 명확해야 한다.
- 색상 대비를 충분히 확보한다.
- 이미지에는 alt를 제공한다.

---

## 14. MVP 기능 범위

MVP는 다음 기능을 포함한다.

### 콘텐츠

- Markdown 또는 MDX 기반 글 작성
- frontmatter 기반 메타데이터 관리
- Git commit 기반 발행
- 콘텐츠 스키마 검증
- published 글 목록 생성
- 글 상세 페이지 생성

### 탐색

- 전체 글 목록
- 태그별 글 목록
- 시리즈별 글 목록
- 관련 글
- 이전/다음 글

### 렌더링

- Markdown/MDX 렌더링
- 코드 블록 렌더링
- 목차 생성
- 이미지 렌더링
- 콜아웃 렌더링

### SEO

- 페이지별 metadata
- Open Graph metadata
- RSS
- Sitemap
- canonical URL

### 확장성

- `ContentSource` 인터페이스
- `FileSystemContentSource` 구현
- 향후 `DatabaseContentSource` 교체 가능 구조
- `components.manifest.json`
- `design-tokens.json`
- Stitch MCP와 코딩 에이전트 활용을 고려한 컴포넌트 구조

---

## 15. 성공 기준

### 15.1 운영자 관점

운영자는 다음을 할 수 있어야 한다.

- 새 글 파일을 추가하고 commit만으로 글을 발행할 수 있다.
- 잘못된 frontmatter를 작성하면 빌드 전에 오류를 확인할 수 있다.
- 글의 태그와 시리즈를 쉽게 관리할 수 있다.
- 디자인 변경 시 어떤 컴포넌트를 수정해야 하는지 알 수 있다.

### 15.2 독자 관점

독자는 다음을 할 수 있어야 한다.

- 최신 글을 쉽게 찾을 수 있다.
- 글을 편하게 읽을 수 있다.
- 관심 태그의 글을 탐색할 수 있다.
- 시리즈 글을 순서대로 읽을 수 있다.
- 검색 엔진이나 RSS를 통해 글을 발견할 수 있다.

### 15.3 개발자 관점

개발자는 다음을 할 수 있어야 한다.

- 파일 기반 콘텐츠 소스를 DB 기반 콘텐츠 소스로 교체할 수 있다.
- UI 컴포넌트가 콘텐츠 저장 방식에 직접 의존하지 않도록 유지할 수 있다.
- 디자인 토큰과 컴포넌트 manifest를 통해 UI 교체 범위를 파악할 수 있다.
- Stitch MCP와 코딩 에이전트를 활용해 디자인 개선 작업을 비교적 안전하게 수행할 수 있다.

---

## 16. 단계별 구현 계획

### Phase 1. 정적 블로그 기반 구축

목표는 Git 기반으로 글을 발행할 수 있는 기본 블로그를 만드는 것이다.

구현 항목:

- 프로젝트 초기 세팅
- 콘텐츠 디렉토리 구조 정의
- Post schema 정의
- FileSystemContentSource 구현
- ContentService 구현
- 글 목록 페이지
- 글 상세 페이지
- Markdown/MDX 렌더러
- 기본 레이아웃

---

### Phase 2. 탐색과 SEO 강화

목표는 독자가 글을 쉽게 발견하고 탐색할 수 있게 만드는 것이다.

구현 항목:

- 태그 페이지
- 시리즈 페이지
- 관련 글
- 이전/다음 글
- RSS
- Sitemap
- Open Graph metadata
- canonical URL

---

### Phase 3. 디자인 교체 가능성 확보

목표는 디자인을 안정적으로 교체할 수 있는 구조를 만드는 것이다.

구현 항목:

- design tokens 정의
- components manifest 작성
- replaceable 컴포넌트 구분
- PostCard, Header, Footer, HomeHero 교체 가능 구조화
- Stitch 등 외부 디자인 도구 산출물 반영 실험

---

### Phase 4. AI 기반 디자인 개선 워크플로 정리

목표는 코딩 에이전트가 프로젝트 구조를 이해하고 디자인 변경을 안전하게 수행할 수 있도록 만드는 것이다.

구현 항목:

- `components.manifest.json` 정교화
- replaceable 컴포넌트와 stable 컴포넌트 구분
- 디자인 토큰 문서화
- 컴포넌트 props 계약 문서화
- Stitch MCP 활용 시나리오 정리
- 디자인 변경 후 검증 명령 정리

예상 검증 명령:

```txt
pnpm lint
pnpm typecheck
pnpm validate:content
pnpm build
```

---

### Phase 5. 동적 콘텐츠 소스 확장

목표는 콘텐츠 저장소를 파일 시스템 외부로 확장할 수 있게 만드는 것이다.

구현 항목:

- DatabaseContentSource 구현
- CMSContentSource 가능성 검토
- 검색 인덱스 연동
- preview mode 설계
- 콘텐츠 관리 워크플로 개선

---

## 17. 핵심 아키텍처 요약

### 콘텐츠 흐름

```txt
content/posts/*.md
  ↓
FileSystemContentSource
  ↓
ContentService
  ↓
Page
  ↓
Components
```

### 향후 DB 전환 흐름

```txt
Database
  ↓
DatabaseContentSource
  ↓
ContentService
  ↓
Page
  ↓
Components
```

### 디자인 교체 흐름

```txt
design-tokens.json
  ↓
Theme / CSS Variables
  ↓
Replaceable Components
  ↓
Pages
```

### AI 기반 디자인 개선 흐름

```txt
Stitch / 디자인 시안
  ↓
코딩 에이전트
  ↓
components.manifest.json
  ↓
replaceable components
  ↓
lint / typecheck / build
  ↓
commit / PR
```

---

## 18. 최종 요약

이 PRD의 핵심은 다음이다.

> 초기에는 Git 커밋 기반 정적 블로그로 빠르게 시작한다.  
> 하지만 콘텐츠 접근, UI 컴포넌트, 디자인 토큰, 컴포넌트 manifest를 분리하여 장기적으로 DB/CMS/디자인 자동화/코딩 에이전트 기반 개선에 대응 가능한 구조로 만든다.

가장 중요한 구현 원칙은 세 가지다.

1. **UI는 파일 시스템을 직접 알지 않는다.**
2. **디자인은 컴포넌트 계약과 토큰을 기준으로 교체한다.**
3. **MCP는 블로그 내부 기능이 아니라, Stitch와 코딩 에이전트를 활용한 개발 워크플로 맥락에서 고려한다.**
