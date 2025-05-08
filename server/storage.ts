import { Doc, InsertDoc, Navigation, User, InsertUser, docs, users } from "@shared/schema";

// Define the storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Doc operations
  getAllDocs(): Promise<Doc[]>;
  getDocBySlug(slug: string): Promise<Doc | undefined>;
  getDocsByCategory(category: string): Promise<Doc[]>;
  createDoc(doc: InsertDoc): Promise<Doc>;
  updateDoc(id: number, doc: Partial<InsertDoc>): Promise<Doc | undefined>;
  deleteDoc(id: number): Promise<boolean>;
  
  // Navigation
  getNavigation(): Promise<Navigation>;
  
  // Search
  searchDocs(query: string): Promise<Doc[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documentDocs: Map<number, Doc>;
  private navigation: Navigation;
  private currentUserId: number;
  private currentDocId: number;

  constructor() {
    this.users = new Map();
    this.documentDocs = new Map();
    this.currentUserId = 1;
    this.currentDocId = 1;
    
    // Initialize with some predefined navigation structure
    this.navigation = [
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
    
    // Initialize with some sample docs
    this.initializeSampleDocs();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Doc operations
  async getAllDocs(): Promise<Doc[]> {
    return Array.from(this.documentDocs.values());
  }

  async getDocBySlug(slug: string): Promise<Doc | undefined> {
    return Array.from(this.documentDocs.values()).find(
      (doc) => doc.slug === slug
    );
  }

  async getDocsByCategory(category: string): Promise<Doc[]> {
    return Array.from(this.documentDocs.values()).filter(
      (doc) => doc.category === category
    );
  }

  async createDoc(insertDoc: InsertDoc): Promise<Doc> {
    const id = this.currentDocId++;
    const now = new Date();
    const doc: Doc = { 
      ...insertDoc, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.documentDocs.set(id, doc);
    return doc;
  }

  async updateDoc(id: number, docData: Partial<InsertDoc>): Promise<Doc | undefined> {
    const doc = this.documentDocs.get(id);
    if (!doc) return undefined;
    
    const updatedDoc: Doc = {
      ...doc,
      ...docData,
      updatedAt: new Date()
    };
    
    this.documentDocs.set(id, updatedDoc);
    return updatedDoc;
  }

  async deleteDoc(id: number): Promise<boolean> {
    return this.documentDocs.delete(id);
  }

  // Navigation
  async getNavigation(): Promise<Navigation> {
    return this.navigation;
  }

  // Search
  async searchDocs(query: string): Promise<Doc[]> {
    query = query.toLowerCase();
    return Array.from(this.documentDocs.values()).filter(
      (doc) => 
        doc.title.toLowerCase().includes(query) || 
        doc.content.toLowerCase().includes(query)
    );
  }

  // Initialize sample docs
  private initializeSampleDocs() {
    this.createDoc({
      slug: "introduction",
      title: "Introduction to YouBuidl Protocol",
      content: `
# Introduction to YouBuidl Protocol

YouBuidl Protocol is an innovative open-source framework designed to revolutionize the landscape of decentralized social applications.

## What is YouBuidl?

YouBuidl Protocol is an open-source framework empowering developers to build decentralized social applications with seamless integration of DeFi features. Built with EVM compatibility and leveraging a robust decentralized data layer, it provides an SDK for creating engaging, rewarding, and community-owned social experiences.

At its core, YouBuidl Protocol leverages a robust and scalable decentralized data layer to ensure user data ownership and censorship resistance. This foundation enables the creation of social applications where content and interactions are openly accessible and controlled by the community, moving away from the centralized silos of traditional Web2 social media.

## Key Features

- **Social Interaction Primitives** - Built-in components for profiles, posts, comments, and reactions
- **DeFi Integration** - Seamless incorporation of on-chain value exchange, tipping, and rewards
- **EVM Compatibility** - Works with all major Ethereum Virtual Machine compatible blockchains
- **Decentralized Data Layer** - Ensures data ownership and censorship resistance
- **Decentralized Governance** - Community-led decision making through token-based voting
- **Developer-Friendly** - Comprehensive SDK with intuitive APIs and extensive documentation

## Core Components

The YouBuidl Protocol consists of several modular components that work together to provide a complete development framework.

### Components Overview

The platform's architecture is built around these fundamental components:

- **Social SDK** - Core libraries for social interactions and content management
- **Data Layer** - Decentralized storage for user data, content, and social interactions
- **DeFi Modules** - Components for integrating financial capabilities like tipping and rewards
- **Governance Tools** - Frameworks for community-owned decision making
- **Developer Toolkit** - CLI tools, plugins, and testing environments

## Getting Started

To start using YouBuidl Protocol, you'll need to install the SDK and set up your development environment:

\`\`\`bash
npm install @youbuidl/sdk

# Initialize a new project
npx create-youbuidl-app my-social-app

# Move into project directory
cd my-social-app

# Start development server
npm run dev
\`\`\`

### Basic Configuration

Create a configuration file (\`youbuidl.config.js\`) in your project root:

\`\`\`javascript
module.exports = {
  name: 'My Social App',
  version: '1.0.0',
  network: {
    type: 'testnet',
    chain: 'optimism-sepolia',
  },
  modules: [
    '@youbuidl/auth',
    '@youbuidl/social',
    '@youbuidl/defi',
  ]
};
\`\`\`

## Benefits for Developers

By using YouBuidl Protocol, developers can:

- Accelerate development of decentralized social dApps with pre-built social and DeFi primitives
- Easily integrate complex DeFi functionalities without requiring deep expertise in smart contract development
- Leverage the mature and widely adopted EVM ecosystem
- Build on a foundation of decentralized and open data
- Create innovative and engaging social experiences with built-in monetization and governance models

## Next Steps

Now that you have a basic understanding of YouBuidl Protocol, explore these resources to continue your journey:

- [Installation Guide](installation) - Step-by-step instructions to set up your environment
- [Quick Start Tutorial](quick-start) - Build your first social dApp in under 15 minutes
- [Core Components](social-sdk) - Explore the fundamental building blocks of the protocol
      `,
      category: "Getting Started",
      subcategory: "Introduction",
      order: 1,
      metadata: {
        prev: null,
        next: "installation",
        toc: [
          { title: "What is YouBuidl?", slug: "what-is-youbuidl" },
          { title: "Key Features", slug: "key-features" },
          { title: "Core Components", slug: "core-components" },
          { 
            title: "Components Overview", 
            slug: "components-overview",
            level: 2
          },
          { title: "Getting Started", slug: "getting-started" },
          { 
            title: "Basic Configuration", 
            slug: "basic-configuration",
            level: 2
          },
          { title: "Benefits for Developers", slug: "benefits-for-developers" },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });

    this.createDoc({
      slug: "installation",
      title: "Installing YouBuidl Protocol",
      content: `
# Installing YouBuidl Protocol

Follow these steps to install and configure YouBuidl Protocol for your development environment.

## System Requirements

Before installing YouBuidl Protocol, ensure your system meets these requirements:

- **Node.js** - v18.x or later
- **npm** - v9.x or later
- **Memory** - At least 4GB RAM
- **Disk Space** - At least 1GB free space

## Installation Process

### 1. Install the YouBuidl SDK

The YouBuidl SDK is the core package that enables you to build decentralized social applications with DeFi features.

\`\`\`bash
npm install @youbuidl/sdk
\`\`\`

### 2. Create a New Project

The easiest way to get started is to use our project creation tool:

\`\`\`bash
npx create-youbuidl-app my-social-app
cd my-social-app
\`\`\`

This will scaffold a new project with the default template, including all necessary dependencies and configuration files.

If you prefer to add YouBuidl to an existing project, you can install the individual modules you need:

\`\`\`bash
npm install @youbuidl/core @youbuidl/social @youbuidl/defi
\`\`\`

### 3. Configure Your Environment

Create a \`.env.local\` file in your project root with your environment-specific configuration:

\`\`\`
NEXT_PUBLIC_YOUBUIDL_NETWORK=testnet
NEXT_PUBLIC_YOUBUIDL_PROJECT_ID=your_project_id_here
YOUBUIDL_API_KEY=your_api_key_here
\`\`\`

### 4. Install Dependencies

If you're using the project creation tool, dependencies are installed automatically. Otherwise, install the project dependencies:

\`\`\`bash
npm install
\`\`\`

## Development Workflow

### Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

This starts a local development server with hot-reloading enabled.

### Project Structure

Here's an overview of the default project structure when using our creation tool:

\`\`\`
my-social-app/
├── src/
│   ├── components/   # UI components
│   │   ├── Post.tsx
│   │   ├── Profile.tsx
│   │   └── ...
│   ├── hooks/        # Custom React hooks
│   │   ├── useUser.ts
│   │   ├── usePosts.ts
│   │   └── ...
│   ├── pages/        # Application pages
│   │   ├── index.tsx
│   │   ├── profile/[id].tsx
│   │   └── ...
│   └── utils/        # Utility functions
│       ├── youbuidl.ts  # SDK initialization
│       └── ...
├── public/           # Static assets
├── youbuidl.config.js # YouBuidl configuration
├── package.json
└── README.md
\`\`\`

## Troubleshooting

### Common Issues

#### Connection Errors

If you encounter connection errors:

1. Verify your API key and Project ID in the environment variables
2. Check your network connection
3. Ensure you're using the correct network in your configuration

#### Build Failures

For build failures:

1. Make sure you have compatible Node.js and npm versions
2. Check for conflicting dependencies
3. Clear the cache: \`npm run clean\`

## Next Steps

Now that you have YouBuidl Protocol installed, proceed to the [Quick Start Guide](quick-start) to build your first decentralized social application.
      `,
      category: "Getting Started",
      subcategory: "Setup",
      order: 2,
      metadata: {
        prev: "introduction",
        next: "quick-start",
        toc: [
          { title: "System Requirements", slug: "system-requirements" },
          { title: "Installation Process", slug: "installation-process" },
          { 
            title: "Install the YouBuidl SDK", 
            slug: "1-install-the-youbuidl-sdk",
            level: 2
          },
          { 
            title: "Create a New Project", 
            slug: "2-create-a-new-project",
            level: 2
          },
          { 
            title: "Configure Your Environment", 
            slug: "3-configure-your-environment",
            level: 2
          },
          { 
            title: "Install Dependencies", 
            slug: "4-install-dependencies",
            level: 2
          },
          { title: "Development Workflow", slug: "development-workflow" },
          { 
            title: "Start the Development Server", 
            slug: "start-the-development-server",
            level: 2
          },
          { 
            title: "Project Structure", 
            slug: "project-structure",
            level: 2
          },
          { title: "Troubleshooting", slug: "troubleshooting" },
          { 
            title: "Common Issues", 
            slug: "common-issues",
            level: 2
          },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });

    this.createDoc({
      slug: "quick-start",
      title: "Quick Start Guide",
      content: `
# Quick Start Guide

This guide will help you build your first decentralized social application with YouBuidl Protocol in under 15 minutes.

## Prerequisites

Before starting, ensure you have:

- Installed the YouBuidl SDK (see [Installation](installation))
- Basic knowledge of JavaScript/TypeScript and React
- A code editor of your choice

## Creating Your First Social App

Let's create a simple decentralized social app that allows users to connect wallets, create profiles, and post content.

### 1. Initialize a new project

If you haven't already, create a new project:

\`\`\`bash
npx create-youbuidl-app my-social-app
cd my-social-app
\`\`\`

### 2. Initialize the YouBuidl SDK

Create a file named \`src/utils/youbuidl.ts\`:

\`\`\`typescript
import { YouBuidl } from '@youbuidl/sdk';

// Initialize the SDK
export const youbuidl = new YouBuidl({
  projectId: process.env.NEXT_PUBLIC_YOUBUIDL_PROJECT_ID,
  network: process.env.NEXT_PUBLIC_YOUBUIDL_NETWORK || 'testnet',
});

// Export commonly used modules
export const social = youbuidl.social;
export const auth = youbuidl.auth;
export const defi = youbuidl.defi;
\`\`\`

### 3. Create Authentication Hook

Create a file named \`src/hooks/useAuth.ts\`:

\`\`\`typescript
import { useState, useEffect } from 'react';
import { auth } from '../utils/youbuidl';

export function useAuth() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if user is already connected
    const checkConnection = async () => {
      try {
        const isConnected = await auth.isConnected();
        if (isConnected) {
          const userAddress = await auth.getAddress();
          setAddress(userAddress);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    setLoading(true);
    try {
      await auth.connect();
      const userAddress = await auth.getAddress();
      setAddress(userAddress);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect'));
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    setLoading(true);
    try {
      await auth.disconnect();
      setAddress(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disconnect'));
    } finally {
      setLoading(false);
    }
  };

  return {
    address,
    loading,
    error,
    connect,
    disconnect,
    isConnected: !!address
  };
}
\`\`\`

### 4. Create a Post Component

Create a file named \`src/components/CreatePost.tsx\`:

\`\`\`tsx
import React, { useState } from 'react';
import { social } from '../utils/youbuidl';
import { useAuth } from '../hooks/useAuth';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  const { isConnected } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !isConnected) return;

    setPosting(true);
    try {
      await social.createPost({
        content,
        context: 'main',
      });
      
      // Clear the form after successful post
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card p-4 bg-gray-100 rounded-lg">
        <p>Connect your wallet to create posts.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 bg-white rounded-lg shadow-sm">
      <textarea
        className="w-full p-3 border rounded-lg resize-none"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={posting}
      />
      <div className="mt-3 text-right">
        <button
          type="submit"
          disabled={!content.trim() || posting}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {posting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
\`\`\`

### 5. Create a Feed Component

Create a file named \`src/components/Feed.tsx\`:

\`\`\`tsx
import React, { useEffect, useState } from 'react';
import { social } from '../utils/youbuidl';

type Post = {
  id: string;
  content: string;
  creator: string;
  timestamp: number;
};

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await social.getPosts({
          context: 'main',
          limit: 20,
        });
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4">No posts yet. Be the first to post!</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="ml-3">
              <div className="font-semibold">{post.creator.substring(0, 6)}...{post.creator.substring(38)}</div>
              <div className="text-xs text-gray-500">
                {new Date(post.timestamp * 1000).toLocaleString()}
              </div>
            </div>
          </div>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### 6. Add the Components to Your Home Page

Update \`src/pages/index.tsx\`:

\`\`\`tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { CreatePost } from '../components/CreatePost';
import { Feed } from '../components/Feed';

export default function Home() {
  const { isConnected, connect, disconnect, address, loading } = useAuth();

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <header className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
        <h1 className="text-xl font-bold">My Social App</h1>
        <div>
          {isConnected ? (
            <div className="flex items-center">
              <span className="mr-2 text-sm">
                {address?.substring(0, 6)}...{address?.substring(38)}
              </span>
              <button
                onClick={disconnect}
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </header>

      <main className="space-y-6">
        <CreatePost />
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
          <Feed />
        </div>
      </main>
    </div>
  );
}
\`\`\`

## Running Your App

Start your development server:

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see your application running. You can now:

1. Connect your wallet
2. Create posts
3. See posts from other users

## Adding DeFi Features

To add a simple tipping feature to your posts, let's create a TipButton component:

\`\`\`tsx
import React, { useState } from 'react';
import { defi } from '../utils/youbuidl';
import { useAuth } from '../hooks/useAuth';

type TipButtonProps = {
  recipientAddress: string;
};

export function TipButton({ recipientAddress }: TipButtonProps) {
  const [tipping, setTipping] = useState(false);
  const { isConnected, connect } = useAuth();

  const handleTip = async () => {
    if (!isConnected) {
      connect();
      return;
    }

    setTipping(true);
    try {
      await defi.sendTip({
        recipient: recipientAddress,
        amount: '0.001', // 0.001 ETH
      });
      
      alert('Tip sent successfully!');
    } catch (error) {
      console.error('Error sending tip:', error);
      alert('Failed to send tip. Please try again.');
    } finally {
      setTipping(false);
    }
  };

  return (
    <button
      onClick={handleTip}
      disabled={tipping}
      className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm disabled:opacity-50"
    >
      {tipping ? 'Sending...' : 'Send Tip (0.001 ETH)'}
    </button>
  );
}
\`\`\`

Then add this button to each post in your Feed component.

## Next Steps

Congratulations! You've built a basic decentralized social application with YouBuidl Protocol. Here are some ways to expand on this foundation:

- Add user profiles and profile editing
- Implement reactions (likes, etc.) to posts
- Create a following system
- Integrate more DeFi features like token-gated content
- Add NFT display capabilities

Explore the [API Reference](authentication) for more details on available features.
      `,
      category: "Getting Started",
      subcategory: "Guides",
      order: 3,
      metadata: {
        prev: "installation",
        next: "social-sdk",
        toc: [
          { title: "Prerequisites", slug: "prerequisites" },
          { title: "Creating Your First Social App", slug: "creating-your-first-social-app" },
          { 
            title: "Initialize a new project", 
            slug: "1-initialize-a-new-project",
            level: 2
          },
          { 
            title: "Initialize the YouBuidl SDK", 
            slug: "2-initialize-the-youbuidl-sdk",
            level: 2
          },
          { 
            title: "Create Authentication Hook", 
            slug: "3-create-authentication-hook",
            level: 2
          },
          { 
            title: "Create a Post Component", 
            slug: "4-create-a-post-component",
            level: 2
          },
          { 
            title: "Create a Feed Component", 
            slug: "5-create-a-feed-component",
            level: 2
          },
          { 
            title: "Add the Components to Your Home Page", 
            slug: "6-add-the-components-to-your-home-page",
            level: 2
          },
          { title: "Running Your App", slug: "running-your-app" },
          { title: "Adding DeFi Features", slug: "adding-defi-features" },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });

    this.createDoc({
      slug: "social-sdk",
      title: "Social SDK Overview",
      content: `
# Social SDK Overview

The Social SDK is the core component of YouBuidl Protocol that enables developers to build feature-rich decentralized social applications. It provides intuitive APIs for managing users, profiles, content, and interactions.

## Features

The Social SDK includes these key features:

- **User Management** - Create and manage user identities
- **Profile System** - User profiles with customizable metadata
- **Content Creation** - Posts, comments, and rich media support
- **Social Interactions** - Follows, likes, shares, and reactions
- **Context Management** - Group content by communities or topics
- **Data Querying** - Efficient retrieval of social data

## Getting Started

To use the Social SDK, first install the YouBuidl package:

\`\`\`bash
npm install @youbuidl/sdk
\`\`\`

Then initialize it in your application:

\`\`\`typescript
import { YouBuidl } from '@youbuidl/sdk';

// Initialize the SDK
const youbuidl = new YouBuidl({
  projectId: process.env.NEXT_PUBLIC_YOUBUIDL_PROJECT_ID,
  network: process.env.NEXT_PUBLIC_YOUBUIDL_NETWORK || 'testnet',
});

// Access the social module
const social = youbuidl.social;
\`\`\`

## Core Functionality

### Creating Profiles

Before users can interact with your social application, they need to create a profile:

\`\`\`typescript
const createProfile = async () => {
  try {
    const profile = await social.createProfile({
      username: 'alice',
      displayName: 'Alice Smith',
      bio: 'Blockchain enthusiast and developer',
      avatarUrl: 'https://example.com/avatar.jpg',
    });
    
    console.log('Profile created:', profile);
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};
\`\`\`

### Creating Posts

Once a user has a profile, they can create posts:

\`\`\`typescript
const createPost = async () => {
  try {
    const post = await social.createPost({
      content: 'Just published my first dApp with YouBuidl Protocol!',
      context: 'main', // or a specific community/group ID
      media: [
        {
          type: 'image',
          url: 'https://example.com/my-dapp-screenshot.jpg'
        }
      ],
      tags: ['development', 'blockchain', 'web3']
    });
    
    console.log('Post created:', post);
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
\`\`\`

### Retrieving Posts

You can fetch posts from the network:

\`\`\`typescript
// Get recent posts
const getPosts = async () => {
  try {
    const posts = await social.getPosts({
      context: 'main',
      limit: 20,
      sortBy: 'timestamp',
      order: 'desc'
    });
    
    console.log('Posts retrieved:', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get posts from a specific user
const getUserPosts = async (address) => {
  try {
    const posts = await social.getPosts({
      creator: address,
      limit: 20
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
};
\`\`\`

### Social Interactions

Users can interact with posts through reactions:

\`\`\`typescript
// Like a post
const likePost = async (postId) => {
  try {
    await social.react({
      type: 'like',
      postId
    });
    
    console.log('Post liked successfully');
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

// Comment on a post
const commentOnPost = async (postId, content) => {
  try {
    const comment = await social.createComment({
      content,
      postId
    });
    
    console.log('Comment created:', comment);
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};
\`\`\`

### Following Users

Users can follow each other:

\`\`\`typescript
// Follow a user
const followUser = async (targetAddress) => {
  try {
    await social.follow({
      target: targetAddress
    });
    
    console.log('Successfully followed user');
  } catch (error) {
    console.error('Error following user:', error);
  }
};

// Get followers
const getFollowers = async (address) => {
  try {
    const followers = await social.getFollowers({
      address
    });
    
    return followers;
  } catch (error) {
    console.error('Error getting followers:', error);
    return [];
  }
};
\`\`\`

## React Hooks (Optional)

For React applications, we provide a set of hooks for easy integration:

\`\`\`typescript
import { usePosts, useProfile, useFollow } from '@youbuidl/react';

// In your component
function ProfilePage({ address }) {
  const { profile, loading: profileLoading } = useProfile(address);
  const { posts, loading: postsLoading } = usePosts({ creator: address });
  const { follow, isFollowing, followers, following } = useFollow(address);
  
  if (profileLoading || postsLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{profile.displayName}</h1>
      <p>{profile.bio}</p>
      
      <button onClick={follow} disabled={isFollowing}>
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      
      <div>
        <span>{followers.length} followers</span>
        <span>{following.length} following</span>
      </div>
      
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.content}</p>
            <span>{new Date(post.timestamp * 1000).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

## Integration with DeFi Features

The Social SDK seamlessly integrates with the DeFi features of YouBuidl Protocol. See the [DeFi Integrations](defi-integrations) documentation for more details on combining social and financial features.

## Next Steps

- Explore the [API Reference](users-profiles) for detailed documentation on all available methods
- Learn about the [Data Layer](data-layer) that powers the Social SDK
- See the [Examples](examples) for complete implementation samples
      `,
      category: "Core Components",
      subcategory: "Social",
      order: 1,
      metadata: {
        prev: "quick-start",
        next: "data-layer",
        toc: [
          { title: "Features", slug: "features" },
          { title: "Getting Started", slug: "getting-started" },
          { title: "Core Functionality", slug: "core-functionality" },
          { 
            title: "Creating Profiles", 
            slug: "creating-profiles",
            level: 2
          },
          { 
            title: "Creating Posts", 
            slug: "creating-posts",
            level: 2
          },
          { 
            title: "Retrieving Posts", 
            slug: "retrieving-posts",
            level: 2
          },
          { 
            title: "Social Interactions", 
            slug: "social-interactions",
            level: 2
          },
          { 
            title: "Following Users", 
            slug: "following-users",
            level: 2
          },
          { title: "React Hooks (Optional)", slug: "react-hooks-optional" },
          { title: "Integration with DeFi Features", slug: "integration-with-defi-features" },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });

    // Add more sample docs for other sections
    this.createDoc({
      slug: "quick-start",
      title: "Quick Start Guide",
      content: `
# Quick Start Guide

This guide will help you build your first application with Caldera in under 15 minutes.

## Prerequisites

Before starting, ensure you have:

- Installed the Caldera CLI (see [Installation](installation))
- Basic knowledge of JavaScript/TypeScript
- A code editor of your choice

## Creating Your First Project

Let's create a simple DApp that stores and retrieves data from the blockchain.

### 1. Initialize a new project

\`\`\`bash
caldera init quick-demo
cd quick-demo
\`\`\`

### 2. Define a Data Model

Create a file named \`src/models/Item.ts\`:

\`\`\`typescript
import { Model, Property } from '@caldera/core';

@Model('Item')
export class Item {
  @Property()
  id: string;
  
  @Property()
  name: string;
  
  @Property()
  description: string;
  
  @Property()
  createdAt: Date;
}
\`\`\`

### 3. Create a Service

Create a file named \`src/services/ItemService.ts\`:

\`\`\`typescript
import { Service, Inject } from '@caldera/core';
import { Repository } from '@caldera/storage';
import { Item } from '../models/Item';

@Service()
export class ItemService {
  @Inject()
  private itemRepository: Repository<Item>;
  
  async createItem(name: string, description: string): Promise<Item> {
    const item = new Item();
    item.id = Date.now().toString();
    item.name = name;
    item.description = description;
    item.createdAt = new Date();
    
    return await this.itemRepository.save(item);
  }
  
  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.findAll();
  }
}
\`\`\`

### 4. Create a Controller

Create a file named \`src/controllers/ItemController.ts\`:

\`\`\`typescript
import { Controller, Get, Post, Body } from '@caldera/web';
import { ItemService } from '../services/ItemService';

@Controller('/items')
export class ItemController {
  constructor(private itemService: ItemService) {}
  
  @Post()
  async createItem(@Body() data: { name: string; description: string }) {
    return await this.itemService.createItem(data.name, data.description);
  }
  
  @Get()
  async getAllItems() {
    return await this.itemService.getAllItems();
  }
}
\`\`\`

### 5. Create a UI Component

Create a file named \`src/components/ItemList.tsx\`:

\`\`\`tsx
import React, { useEffect, useState } from 'react';
import { useCaldera } from '@caldera/react';
import { Item } from '../models/Item';

export function ItemList() {
  const { api } = useCaldera();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    loadItems();
  }, []);
  
  async function loadItems() {
    const fetchedItems = await api.get('/items');
    setItems(fetchedItems);
  }
  
  async function createItem(e) {
    e.preventDefault();
    await api.post('/items', { name, description });
    setName('');
    setDescription('');
    await loadItems();
  }
  
  return (
    <div>
      <h2>Items</h2>
      
      <form onSubmit={createItem}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### 6. Add the Component to a Page

Update \`src/pages/index.tsx\`:

\`\`\`tsx
import React from 'react';
import { ItemList } from '../components/ItemList';

export default function HomePage() {
  return (
    <div>
      <h1>My First Caldera App</h1>
      <ItemList />
    </div>
  );
}
\`\`\`

### 7. Run Your Application

Start the development server:

\`\`\`bash
caldera dev
\`\`\`

Your application will be available at \`http://localhost:3000\`.

## Next Steps

Congratulations! You've built your first Caldera application. To continue learning:

- Explore the [Core Concepts](../core-concepts/architecture) section
- Learn about [authentication](../api-reference/authentication)
- Check out more [examples](../resources/examples)
      `,
      category: "Getting Started",
      subcategory: "Guides",
      order: 3,
      metadata: {
        prev: "installation",
        next: "architecture",
        toc: [
          { title: "Prerequisites", slug: "prerequisites" },
          { title: "Creating Your First Project", slug: "creating-your-first-project" },
          { 
            title: "Initialize a new project", 
            slug: "1-initialize-a-new-project",
            level: 2
          },
          { 
            title: "Define a Data Model", 
            slug: "2-define-a-data-model",
            level: 2
          },
          { 
            title: "Create a Service", 
            slug: "3-create-a-service",
            level: 2
          },
          { 
            title: "Create a Controller", 
            slug: "4-create-a-controller",
            level: 2
          },
          { 
            title: "Create a UI Component", 
            slug: "5-create-a-ui-component",
            level: 2
          },
          { 
            title: "Add the Component to a Page", 
            slug: "6-add-the-component-to-a-page",
            level: 2
          },
          { 
            title: "Run Your Application", 
            slug: "7-run-your-application",
            level: 2
          },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });
  }
}

export const storage = new MemStorage();
