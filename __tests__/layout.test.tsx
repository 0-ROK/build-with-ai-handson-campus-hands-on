import { isValidElement, type ReactElement, type ReactNode } from "react";
import { describe, expect, test } from "vitest";

import RootLayout, { metadata } from "../src/app/layout";

type TestElementProps = {
  children?: ReactNode;
  lang?: string;
};

describe("RootLayout", () => {
  test("defines default blog metadata", () => {
    expect(metadata).toMatchObject({
      description: "A carefully tested starting point for the DIY-ary blog.",
      title: "DIY-ary",
    });
  });

  test("renders a Korean document shell around children", () => {
    const child = <main>블로그 본문</main>;
    const element = RootLayout({ children: child });

    expect(isValidElement<TestElementProps>(element)).toBe(true);

    const html = element as ReactElement<TestElementProps>;
    expect(html.type).toBe("html");
    expect(html.props.lang).toBe("ko");

    expect(isValidElement<TestElementProps>(html.props.children)).toBe(true);

    const body = html.props.children as ReactElement<TestElementProps>;
    expect(body.type).toBe("body");

    // body.props.children is now an array: [SiteHeader, main, SiteFooter]
    const bodyChildren = body.props
      .children as ReactElement<TestElementProps>[];
    expect(bodyChildren).toHaveLength(3);

    const mainWrapper = bodyChildren[1];
    expect(mainWrapper.type).toBe("main");
    expect(mainWrapper.props.children).toBe(child);
  });
});
