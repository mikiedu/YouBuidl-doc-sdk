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
          { title: "What is YouBuidl", slug: "introduction#what-is-youbuidl" },
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
    title: "Core Components",
    icon: "construction",
    items: [
      {
        title: "Social SDK",
        slug: "social-sdk",
        items: []
      },
      {
        title: "Data Layer",
        slug: "data-layer",
        items: []
      },
      {
        title: "DeFi Integrations",
        slug: "defi-integrations",
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
        title: "Users & Profiles",
        slug: "users-profiles",
        items: []
      },
      {
        title: "Posts & Content",
        slug: "posts-content",
        items: []
      },
      {
        title: "Reactions",
        slug: "reactions",
        items: []
      }
    ]
  },
  {
    title: "DeFi Features",
    icon: "payments",
    items: [
      {
        title: "Tipping",
        slug: "tipping",
        items: []
      },
      {
        title: "Rewards",
        slug: "rewards",
        items: []
      },
      {
        title: "Governance",
        slug: "governance",
        items: []
      },
      {
        title: "NFT Integration",
        slug: "nft-integration",
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
        title: "Examples",
        slug: "examples",
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
  "social-sdk": "Social SDK",
  "data-layer": "Data Layer",
  "defi-integrations": "DeFi Integrations",
  "authentication": "Authentication",
  "users-profiles": "Users & Profiles",
  "posts-content": "Posts & Content",
  "reactions": "Reactions",
  "tipping": "Tipping",
  "rewards": "Rewards", 
  "governance": "Governance",
  "nft-integration": "NFT Integration",
  "faq": "FAQ",
  "community": "Community",
  "examples": "Examples"
};
