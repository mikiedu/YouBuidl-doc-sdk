import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link as WouterLink, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/docs/SearchBar";
import { DocContent } from "@/types/docs";
import { extractSummary } from "@/lib/markdownUtils";

export default function SearchPage() {
  const [, params] = useLocation();
  const urlParams = new URLSearchParams(params);
  const initialQuery = urlParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  
  const { data: results = [], isLoading, error } = useQuery<DocContent[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(query)}`],
    enabled: query.length > 0,
  });
  
  useEffect(() => {
    document.title = `Search: ${query} | Caldera Docs`;
  }, [query]);
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery) {
      const newParams = new URLSearchParams();
      newParams.set("q", newQuery);
      window.history.replaceState(null, "", `/search?${newParams.toString()}`);
    }
  };
  
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Search Results</h1>
      
      <div className="mb-8">
        <SearchBar 
          initialQuery={query} 
          onSearch={handleSearch} 
        />
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>There was an error processing your search. Please try again.</p>
        </div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any documents matching "{query}".
          </p>
          <Button asChild>
            <WouterLink href="/">
              <a>Return Home</a>
            </WouterLink>
          </Button>
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-muted-foreground mb-6">
            Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </p>
          
          <div className="space-y-4">
            {results.map((doc) => (
              <Card key={doc.id} className="border hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <WouterLink href={`/docs/${doc.slug}`}>
                    <a className="text-lg font-semibold text-primary hover:underline mb-1 block">
                      {doc.title}
                    </a>
                  </WouterLink>
                  <div className="text-xs text-muted-foreground mb-2">
                    {doc.category} {doc.subcategory ? `/ ${doc.subcategory}` : ""}
                  </div>
                  <p className="text-muted-foreground">
                    {extractSummary(doc.content, 200)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Search the documentation</h2>
          <p className="text-muted-foreground">
            Enter a search term above to find content across all documentation.
          </p>
        </div>
      )}
    </div>
  );
}
