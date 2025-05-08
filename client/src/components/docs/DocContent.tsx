import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocContentProps {
  content: string;
  className?: string;
}

export default function DocContent({ content, className }: DocContentProps) {
  return (
    <div className={cn("doc-content", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 id={children?.toString().toLowerCase().replace(/\s+/g, "-")}>
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
            return <h3 id={id}>{children}</h3>;
          },
          h4: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
            return <h4 id={id}>{children}</h4>;
          },
          h5: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
            return <h5 id={id}>{children}</h5>;
          },
          h6: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
            return <h6 id={id}>{children}</h6>;
          },
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            
            if (!className) {
              return <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded" {...props}>{children}</code>;
            }

            return (
              <div className="code-block my-6 relative">
                <SyntaxHighlighter
                  language={language}
                  style={atomDark as any}
                  PreTag="div"
                  wrapLines={true}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    borderRadius: "0.375rem"
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <CodeCopyButton code={String(children)} />
              </div>
            );
          },
          a: ({ href, children }) => {
            const isInternalLink = href?.startsWith("/") || href?.startsWith("#");
            if (isInternalLink) {
              return <a href={href}>{children}</a>;
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            return (
              <img 
                src={src || ""} 
                alt={alt || ""}
                className="my-8 rounded-lg shadow-md"
                loading="lazy"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeCopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        setIsCopied(false);
        timerRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="absolute top-2 right-2 copy-button text-white/70 hover:text-white"
      onClick={handleCopy}
      title={isCopied ? "Copied!" : "Copy code"}
    >
      {isCopied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}