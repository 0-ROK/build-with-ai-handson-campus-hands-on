export function parseMarkdown(fileContent: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterString = match[1];
  const content = match[2];

  const data: Record<string, unknown> = {};
  const lines = frontmatterString.split("\n");

  let currentKey = "";
  let isArray = false;

  for (const line of lines) {
    if (line.trim() === "") continue;

    // Check for array items
    if (line.trim().startsWith("- ")) {
      if (currentKey && isArray) {
        (data[currentKey] as string[]).push(line.replace("-", "").trim());
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      if (value === "") {
        currentKey = key;
        isArray = true;
        data[key] = [];
      } else {
        currentKey = "";
        isArray = false;
        // removing surrounding quotes if present
        data[key] = value.replace(/^['"](.*)['"]$/, "$1");
      }
    }
  }

  return { data, content };
}
