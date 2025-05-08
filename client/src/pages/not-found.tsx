import { Link as WouterLink } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardContent className="pt-10 pb-6 text-center">
          <div className="rounded-full bg-primary/10 h-20 w-20 flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">404 Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-8">
          <Button asChild className="min-w-32">
            <WouterLink href="/">
              <a>Return Home</a>
            </WouterLink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
