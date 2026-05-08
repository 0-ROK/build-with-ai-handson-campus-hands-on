import fs from "fs/promises";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from "vitest";
import { FileSystemContentSource } from "../../src/content/sources/FileSystemContentSource";

type ReaddirMock = MockedFunction<(path: string) => Promise<string[]>>;
type ReadFileMock = MockedFunction<
  (path: string, encoding: BufferEncoding) => Promise<string>
>;

const readdirMock = () => vi.mocked(fs.readdir) as unknown as ReaddirMock;
const readFileMock = () => vi.mocked(fs.readFile) as unknown as ReadFileMock;

const postFile = ({
  body = "Content",
  filename = "post1.md",
  frontmatter = "",
}: {
  body?: string;
  filename?: string;
  frontmatter?: string;
} = {}) => `---
id: ${filename.replace(/\.mdx?$/, "")}
slug: ${filename.replace(/\.mdx?$/, "")}
title: ${filename}
description: Desc
publishedAt: 2026-05-08
status: published
tags:
${frontmatter}---
${body}`;

vi.mock("fs/promises", () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
    access: vi.fn(),
    mkdir: vi.fn(),
  },
  readdir: vi.fn(),
  readFile: vi.fn(),
  access: vi.fn(),
  mkdir: vi.fn(),
}));

