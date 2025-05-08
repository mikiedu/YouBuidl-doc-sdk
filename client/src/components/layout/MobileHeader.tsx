import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuIcon, MoonIcon, SearchIcon, SunIcon, XIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

export default function MobileHeader({ toggleSidebar }: MobileHeaderProps) {
  const { setTheme, theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="lg:hidden bg-background border-b border-border sticky top-0 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-3 text-muted-foreground"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center">
            <img
              src="public/youbuidlsocialsvg.svg"
              alt="YouBuidl Logo"
              className="h-8 w-auto mr-2"
            />
            <span className="text-lg font-semibold text-foreground">
              YouBuidl
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground text-sm font-medium px-2"
          >
            About
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-muted-foreground"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="px-4 py-2 border-t border-border">
          <form onSubmit={handleSearchSubmit} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setIsSearchOpen(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
