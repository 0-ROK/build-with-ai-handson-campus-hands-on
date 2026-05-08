import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/SiteFooter";

describe("SiteFooter", () => {
  it("renders copyright and social links", () => {
    render(<SiteFooter />);

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeDefined();
    expect(screen.getByText("GitHub")).toBeDefined();
    expect(screen.getByText("LinkedIn")).toBeDefined();
  });
});
