import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { c as cn, I as Input, a8 as filterHeroes } from "./admin-ui-DF1jhL5E.js";
function TraitSearchDropdown({
  label,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  traits,
  selected,
  open,
  onOpenChange,
  onSelect
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    if (!open) setSearchTerm("");
  }, [open]);
  const filteredTraits = React.useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return traits;
    return traits.filter((name) => name.toLowerCase().includes(q));
  }, [traits, searchTerm]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "aria-expanded": open,
          "aria-haspopup": "listbox",
          "aria-label": label,
          onClick: () => onOpenChange(!open),
          className: "w-full flex items-center justify-between bg-brand-bg border border-brand-border rounded-lg px-3 h-9 hover:border-brand-text-sub transition-colors text-left",
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-[12px] font-semibold truncate mr-2",
                  selected ? "text-white" : "text-brand-text-sub"
                ),
                children: selected ?? placeholder
              }
            ),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: cn(
                  "w-4 h-4 text-brand-text-sub transition-transform shrink-0",
                  open && "rotate-180"
                )
              }
            )
          ]
        }
      ),
      open && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-10",
            onClick: () => onOpenChange(false),
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 w-full mt-2 bg-brand-card-2 border border-brand-border rounded-xl shadow-2xl z-20 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-brand-border", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: searchPlaceholder,
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                onKeyDown: (e) => e.stopPropagation(),
                className: "bg-brand-card border-brand-border pl-9 h-9 text-[12px] rounded-lg",
                "aria-label": searchPlaceholder,
                autoFocus: true
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              role: "listbox",
              "aria-label": label,
              className: "max-h-44 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    role: "option",
                    "aria-selected": selected === null,
                    onClick: () => {
                      onSelect(null);
                      onOpenChange(false);
                    },
                    className: cn(
                      "w-full text-left px-3 h-8 rounded-lg text-[12px] font-semibold transition-colors flex items-center",
                      selected === null ? "bg-brand-gold/10 text-brand-gold" : "text-brand-text-sub hover:bg-brand-card hover:text-white"
                    ),
                    children: placeholder
                  }
                ),
                filteredTraits.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub text-center py-3", children: emptyLabel }) : filteredTraits.map((name) => {
                  const isActive = selected === name;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      role: "option",
                      "aria-selected": isActive,
                      onClick: () => {
                        onSelect(isActive ? null : name);
                        onOpenChange(false);
                      },
                      className: cn(
                        "w-full text-left px-3 h-8 rounded-lg text-[12px] font-semibold transition-colors flex items-center justify-between gap-2",
                        isActive ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:bg-brand-card hover:text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: name }),
                        isActive && /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 shrink-0" })
                      ]
                    },
                    name
                  );
                })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function useHeroPickerFilters(heroes, options = {}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCost, setSelectedCost] = React.useState(null);
  const [selectedRace, setSelectedRace] = React.useState(null);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const filteredHeroes = React.useMemo(() => {
    var _a;
    const params = {
      q: searchTerm || null,
      cost: selectedCost,
      race: selectedRace,
      class: selectedClass
    };
    let result = filterHeroes(heroes, params);
    if (options.searchTraits && searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = heroes.filter((hero) => {
        const matchSearch = hero.name.toLowerCase().includes(q) || hero.race.some((r) => r.toLowerCase().includes(q)) || hero.class.some((c) => c.toLowerCase().includes(q));
        const matchCost = selectedCost === null || hero.cost === selectedCost;
        const matchRace = !selectedRace || hero.race.includes(selectedRace);
        const matchClass = !selectedClass || hero.class.includes(selectedClass);
        return matchSearch && matchCost && matchRace && matchClass;
      });
    }
    if ((_a = options.excludeIds) == null ? void 0 : _a.length) {
      const excluded = new Set(options.excludeIds);
      result = result.filter((hero) => !excluded.has(hero.id));
    }
    return result;
  }, [
    heroes,
    searchTerm,
    selectedCost,
    selectedRace,
    selectedClass,
    options.excludeIds,
    options.searchTraits
  ]);
  const costSelectOptions = React.useMemo(() => {
    const costs = Array.from(new Set(heroes.map((h) => h.cost))).sort((a, b) => a - b);
    return costs;
  }, [heroes]);
  const clearFilters = React.useCallback(() => {
    setSearchTerm("");
    setSelectedCost(null);
    setSelectedRace(null);
    setSelectedClass(null);
  }, []);
  const hasActiveFilters = Boolean(searchTerm.trim()) || selectedCost !== null || selectedRace !== null || selectedClass !== null;
  return {
    searchTerm,
    setSearchTerm,
    selectedCost,
    setSelectedCost,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    filteredHeroes,
    costSelectOptions,
    clearFilters,
    hasActiveFilters
  };
}
export {
  TraitSearchDropdown as T,
  useHeroPickerFilters as u
};
