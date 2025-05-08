import React from "react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About YouBuidl Protocol
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Building the foundation for decentralized social applications with integrated DeFi capabilities
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission & History */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Mission</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              YouBuidl Protocol was founded with a clear mission: to create open, permissionless infrastructure 
              for decentralized social applications that seamlessly integrate with DeFi protocols. We believe in 
              building tools that empower developers to create applications where users own their data, content, 
              and economic relationships.
            </p>
            <p>
              Since our inception, we've been committed to building in public, with open-source code and a focus 
              on community collaboration. Our products are designed to enable a new generation of social platforms 
              where users benefit directly from the value they create.
            </p>
          </div>
        </section>
        
        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JD</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Jane Doe</h3>
              <p className="text-muted-foreground mb-3">Founder & Lead Developer</p>
              <p className="text-sm text-muted-foreground">
                Full-stack developer with 8+ years of experience building web3 applications.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JS</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">John Smith</h3>
              <p className="text-muted-foreground mb-3">Smart Contract Engineer</p>
              <p className="text-sm text-muted-foreground">
                Solidity expert specializing in secure, gas-efficient DeFi integrations.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">AW</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Alice Wong</h3>
              <p className="text-muted-foreground mb-3">Product Designer</p>
              <p className="text-sm text-muted-foreground">
                UX/UI specialist focused on creating intuitive interfaces for complex web3 products.
              </p>
            </div>
          </div>
        </section>
        
        {/* Grants & Funding */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Grants & Funding</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              YouBuidl Protocol has been fortunate to receive support from various grant programs in the ecosystem:
            </p>
            
            <h3>Gitcoin Grants</h3>
            <p>
              We've participated in multiple Gitcoin Grant rounds, where our community helped fund the development 
              of our open-source tools. The support from Gitcoin has been instrumental in our early-stage development.
            </p>
            
            <h3>Optimism RetroPGF</h3>
            <p>
              YouBuidl Protocol was a recipient in Optimism's Retroactive Public Goods Funding rounds 1 and 2. 
              These grants have allowed us to expand our development team and accelerate our roadmap.
            </p>
            
            <h3>Community-Driven Development</h3>
            <p>
              Beyond grants, we've built a community of contributors who help improve our codebase, documentation, 
              and overall product experience. Our success is a testament to the power of community-driven development.
            </p>
          </div>
        </section>
        
        {/* Roadmap */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Roadmap</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6 relative">
              <div className="absolute w-4 h-4 rounded-full bg-primary -left-[10px] top-0"></div>
              <h3 className="text-xl font-semibold mb-2">Q1 2023: Foundation</h3>
              <p className="text-muted-foreground">
                Launch of core SDK, basic social features, and documentation site.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-6 relative">
              <div className="absolute w-4 h-4 rounded-full bg-primary -left-[10px] top-0"></div>
              <h3 className="text-xl font-semibold mb-2">Q2-Q3 2023: DeFi Integration</h3>
              <p className="text-muted-foreground">
                Integration with wallets, tipping feature launch, and support for multiple chains.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-6 relative">
              <div className="absolute w-4 h-4 rounded-full bg-primary -left-[10px] top-0"></div>
              <h3 className="text-xl font-semibold mb-2">Q4 2023: Community Growth</h3>
              <p className="text-muted-foreground">
                Launch of rewards system, governance module, and expanded documentation.
              </p>
            </div>
            
            <div className="border-l-4 border-border pl-6 relative">
              <div className="absolute w-4 h-4 rounded-full bg-muted-foreground -left-[10px] top-0"></div>
              <h3 className="text-xl font-semibold mb-2">2024: Ecosystem Expansion</h3>
              <p className="text-muted-foreground">
                Developer grants program, improved tooling, and additional DeFi integrations.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}