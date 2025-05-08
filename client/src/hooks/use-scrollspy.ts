import { useState, useEffect, useRef } from "react";

interface UseScrollspyOptions {
  offset?: number;
  rootMargin?: string;
}

export function useScrollspy(
  ids: string[],
  options: UseScrollspyOptions = {}
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter(element => element !== null) as HTMLElement[];

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      entries => {
        // Find the first element that is intersecting
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        
        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id);
        } else if (entries.length > 0) {
          // If no element is intersecting, find the one that's closest to intersecting
          // This helps with smooth scrolling and when elements are partially visible
          const closest = entries.reduce((prev, curr) => {
            return Math.abs(curr.intersectionRatio - 1) < Math.abs(prev.intersectionRatio - 1)
              ? curr
              : prev;
          });
          
          setActiveId(closest.target.id);
        }
      },
      {
        rootMargin: options.rootMargin || "0px 0px -80% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(element => {
      if (element) {
        observer.current?.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ids, options.rootMargin]);

  return activeId;
}
