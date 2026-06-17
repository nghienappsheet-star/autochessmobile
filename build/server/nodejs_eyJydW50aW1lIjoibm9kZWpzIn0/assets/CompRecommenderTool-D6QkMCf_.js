import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { w as useAppStore, bE as parseWinRate, C as Card, B as Button, c as cn, q as getOrderedCompHeroes, o as Badge } from "./admin-ui-BjWfzkMI.js";
import { X, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, m } from "motion/react";
import { B as BackButton, H as HeroIcon, F as FilterToolbar, a as FilterToolbarRow, b as FilterSearchInput, c as FilterSelect, d as FilterClearButton, e as FilterResultMeta, f as heroCostBadgeOverlayClass, g as getTierBadgeVariant, C as CompSynergyPills, h as heroCostBarClass } from "./server-build-DuEoM95q.js";
import { u as useHeroPickerFilters, T as TraitSearchDropdown } from "./useHeroPickerFilters-DxL32-4y.js";
import "clsx";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-select";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "i18next";
import "i18next-browser-languagedetector";
import "qrcode.react";
import "react-markdown";
import "remark-gfm";
const MAX_SELECTED = 10;
function CompRecommenderTool() {
  const { t } = useTranslation("tools");
  const { heroes, races, classes, comps } = useAppStore();
  const [selectedHeroes, setSelectedHeroes] = React.useState([]);
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false);
  const {
    searchTerm,
    setSearchTerm,
    selectedCost,
    setSelectedCost,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    filteredHeroes: baseFilteredHeroes,
    clearFilters: clearHeroFilters,
    hasActiveFilters: hasFilters
  } = useHeroPickerFilters(heroes, {
    excludeIds: selectedHeroes,
    searchTraits: true
  });
  const filteredHeroes = baseFilteredHeroes;
  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("compFinder.allCosts") },
      ...[1, 2, 3, 4, 5].map((cost) => ({
        value: String(cost),
        label: `$${cost}`
      }))
    ],
    [t]
  );
  const matchedComps = React.useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    return comps.map((comp) => {
      const matchCount = comp.heroes.filter((h) => selectedHeroes.includes(h)).length;
      const matchPercent = comp.heroes.length > 0 ? Math.round(matchCount / comp.heroes.length * 100) : 0;
      return { ...comp, matchCount, matchPercent };
    }).filter((c) => c.matchCount > 0).sort((a, b) => {
      if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return parseWinRate(b.winRate) - parseWinRate(a.winRate);
    });
  }, [comps, selectedHeroes]);
  const toggleHero = (id) => {
    if (selectedHeroes.includes(id)) {
      setSelectedHeroes(selectedHeroes.filter((hId) => hId !== id));
    } else if (selectedHeroes.length < MAX_SELECTED) {
      setSelectedHeroes([...selectedHeroes, id]);
    }
  };
  const clearSelection = () => setSelectedHeroes([]);
  const clearFilters = () => {
    clearHeroFilters();
    setRaceDropdownOpen(false);
    setClassDropdownOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-10", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/cong-cu" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-4 lg:col-span-2 flex flex-col max-h-[800px] shadow-2xl relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 flex-1 flex flex-col min-h-0 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5 min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub", children: t("compFinder.ownedHeroes") }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub font-medium", children: t("compFinder.ownedHeroesHint") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-brand-gold bg-brand-gold/5 px-2 py-1 rounded border border-brand-gold/20", children: [
              selectedHeroes.length,
              "/",
              MAX_SELECTED
            ] }),
            selectedHeroes.length > 0 && /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: clearSelection,
                className: "h-7 px-2 text-[10px] font-semibold text-brand-gold hover:text-brand-gold-deep",
                children: t("compFinder.clearSelection")
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 min-h-[72px] p-3 bg-brand-bg rounded-xl border border-brand-border items-center content-center", children: [
          selectedHeroes.length === 0 && /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-brand-text-sub w-full text-center", children: t("compFinder.noSelection") }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: selectedHeroes.map((hId) => {
            const hero = heroes.find((h) => h.id === hId);
            if (!hero) return null;
            return /* @__PURE__ */ jsxs(
              m.button,
              {
                type: "button",
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.8, opacity: 0 },
                onClick: () => toggleHero(hId),
                className: "relative shrink-0 group/chip",
                "aria-label": hero.name,
                children: [
                  /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm", className: "ring-2 ring-brand-gold/40" }),
                  /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-sub group-hover/chip:text-brand-red group-hover/chip:border-brand-red/40", children: /* @__PURE__ */ jsx(X, { className: "w-2.5 h-2.5" }) })
                ]
              },
              hId
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs(FilterToolbar, { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
            /* @__PURE__ */ jsx(
              FilterSearchInput,
              {
                value: searchTerm,
                onChange: setSearchTerm,
                placeholder: t("compFinder.searchHeroes"),
                "aria-label": t("compFinder.searchHeroes"),
                className: "sm:max-w-none sm:flex-1"
              }
            ),
            /* @__PURE__ */ jsx(
              FilterSelect,
              {
                value: selectedCost != null ? String(selectedCost) : "all",
                onValueChange: (v) => setSelectedCost(v === "all" ? null : Number(v)),
                options: costSelectOptions,
                "aria-label": t("compFinder.filterByCost")
              }
            ),
            /* @__PURE__ */ jsx(FilterClearButton, { visible: hasFilters, onClick: clearFilters })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx(
              TraitSearchDropdown,
              {
                label: t("compFinder.filterRace"),
                placeholder: t("compFinder.allRaces"),
                searchPlaceholder: t("compFinder.searchRacePlaceholder"),
                emptyLabel: t("compFinder.noTraitMatch"),
                traits: races.map((r) => r.name),
                selected: selectedRace,
                open: raceDropdownOpen,
                onOpenChange: (open) => {
                  setRaceDropdownOpen(open);
                  if (open) setClassDropdownOpen(false);
                },
                onSelect: setSelectedRace
              }
            ),
            /* @__PURE__ */ jsx(
              TraitSearchDropdown,
              {
                label: t("compFinder.filterClass"),
                placeholder: t("compFinder.allClasses"),
                searchPlaceholder: t("compFinder.searchClassPlaceholder"),
                emptyLabel: t("compFinder.noTraitMatch"),
                traits: classes.map((c) => c.name),
                selected: selectedClass,
                open: classDropdownOpen,
                onOpenChange: (open) => {
                  setClassDropdownOpen(open);
                  if (open) setRaceDropdownOpen(false);
                },
                onSelect: setSelectedClass
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FilterResultMeta,
          {
            shown: filteredHeroes.length,
            total: heroes.length - selectedHeroes.length,
            className: "px-0.5"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar pb-4 min-h-0", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredHeroes.map((hero) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
          HeroPickerRow,
          {
            hero,
            disabled: selectedHeroes.length >= MAX_SELECTED,
            onClick: () => toggleHero(hero.id)
          }
        ) }, hero.id)) }) })
      ] }) }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-4 lg:col-span-3 flex flex-col max-h-[800px] shadow-2xl rounded-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold -rotate-12", children: "MATCHING" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 relative z-10 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub", children: t("compFinder.suggestedComps") }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub font-medium", children: t("compFinder.suggestedCompsHint") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-brand-gold/5 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/10 shrink-0", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar relative z-10 min-h-0", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: matchedComps.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 bg-brand-bg rounded-xl border border-dashed border-brand-border space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-brand-card rounded-full flex items-center justify-center text-brand-text-sub", children: /* @__PURE__ */ jsx(Search, { className: "w-7 h-7" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium text-brand-text-sub text-center max-w-xs px-4 leading-relaxed", children: t("compFinder.emptyAnalysisHint") })
        ] }) : matchedComps.map((comp) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
          MatchedCompCard,
          {
            comp,
            heroes,
            selectedHeroes,
            matchCount: comp.matchCount,
            matchPercent: comp.matchPercent,
            t
          }
        ) }, comp.id)) }) })
      ] })
    ] })
  ] });
}
function HeroPickerRow({
  hero,
  disabled,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    m.button,
    {
      type: "button",
      layout: true,
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, scale: 0.95 },
      onClick,
      disabled,
      className: cn(
        "w-full flex items-center gap-3 p-2 rounded-xl transition-all border text-left group",
        disabled ? "opacity-50 cursor-not-allowed border-transparent bg-brand-card" : "border-transparent hover:border-brand-gold/30 bg-brand-card cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "absolute -top-1 -right-1 px-1 py-0 text-[8px] font-bold z-10",
                heroCostBadgeOverlayClass(hero.cost)
              ),
              children: [
                "$",
                hero.cost
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[13px] font-bold text-white truncate group-hover:text-brand-gold transition-colors", children: hero.name }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-medium text-brand-text-sub truncate", children: [
            hero.race.join(", "),
            " · ",
            hero.class.join(", ")
          ] })
        ] })
      ]
    }
  );
}
function MatchedCompCard({
  comp,
  heroes,
  selectedHeroes,
  matchCount,
  matchPercent,
  t
}) {
  const tierVariant = getTierBadgeVariant(comp.tier);
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes);
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.98 },
      className: "bg-brand-card border border-brand-border rounded-xl p-4 transition-all hover:border-brand-gold/30 shadow-lg group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors truncate", children: comp.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1.5", children: [
              /* @__PURE__ */ jsxs(Badge, { variant: tierVariant, className: "text-[9px] font-bold px-2 py-0 rounded-md", children: [
                comp.tier,
                " Tier"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-brand-gold", children: [
                comp.winRate,
                " WIN"
              ] }),
              /* @__PURE__ */ jsx(CompSynergyPills, { synergies: comp.synergies, max: 2, size: "sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold text-brand-text-sub uppercase tracking-wide", children: t("compFinder.matchLabel") }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-brand-gold", children: [
              matchCount,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-brand-text-sub font-semibold", children: [
                "/ ",
                comp.heroes.length
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold text-brand-text-sub", children: t("compFinder.matchPercent", { percent: matchPercent }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-brand-bg rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full bg-gold-gradient rounded-full transition-all",
            style: { width: `${matchPercent}%` }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-4", children: orderedHeroIds.map((heroId) => {
          const hero = heroes.find((h) => h.id === heroId);
          const isMatched = selectedHeroes.includes(heroId);
          if (!hero) return null;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "relative aspect-square rounded-xl overflow-hidden border shrink-0",
                isMatched ? "ring-2 ring-brand-gold/50 border-brand-gold/40" : "border-brand-border opacity-75"
              ),
              title: hero.name,
              children: [
                /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm", className: "w-full h-full rounded-xl" }),
                /* @__PURE__ */ jsx("div", { className: cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost)) }),
                isMatched && /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full z-10" })
              ]
            },
            heroId
          );
        }) }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/doi-hinh/${comp.id}`,
            className: "group/link inline-flex items-center gap-2 text-[11px] font-bold text-white hover:text-brand-gold transition-all uppercase tracking-widest",
            children: [
              t("compFinder.exploreDetail"),
              /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-full bg-brand-card-2 border border-brand-border flex items-center justify-center group-hover/link:bg-gold-gradient group-hover/link:text-black transition-all", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" }) })
            ]
          }
        )
      ]
    }
  );
}
export {
  CompRecommenderTool
};
