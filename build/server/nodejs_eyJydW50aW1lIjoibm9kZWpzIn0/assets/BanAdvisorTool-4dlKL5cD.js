import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { m } from "motion/react";
import { RotateCcw, X, Search, Crown, Target, TrendingUp, Users, AlertTriangle, ChevronDown, Shield, Sparkles } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import { bE as parseWinRate, w as useAppStore, C as Card, B as Button, o as Badge, I as Input, c as cn, a0 as TraitIcon } from "./admin-ui-BjWfzkMI.js";
import { B as BackButton, h as heroCostBarClass } from "./server-build-DuEoM95q.js";
import "clsx";
import "react-router-dom";
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
const POOL_COPIES_BY_COST = {
  1: 39,
  2: 26,
  3: 21,
  4: 13,
  5: 10
};
function heroHasTrait(hero, trait) {
  return hero.race.includes(trait) || hero.class.includes(trait);
}
function traitPoolHeroes(trait, heroes) {
  return heroes.filter((h) => heroHasTrait(h, trait));
}
function traitBanCost(trait, heroes) {
  return traitPoolHeroes(trait, heroes).length;
}
function traitPoolCopyCount(trait, heroes) {
  return traitPoolHeroes(trait, heroes).reduce(
    (sum, h) => sum + (POOL_COPIES_BY_COST[h.cost] ?? 0),
    0
  );
}
const COUNTER_CLASSES = ["Assassin", "Warlock", "Demon", "Wizard"];
const OFFENSE_CLASSES = ["Assassin", "Hunter", "Mage", "Warlock", "Wizard"];
function compsUsingTrait(trait, comps, heroes) {
  return comps.filter(
    (c) => c.heroes.some((hId) => {
      const h = heroes.find((hero) => hero.id === hId);
      return h && heroHasTrait(h, trait);
    })
  );
}
function buildReason(trait, affectedComps, priority, mainHero, heroes) {
  const sTier = affectedComps.filter((c) => c.tier === "S").length;
  if (priority === "survival" && COUNTER_CLASSES.includes(trait)) {
    return `${trait} khắc chế trực tiếp core ${(mainHero == null ? void 0 : mainHero.name) ?? ""} — loại bỏ ${affectedComps.length} đội hình meta liên quan.`;
  }
  if (priority === "contest") {
    return `Giảm tranh chấp pool ${trait}: ${traitPoolCopyCount(trait, heroes)} quân bị loại khỏi bàn cờ chung.`;
  }
  if (priority === "top1" && sTier > 0) {
    return `Loại bỏ ${sTier} đội S-tier dùng ${trait}, tối ưu vị trí top 1.`;
  }
  return `Ban ${trait} ảnh hưởng ${affectedComps.length} đội hình meta, giảm cạnh tranh đáng kể.`;
}
function scoreBanTrait(trait, heroes, comps, selectedTraits, selectedHeroes, mainCoreId, priority) {
  const affected = compsUsingTrait(trait, comps, heroes);
  const mainHero = heroes.find((h) => h.id === mainCoreId);
  let score = affected.length * 10;
  affected.forEach((c) => {
    if (c.tier === "S") score += 15;
    else if (c.tier === "A") score += 8;
    score += parseWinRate(c.winRate) * 0.3;
  });
  if (priority === "survival") {
    if (COUNTER_CLASSES.includes(trait)) score += 25;
    if (mainHero && !heroHasTrait(mainHero, trait)) {
      const counterComps = affected.filter(
        (c) => !c.heroes.some((id) => selectedHeroes.includes(id))
      );
      score += counterComps.length * 6;
    }
    OFFENSE_CLASSES.forEach((cls) => {
      if ((mainHero == null ? void 0 : mainHero.class.includes(cls)) && trait !== cls) score += 5;
    });
  } else if (priority === "contest") {
    const pool = traitPoolHeroes(trait, heroes);
    const overlap = pool.filter(
      (h) => selectedHeroes.some((id) => {
        const picked = heroes.find((hero) => hero.id === id);
        return picked && id !== mainCoreId && (picked.race.some((r) => h.race.includes(r)) || picked.class.some((c) => h.class.includes(c)));
      })
    ).length;
    score += overlap * 15;
    score += traitPoolCopyCount(trait, heroes) * 0.5;
  } else if (priority === "top1") {
    score += affected.filter((c) => c.tier === "S").length * 22;
  }
  if (!selectedTraits.includes(trait)) score += 10;
  return Math.min(100, Math.round(score));
}
function getBanCandidates(heroes, selectedTraits) {
  const all = /* @__PURE__ */ new Set();
  heroes.forEach((h) => {
    h.race.forEach((r) => all.add(r));
    h.class.forEach((c) => all.add(c));
  });
  return [...all].filter((t) => !selectedTraits.includes(t)).sort();
}
function computeBanRecommendations(heroes, comps, selectedTraits, selectedHeroes, mainCoreId, priority) {
  const candidates = getBanCandidates(heroes, selectedTraits);
  const mainHero = heroes.find((h) => h.id === mainCoreId);
  const scored = candidates.map((trait, index) => {
    const pool = traitPoolHeroes(trait, heroes);
    const affected = compsUsingTrait(trait, comps, heroes);
    const efficiency = scoreBanTrait(
      trait,
      heroes,
      comps,
      selectedTraits,
      selectedHeroes,
      mainCoreId,
      priority
    );
    return {
      id: index + 1,
      trait,
      cost: traitBanCost(trait, heroes),
      removed: pool.map((h) => h.name),
      efficiency,
      affectedComps: affected.length,
      reason: buildReason(trait, affected, priority, mainHero, heroes)
    };
  });
  return scored.sort((a, b) => b.efficiency - a.efficiency).slice(0, 3);
}
function computeBaseWinRate(comps, selectedHeroes) {
  const matching = comps.filter(
    (c) => selectedHeroes.some((id) => c.heroes.includes(id))
  );
  if (matching.length === 0) return 55;
  return matching.reduce((s, c) => s + parseWinRate(c.winRate), 0) / matching.length;
}
function computeWinRateProjections(recommendations, comps, selectedHeroes, heroes) {
  const current = computeBaseWinRate(comps, selectedHeroes);
  return recommendations.map((rec) => {
    const weakened = compsUsingTrait(rec.trait, comps, heroes);
    const metaReduction = comps.length > 0 ? weakened.length / comps.length : 0;
    const projected = Math.min(
      88,
      current + metaReduction * 18 + rec.efficiency * 0.06
    );
    return {
      trait: rec.trait,
      label: `Sau khi BAN ${rec.trait}`,
      current: Math.round(current),
      projected: Math.round(projected)
    };
  });
}
function computeContestAnalysis(mainCoreId, heroes, comps, topRecommendation) {
  const mainHero = heroes.find((h) => h.id === mainCoreId);
  if (!mainHero) return null;
  const contestingComps = comps.filter((c) => c.heroes.includes(mainCoreId));
  const sharedTraits = [...mainHero.race, ...mainHero.class];
  const poolHeroCount = heroes.filter(
    (h) => h.id !== mainCoreId && (h.race.some((r) => sharedTraits.includes(r)) || h.class.some((c) => sharedTraits.includes(c)))
  ).reduce((sum, h) => sum + (POOL_COPIES_BY_COST[h.cost] ?? 0), 0);
  const suggestedBanTrait = (topRecommendation == null ? void 0 : topRecommendation.trait) ?? sharedTraits.find((t) => traitPoolCopyCount(t, heroes) > 5) ?? sharedTraits[0] ?? "";
  return {
    coreHeroName: mainHero.name,
    contestPlayers: Math.min(7, Math.max(1, contestingComps.length + 1)),
    poolHeroCount,
    contestReduction: Math.min(50, contestingComps.length * 10 + ((topRecommendation == null ? void 0 : topRecommendation.efficiency) ?? 0) * 0.2),
    banDifficulty: Math.min(7, Math.max(1, Math.ceil(poolHeroCount / 12))),
    suggestedBanTrait
  };
}
function computeMetaScenarios(recommendations, comps, heroes) {
  return recommendations.slice(0, 2).map((rec) => {
    const remaining = comps.filter(
      (c) => !c.heroes.some((hId) => {
        const h = heroes.find((hero) => hero.id === hId);
        return h && heroHasTrait(h, rec.trait);
      })
    );
    const traitCounts = {};
    remaining.forEach((c) => {
      c.heroes.forEach((hId) => {
        const h = heroes.find((hero) => hero.id === hId);
        if (!h) return;
        [...h.race, ...h.class].forEach((t) => {
          if (t !== rec.trait) traitCounts[t] = (traitCounts[t] || 0) + 1;
        });
      });
    });
    const total = Object.values(traitCounts).reduce((a, b) => a + b, 0) || 1;
    const topTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([trait, count]) => ({
      trait,
      metaPercent: Math.round(count / total * 100)
    }));
    return { banTrait: rec.trait, topTraits };
  });
}
function computeMetaForecastDelta(recommendations, comps, selectedHeroes, heroes) {
  if (recommendations.length === 0) return 0;
  const current = computeBaseWinRate(comps, selectedHeroes);
  const top = recommendations[0];
  const weakened = compsUsingTrait(top.trait, comps, heroes);
  const metaReduction = comps.length > 0 ? weakened.length / comps.length : 0;
  const projected = Math.min(88, current + metaReduction * 18 + top.efficiency * 0.06);
  return Math.round(projected - current);
}
const TRAIT_ICONS = {
  Warrior: Shield,
  Mage: Sparkles,
  Assassin: Target,
  Knight: Shield,
  Hunter: Target
};
function getTraitIcon(trait) {
  return TRAIT_ICONS[trait] ?? Target;
}
const PRIORITY_OPTIONS = [
  { id: "survival", labelKey: "banAdvisor.prioritySurviveShort" },
  { id: "contest", labelKey: "banAdvisor.priorityContestShort" },
  { id: "top1", labelKey: "banAdvisor.priorityTop1Short" }
];
function BanAdvisorTool() {
  const { t } = useTranslation("tools");
  const { heroes, comps, races, classes } = useAppStore();
  const [selectedTraits, setSelectedTraits] = React.useState([]);
  const [selectedHeroes, setSelectedHeroes] = React.useState([]);
  const [mainCore, setMainCore] = React.useState({
    id: "",
    stars: 3
  });
  const [priority, setPriority] = React.useState("survival");
  const [heroSearchTerm, setHeroSearchTerm] = React.useState("");
  const [selectedCost, setSelectedCost] = React.useState(null);
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false);
  const raceNames = React.useMemo(() => new Set(races.map((r) => r.name)), [races]);
  const classNames = React.useMemo(() => new Set(classes.map((c) => c.name)), [classes]);
  const activeRaces = React.useMemo(() => {
    const heroRaceNames = /* @__PURE__ */ new Set();
    heroes.forEach((h) => h.race.forEach((r) => heroRaceNames.add(r)));
    return races.filter((r) => heroRaceNames.has(r.name));
  }, [heroes, races]);
  const activeClasses = React.useMemo(() => {
    const heroClassNames = /* @__PURE__ */ new Set();
    heroes.forEach((h) => h.class.forEach((c) => heroClassNames.add(c)));
    return classes.filter((c) => heroClassNames.has(c.name));
  }, [heroes, classes]);
  const selectedRaceTraits = React.useMemo(
    () => selectedTraits.filter((tr) => raceNames.has(tr)),
    [selectedTraits, raceNames]
  );
  const selectedClassTraits = React.useMemo(
    () => selectedTraits.filter((tr) => classNames.has(tr)),
    [selectedTraits, classNames]
  );
  const filteredHeroesByTraits = React.useMemo(() => {
    if (selectedTraits.length === 0) return [];
    return heroes.filter(
      (h) => h.race.some((r) => selectedTraits.includes(r)) || h.class.some((c) => selectedTraits.includes(c))
    );
  }, [heroes, selectedTraits]);
  const filteredHeroesForPicker = React.useMemo(() => {
    const q = heroSearchTerm.trim().toLowerCase();
    return filteredHeroesByTraits.filter((h) => {
      const matchSearch = !q || h.name.toLowerCase().includes(q);
      const matchCost = selectedCost === null || h.cost === selectedCost;
      return matchSearch && matchCost;
    });
  }, [filteredHeroesByTraits, heroSearchTerm, selectedCost]);
  const toggleTrait = (trait) => {
    const next = selectedTraits.includes(trait) ? selectedTraits.filter((tr) => tr !== trait) : [...selectedTraits, trait];
    setSelectedTraits(next);
    const prunedHeroes = selectedHeroes.filter((id) => {
      const h = heroes.find((hero) => hero.id === id);
      if (!h) return false;
      return h.race.some((r) => next.includes(r)) || h.class.some((c) => next.includes(c));
    });
    setSelectedHeroes(prunedHeroes);
    if (!prunedHeroes.includes(mainCore.id)) {
      setMainCore({ id: "", stars: 3 });
    }
  };
  const toggleHero = (heroId) => {
    setSelectedHeroes((prev) => {
      const next = prev.includes(heroId) ? prev.filter((id) => id !== heroId) : [...prev, heroId];
      if (!next.includes(mainCore.id)) {
        setMainCore({ id: "", stars: 3 });
      }
      return next;
    });
  };
  const setAsMainCore = (heroId) => {
    setMainCore((prev) => ({ id: heroId, stars: prev.id === heroId ? prev.stars : 3 }));
    if (!selectedHeroes.includes(heroId)) {
      setSelectedHeroes((prev) => [...prev, heroId]);
    }
  };
  const reset = () => {
    setSelectedTraits([]);
    setSelectedHeroes([]);
    setMainCore({ id: "", stars: 3 });
    setPriority("survival");
    setHeroSearchTerm("");
    setSelectedCost(null);
    setRaceDropdownOpen(false);
    setClassDropdownOpen(false);
  };
  const isReady = selectedTraits.length > 0 && mainCore.id !== "";
  const results = React.useMemo(() => {
    if (!isReady) return [];
    return computeBanRecommendations(
      heroes,
      comps,
      selectedTraits,
      selectedHeroes,
      mainCore.id,
      priority
    );
  }, [heroes, comps, selectedTraits, selectedHeroes, mainCore.id, priority, isReady]);
  const winRateData = React.useMemo(
    () => computeWinRateProjections(results, comps, selectedHeroes, heroes),
    [results, comps, selectedHeroes, heroes]
  );
  const contestData = React.useMemo(
    () => computeContestAnalysis(mainCore.id, heroes, comps, results[0]),
    [mainCore.id, heroes, comps, results]
  );
  const metaScenarios = React.useMemo(
    () => computeMetaScenarios(results, comps, heroes),
    [results, comps, heroes]
  );
  const metaDelta = React.useMemo(
    () => computeMetaForecastDelta(results, comps, selectedHeroes, heroes),
    [results, comps, selectedHeroes, heroes]
  );
  const mainHero = heroes.find((h) => h.id === mainCore.id);
  const priorityLabel = priority === "survival" ? t("banAdvisor.prioritySurviveShort") : priority === "contest" ? t("banAdvisor.priorityContestShort") : t("banAdvisor.priorityTop1Short");
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto pb-12 space-y-4", children: [
    /* @__PURE__ */ jsx(BackButton, { to: "/cong-cu" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-5 space-y-5 lg:sticky lg:top-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-white", children: t("banAdvisor.configTitle") }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: reset,
              className: "h-9 px-3 rounded-xl text-[11px] font-semibold gap-1.5",
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                t("banAdvisor.reban")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("banAdvisor.stepRaceClass") }),
          /* @__PURE__ */ jsx(
            TraitMultiSelectDropdown,
            {
              label: t("banAdvisor.raceCollection"),
              placeholder: t("banAdvisor.selectRacePlaceholder"),
              searchPlaceholder: t("banAdvisor.searchRacePlaceholder"),
              emptyLabel: t("banAdvisor.noTraitMatch"),
              selectedLabel: t("banAdvisor.racesSelected", { count: selectedRaceTraits.length }),
              traits: activeRaces.map((r) => ({
                id: r.id,
                name: r.name,
                icon: r.icon,
                iconUrl: r.iconUrl
              })),
              selected: selectedRaceTraits,
              open: raceDropdownOpen,
              onOpenChange: (open) => {
                setRaceDropdownOpen(open);
                if (open) setClassDropdownOpen(false);
              },
              onToggle: toggleTrait,
              heroes,
              heroCountLabel: (count) => t("banAdvisor.banCostShort", { count })
            }
          ),
          /* @__PURE__ */ jsx(
            TraitMultiSelectDropdown,
            {
              label: t("banAdvisor.classCollection"),
              placeholder: t("banAdvisor.selectClassPlaceholder"),
              searchPlaceholder: t("banAdvisor.searchClassPlaceholder"),
              emptyLabel: t("banAdvisor.noTraitMatch"),
              selectedLabel: t("banAdvisor.classesSelected", { count: selectedClassTraits.length }),
              traits: activeClasses.map((c) => ({
                id: c.id,
                name: c.name,
                icon: c.icon,
                iconUrl: c.iconUrl
              })),
              selected: selectedClassTraits,
              open: classDropdownOpen,
              onOpenChange: (open) => {
                setClassDropdownOpen(open);
                if (open) setRaceDropdownOpen(false);
              },
              onToggle: toggleTrait,
              heroes,
              heroCountLabel: (count) => t("banAdvisor.banCostShort", { count })
            }
          ),
          selectedTraits.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-1", children: [
            selectedRaceTraits.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedRaceTraits.map((trait) => /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "yellow-solid",
                className: "rounded-md text-[10px] font-bold cursor-pointer gap-1 pr-1.5",
                onClick: () => toggleTrait(trait),
                children: [
                  trait,
                  /* @__PURE__ */ jsx(X, { className: "w-3 h-3 opacity-70" })
                ]
              },
              trait
            )) }),
            selectedClassTraits.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedClassTraits.map((trait) => /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "secondary",
                className: "rounded-md text-[10px] font-bold cursor-pointer gap-1 pr-1.5",
                onClick: () => toggleTrait(trait),
                children: [
                  trait,
                  /* @__PURE__ */ jsx(X, { className: "w-3 h-3 opacity-70" })
                ]
              },
              trait
            )) })
          ] })
        ] }),
        selectedTraits.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[11px] font-bold text-brand-text-sub uppercase tracking-widest", children: [
            t("banAdvisor.stepHeroes"),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-brand-gold normal-case tracking-normal font-semibold", children: selectedHeroes.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: t("banAdvisor.searchHeroPlaceholder"),
                value: heroSearchTerm,
                onChange: (e) => setHeroSearchTerm(e.target.value),
                className: "bg-brand-card-2 border-brand-border pl-10 h-10 text-sm rounded-xl",
                "aria-label": t("banAdvisor.searchHeroPlaceholder")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("banAdvisor.filterCost") }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: [1, 2, 3, 4, 5].map((cost) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                "aria-pressed": selectedCost === cost,
                onClick: () => setSelectedCost(selectedCost === cost ? null : cost),
                className: cn(
                  "flex-1 h-8 rounded-lg border text-[11px] font-bold transition-all",
                  selectedCost === cost ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-white"
                ),
                children: [
                  "$",
                  cost
                ]
              },
              cost
            )) })
          ] }),
          filteredHeroesForPicker.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub text-center py-4", children: t("banAdvisor.noHeroMatch") }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1", children: filteredHeroesForPicker.map((h) => {
            const isSelected = selectedHeroes.includes(h.id);
            const isCore = mainCore.id === h.id;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleHero(h.id),
                onDoubleClick: () => setAsMainCore(h.id),
                className: cn(
                  "relative rounded-xl border p-2 flex flex-col items-center gap-1 transition-all text-center",
                  isSelected ? "bg-brand-gold/10 border-brand-gold" : "bg-brand-card-2 border-brand-border hover:border-brand-text-sub"
                ),
                children: [
                  isCore && /* @__PURE__ */ jsx(Crown, { className: "absolute top-1 right-1 w-3 h-3 text-brand-gold", "aria-hidden": true }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold text-white relative overflow-hidden",
                        isSelected ? "ring-1 ring-brand-gold" : ""
                      ),
                      children: [
                        /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", heroCostBarClass(h.cost)) }),
                        /* @__PURE__ */ jsx("span", { className: "relative z-10", children: h.name.substring(0, 2) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "text-[9px] font-bold leading-tight line-clamp-2",
                        isSelected ? "text-brand-gold" : "text-brand-text-sub"
                      ),
                      children: h.name
                    }
                  )
                ]
              },
              h.id
            );
          }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub", children: t("banAdvisor.coreDoubleClickHint") })
        ] }),
        selectedHeroes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("banAdvisor.mainCore") }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: selectedHeroes.map((hId) => {
            const h = heroes.find((hero) => hero.id === hId);
            const isMain = mainCore.id === hId;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "flex items-center gap-2 p-2 rounded-xl border transition-all",
                  isMain ? "bg-brand-gold/10 border-brand-gold" : "bg-brand-card-2 border-brand-border"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": t("banAdvisor.setMainCore", { name: (h == null ? void 0 : h.name) ?? "" }),
                      onClick: () => setAsMainCore(hId),
                      className: cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                        isMain ? "bg-brand-gold text-black border-brand-gold" : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white"
                      ),
                      children: /* @__PURE__ */ jsx(Crown, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "text-[12px] font-bold flex-1 truncate",
                        isMain ? "text-brand-gold" : "text-white"
                      ),
                      children: h == null ? void 0 : h.name
                    }
                  ),
                  isMain && /* @__PURE__ */ jsx("div", { className: "flex gap-1 shrink-0", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      "aria-label": `${s} stars`,
                      onClick: () => setMainCore({ id: hId, stars: s }),
                      className: cn(
                        "w-7 h-7 rounded-lg text-[10px] font-bold border transition-all",
                        mainCore.stars === s ? "bg-brand-gold text-black border-brand-gold" : "bg-brand-card text-brand-text-sub border-brand-border"
                      ),
                      children: [
                        s,
                        "★"
                      ]
                    },
                    s
                  )) })
                ]
              },
              hId
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("banAdvisor.stepPriority") }),
          /* @__PURE__ */ jsx("div", { className: "flex rounded-xl border border-brand-border overflow-hidden", children: PRIORITY_OPTIONS.map((opt) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPriority(opt.id),
              className: cn(
                "flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all",
                priority === opt.id ? "bg-gold-gradient text-black" : "bg-brand-card-2 text-brand-text-sub hover:text-white"
              ),
              children: t(opt.labelKey)
            },
            opt.id
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-2 border-t border-brand-border text-[11px] text-brand-text-sub font-medium", children: isReady ? /* @__PURE__ */ jsx("span", { className: "text-brand-green", children: t("banAdvisor.readyHint", {
          heroes: selectedHeroes.length,
          core: (mainHero == null ? void 0 : mainHero.name) ?? ""
        }) }) : selectedTraits.length === 0 ? t("banAdvisor.filterHint") : t("banAdvisor.traitsSelected", { count: selectedTraits.length }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 min-w-0", children: !isReady ? /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4", children: [
        /* @__PURE__ */ jsx(Target, { className: "w-12 h-12 text-brand-text-sub opacity-40" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub max-w-sm", children: t("banAdvisor.emptyResultsHint") })
      ] }) : /* @__PURE__ */ jsxs(
        m.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsx(Card, { className: "bg-brand-card border-brand-border p-6 rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsx(
                SummaryCell,
                {
                  label: t("banAdvisor.optimalLineup"),
                  value: selectedTraits.join(", ")
                }
              ),
              /* @__PURE__ */ jsx(
                SummaryCell,
                {
                  label: t("banAdvisor.mainCore"),
                  value: /* @__PURE__ */ jsxs(Fragment, { children: [
                    mainHero == null ? void 0 : mainHero.name,
                    /* @__PURE__ */ jsx("span", { className: "text-brand-gold/60 text-xs ml-1", children: Array.from({ length: mainCore.stars }, (_, i) => /* @__PURE__ */ jsx("span", { children: "★" }, i)) })
                  ] }),
                  highlight: true
                }
              ),
              /* @__PURE__ */ jsx(SummaryCell, { label: t("banAdvisor.priorityGoal"), value: priorityLabel }),
              /* @__PURE__ */ jsx(
                SummaryCell,
                {
                  label: t("banAdvisor.metaForecast"),
                  value: /* @__PURE__ */ jsxs("span", { className: "text-brand-green flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
                    t("banAdvisor.metaForecastWin", { delta: metaDelta })
                  ] })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 text-brand-gold" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white", children: t("banAdvisor.suggestedBan") }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub", children: t("banAdvisor.basedOnMeta") })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: results.map((res, i) => {
                const TraitIcon2 = getTraitIcon(res.trait);
                return /* @__PURE__ */ jsxs(
                  Card,
                  {
                    className: cn(
                      "bg-brand-card border-brand-border p-5 rounded-xl relative overflow-hidden",
                      i === 0 && "border-brand-gold ring-1 ring-brand-gold/20"
                    ),
                    children: [
                      i === 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-brand-gold" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              i === 0 ? "bg-brand-gold text-black" : "bg-brand-card-2 text-white"
                            ),
                            children: /* @__PURE__ */ jsx(TraitIcon2, { className: "w-5 h-5" })
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase tracking-widest", children: t("banAdvisor.recommendedLevel") }),
                          /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-brand-gold", children: [
                            res.efficiency,
                            "%"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-1", children: t("banAdvisor.banTrait") }),
                          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-white", children: res.trait }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                            /* @__PURE__ */ jsx(Users, { className: "w-3 h-3 text-brand-gold" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-brand-text-sub", children: t("banAdvisor.goldCost", { count: res.cost }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub leading-relaxed line-clamp-3", children: res.reason }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-2", children: t("banAdvisor.poolManipulation", { count: res.removed.length }) }),
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
                            res.removed.slice(0, 6).map((name) => /* @__PURE__ */ jsx(
                              Badge,
                              {
                                variant: "secondary",
                                className: "rounded-md text-[8px] font-bold px-2 py-0.5",
                                children: name
                              },
                              name
                            )),
                            res.removed.length > 6 && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "rounded-md text-[8px] font-bold", children: [
                              "+",
                              res.removed.length - 6
                            ] })
                          ] })
                        ] })
                      ] })
                    ]
                  },
                  res.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-brand-gold" }),
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white", children: t("banAdvisor.winRateAnalysis") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: winRateData.map((p) => {
                  var _a;
                  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub truncate mr-2", children: p.label }),
                      /* @__PURE__ */ jsxs("span", { className: "text-white shrink-0", children: [
                        p.projected,
                        "% (+",
                        p.projected - p.current,
                        "%)"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-brand-card-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                      m.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${p.projected}%` },
                        className: cn(
                          "h-full rounded-full",
                          p.trait === ((_a = results[0]) == null ? void 0 : _a.trait) ? "bg-brand-gold" : "bg-white/20"
                        )
                      }
                    ) })
                  ] }, p.trait);
                }) })
              ] }),
              /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-brand-red" }),
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white", children: t("banAdvisor.contestAnalysis") })
                ] }),
                contestData && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-brand-card-2 border border-brand-border rounded-xl", children: [
                    /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-brand-gold shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-[12px] font-bold text-white", children: t("banAdvisor.contestPlayers", { count: contestData.contestPlayers }) }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub leading-relaxed", children: /* @__PURE__ */ jsx(
                        Trans,
                        {
                          i18nKey: "banAdvisor.contestPoolHint",
                          ns: "tools",
                          values: {
                            hero: contestData.coreHeroName,
                            trait: contestData.suggestedBanTrait,
                            poolCount: contestData.poolHeroCount
                          },
                          components: { 1: /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold" }) }
                        }
                      ) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-xl text-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-1", children: t("banAdvisor.contestReduction") }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-brand-gold", children: [
                        "-",
                        Math.round(contestData.contestReduction),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-3 bg-brand-card-2 border border-brand-border rounded-xl text-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-1", children: t("banAdvisor.banDifficulty") }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-white", children: [
                        "Lv.",
                        contestData.banDifficulty
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            metaScenarios.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-5 rounded-xl space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white", children: t("banAdvisor.simulatorTitle") }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub mt-0.5", children: t("banAdvisor.simulatorSubtitle") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: metaScenarios.map((scenario, idx) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "p-4 bg-brand-card-2 rounded-xl border space-y-3",
                    idx === 0 ? "border-brand-gold/20" : "border-brand-border"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-gold uppercase tracking-widest", children: t("banAdvisor.scenarioBan", { trait: scenario.banTrait.toUpperCase() }) }),
                    scenario.topTraits.map((row) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] font-bold", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-white", children: row.trait }),
                      /* @__PURE__ */ jsx("span", { className: idx === 0 ? "text-brand-gold" : "text-brand-text-sub", children: t("banAdvisor.metaShare", { percent: row.metaPercent }) })
                    ] }, row.trait))
                  ]
                },
                scenario.banTrait
              )) })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
function TraitMultiSelectDropdown({
  label,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  selectedLabel,
  traits,
  selected,
  open,
  onOpenChange,
  onToggle,
  heroes,
  heroCountLabel
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    if (!open) setSearchTerm("");
  }, [open]);
  const filteredTraits = React.useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return traits;
    return traits.filter((trait) => trait.name.toLowerCase().includes(q));
  }, [traits, searchTerm]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
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
          className: "w-full flex items-center justify-between bg-brand-card-2 border border-brand-border rounded-xl px-4 py-3 hover:border-brand-text-sub transition-colors text-left",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold text-white truncate mr-2", children: selected.length === 0 ? placeholder : selectedLabel }),
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
          /* @__PURE__ */ jsx(
            "div",
            {
              role: "listbox",
              "aria-label": label,
              className: "max-h-44 overflow-y-auto custom-scrollbar p-2 space-y-1",
              children: filteredTraits.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub text-center py-3", children: emptyLabel }) : filteredTraits.map((trait) => {
                const count = traitBanCost(trait.name, heroes);
                return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
                  TraitCheckboxRow,
                  {
                    trait: trait.name,
                    traitId: trait.id,
                    icon: trait.icon,
                    iconUrl: trait.iconUrl,
                    subLabel: heroCountLabel(count),
                    checked: selected.includes(trait.name),
                    onToggle: () => onToggle(trait.name)
                  }
                ) }, trait.name);
              })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function TraitCheckboxRow({
  trait,
  traitId,
  icon,
  iconUrl: _iconUrl,
  subLabel,
  checked,
  onToggle
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": checked,
      onClick: onToggle,
      className: cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all text-[12px] font-semibold",
        checked ? "bg-brand-gold/10 text-brand-gold" : "text-white hover:bg-brand-card"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "w-4 h-4 rounded border flex items-center justify-center shrink-0",
              checked ? "bg-brand-gold border-brand-gold text-black" : "border-brand-border"
            ),
            children: checked && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold", children: "✓" })
          }
        ),
        (traitId || icon) && /* @__PURE__ */ jsx(
          TraitIcon,
          {
            id: traitId,
            icon: icon ?? "❓",
            name: trait,
            size: "xs"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 truncate", children: trait }),
        subLabel && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-brand-text-sub shrink-0", children: subLabel })
      ]
    }
  );
}
function SummaryCell({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1 min-w-0", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[9px] font-bold text-brand-text-sub uppercase tracking-widest", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "text-sm font-bold truncate",
          highlight ? "text-brand-gold" : "text-white"
        ),
        children: value
      }
    )
  ] });
}
export {
  BanAdvisorTool
};
