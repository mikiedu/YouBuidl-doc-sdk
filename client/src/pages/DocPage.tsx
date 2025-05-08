import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link as WouterLink, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from "lucide-react";
import DocContent from "@/components/docs/DocContent";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TableOfContents from "@/components/layout/TableOfContents";
import { DocContent as DocContentType } from "@/types/docs";
import { categoryMap } from "@/data/docs";
import { getBreadcrumbPath } from "@/lib/utils";

export default function DocPage() {
  const [match, params] = useRoute("/docs/:slug");
  const [, navigate] = useLocation();
  
  // Guard against no match
  if (!match || !params.slug) {
    navigate("/not-found");
    return null;
  }
  
  const { data: doc, isLoading, error } = useQuery<DocContentType>({
    queryKey: [`/api/docs/${params.slug}`],
  });
  
  useEffect(() => {
    // Set page title based on doc
    if (doc?.title) {
      document.title = `${doc.title} | Caldera Docs`;
    }
    
    // Scroll to hash if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [doc?.title, params.slug]);
  
  // Create breadcrumb items
  const breadcrumbItems = doc?.category ? 
    getBreadcrumbPath(params.slug, categoryMap) : [];
  
  // Get table of contents from metadata
  const tableOfContents = doc?.metadata?.toc || [];
  
  if (isLoading) {
    return <DocSkeleton />;
  }
  
  if (error || !doc) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-6 max-w-4xl mx-auto">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-2">Error Loading Documentation</h1>
          <p>We couldn't load the documentation you requested. Please try again later.</p>
          <Button className="mt-4" asChild>
            <WouterLink href="/">
              <a>Return Home</a>
            </WouterLink>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Breadcrumb & Page Title */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-2xl font-semibold text-foreground">{doc.title}</h1>
            </div>
            <div className="flex items-center mt-3 sm:mt-0">
              <a 
                href={`https://github.com/caldera/docs/edit/main/${params.slug}.md`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit this page
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-4xl">
          <DocContent content={doc.content} />

          {/* Article Footer - Next/Previous */}
          {(doc.metadata?.prev || doc.metadata?.next) && (
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                {doc.metadata?.prev ? (
                  <WouterLink href={`/docs/${doc.metadata.prev}`}>
                    <a className="inline-flex items-center text-primary hover:underline font-medium mb-4 sm:mb-0">
                      <ChevronLeftIcon className="h-4 w-4 mr-1" />
                      Previous
                    </a>
                  </WouterLink>
                ) : (
                  <div></div>
                )}
                
                {doc.metadata?.next && (
                  <WouterLink href={`/docs/${doc.metadata.next}`}>
                    <a className="inline-flex items-center text-primary hover:underline font-medium">
                      Next
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </a>
                  </WouterLink>
                )}
              </div>
            </div>
          )}

          {/* Feedback Section */}
          <div className="mt-12 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Was this page helpful?</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center gap-2">
                <span className="material-icons text-sm">thumb_up</span>
                Yes
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <span className="material-icons text-sm">thumb_down</span>
                No
              </Button>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents headings={tableOfContents} />
      </div>
    </>
  );
}

function DocSkeleton() {
  return (
    <>
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          <Skeleton className="h-4 w-48 mb-2" />
          <Skeleton className="h-8 w-96" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-4xl">
          <div className="space-y-4">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        <div className="hidden lg:block w-64 shrink-0 pl-8 pr-8 py-6">
          <div className="sticky top-24">
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
