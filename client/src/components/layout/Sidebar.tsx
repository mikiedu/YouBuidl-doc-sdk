import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MoonIcon, SunIcon, SearchIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { NavigationItem } from "@/types/docs";

interface SidebarProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  currentPath: string;
}

export default function Sidebar({ navigation, isOpen, setIsSidebarOpen, currentPath }: SidebarProps) {
  const { setTheme, theme } = useTheme();
  const [, navigate] = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSidebarOpen(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="sticky top-0 z-10 bg-background pt-4 px-4 pb-2 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="./youbuidlsocialsvg.svg" alt="YouBuidl Logo" className="h-8 w-auto mr-2" />
          <span className="text-lg font-semibold">YouBuidl Docs</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="px-4 py-2">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <nav className="px-2 py-4">
        {navigation.map((section) => (
          <Collapsible
            key={section.title}
            defaultOpen={expandedSections[section.title] || currentPath.includes(section.items[0]?.slug || "")}
            onOpenChange={() => toggleSection(section.title)}
            className="mb-3"
          >
            <CollapsibleTrigger className="w-full">
              <div className="px-4 py-2 flex items-center justify-between text-sm font-medium rounded-md hover:bg-accent/50">
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
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "px-3 py-2 block text-sm rounded-md",
                      isActive
                        ? "bg-[#CDEB63] text-black font-medium"
                        : "hover:bg-accent/50"
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
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[280px] border-r">
        <SidebarContent />
      </aside>
    </>
  );
}