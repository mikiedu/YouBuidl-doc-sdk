import { NavigationItem } from "@/types/docs";

// Sample navigation structure for development
export const sampleNavigation: NavigationItem[] = [
  {
    title: "Getting Started",
    icon: "rocket_launch",
    items: [
      {
        title: "Introduction",
        slug: "introduction",
        items: [
          { title: "What is Caldera", slug: "introduction#what-is-caldera" },
          { title: "Key Features", slug: "introduction#key-features" }
        ]
      },
      {
        title: "Installation",
        slug: "installation",
        items: []
      },
      {
        title: "Quick Start",
        slug: "quick-start",
        items: []
      }
    ]
  },
  {
    title: "Core Concepts",
    icon: "insights",
    items: [
      {
        title: "Architecture",
        slug: "architecture",
        items: []
      },
      {
        title: "Data Model",
        slug: "data-model",
        items: []
      },
      {
        title: "Security",
        slug: "security",
        items: []
      }
    ]
  },
  {
    title: "API Reference",
    icon: "api",
    items: [
      {
        title: "Authentication",
        slug: "authentication",
        items: []
      },
      {
        title: "Endpoints",
        slug: "endpoints",
        items: []
      },
      {
        title: "Error Handling",
        slug: "error-handling",
        items: []
      }
    ]
  },
  {
    title: "Guides",
    icon: "book",
    items: [
      {
        title: "Migrations",
        slug: "migrations",
        items: []
      },
      {
        title: "Performance",
        slug: "performance",
        items: []
      },
      {
        title: "Best Practices",
        slug: "best-practices",
        items: []
      }
    ]
  },
  {
    title: "Resources",
    icon: "school",
    items: [
      {
        title: "FAQ",
        slug: "faq",
        items: []
      },
      {
        title: "Community",
        slug: "community",
        items: []
      },
      {
        title: "Changelog",
        slug: "changelog",
        items: []
      }
    ]
  }
];

// Category mapping for breadcrumbs
export const categoryMap: Record<string, string> = {
  "introduction": "Introduction",
  "installation": "Installation",
  "quick-start": "Quick Start",
  "architecture": "Architecture",
  "data-model": "Data Model",
  "security": "Security",
  "authentication": "Authentication",
  "endpoints": "Endpoints",
  "error-handling": "Error Handling",
  "migrations": "Migrations",
  "performance": "Performance",
  "best-practices": "Best Practices",
  "faq": "FAQ",
  "community": "Community",
  "changelog": "Changelog"
};
