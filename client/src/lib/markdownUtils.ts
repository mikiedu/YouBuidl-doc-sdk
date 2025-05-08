import { slugify } from "./utils";

// Function to add IDs to heading elements in markdown content
export function addIdsToHeadings(content: string): string {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  return content.replace(headingRegex, (match, hashes, title) => {
    const slug = slugify(title);
    return `${hashes} ${title} {#${slug}}`;
  });
}

// Function to extract a table of contents from markdown content
export function extractTableOfContents(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)(?:\s+\{#([^}]+)\})?$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    // Only include heading levels 2-4
    if (level >= 2 && level <= 4) {
      const title = match[2].trim();
      const slug = match[3] || slugify(title);
      
      toc.push({
        title,
        slug,
        level,
      });
    }
  }

  return toc;
}

// Function to extract a summary (first paragraph) from markdown content
export function extractSummary(content: string, maxLength = 200): string {
  // Remove headings, code blocks, and other elements
  const cleanContent = content
    .replace(/^#+\s+.*$/gm, '') // Remove headings
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep link text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ''); // Remove images
    
  // Find the first non-empty paragraph
  const paragraphs = cleanContent.split(/\n\s*\n/);
  const firstParagraph = paragraphs.find(p => p.trim().length > 0) || '';
  
  // Truncate if too long
  if (firstParagraph.length <= maxLength) {
    return firstParagraph.trim();
  }
  
  return firstParagraph.substring(0, maxLength).trim() + '...';
}

// Function to highlight code blocks with syntax highlighting classes
export function prepareCodeBlocks(content: string): string {
  // Replace code blocks with proper syntax highlighting
  return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    const lang = language || 'plaintext';
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  });
}
