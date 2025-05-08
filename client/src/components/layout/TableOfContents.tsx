import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/ui/link";
import { useScrollspy } from "@/hooks/use-scrollspy";

interface Heading {
  title: string;
  slug: string;
  level?: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  // Use scrollspy to highlight active heading
  const activeId = useScrollspy(
    headings.map(heading => heading.slug),
    { rootMargin: "0px 0px -80% 0px" }
  );

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block w-64 shrink-0 pl-8 pr-8 py-6">
      <div className="sticky top-24">
        <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
        <nav className="toc">
          <ul className="text-sm space-y-2">
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a 
                  href={`#${heading.slug}`}
                  className={cn(
                    "block py-1 transition-colors",
                    heading.level > 2 ? "pl-4" : "",
                    activeId === heading.slug
                      ? "text-primary font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Documentation reference card */}
        <div className="mt-8 bg-muted p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Resources</h4>
          <ul className="text-sm space-y-1.5">
            <li>
              <Link href="/docs/api-reference/authentication" className="text-primary flex items-center">
                <span className="material-icons text-sm mr-1">description</span>
                API Reference
              </Link>
            </li>
            <li>
              <Link href="/docs/guides" className="text-primary flex items-center">
                <span className="material-icons text-sm mr-1">code</span>
                Examples
              </Link>
            </li>
            <li>
              <Link href="/docs/resources/faq" className="text-primary flex items-center">
                <span className="material-icons text-sm mr-1">help</span>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
