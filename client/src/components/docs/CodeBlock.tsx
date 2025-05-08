import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
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
    <div className="code-block my-6">
      {filename && (
        <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm rounded-t-md border-b border-slate-700 font-mono">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: filename ? "0 0 0.375rem 0.375rem" : "0.375rem",
          fontSize: "0.875rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
      <Button 
        variant="ghost" 
        size="icon" 
        className="copy-button"
        onClick={handleCopy}
        title={isCopied ? "Copied!" : "Copy code"}
      >
        {isCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
