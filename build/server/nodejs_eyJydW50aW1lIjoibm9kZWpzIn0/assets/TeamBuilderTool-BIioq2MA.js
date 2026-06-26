import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useSensors, useSensor, PointerSensor, TouchSensor, DndContext, DragOverlay, useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { w as useAppStore, bA as heroStarCost, bB as countActiveTraits, bC as BOARD_SIZE, c as cn, B as Button, C as Card, m as Separator, l as loadJson, s as saveJson, bD as buildCompBoard } from "./admin-ui-DF1jhL5E.js";
import { Download, Save, Share2, LayoutGrid, Trash2, Plus, Star, X } from "lucide-react";
import { B as BackButton, F as FilterToolbar, a as FilterToolbarRow, b as FilterSearchInput, c as FilterSelect, d as FilterClearButton, e as FilterResultMeta, H as HeroIcon, h as heroCostBarClass, f as heroCostBadgeOverlayClass } from "./server-build-DAGg-s7D.js";
import { AnimatePresence, m } from "motion/react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas-pro";
import { u as useHeroPickerFilters, T as TraitSearchDropdown } from "./useHeroPickerFilters-ByQdfE19.js";
import "clsx";
import "react-router-dom";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-select";
import "@vercel/react-router/entry.server";
import "react-router";
import "i18next";
import "i18next-browser-languagedetector";
import "qrcode.react";
import "react-markdown";
import "remark-gfm";
const TEAM_BUILDER_SAVE_KEY = "autochess_team_builder_board";
const MAX_UNITS = 16;
function emptyBoard() {
  return Array(BOARD_SIZE).fill(null);
}
function parseBoardFromShare(boardParam) {
  const board = emptyBoard();
  const parts = boardParam.split(",");
  parts.forEach((part, index) => {
    if (!part || index >= BOARD_SIZE) return;
    const [heroId, starsStr] = part.split(":");
    if (!heroId) return;
    const stars = Math.min(3, Math.max(1, Number(starsStr) || 1));
    board[index] = { heroId, stars };
  });
  return board;
}
function loadInitialState() {
  const params = new URLSearchParams(window.location.search);
  const boardParam = params.get("board");
  if (boardParam) {
    return {
      board: parseBoardFromShare(boardParam),
      fromShare: true
    };
  }
  const saved = loadJson(TEAM_BUILDER_SAVE_KEY, null);
  if ((saved == null ? void 0 : saved.board) && Array.isArray(saved.board) && saved.board.length === BOARD_SIZE) {
    return {
      board: saved.board,
      fromShare: false
    };
  }
  return { board: emptyBoard(), fromShare: false };
}
function parseDragId(id) {
  const str = String(id);
  if (str.startsWith("lib:")) return { kind: "lib", heroId: str.slice(4) };
  if (str.startsWith("board:")) return { kind: "board", index: Number(str.slice(6)) };
  if (str.startsWith("cell:")) return { kind: "cell", index: Number(str.slice(5)) };
  if (str === "trash") return { kind: "trash" };
  return null;
}
function TeamBuilderTool() {
  const { t } = useTranslation("tools");
  const { heroes, races, classes } = useAppStore();
  const initial = React.useMemo(() => loadInitialState(), []);
  const [board, setBoard] = React.useState(initial.board);
  const {
    searchTerm,
    setSearchTerm,
    selectedCost,
    setSelectedCost,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    filteredHeroes,
    hasActiveFilters,
    clearFilters: resetHeroFilters
  } = useHeroPickerFilters(heroes, { searchTraits: true });
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false);
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [activeDragHero, setActiveDragHero] = React.useState(null);
  const boardRef = React.useRef(null);
  const toastTimerRef = React.useRef(null);
  const showToast = React.useCallback(
    (message, type = "success") => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ message, type });
      toastTimerRef.current = setTimeout(() => setToast(null), 2500);
    },
    []
  );
  React.useEffect(() => {
    if (initial.fromShare) {
      showToast(t("teamBuilder.loadedShared"), "info");
    }
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [initial.fromShare, showToast, t]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
  );
  const activeEntries = board.filter(Boolean);
  const playerLevel = activeEntries.length;
  const isBoardFull = playerLevel >= MAX_UNITS;
  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("teamBuilder.allCosts") },
      ...[1, 2, 3, 4, 5].map((cost) => ({
        value: String(cost),
        label: `$${cost}`
      }))
    ],
    [t]
  );
  const totalCost = activeEntries.reduce((sum, entry) => {
    const hero = heroes.find((h) => h.id === entry.heroId);
    if (!hero) return sum;
    return sum + heroStarCost(hero.cost, entry.stars);
  }, 0);
  const activeSynergies = React.useMemo(() => {
    const uniqueHeroIds = Array.from(new Set(activeEntries.map((e) => e.heroId)));
    return countActiveTraits(uniqueHeroIds, heroes);
  }, [activeEntries, heroes]);
  const placeHeroAt = React.useCallback(
    (boardState, index, heroId, stars = 1) => {
      if (index < 0 || index >= BOARD_SIZE) return null;
      const next = [...boardState];
      const occupied = next.filter(Boolean).length;
      if (!next[index] && occupied >= MAX_UNITS) return null;
      next[index] = { heroId, stars };
      return next;
    },
    []
  );
  const handleHeroInListClick = (heroId) => {
    if (isBoardFull) {
      showToast(t("teamBuilder.maxUnitsReached"), "error");
      return;
    }
    const emptyIdx = board.findIndex((cell) => cell === null);
    if (emptyIdx === -1) return;
    const next = placeHeroAt(board, emptyIdx, heroId, 1);
    if (next) setBoard(next);
  };
  const handleRemoveFromBoard = (index, e) => {
    e.stopPropagation();
    const next = [...board];
    next[index] = null;
    setBoard(next);
  };
  const handleBoardCellClick = (index) => {
    var _a;
    if (!board[index]) return;
    const next = [...board];
    const currentStars = ((_a = next[index]) == null ? void 0 : _a.stars) || 1;
    next[index] = {
      ...next[index],
      stars: currentStars < 3 ? currentStars + 1 : 1
    };
    setBoard(next);
  };
  const handleDragStart = (event) => {
    const parsed = parseDragId(event.active.id);
    if ((parsed == null ? void 0 : parsed.kind) === "lib") {
      const hero = heroes.find((h) => h.id === parsed.heroId);
      if (hero) setActiveDragHero(hero);
    } else if ((parsed == null ? void 0 : parsed.kind) === "board") {
      const entry = board[parsed.index];
      if (entry) {
        const hero = heroes.find((h) => h.id === entry.heroId);
        if (hero) setActiveDragHero(hero);
      }
    }
  };
  const handleDragEnd = (event) => {
    setActiveDragHero(null);
    const { active, over } = event;
    if (!over) {
      const from2 = parseDragId(active.id);
      if ((from2 == null ? void 0 : from2.kind) === "board") {
        const next = [...board];
        next[from2.index] = null;
        setBoard(next);
      }
      return;
    }
    const from = parseDragId(active.id);
    const to = parseDragId(over.id);
    if (!from || !to) return;
    if (to.kind === "trash" && from.kind === "board") {
      const next = [...board];
      next[from.index] = null;
      setBoard(next);
      return;
    }
    const targetIndex = to.kind === "cell" ? to.index : to.kind === "board" ? to.index : -1;
    if (targetIndex < 0) return;
    if (from.kind === "lib") {
      if (isBoardFull && !board[targetIndex]) {
        showToast(t("teamBuilder.maxUnitsReached"), "error");
        return;
      }
      const next = [...board];
      if (next[targetIndex]) return;
      next[targetIndex] = { heroId: from.heroId, stars: 1 };
      if (next.filter(Boolean).length > MAX_UNITS) {
        showToast(t("teamBuilder.maxUnitsReached"), "error");
        return;
      }
      setBoard(next);
      return;
    }
    if (from.kind === "board") {
      const next = [...board];
      const source = next[from.index];
      if (!source) return;
      const target = next[targetIndex];
      next[from.index] = target ? { ...target } : null;
      next[targetIndex] = { ...source };
      setBoard(next);
    }
  };
  const handleSaveComp = () => {
    const payload = { board, savedAt: Date.now() };
    saveJson(TEAM_BUILDER_SAVE_KEY, payload);
    showToast(t("teamBuilder.saved"));
  };
  const handleShareMeta = async () => {
    const params = new URLSearchParams({
      board: board.map((cell) => cell ? `${cell.heroId}:${cell.stars}` : "").join(",")
    });
    const url = `${window.location.origin}/cong-cu/tao-doi-hinh?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast(t("teamBuilder.shareCopied"));
    } catch {
      showToast(t("teamBuilder.shareCopyFailed"), "error");
    }
  };
  const handleExportImage = async () => {
    if (!boardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(boardRef.current, {
        backgroundColor: "#0D0E12",
        scale: 2,
        useCORS: true
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `doi-hinh-auto-chess-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setShowExportModal(true);
    } catch (error) {
      console.error("Failed to export image:", error);
      showToast(t("teamBuilder.exportFailed"), "error");
    } finally {
      setIsExporting(false);
    }
  };
  const handleAutoArrange = () => {
    if (activeEntries.length === 0) return;
    const starMap = /* @__PURE__ */ new Map();
    activeEntries.forEach((e) => {
      starMap.set(e.heroId, e.stars);
    });
    const heroIds = Array.from(new Set(activeEntries.map((e) => e.heroId)));
    const arranged = buildCompBoard(heroIds, heroes);
    const newBoard = arranged.map(
      (heroId) => heroId ? { heroId, stars: starMap.get(heroId) ?? 1 } : null
    );
    setBoard(newBoard);
    showToast(t("teamBuilder.autoArrangeDone"), "info");
  };
  const handleClearBoard = () => {
    if (!window.confirm(t("teamBuilder.clearConfirm"))) return;
    setBoard(emptyBoard());
  };
  const clearFilters = () => {
    resetHeroFilters();
    setRaceDropdownOpen(false);
    setClassDropdownOpen(false);
  };
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-20 relative", children: [
        /* @__PURE__ */ jsx(BackButton, { to: "/cong-cu" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6 relative", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: toast && /* @__PURE__ */ jsx(
            m.div,
            {
              initial: { opacity: 0, y: -12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -12 },
              className: cn(
                "fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-xl border text-sm font-semibold shadow-2xl",
                toast.type === "success" && "bg-brand-card border-brand-green/30 text-brand-green",
                toast.type === "error" && "bg-brand-card border-brand-red/30 text-brand-red",
                toast.type === "info" && "bg-brand-card border-brand-gold/30 text-brand-gold"
              ),
              children: toast.message
            }
          ) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: showExportModal && /* @__PURE__ */ jsx(
            m.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4",
              children: /* @__PURE__ */ jsxs(
                m.div,
                {
                  initial: { scale: 0.9, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  exit: { scale: 0.9, opacity: 0 },
                  className: "bg-brand-card-2 border border-brand-border rounded-xl w-full max-w-md overflow-hidden p-8 flex flex-col items-center text-center space-y-6 shadow-2xl",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Download, { className: "w-10 h-10" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: t("teamBuilder.exportSuccess") }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-text-sub font-medium leading-relaxed", children: t("teamBuilder.exportSuccessDesc") })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        onClick: () => setShowExportModal(false),
                        className: "w-full bg-gold-gradient text-black h-12 rounded-xl font-bold text-xs tracking-widest",
                        children: t("teamBuilder.great")
                      }
                    )
                  ]
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
            /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 flex flex-col items-center overflow-hidden relative shadow-2xl", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold", children: "ARENA" }),
              /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 relative z-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-brand-text-sub tracking-[0.2em]", children: t("teamBuilder.playerLevel") }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "text-2xl font-bold",
                        isBoardFull ? "text-brand-red" : "text-brand-gold"
                      ),
                      children: [
                        playerLevel,
                        " / ",
                        MAX_UNITS
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-brand-text-sub font-medium", children: t("teamBuilder.playerLevelHint") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-brand-bg px-6 h-14 rounded-xl border border-brand-border", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-brand-text-sub tracking-[0.2em] mr-2", children: t("teamBuilder.totalGold") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-brand-gold", children: [
                    "$",
                    totalCost
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub mb-4 self-start", children: t("teamBuilder.dragHint") }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: boardRef,
                  className: "bg-brand-bg border-2 border-brand-border rounded-xl p-3 md:p-6 shadow-3xl overflow-x-auto hide-scrollbar relative group w-full",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-1.5 md:gap-3 relative z-10", children: Array.from({ length: BOARD_SIZE }).map((_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const isLight = (row + col) % 2 === 0;
                      const entry = board[i];
                      const hero = entry ? heroes.find((h) => h.id === entry.heroId) : null;
                      return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsxs(
                        BoardCellDrop,
                        {
                          index: i,
                          isLight,
                          onCellClick: () => handleBoardCellClick(i),
                          children: [
                            /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: hero && entry && /* @__PURE__ */ jsx(
                              BoardHeroDraggable,
                              {
                                index: i,
                                hero,
                                stars: entry.stars,
                                onRemove: (e) => handleRemoveFromBoard(i, e)
                              }
                            ) }),
                            !hero && /* @__PURE__ */ jsx("div", { className: "opacity-5 font-bold text-[10px] select-none pointer-events-none", children: i + 1 })
                          ]
                        }
                      ) }, `cell-${i}`);
                    }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(TrashDropZone, { label: t("teamBuilder.dropToRemove") }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center w-full mt-8", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: handleSaveComp,
                    className: "h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border hover:bg-white hover:text-black transition-all",
                    children: [
                      /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
                      " ",
                      t("teamBuilder.saveComp")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: handleShareMeta,
                    className: "h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border hover:bg-white hover:text-black transition-all",
                    children: [
                      /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 mr-2" }),
                      " ",
                      t("teamBuilder.shareMeta")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(Button, { variant: "default", onClick: handleExportImage, disabled: isExporting, children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
                  " ",
                  isExporting ? t("teamBuilder.processing") : t("teamBuilder.exportPng")
                ] }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: handleAutoArrange,
                    disabled: activeEntries.length === 0,
                    className: "h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border",
                    children: [
                      /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4 mr-2" }),
                      " ",
                      t("teamBuilder.autoArrange")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "ghost",
                    className: "h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest text-brand-text-sub hover:text-brand-red sm:ml-auto",
                    onClick: handleClearBoard,
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                      " ",
                      t("teamBuilder.refreshBoard")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold uppercase text-white flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-brand-gold rounded-full" }),
                t("teamBuilder.activeSynergies")
              ] }),
              activeSynergies.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { children: activeSynergies.map(({ name, count }) => {
                const isMain = count >= 3;
                return /* @__PURE__ */ jsxs(
                  m.div,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, scale: 0.9 },
                    className: cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02]",
                      isMain ? "bg-brand-card border-brand-gold/30" : "bg-brand-card border-brand-border"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: cn(
                            "w-10 h-10 flex items-center justify-center font-bold text-sm rounded-xl shrink-0",
                            isMain ? "bg-brand-gold text-black shadow-[0_0_15px_rgba(245,180,60,0.2)]" : "bg-brand-card-2 text-brand-text-sub"
                          ),
                          children: count
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: cn(
                              "text-[13px] font-bold uppercase tracking-tight truncate",
                              isMain ? "text-white" : "text-brand-text-sub"
                            ),
                            children: name
                          }
                        ),
                        isMain && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-brand-gold font-bold uppercase tracking-widest", children: "ACTIVE" })
                      ] })
                    ]
                  },
                  name
                );
              }) }) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 bg-brand-bg rounded-xl border-2 border-dashed border-brand-border space-y-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-brand-card rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 text-brand-text-sub" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-brand-text-sub uppercase tracking-widest", children: t("teamBuilder.emptyBoard") }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub font-medium", children: t("teamBuilder.emptyBoardHint") })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-4 flex flex-col max-h-[800px] shadow-2xl relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub", children: t("teamBuilder.heroLibrary") }),
              /* @__PURE__ */ jsxs(FilterToolbar, { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxs(FilterToolbarRow, { children: [
                  /* @__PURE__ */ jsx(
                    FilterSearchInput,
                    {
                      value: searchTerm,
                      onChange: setSearchTerm,
                      placeholder: t("teamBuilder.searchPlaceholder"),
                      "aria-label": t("teamBuilder.searchPlaceholder"),
                      className: "sm:max-w-none sm:flex-1"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    FilterSelect,
                    {
                      value: selectedCost != null ? String(selectedCost) : "all",
                      onValueChange: (v) => setSelectedCost(v === "all" ? null : Number(v)),
                      options: costSelectOptions,
                      "aria-label": t("teamBuilder.filterByCost")
                    }
                  ),
                  /* @__PURE__ */ jsx(FilterClearButton, { visible: hasActiveFilters, onClick: clearFilters })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsx(
                    TraitSearchDropdown,
                    {
                      label: t("teamBuilder.filterRace"),
                      placeholder: t("teamBuilder.allRaces"),
                      searchPlaceholder: t("teamBuilder.searchRacePlaceholder"),
                      emptyLabel: t("teamBuilder.noTraitMatch"),
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
                      label: t("teamBuilder.filterClass"),
                      placeholder: t("teamBuilder.allClasses"),
                      searchPlaceholder: t("teamBuilder.searchClassPlaceholder"),
                      emptyLabel: t("teamBuilder.noTraitMatch"),
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
                  total: heroes.length,
                  className: "px-0.5"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator, { className: "my-3 bg-brand-border" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar pb-10", children: [
              /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredHeroes.map((hero) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
                LibraryHeroDraggable,
                {
                  hero,
                  onClick: () => handleHeroInListClick(hero.id),
                  disabled: isBoardFull
                }
              ) }, hero.id)) }),
              filteredHeroes.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 space-y-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-3xl text-brand-text-sub", children: ":(" }),
                /* @__PURE__ */ jsx("div", { className: "text-[12px] font-bold text-brand-text-sub uppercase", children: t("teamBuilder.noHeroes") })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(DragOverlay, { dropAnimation: null, children: activeDragHero ? /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl overflow-hidden border-2 border-brand-gold shadow-2xl opacity-90", children: /* @__PURE__ */ jsx(HeroIcon, { hero: activeDragHero, size: "md", className: "w-full h-full rounded-xl" }) }) : null })
      ] })
    }
  );
}
function BoardCellDrop({
  index,
  isLight,
  onCellClick,
  children
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `cell:${index}` });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setNodeRef,
      onClick: onCellClick,
      className: cn(
        "aspect-square w-9 xs:w-10 md:w-16 flex items-center justify-center rounded-xl relative transition-all border shrink-0",
        isLight ? "bg-brand-card-2" : "bg-brand-card",
        isOver ? "border-brand-gold bg-brand-gold/5" : "border-transparent hover:border-white/10",
        "cursor-pointer shadow-inner"
      ),
      children
    }
  );
}
function BoardHeroDraggable({
  index,
  hero,
  stars,
  onRemove
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `board:${index}`
  });
  const style = transform ? { transform: CSS.Translate.toString(transform), zIndex: 50 } : void 0;
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      ref: setNodeRef,
      style,
      ...listeners,
      ...attributes,
      initial: { scale: 0.8, opacity: 0, rotate: -15 },
      animate: { scale: 1, opacity: isDragging ? 0.4 : 1, rotate: 0 },
      exit: { scale: 0.5, opacity: 0 },
      className: "absolute inset-1 rounded-lg flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-white/10 group/hero touch-none",
      children: [
        /* @__PURE__ */ jsx(HeroIcon, { hero, size: "sm", className: "absolute inset-0 w-full h-full rounded-lg" }),
        /* @__PURE__ */ jsx("div", { className: cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost)) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0.5 right-0.5 flex gap-0.5 z-10", children: Array.from({ length: stars }).map((_, s) => /* @__PURE__ */ jsx(Star, { className: "w-[7px] h-[7px] text-white fill-white drop-shadow" }, s)) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            className: "absolute -top-1 -left-1 bg-brand-bg text-white p-1 rounded-br-lg opacity-0 group-hover/hero:opacity-100 transition-opacity z-20 border border-brand-border",
            children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" })
      ]
    }
  );
}
function LibraryHeroDraggable({
  hero,
  onClick,
  disabled
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `lib:${hero.id}`,
    disabled
  });
  const style = transform ? { transform: CSS.Translate.toString(transform) } : void 0;
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      ref: setNodeRef,
      style,
      layout: true,
      initial: { opacity: 0, x: 20 },
      animate: { opacity: isDragging ? 0.5 : 1, x: 0 },
      exit: { opacity: 0, scale: 0.9 },
      onClick,
      ...listeners,
      ...attributes,
      className: cn(
        "flex items-center gap-3 p-2 rounded-xl transition-all border group bg-brand-card touch-none",
        disabled ? "opacity-50 cursor-not-allowed border-transparent" : "border-transparent hover:border-brand-gold/30 cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx(
            HeroIcon,
            {
              hero,
              size: "sm",
              className: cn(hero.cost === 5 && "ring-2 ring-brand-gold/40")
            }
          ),
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
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pointer-events-none", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[13px] font-bold text-white truncate group-hover:text-brand-gold transition-colors", children: hero.name }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-medium text-brand-text-sub truncate", children: [
            hero.race.join(", "),
            " · ",
            hero.class.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 text-brand-text-sub group-hover:text-brand-gold transition-colors shrink-0" })
      ]
    }
  );
}
function TrashDropZone({ label }) {
  const { setNodeRef, isOver } = useDroppable({ id: "trash" });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      className: cn(
        "mt-4 w-full max-w-xs h-10 rounded-xl border border-dashed flex items-center justify-center gap-2 text-[11px] font-semibold transition-colors",
        isOver ? "border-brand-red bg-brand-red/10 text-brand-red" : "border-brand-border text-brand-text-sub"
      ),
      children: [
        /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
        label
      ]
    }
  );
}
export {
  TeamBuilderTool
};
