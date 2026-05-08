import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";

describe("MarkdownRenderer", () => {
  it("renders basic markdown elements correctly", () => {
    const content =
      "# Header 1\n## Header 2\n**Bold Text**\n* Item 1\n`code block`";
    const { container } = render(<MarkdownRenderer content={content} />);

    expect(container.querySelector(".md-h1")?.textContent).toBe("Header 1");
    expect(container.querySelector(".md-h2")?.textContent).toBe("Header 2");
    expect(container.querySelector("strong")?.textContent).toBe("Bold Text");
    expect(container.querySelector(".md-li")?.textContent).toBe("Item 1");
    expect(container.querySelector(".md-code")?.textContent).toBe("code block");
  });

  it("handles multiple list items", () => {
    const content = "* Item 1\n* Item 2";
    const { container } = render(<MarkdownRenderer content={content} />);
    const items = container.querySelectorAll(".md-li");
    expect(items).toHaveLength(2);
    expect(container.querySelector(".md-ul")).toBeDefined();
  });
});
