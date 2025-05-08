import React from "react";
import { Link as WouterLink } from "wouter";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/youbuidlsocialsvg.svg" alt="YouBuidl Logo" className="h-8 w-auto mr-2" />
              <span className="text-lg font-semibold text-foreground">YouBuidl Protocol</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Building the foundation for next-generation decentralized social applications with DeFi integration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
              <ul className="text-sm space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Roadmap</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="text-sm space-y-3">
                <li><WouterLink href="/docs/introduction" className="text-muted-foreground hover:text-primary">Documentation</WouterLink></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Tutorials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Community</h3>
              <ul className="text-sm space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} YouBuidl Protocol. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="material-icons">chat</span>
              <span className="sr-only">Discord</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="material-icons">code</span>
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="material-icons">share</span>
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
