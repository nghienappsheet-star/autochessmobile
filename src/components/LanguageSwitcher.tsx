import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import i18n from "@/i18n"
import type { SupportedLocale } from "@/i18n/config"

type LanguageSwitcherProps = {
  className?: string
  size?: "sm" | "md"
}

const sizeStyles = {
  sm: {
    wrapper: "p-1",
    button: "h-7 px-3 text-[9px]",
  },
  md: {
    wrapper: "p-1",
    button: "flex-1 h-8 text-[10px]",
  },
} as const

export function LanguageSwitcher({ className, size = "sm" }: LanguageSwitcherProps) {
  const { i18n: i18nInstance } = useTranslation()
  const current = i18nInstance.language.startsWith("en") ? "en" : "vi"
  const styles = sizeStyles[size]

  const setLocale = (locale: SupportedLocale) => {
    void i18n.changeLanguage(locale)
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-brand-card rounded-lg border border-brand-border",
        styles.wrapper,
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("vi")}
        className={cn(
          "rounded-md font-bold uppercase tracking-widest leading-none transition-colors",
          styles.button,
          current === "vi"
            ? "bg-gold-gradient text-black"
            : "text-brand-text-sub hover:text-white"
        )}
      >
        VN
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-md font-bold uppercase tracking-widest leading-none transition-colors",
          styles.button,
          current === "en"
            ? "bg-gold-gradient text-black"
            : "text-brand-text-sub hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  )
}
