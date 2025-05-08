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
      title: "Introduction to Caldera",
      content: `
# Introduction to Caldera

Caldera provides a robust infrastructure for building and deploying decentralized applications with an emphasis on scalability, security, and developer experience.

## What is Caldera?

Caldera is a comprehensive platform that simplifies blockchain development. It provides a set of tools, libraries, and services that help developers build, test, and deploy decentralized applications efficiently.

## Key Features

- **Scalable Architecture** - Designed to handle high transaction volumes with low latency
- **Developer Tooling** - Comprehensive SDK and CLI tools to streamline development workflow
- **Security First** - Built-in security features and best practices
- **Interoperability** - Seamless integration with existing blockchain ecosystems
- **Analytics** - Powerful monitoring and analytics capabilities

## Architecture Overview

The Caldera platform consists of several key components that work together to provide a complete development environment.

### Core Components

The platform's architecture is built around these fundamental components:

- **Storage Layer** - Distributed storage system optimized for blockchain data
- **Consensus Engine** - Configurable consensus mechanisms for different use cases
- **API Gateway** - Unified interface for interacting with the platform
- **Security Module** - Comprehensive security features and threat detection

## Getting Started

To start using Caldera, you'll need to install the CLI and set up your development environment:

\`\`\`bash
npm install -g @caldera/cli

# Initialize a new project
caldera init my-dapp

# Move into project directory
cd my-dapp

# Start development server
caldera dev
\`\`\`

### Basic Configuration

Create a configuration file (\`caldera.config.js\`) in your project root:

\`\`\`javascript
module.exports = {
  name: 'My DApp',
  version: '1.0.0',
  network: {
    type: 'testnet',
    endpoint: 'https://testnet.caldera.xyz',
  },
  modules: [
    '@caldera/auth',
    '@caldera/storage',
    '@caldera/contracts',
  ]
};
\`\`\`

## Next Steps

Now that you have a basic understanding of Caldera, here are some resources to continue your journey:

- Installation Guide - Step-by-step instructions to set up your environment
- Quick Start Tutorial - Build your first dApp in under 15 minutes
      `,
      category: "Getting Started",
      subcategory: "Introduction",
      order: 1,
      metadata: {
        prev: null,
        next: "installation",
        toc: [
          { title: "What is Caldera?", slug: "what-is-caldera" },
          { title: "Key Features", slug: "key-features" },
          { title: "Architecture Overview", slug: "architecture-overview" },
          { 
            title: "Core Components", 
            slug: "core-components",
            level: 2
          },
          { title: "Getting Started", slug: "getting-started" },
          { 
            title: "Basic Configuration", 
            slug: "basic-configuration",
            level: 2
          },
          { title: "Next Steps", slug: "next-steps" }
        ]
      }
    });

    this.createDoc({
      slug: "installation",
      title: "Installing Caldera",
      content: `
# Installing Caldera

Follow these steps to install and configure Caldera for your development environment.

## System Requirements

Before installing Caldera, ensure your system meets these requirements:

- **Node.js** - v16.x or later
- **npm** - v8.x or later
- **Memory** - At least 4GB RAM
- **Disk Space** - At least 2GB free space

## Installation Process

### 1. Install the Caldera CLI

The Caldera Command Line Interface (CLI) is the primary tool you'll use to create, develop, and deploy Caldera applications.

\`\`\`bash
npm install -g @caldera/cli
\`\`\`

Verify the installation:

\`\`\`bash
caldera --version
\`\`\`

### 2. Create a New Project

Create a new Caldera project using the CLI:

\`\`\`bash
caldera init my-first-project
cd my-first-project
\`\`\`

This will set up a new project with the default template, including all necessary dependencies and configuration files.

### 3. Configure Your Environment

Create a \`.env\` file in your project root with your environment-specific configuration:

\`\`\`
CALDERA_NETWORK=testnet
CALDERA_API_KEY=your_api_key_here
\`\`\`

### 4. Install Dependencies

Install the project dependencies:

\`\`\`bash
npm install
\`\`\`

## Development Workflow

### Start the Development Server

\`\`\`bash
caldera dev
\`\`\`

This starts a local development server with hot-reloading enabled.

### Project Structure

Here's an overview of the default project structure:

\`\`\`
my-first-project/
├── src/
│   ├── contracts/   # Smart contracts
│   ├── components/  # UI components
│   ├── pages/       # Application pages
│   └── utils/       # Utility functions
├── tests/           # Test files
├── caldera.config.js # Caldera configuration
├── package.json
└── README.md
\`\`\`

## Troubleshooting

### Common Issues

#### API Connection Errors

If you encounter API connection errors:

1. Verify your API key in the \`.env\` file
2. Check your network connection
3. Ensure the API endpoint is correct in \`caldera.config.js\`

#### Build Failures

For build failures:

1. Make sure you have the latest CLI version
2. Check for conflicting dependencies
3. Clear the build cache: \`caldera clean\`

## Next Steps

Now that you have Caldera installed, proceed to the [Quick Start Guide](quick-start) to build your first application.
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
            title: "Install the Caldera CLI", 
            slug: "1-install-the-caldera-cli",
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
