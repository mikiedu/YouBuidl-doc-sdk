import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { Doc } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await apiRequest(
          "GET", 
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while searching");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query.trim()) {
      search(query);
    } else {
      setResults([]);
    }
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
}
