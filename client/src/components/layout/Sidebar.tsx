import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MoonIcon, SunIcon, SearchIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { NavigationItem } from "@/types/docs";

interface SidebarProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  currentPath: string;
}

export default function Sidebar({ navigation, isOpen, currentPath }: SidebarProps) {
  const { setTheme, theme } = useTheme();
  const [, navigate] = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  
  // Function to toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  // Function to handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform -translate-x-full lg:translate-x-0",
        "transition-transform duration-300 ease-in-out bg-sidebar", 
        "border-r border-sidebar-border overflow-y-auto",
        isOpen && "translate-x-0"
      )}
    >
      {/* Logo and theme toggle (desktop) */}
      <div className="sticky top-0 z-10 bg-sidebar pt-4 px-4 pb-2 hidden lg:flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 mr-2 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">C</div>
          <span className="text-lg font-semibold text-sidebar-foreground">Caldera Docs</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-sidebar-foreground/80 hover:text-sidebar-foreground"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Search (desktop) */}
      <div className="hidden lg:block px-4 py-2">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/60" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 bg-sidebar-accent text-sidebar-foreground focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      
      {/* Navigation */}
      <nav className="px-2 py-4">
        {navigation.map((section) => (
          <Collapsible
            key={section.title}
            defaultOpen={expandedSections[section.title] || currentPath.includes(section.items[0]?.slug || "")}
            onOpenChange={() => toggleSection(section.title)}
            className="mb-3"
          >
            <CollapsibleTrigger className="w-full">
              <div className="px-4 py-2 flex items-center justify-between text-sm font-medium text-sidebar-foreground rounded-md hover:bg-sidebar-accent/50">
                <div className="flex items-center">
                  <span className="material-icons text-sm mr-2">{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <span className="material-icons text-sm">
                  {expandedSections[section.title] ? "expand_less" : "expand_more"}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 mt-1">
              {section.items.map((item) => {
                const isActive = currentPath === `/docs/${item.slug}`;
                
                return (
                  <Link 
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className={cn(
                      "px-3 py-2 block text-sm rounded-md",
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
      
      {/* Social links */}
      <div className="px-4 py-3 mt-auto border-t border-sidebar-border">
        <div className="flex items-center">
          <a href="https://github.com/caldera" target="_blank" rel="noopener noreferrer" className="text-sidebar-foreground/60 hover:text-sidebar-foreground mr-4">
            <span className="material-icons">code</span>
          </a>
          <a href="https://twitter.com/caldera" target="_blank" rel="noopener noreferrer" className="text-sidebar-foreground/60 hover:text-sidebar-foreground mr-4">
            <span className="material-icons">share</span>
          </a>
          <a href="https://discord.com/caldera" target="_blank" rel="noopener noreferrer" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <span className="material-icons">chat</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
