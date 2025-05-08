// Navigation types
export interface NavigationSubSubItem {
  title: string;
  slug: string;
}

export interface NavigationSubItem {
  title: string;
  slug: string;
  items?: NavigationSubSubItem[];
}

export interface NavigationItem {
  title: string;
  icon: string;
  items: NavigationSubItem[];
}

// Doc types
export interface DocMetadata {
  prev: string | null;
  next: string | null;
  toc: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  title: string;
  slug: string;
  level?: number;
}

export interface DocContent {
  id: number;
  slug: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string | null;
  order: number;
  metadata?: DocMetadata | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Search types
export interface SearchResult {
  id: number;
  slug: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string | null;
  excerpt?: string;
  relevance?: number;
}
