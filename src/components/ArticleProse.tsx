import * as React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

type ArticleProseProps = {
  content: string
  className?: string
}

export function ArticleProse({ content, className }: ArticleProseProps) {
  return (
    <div className={cn("article-prose", className)}>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
