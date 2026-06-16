import * as React from "react"
import { cn } from "@/lib/utils"

const WIDTH_CLASS = {
  full: "max-w-[1400px]",
  article: "max-w-3xl",
  reading: "max-w-4xl",
  narrow: "max-w-2xl",
} as const

type PageContainerProps = {
  children: React.ReactNode
  width?: keyof typeof WIDTH_CLASS
  className?: string
  as?: "div" | "main" | "header" | "footer"
}

export function PageContainer({
  children,
  width = "full",
  className,
  as: Tag = "div",
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        WIDTH_CLASS[width],
        className
      )}
    >
      {children}
    </Tag>
  )
}
