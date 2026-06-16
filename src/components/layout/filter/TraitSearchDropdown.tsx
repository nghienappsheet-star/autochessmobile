import * as React from "react"
import { Search, ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/core"
import { cn } from "@/lib/utils"

export type TraitSearchDropdownProps = {
  label: string
  placeholder: string
  searchPlaceholder: string
  emptyLabel: string
  traits: string[]
  selected: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (name: string | null) => void
}

export function TraitSearchDropdown({
  label,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  traits,
  selected,
  open,
  onOpenChange,
  onSelect,
}: TraitSearchDropdownProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  React.useEffect(() => {
    if (!open) setSearchTerm("")
  }, [open])

  const filteredTraits = React.useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return traits
    return traits.filter((name) => name.toLowerCase().includes(q))
  }, [traits, searchTerm])

  return (
    <div className="space-y-1">
      <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
        {label}
      </div>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={label}
          onClick={() => onOpenChange(!open)}
          className="w-full flex items-center justify-between bg-brand-bg border border-brand-border rounded-lg px-3 h-9 hover:border-brand-text-sub transition-colors text-left"
        >
          <span
            className={cn(
              "text-[12px] font-semibold truncate mr-2",
              selected ? "text-white" : "text-brand-text-sub"
            )}
          >
            {selected ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-brand-text-sub transition-transform shrink-0",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => onOpenChange(false)}
              aria-hidden
            />
            <div className="absolute top-full left-0 w-full mt-2 bg-brand-card-2 border border-brand-border rounded-xl shadow-2xl z-20 overflow-hidden">
              <div className="p-2 border-b border-brand-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="bg-brand-card border-brand-border pl-9 h-9 text-[12px] rounded-lg"
                    aria-label={searchPlaceholder}
                    autoFocus
                  />
                </div>
              </div>
              <div
                role="listbox"
                aria-label={label}
                className="max-h-44 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5"
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={selected === null}
                  onClick={() => {
                    onSelect(null)
                    onOpenChange(false)
                  }}
                  className={cn(
                    "w-full text-left px-3 h-8 rounded-lg text-[12px] font-semibold transition-colors flex items-center",
                    selected === null
                      ? "bg-brand-gold/10 text-brand-gold"
                      : "text-brand-text-sub hover:bg-brand-card hover:text-white"
                  )}
                >
                  {placeholder}
                </button>
                {filteredTraits.length === 0 ? (
                  <p className="text-[11px] text-brand-text-sub text-center py-3">{emptyLabel}</p>
                ) : (
                  filteredTraits.map((name) => {
                    const isActive = selected === name
                    return (
                      <button
                        key={name}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          onSelect(isActive ? null : name)
                          onOpenChange(false)
                        }}
                        className={cn(
                          "w-full text-left px-3 h-8 rounded-lg text-[12px] font-semibold transition-colors flex items-center justify-between gap-2",
                          isActive
                            ? "bg-gold-gradient text-black"
                            : "text-brand-text-sub hover:bg-brand-card hover:text-white"
                        )}
                      >
                        <span className="truncate">{name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
