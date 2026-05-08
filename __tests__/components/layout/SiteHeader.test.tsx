import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/SiteHeader";

describe("SiteHeader", () => {
  it("renders the logo and navigation links", () => {
    render(<SiteHeader />);

    expect(screen.getByText("DIY")).toBeDefined();
    expect(screen.getByText("-ary")).toBeDefined();
    expect(screen.getByText("All Posts")).toBeDefined();
    expect(screen.getByText("Series")).toBeDefined();
    expect(screen.getByText("Tags")).toBeDefined();
  });
});