describe("FileSystemContentSource", () => {
  let source: FileSystemContentSource;

  beforeEach(() => {
    vi.clearAllMocks();
    source = new FileSystemContentSource("/test/path");
    readdirMock().mockResolvedValue([]);
    vi.mocked(fs.access).mockResolvedValue(undefined);
  });

  it("should list posts by reading directory and files", async () => {
    readdirMock().mockResolvedValue(["post1.md"]);
    readFileMock().mockResolvedValue(`---
id: post1
slug: post1
title: Post 1
description: Desc
publishedAt: 2026-05-08
status: published
tags:
---
Content`);

    const posts = await source.listPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe("post1");
  });

  it("should return null if slug not found", async () => {
    readdirMock().mockResolvedValue(["post1.md"]);
    readFileMock().mockResolvedValue(`---
id: post1
slug: post1
title: Post 1
description: Desc
publishedAt: 2026-05-08
status: published
tags:
---
Content`);

    const post = await source.getPostBySlug("other");
    expect(post).toBeNull();
  });

  it("should return post by slug", async () => {
    readdirMock().mockResolvedValue(["post1.md"]);
    readFileMock().mockResolvedValue(`---
id: post1
slug: post1
title: Post 1
description: Desc
publishedAt: 2026-05-08
status: published
tags:
---
Content`);

    const post = await source.getPostBySlug("post1");
    expect(post?.slug).toBe("post1");
    expect(post?.body.trim()).toBe("Content");
  });

  it("should calculate tags and series", async () => {
    readdirMock().mockResolvedValue(["post1.md"]);
    readFileMock().mockResolvedValue(`---
id: post1
slug: post1
title: Post 1
description: Desc
publishedAt: 2026-05-08
status: published
tags:
  - tag1
series: series1
---
Content`);

    const tags = await source.listTags();
    expect(tags).toContainEqual(
      expect.objectContaining({ slug: "tag1", postCount: 1 }),
    );

    const series = await source.listSeries();
    expect(series).toContainEqual(
      expect.objectContaining({ slug: "series1", title: "series1" }),
    );
  });

  it("should create the content directory when it is missing", async () => {
    vi.mocked(fs.access).mockRejectedValue(new Error("missing"));
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);

    await source.listPosts();

    expect(fs.mkdir).toHaveBeenCalledWith("/test/path", { recursive: true });
  });

  it("should ignore non-markdown files and invalid markdown", async () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);

    readdirMock().mockResolvedValue(["notes.txt", "broken.md"]);
    readFileMock().mockResolvedValue(`---
id: broken
slug: broken
title: Broken
description: Desc
publishedAt: nope
status: published
tags:
---
Content`);

    const posts = await source.listPosts();

    expect(posts).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith("Skipping invalid file broken.md");
  });

  it("should filter, sort, and paginate posts", async () => {
    readdirMock().mockResolvedValue(["old.md", "new.md", "draft.md"]);
    readFileMock().mockImplementation(async (filePath) => {
      if (filePath.endsWith("old.md")) {
        return `---
id: old
slug: old
title: Old
description: Desc
publishedAt: 2026-05-01
updatedAt: 2026-05-03
status: published
tags:
  - keep
series: selected
---
Old content`;
      }

      if (filePath.endsWith("new.md")) {
        return `---
id: new
slug: new
title: New
description: Desc
publishedAt: 2026-05-02
updatedAt: 2026-05-04
status: published
tags:
  - keep
series: selected
---
New content`;
      }

      return `---
id: draft
slug: draft
title: Draft
description: Desc
publishedAt: 2026-05-05
status: draft
tags:
  - keep
series: selected
---
Draft content`;
    });

    const posts = await source.listPosts({
      limit: 1,
      offset: 1,
      order: "asc",
      orderBy: "updatedAt",
      series: "selected",
      status: "published",
      tag: "keep",
    });

    expect(posts).toHaveLength(1);
    expect(posts[0].slug).toBe("new");
  });

  it("should apply tag, series, and offset-only filters", async () => {
    readdirMock().mockResolvedValue(["a.md", "b.md", "c.md"]);
    readFileMock().mockImplementation(async (filePath) => {
      if (filePath.endsWith("a.md")) {
        return postFile({
          filename: "a.md",
          frontmatter: "  - keep\nseries: selected\n",
        });
      }

      if (filePath.endsWith("b.md")) {
        return postFile({
          filename: "b.md",
          frontmatter: "  - skip\nseries: selected\n",
        });
      }

      return postFile({
        filename: "c.md",
        frontmatter: "  - keep\nseries: other\n",
      });
    });

    const posts = await source.listPosts({
      offset: 1,
      series: "selected",
      tag: "keep",
    });

    expect(posts).toEqual([]);
  });

  it("should fall back to publishedAt when sorting by missing updatedAt", async () => {
    readdirMock().mockResolvedValue(["older.md", "newer.md"]);
    readFileMock().mockImplementation(async (filePath) =>
      postFile({
        filename: filePath.endsWith("older.md") ? "older.md" : "newer.md",
        frontmatter: "  - tag1\n",
      }).replace(
        "publishedAt: 2026-05-08",
        filePath.endsWith("older.md")
          ? "publishedAt: 2026-05-08"
          : "publishedAt: 2026-05-09",
      ),
    );

    const posts = await source.listPosts({
      orderBy: "updatedAt",
    });

    expect(posts.map((post) => post.slug)).toEqual(["newer", "older"]);
  });

  it("should return null when slug lookup only sees non-markdown files", async () => {
    readdirMock().mockResolvedValue(["notes.txt"]);

    const post = await source.getPostBySlug("notes");

    expect(post).toBeNull();
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it("should return mdx posts and ignore invalid files while finding a slug", async () => {
    readdirMock().mockResolvedValue(["broken.md", "post1.mdx"]);
    readFileMock().mockImplementation(async (filePath) => {
      if (filePath.endsWith("broken.md")) {
        return "Not frontmatter";
      }

      return postFile({
        filename: "post1.mdx",
        frontmatter: "  - tag1\n",
      });
    });

    const post = await source.getPostBySlug("post1");

    expect(post?.format).toBe("mdx");
    expect(post?.source.path).toBe("/test/path/post1.mdx");
  });

  it("should count repeated tags and append posts to existing series", async () => {
    readdirMock().mockResolvedValue(["post1.md", "post2.md"]);
    readFileMock().mockImplementation(async (filePath) =>
      postFile({
        filename: filePath.endsWith("post1.md") ? "post1.md" : "post2.md",
        frontmatter: "  - tag1\nseries: series1\n",
      }),
    );

    const tags = await source.listTags();
    const series = await source.listSeries();

    expect(tags).toContainEqual(
      expect.objectContaining({ slug: "tag1", postCount: 2 }),
    );
    expect(series[0].posts).toHaveLength(2);
  });

  it("should omit posts without series from series listings", async () => {
    readdirMock().mockResolvedValue(["post1.md"]);
    readFileMock().mockResolvedValue(
      postFile({
        frontmatter: "  - tag1\n",
      }),
    );

    const series = await source.listSeries();

    expect(series).toEqual([]);
  });
});
