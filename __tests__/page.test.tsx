import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Page from "../src/app/page";

describe("Page", () => {
  test("renders the blog preparation message", () => {
    render(<Page />);

    expect(screen.getByText("DIY-ary")).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 1, name: "블로그 준비 중" }),
    ).toBeDefined();
    expect(
      screen.getByText("커밋 전 품질 게이트부터 단단히 세웁니다."),
    ).toBeDefined();
  });
});
