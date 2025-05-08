import * as React from "react"
import { Link as RouterLink } from "wouter"
import { cn } from "@/lib/utils"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  href: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, children, ...props }, ref) => {
    // External links (have http(s) or start with //)
    const isExternal = href.startsWith('http') || href.startsWith('//')
    
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }
    
    // Internal links with anchor tags
    if (href.startsWith('#')) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary hover:underline", className)}
          {...props}
        >
          {children}
        </a>
      )
    }
    
    // Internal links
    return (
      <RouterLink href={href}>
        <a
          ref={ref}
          className={cn("text-primary hover:underline", className)}
          {...props}
        >
          {children}
        </a>
      </RouterLink>
    )
  }
)

Link.displayName = "Link"

export { Link }