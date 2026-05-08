import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="container site-nav">
        <Link href="/" className="site-logo">
          DIY<span>-ary</span>
        </Link>
        <div className="nav-links">
          <Link href="/posts">All Posts</Link>
          <Link href="/series">Series</Link>
          <Link href="/tags">Tags</Link>
        </div>
      </nav>
    </header>
  );
}
