import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import { useLocation } from "wouter";
import { debounce } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({ initialQuery = "", onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [, navigate] = useLocation();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search documentation..."
          className="w-full pl-10 pr-10"
          value={query}
          onChange={handleChange}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={handleClear}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
