import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to convert a string to a slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
}

// Function to extract headings from markdown content
export function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = slugify(text);
    
    headings.push({
      text,
      level,
      slug,
    });
  }

  return headings;
}

// Function to format a date
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to get breadcrumb path
export function getBreadcrumbPath(slug: string, categoryMap: Record<string, string>) {
  const parts = slug.split('/');
  const path = [];
  
  for (let i = 0; i < parts.length; i++) {
    const currentPath = parts.slice(0, i + 1).join('/');
    const label = categoryMap[currentPath] || parts[i];
    
    path.push({
      href: `/docs/${currentPath}`,
      label: label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ')
    });
  }
  
  return path;
}

// Simple debounce function
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
}
