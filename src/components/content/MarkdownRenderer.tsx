export function MarkdownRenderer({ content }: { content: string }) {
  // Simple markdown to HTML converter for basic elements
  // This is a temporary solution since we cannot install external packages right now.
  let html = content
    .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
    .replace(/^\* (.*$)/gim, '<li class="md-li">$1</li>')
    .replace(/^\- (.*$)/gim, '<li class="md-li">$1</li>')
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/`(.*)`/gim, '<code class="md-code">$1</code>')
    .replace(/\n/gim, "<br />");

  // Wrap list items
  html = html.replace(
    /(<li class="md-li">.*<\/li>)/gim,
    '<ul class="md-ul">$1</ul>',
  );
  // Fix nested ul tags
  html = html.replace(/<\/ul>\s*<ul class="md-ul">/gim, "");

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
