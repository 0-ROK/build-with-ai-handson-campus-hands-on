import type { Metadata } from "next";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  description: "A carefully tested starting point for the DIY-ary blog.",
  title: "DIY-ary",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
