import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Slot } from "@radix-ui/react-slot"
import { X, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-brand-border bg-brand-card text-brand-text-main shadow-2xl shadow-black/40", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 sm:p-8", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-[18px] font-bold leading-none tracking-tight text-white", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 sm:p-8 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const buttonVariants = ({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-[14px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
      "bg-gold-gradient hover-gold-gradient text-black hover:shadow-[0_0_20px_rgba(245,180,60,0.3)] shadow-sm": variant === "default",
      "border border-white/10 bg-transparent hover:bg-white/5 text-white": variant === "outline",
      "hover:bg-white/5 text-brand-text-sub hover:text-white": variant === "ghost",
      "bg-white/5 text-white hover:bg-white/10": variant === "secondary",
      "bg-brand-red text-white hover:bg-red-600": variant === "danger",
      "h-11 px-6": size === "default",
      "h-9 rounded-lg px-4 text-[12px]": size === "sm",
      "h-14 rounded-xl px-10 text-[16px]": size === "lg",
      "h-11 w-11": size === "icon",
    },
    className
  )

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/10 bg-brand-card px-4 py-2 text-[14px] font-medium shadow-inner transition-all placeholder:text-brand-text-sub/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold/30 disabled:cursor-not-allowed disabled:opacity-50 focus:border-brand-gold/30 text-white",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "success" | "danger" | "warning" | "danger-solid" | "warning-solid" | "yellow-solid" | "outline" | "tier-s" | "tier-a" | "tier-b" | "tier-c" }>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
          {
            "bg-white/5 text-white border-white/10": variant === "default",
            "bg-brand-card-2 text-brand-text-sub border-transparent": variant === "secondary",
            "bg-green-500/10 text-brand-green border-green-500/20": variant === "success",
            "bg-brand-red/10 text-brand-red border-brand-red/20": variant === "danger",
            "bg-brand-gold/10 text-brand-gold border-brand-gold/20": variant === "warning",
            "bg-brand-red text-white border-brand-red": variant === "danger-solid",
            "bg-gold-gradient text-black border-transparent": variant === "warning-solid" || variant === "yellow-solid",
            "bg-transparent border-white/20 text-white/60": variant === "outline",
            "bg-tier-s/15 text-tier-s border-tier-s/30": variant === "tier-s",
            "bg-tier-a/15 text-tier-a border-tier-a/30": variant === "tier-a",
            "bg-tier-b/15 text-tier-b border-tier-b/30": variant === "tier-b",
            "bg-tier-c/15 text-tier-c border-tier-c/30": variant === "tier-c",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

// Dialog components
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-brand-border bg-brand-card p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-6 top-6 rounded-lg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/5 data-[state=open]:text-muted-foreground bg-white/5 p-1.5 text-white">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[20px] font-bold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[14px] text-brand-text-sub font-normal mt-1", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0 bg-white/5",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

type SectionHeaderProps = {
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
  className?: string
}

function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  actionHref,
  className,
}: SectionHeaderProps) {
  const { t } = useTranslation("common")
  const resolvedActionLabel = actionLabel ?? t("viewAll")
  const actionContent = resolvedActionLabel ? (
    onAction ? (
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-0.5 text-brand-gold font-semibold text-[13px] hover:text-brand-gold-deep transition-colors"
      >
        {resolvedActionLabel}
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>
    ) : actionHref ? (
      <Link
        to={actionHref}
        className="inline-flex items-center gap-0.5 text-brand-gold font-semibold text-[13px] hover:text-brand-gold-deep transition-colors"
      >
        {resolvedActionLabel}
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </Link>
    ) : null
  ) : null

  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white">{title}</h2>
        {subtitle && (
          <p className="text-brand-text-sub text-[13px] mt-1 font-normal">{subtitle}</p>
        )}
      </div>
      {actionContent}
    </div>
  )
}

export { 
  Card, CardHeader, CardTitle, CardContent, 
  Button, Input, Badge, Separator, SectionHeader,
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SELECT_EMPTY_VALUE,
} from "./Select"
