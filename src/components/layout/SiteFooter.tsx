export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} DIY-ary. All rights reserved.</p>
        <div className="footer-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
