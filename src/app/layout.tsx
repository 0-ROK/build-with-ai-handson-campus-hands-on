import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

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
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
