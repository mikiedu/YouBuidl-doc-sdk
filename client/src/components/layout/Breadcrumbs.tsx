import React from "react";
import { Link as WouterLink } from "wouter";
import { ChevronRightIcon } from "lucide-react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="text-sm mb-2">
      <ol className="flex items-center space-x-1 flex-wrap">
        <li>
          <WouterLink href="/" className="text-muted-foreground hover:text-primary">
            Docs
          </WouterLink>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={item.href || index}>
            <li className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground/70" />
            </li>
            <li>
              {index === items.length - 1 ? (
                <span className="text-foreground">{item.label}</span>
              ) : (
                <WouterLink href={item.href} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </WouterLink>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
