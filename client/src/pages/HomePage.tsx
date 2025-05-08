import React from "react";
import { Link as WouterLink } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/docs/SearchBar";
import { ChevronRightIcon, BookIcon, CodeIcon, RocketIcon, LayersIcon, ShieldIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            YouBuidl Protocol Documentation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive guides, API references, and tutorials for building decentralized social applications with DeFi integration
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar className="w-full" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <WouterLink href="/docs/introduction">
                Get Started <ChevronRightIcon className="h-4 w-4" />
              </WouterLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://github.com/youbuidl" target="_blank" rel="noopener noreferrer">
                <CodeIcon className="h-4 w-4" /> GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Documentation Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border hover:border-primary hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <RocketIcon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
                <p className="text-muted-foreground mb-4">
                  Learn the basics of YouBuidl Protocol and get up and running with your first project.
                </p>
                <WouterLink href="/docs/introduction" className="text-primary font-medium hover:underline flex items-center">
                  Learn more <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
            
            <Card className="border hover:border-primary hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <LayersIcon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Core Concepts</h3>
                <p className="text-muted-foreground mb-4">
                  Understand the architecture and fundamental concepts behind YouBuidl Protocol.
                </p>
                <WouterLink href="/docs/architecture" className="text-primary font-medium hover:underline flex items-center">
                  Learn more <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
            
            <Card className="border hover:border-primary hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <CodeIcon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">API Reference</h3>
                <p className="text-muted-foreground mb-4">
                  Explore detailed documentation for all YouBuidl Protocol APIs and endpoints.
                </p>
                <WouterLink href="/docs/authentication" className="text-primary font-medium hover:underline flex items-center">
                  Learn more <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
            
            <Card className="border hover:border-primary hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <BookIcon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step tutorials and best practices for common tasks.
                </p>
                <WouterLink href="/docs/migrations" className="text-primary font-medium hover:underline flex items-center">
                  Learn more <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
            
            <Card className="border hover:border-primary hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Security</h3>
                <p className="text-muted-foreground mb-4">
                  Learn how to secure your YouBuidl Protocol applications and data.
                </p>
                <WouterLink href="/docs/security" className="text-primary font-medium hover:underline flex items-center">
                  Learn more <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Resources Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground mb-4">
                  Join our community of developers building with YouBuidl Protocol.
                </p>
                <a 
                  href="#" 
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Join Discord <ChevronRightIcon className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">FAQ</h3>
                <p className="text-muted-foreground mb-4">
                  Find answers to commonly asked questions about YouBuidl Protocol.
                </p>
                <WouterLink href="/docs/faq" className="text-primary font-medium hover:underline flex items-center">
                  View FAQ <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
            
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Changelog</h3>
                <p className="text-muted-foreground mb-4">
                  Stay up to date with the latest YouBuidl Protocol releases and updates.
                </p>
                <WouterLink href="/docs/changelog" className="text-primary font-medium hover:underline flex items-center">
                  View Changelog <ChevronRightIcon className="h-4 w-4 ml-1" />
                </WouterLink>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
