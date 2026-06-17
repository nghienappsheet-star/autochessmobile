import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Link } from "react-router-dom";
import { w as useAppStore, bH as getHeroComparisonStats, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, bI as formatHeroTraitsLabel, c as cn, C as Card, o as Badge, B as Button } from "./admin-ui-BjWfzkMI.js";
import { ChevronLeft, Search, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { m } from "motion/react";
import { M as MAX_COMPARE_ITEMS, H as HeroIcon, f as heroCostBadgeOverlayClass } from "./server-build-DuEoM95q.js";
import { u as useCompareIdsFromUrl } from "./useCompareIdsFromUrl-bBjhnEZa.js";
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
const STAT_CONFIG = [
  { key: "hp", labelKey: "hp", max: 3e3 },
  { key: "armor", labelKey: "armor", max: 50 },
  { key: "mr", labelKey: "mr", max: 50, unit: "%" },
  { key: "dps", labelKey: "dps", max: 300 },
  { key: "atkSpeed", labelKey: "attackSpeed", max: 2, unit: "/s" },
  { key: "range", labelKey: "range", max: 5, unit: " Ô" }
];
function MultiStatRow({
  label,
  values,
  max,
  unit = "",
  reverse = false
}) {
  const numeric = values.map((v) => v.value);
  const best = reverse ? Math.min(...numeric) : Math.max(...numeric);
  const winners = values.filter((v) => v.value === best);
  const hasSingleWinner = winners.length === 1 && values.length > 1;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3 py-4 border-b border-brand-border last:border-0", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-brand-text-sub text-center", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "grid gap-4",
          values.length === 2 && "grid-cols-2",
          values.length === 3 && "grid-cols-3"
        ),
        children: values.map((entry) => {
          const isWinner = hasSingleWinner && entry.value === best;
          return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "text-[13px] font-bold text-center transition-colors",
                  isWinner ? "text-brand-gold" : "text-brand-text-sub"
                ),
                children: [
                  entry.value,
                  unit
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-brand-card-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
              m.div,
              {
                initial: { width: 0 },
                animate: { width: `${Math.min(100, entry.value / max * 100)}%` },
                className: cn(
                  "h-full rounded-full transition-colors",
                  isWinner ? "bg-brand-gold shadow-[0_0_10px_rgba(245,180,60,0.3)]" : "bg-brand-card-2"
                )
              }
            ) })
          ] }, entry.id);
        })
      }
    )
  ] });
}
function HeroComparisonTool() {
  const { t } = useTranslation(["tools", "pages"]);
  const { heroes } = useAppStore();
  const defaultIds = React.useMemo(
    () => {
      var _a, _b;
      return [(_a = heroes[0]) == null ? void 0 : _a.id, (_b = heroes[1]) == null ? void 0 : _b.id].filter(Boolean);
    },
    [heroes]
  );
  const { selectedIds, selectedItems: selectedHeroes, setSelectedIds, syncUrl } = useCompareIdsFromUrl(
    heroes,
    { minSyncCount: 2, fallbackIds: defaultIds }
  );
  const updateSelection = React.useCallback(
    (ids) => {
      const trimmed = ids.slice(0, MAX_COMPARE_ITEMS);
      setSelectedIds(trimmed);
      syncUrl(trimmed);
    },
    [setSelectedIds, syncUrl]
  );
  const [showSelect, setShowSelect] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const statsByHero = selectedHeroes.map((hero) => ({
    hero,
    stats: getHeroComparisonStats(hero)
  }));
  const insights = React.useMemo(() => {
    if (statsByHero.length < 2) return [];
    const lines = [];
    const pickBest = (key, label, reverse = false) => {
      const sorted = [...statsByHero].sort(
        (a, b) => reverse ? a.stats[key] - b.stats[key] : b.stats[key] - a.stats[key]
      );
      const best = sorted[0];
      if (best) {
        lines.push(t("heroCompare.insightHighest", { stat: label, name: best.hero.name }));
      }
    };
    pickBest("hp", t("heroCompare.hp"));
    pickBest("dps", t("heroCompare.dps"));
    pickBest("range", t("heroCompare.range"));
    const cheapest = [...statsByHero].sort((a, b) => a.hero.cost - b.hero.cost)[0];
    if (cheapest) {
      lines.push(t("heroCompare.insightCheapest", { name: cheapest.hero.name, cost: cheapest.hero.cost }));
    }
    return lines.slice(0, 4);
  }, [statsByHero, t]);
  const handlePickHero = (heroId) => {
    if (showSelect === null) return;
    const next = [...selectedIds];
    if (showSelect < next.length) {
      next[showSelect] = heroId;
    } else if (next.length < MAX_COMPARE_ITEMS && !next.includes(heroId)) {
      next.push(heroId);
    } else if (!next.includes(heroId)) {
      next[next.length - 1] = heroId;
    }
    const unique = next.filter((id, idx, arr) => arr.indexOf(id) === idx);
    updateSelection(unique);
    setShowSelect(null);
    setSearchTerm("");
  };
  const removeHero = (index) => {
    const next = selectedIds.filter((_, i) => i !== index);
    updateSelection(next);
  };
  const filteredPickerHeroes = heroes.filter(
    (h) => h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "pb-20 max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/tuong",
        className: "inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors",
        children: [
          /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
          t("pages:heroDetail.backToList")
        ]
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open: showSelect !== null, onOpenChange: (open) => !open && setShowSelect(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-brand-card-2 border-brand-border w-full max-w-md h-[600px] flex flex-col overflow-hidden p-0", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "p-6 border-b border-brand-border bg-brand-card", children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-bold text-brand-text-main text-left", children: t("heroCompare.pickHeroes") }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 bg-brand-card border-b border-brand-border", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: t("heroCompare.searchPlaceholder"),
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "bg-brand-bg border-brand-border pl-10 h-11 rounded-xl"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-brand-card", children: filteredPickerHeroes.map((hero) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => handlePickHero(hero.id),
          className: "w-full flex items-center gap-4 p-3 bg-brand-card border border-transparent hover:border-brand-gold/30 rounded-xl cursor-pointer transition-all group text-left",
          children: [
            /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors truncate", children: hero.name }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-brand-text-sub truncate", children: formatHeroTraitsLabel(hero, { emptyLabel: t("pages:heroDetail.traitUndefined") }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: cn("text-[12px] font-bold px-1.5 py-0.5 rounded-md", heroCostBadgeOverlayClass(hero.cost)), children: [
              "$",
              hero.cost
            ] })
          ]
        },
        hero.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "grid gap-4 items-start",
          selectedHeroes.length === 2 && "grid-cols-1 md:grid-cols-2",
          selectedHeroes.length === 3 && "grid-cols-1 md:grid-cols-3"
        ),
        children: [
          selectedHeroes.map((hero, index) => /* @__PURE__ */ jsxs(
            Card,
            {
              className: "bg-brand-card border-brand-border p-6 flex flex-col items-center shadow-lg relative group overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest mb-6 w-full text-center", children: t("heroCompare.slotLabel", { index: index + 1 }) }),
                /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
                  /* @__PURE__ */ jsx(HeroIcon, { hero, size: "lg", className: "w-24 h-24" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowSelect(index),
                      className: "absolute -bottom-2 -right-2 bg-brand-card-2 text-brand-text-main border border-brand-border p-2 rounded-xl shadow-xl hover:border-brand-gold/40 transition-all",
                      "aria-label": t("heroCompare.changeHero"),
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                    }
                  ),
                  selectedHeroes.length > 2 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeHero(index),
                      className: "absolute -top-2 -left-2 bg-brand-card-2 text-brand-text-sub border border-brand-border p-1.5 rounded-lg hover:text-brand-red transition-all",
                      "aria-label": t("heroCompare.removeHero"),
                      children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-brand-text-main mb-2 tracking-tight text-center", children: hero.name }),
                /* @__PURE__ */ jsxs("div", { className: cn("text-[12px] font-bold mb-3 px-2 py-0.5 rounded-md", heroCostBadgeOverlayClass(hero.cost)), children: [
                  "$",
                  hero.cost
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [
                  hero.race.map((r) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-brand-card-2 border-brand-border font-semibold", children: r }, r)),
                  hero.class.map((c) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-brand-gold/10 border-brand-gold/20 text-brand-gold font-semibold", children: c }, c))
                ] })
              ]
            },
            hero.id
          )),
          selectedHeroes.length < MAX_COMPARE_ITEMS && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowSelect(selectedHeroes.length),
              className: "min-h-[220px] rounded-xl border-2 border-dashed border-brand-border bg-brand-card/50 hover:border-brand-gold/40 hover:bg-brand-card transition-all flex flex-col items-center justify-center gap-3 text-brand-text-sub hover:text-brand-gold",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-8 h-8" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: t("heroCompare.addHero") })
              ]
            }
          )
        ]
      }
    ),
    selectedHeroes.length >= 2 && /* @__PURE__ */ jsxs(Card, { className: "mt-8 bg-brand-card border-brand-border p-6 md:p-10 shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-8", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-lg font-bold text-brand-text-main tracking-tight flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-brand-gold rounded-full" }),
          t("heroCompare.statsTitle")
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub font-medium", children: t("heroCompare.statsSubtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: STAT_CONFIG.map(({ key, labelKey, max, unit, reverse }) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
        MultiStatRow,
        {
          label: t(`heroCompare.${labelKey}`),
          max,
          unit,
          reverse,
          values: statsByHero.map(({ hero, stats }) => ({
            id: hero.id,
            value: stats[key]
          }))
        }
      ) }, key)) }),
      insights.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10 p-5 bg-brand-card-2 rounded-xl border border-brand-border space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold text-brand-gold uppercase tracking-widest", children: t("heroCompare.insightsTitle") }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: insights.map((line) => /* @__PURE__ */ jsx("li", { className: "text-[13px] text-brand-text-sub leading-relaxed", children: line }, line)) })
      ] })
    ] }),
    selectedHeroes.length < 2 && /* @__PURE__ */ jsxs(Card, { className: "mt-8 p-8 bg-brand-card border-brand-border text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-sm", children: t("heroCompare.needTwo") }),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "mt-4 bg-gold-gradient text-black rounded-xl font-semibold",
          onClick: () => setShowSelect(selectedHeroes.length),
          children: t("heroCompare.addHero")
        }
      )
    ] })
  ] });
}
export {
  HeroComparisonTool
};
