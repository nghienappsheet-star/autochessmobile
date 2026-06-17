import * as React from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Card, Button, Separator } from "@/components/ui/core"
import {
  Plus,
  Trash2,
  Save,
  Share2,
  Download,
  X,
  Star,
  LayoutGrid,
} from "lucide-react"
import {
  FilterToolbar,
  FilterToolbarRow,
  FilterSearchInput,
  FilterSelect,
  FilterClearButton,
  FilterResultMeta,
  TraitSearchDropdown,
} from "@/components/layout/FilterToolbar"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "@/components/motion/MotionProvider"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import html2canvas from "html2canvas-pro"
import { heroCostBarClass, heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import { heroStarCost } from "@/lib/comp-stats"
import { countActiveTraits } from "@/lib/traits"
import { useHeroPickerFilters } from "@/hooks/useHeroPickerFilters"
import { BOARD_SIZE, buildCompBoard } from "@/lib/comp-formation"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { BackButton } from "@/components/ui/BackButton"
import { loadJson, saveJson } from "@/lib/storage"
import type { Hero } from "@/types/domain"

const TEAM_BUILDER_SAVE_KEY = "autochess_team_builder_board"
const MAX_UNITS = 16

type BoardCell = { heroId: string; stars: number } | null
type BoardState = BoardCell[]
type ToastState = { message: string; type: "success" | "error" | "info" } | null

function emptyBoard(): BoardState {
  return Array(BOARD_SIZE).fill(null)
}

function parseBoardFromShare(boardParam: string): BoardState {
  const board = emptyBoard()
  const parts = boardParam.split(",")
  parts.forEach((part, index) => {
    if (!part || index >= BOARD_SIZE) return
    const [heroId, starsStr] = part.split(":")
    if (!heroId) return
    const stars = Math.min(3, Math.max(1, Number(starsStr) || 1))
    board[index] = { heroId, stars }
  })
  return board
}

function loadInitialState(): { board: BoardState; fromShare: boolean } {
  const params = new URLSearchParams(window.location.search)
  const boardParam = params.get("board")

  if (boardParam) {
    return {
      board: parseBoardFromShare(boardParam),
      fromShare: true,
    }
  }

  const saved = loadJson<{ board?: BoardState } | null>(TEAM_BUILDER_SAVE_KEY, null)
  if (saved?.board && Array.isArray(saved.board) && saved.board.length === BOARD_SIZE) {
    return {
      board: saved.board,
      fromShare: false,
    }
  }

  return { board: emptyBoard(), fromShare: false }
}

function parseDragId(id: string | number) {
  const str = String(id)
  if (str.startsWith("lib:")) return { kind: "lib" as const, heroId: str.slice(4) }
  if (str.startsWith("board:")) return { kind: "board" as const, index: Number(str.slice(6)) }
  if (str.startsWith("cell:")) return { kind: "cell" as const, index: Number(str.slice(5)) }
  if (str === "trash") return { kind: "trash" as const }
  return null
}

export function TeamBuilderTool() {
  const { t } = useTranslation("tools")
  const { heroes, races, classes } = useAppStore()

  const initial = React.useMemo(() => loadInitialState(), [])
  const [board, setBoard] = React.useState<BoardState>(initial.board)
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
    clearFilters: resetHeroFilters,
  } = useHeroPickerFilters(heroes, { searchTraits: true })
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false)
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false)
  const [showExportModal, setShowExportModal] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)
  const [toast, setToast] = React.useState<ToastState>(null)
  const [activeDragHero, setActiveDragHero] = React.useState<Hero | null>(null)
  const boardRef = React.useRef<HTMLDivElement>(null)
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = React.useCallback(
    (message: string, type: ToastState["type"] = "success") => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      setToast({ message, type })
      toastTimerRef.current = setTimeout(() => setToast(null), 2500)
    },
    []
  )

  React.useEffect(() => {
    if (initial.fromShare) {
      showToast(t("teamBuilder.loadedShared"), "info")
    }
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [initial.fromShare, showToast, t])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
  )

  const activeEntries = board.filter(Boolean) as { heroId: string; stars: number }[]
  const playerLevel = activeEntries.length
  const isBoardFull = playerLevel >= MAX_UNITS

  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("teamBuilder.allCosts") },
      ...([1, 2, 3, 4, 5] as const).map((cost) => ({
        value: String(cost),
        label: `$${cost}`,
      })),
    ],
    [t]
  )

  const totalCost = activeEntries.reduce((sum, entry) => {
    const hero = heroes.find((h) => h.id === entry.heroId)
    if (!hero) return sum
    return sum + heroStarCost(hero.cost, entry.stars)
  }, 0)

  const activeSynergies = React.useMemo(() => {
    const uniqueHeroIds = Array.from(new Set(activeEntries.map((e) => e.heroId)))
    return countActiveTraits(uniqueHeroIds, heroes)
  }, [activeEntries, heroes])

  const placeHeroAt = React.useCallback(
    (boardState: BoardState, index: number, heroId: string, stars = 1): BoardState | null => {
      if (index < 0 || index >= BOARD_SIZE) return null
      const next = [...boardState]
      const occupied = next.filter(Boolean).length
      if (!next[index] && occupied >= MAX_UNITS) return null
      next[index] = { heroId, stars }
      return next
    },
    []
  )

  const handleHeroInListClick = (heroId: string) => {
    if (isBoardFull) {
      showToast(t("teamBuilder.maxUnitsReached"), "error")
      return
    }
    const emptyIdx = board.findIndex((cell) => cell === null)
    if (emptyIdx === -1) return
    const next = placeHeroAt(board, emptyIdx, heroId, 1)
    if (next) setBoard(next)
  }

  const handleRemoveFromBoard = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = [...board]
    next[index] = null
    setBoard(next)
  }

  const handleBoardCellClick = (index: number) => {
    if (!board[index]) return
    const next = [...board]
    const currentStars = next[index]?.stars || 1
    next[index] = {
      ...next[index]!,
      stars: currentStars < 3 ? currentStars + 1 : 1,
    }
    setBoard(next)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const parsed = parseDragId(event.active.id)
    if (parsed?.kind === "lib") {
      const hero = heroes.find((h) => h.id === parsed.heroId)
      if (hero) setActiveDragHero(hero)
    } else if (parsed?.kind === "board") {
      const entry = board[parsed.index]
      if (entry) {
        const hero = heroes.find((h) => h.id === entry.heroId)
        if (hero) setActiveDragHero(hero)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragHero(null)
    const { active, over } = event
    if (!over) {
      const from = parseDragId(active.id)
      if (from?.kind === "board") {
        const next = [...board]
        next[from.index] = null
        setBoard(next)
      }
      return
    }

    const from = parseDragId(active.id)
    const to = parseDragId(over.id)
    if (!from || !to) return

    if (to.kind === "trash" && from.kind === "board") {
      const next = [...board]
      next[from.index] = null
      setBoard(next)
      return
    }

    const targetIndex = to.kind === "cell" ? to.index : to.kind === "board" ? to.index : -1
    if (targetIndex < 0) return

    if (from.kind === "lib") {
      if (isBoardFull && !board[targetIndex]) {
        showToast(t("teamBuilder.maxUnitsReached"), "error")
        return
      }
      const next = [...board]
      if (next[targetIndex]) return
      next[targetIndex] = { heroId: from.heroId, stars: 1 }
      if (next.filter(Boolean).length > MAX_UNITS) {
        showToast(t("teamBuilder.maxUnitsReached"), "error")
        return
      }
      setBoard(next)
      return
    }

    if (from.kind === "board") {
      const next = [...board]
      const source = next[from.index]
      if (!source) return
      const target = next[targetIndex]
      next[from.index] = target ? { ...target } : null
      next[targetIndex] = { ...source }
      setBoard(next)
    }
  }

  const handleSaveComp = () => {
    const payload = { board, savedAt: Date.now() }
    saveJson(TEAM_BUILDER_SAVE_KEY, payload)
    showToast(t("teamBuilder.saved"))
  }

  const handleShareMeta = async () => {
    const params = new URLSearchParams({
      board: board.map((cell) => (cell ? `${cell.heroId}:${cell.stars}` : "")).join(","),
    })
    const url = `${window.location.origin}/cong-cu/tao-doi-hinh?${params.toString()}`
    try {
      await navigator.clipboard.writeText(url)
      showToast(t("teamBuilder.shareCopied"))
    } catch {
      showToast(t("teamBuilder.shareCopyFailed"), "error")
    }
  }

  const handleExportImage = async () => {
    if (!boardRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(boardRef.current, {
        backgroundColor: "#0D0E12",
        scale: 2,
        useCORS: true,
      })
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `doi-hinh-auto-chess-${Date.now()}.png`
      link.href = dataUrl
      link.click()
      setShowExportModal(true)
    } catch (error) {
      console.error("Failed to export image:", error)
      showToast(t("teamBuilder.exportFailed"), "error")
    } finally {
      setIsExporting(false)
    }
  }

  const handleAutoArrange = () => {
    if (activeEntries.length === 0) return
    const starMap = new Map<string, number>()
    activeEntries.forEach((e) => {
      starMap.set(e.heroId, e.stars)
    })
    const heroIds = Array.from(new Set(activeEntries.map((e) => e.heroId)))
    const arranged = buildCompBoard(heroIds, heroes)
    const newBoard: BoardState = arranged.map((heroId) =>
      heroId ? { heroId, stars: starMap.get(heroId) ?? 1 } : null
    )
    setBoard(newBoard)
    showToast(t("teamBuilder.autoArrangeDone"), "info")
  }

  const handleClearBoard = () => {
    if (!window.confirm(t("teamBuilder.clearConfirm"))) return
    setBoard(emptyBoard())
  }

  const clearFilters = () => {
    resetHeroFilters()
    setRaceDropdownOpen(false)
    setClassDropdownOpen(false)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4 pb-20 relative">
        <BackButton to="/cong-cu" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={cn(
                "fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-xl border text-sm font-semibold shadow-2xl",
                toast.type === "success" && "bg-brand-card border-brand-green/30 text-brand-green",
                toast.type === "error" && "bg-brand-card border-brand-red/30 text-brand-red",
                toast.type === "info" && "bg-brand-card border-brand-gold/30 text-brand-gold"
              )}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-brand-card-2 border border-brand-border rounded-xl w-full max-w-md overflow-hidden p-8 flex flex-col items-center text-center space-y-6 shadow-2xl"
              >
                <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center">
                  <Download className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">{t("teamBuilder.exportSuccess")}</h2>
                  <p className="text-sm text-brand-text-sub font-medium leading-relaxed">
                    {t("teamBuilder.exportSuccessDesc")}
                  </p>
                </div>
                <Button
                  onClick={() => setShowExportModal(false)}
                  className="w-full bg-gold-gradient text-black h-12 rounded-xl font-bold text-xs tracking-widest"
                >
                  {t("teamBuilder.great")}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-brand-card border-brand-border p-6 flex flex-col items-center overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold">
              ARENA
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 relative z-10">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-brand-text-sub tracking-[0.2em]">
                  {t("teamBuilder.playerLevel")}
                </div>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    isBoardFull ? "text-brand-red" : "text-brand-gold"
                  )}
                >
                  {playerLevel} / {MAX_UNITS}
                </div>
                <p className="text-[10px] text-brand-text-sub font-medium">
                  {t("teamBuilder.playerLevelHint")}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-brand-bg px-6 h-14 rounded-xl border border-brand-border">
                <div className="text-[10px] font-bold uppercase text-brand-text-sub tracking-[0.2em] mr-2">
                  {t("teamBuilder.totalGold")}
                </div>
                <span className="text-2xl font-bold text-brand-gold">${totalCost}</span>
              </div>
            </div>

            <p className="text-[11px] text-brand-text-sub mb-4 self-start">
              {t("teamBuilder.dragHint")}
            </p>

            <div
              ref={boardRef}
              className="bg-brand-bg border-2 border-brand-border rounded-xl p-3 md:p-6 shadow-3xl overflow-x-auto hide-scrollbar relative group w-full"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
              <div className="grid grid-cols-8 gap-1.5 md:gap-3 relative z-10">
                {Array.from({ length: BOARD_SIZE }).map((_, i) => {
                  const row = Math.floor(i / 8)
                  const col = i % 8
                  const isLight = (row + col) % 2 === 0
                  const entry = board[i]
                  const hero = entry ? heroes.find((h) => h.id === entry.heroId) : null

                  return (
                    <React.Fragment key={`cell-${i}`}>
                    <BoardCellDrop
                      index={i}
                      isLight={isLight}
                      onCellClick={() => handleBoardCellClick(i)}
                    >
                      <AnimatePresence mode="popLayout">
                        {hero && entry && (
                          <BoardHeroDraggable
                            index={i}
                            hero={hero}
                            stars={entry.stars}
                            onRemove={(e) => handleRemoveFromBoard(i, e)}
                          />
                        )}
                      </AnimatePresence>
                      {!hero && (
                        <div className="opacity-5 font-bold text-[10px] select-none pointer-events-none">
                          {i + 1}
                        </div>
                      )}
                    </BoardCellDrop>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            <TrashDropZone label={t("teamBuilder.dropToRemove")} />

            <div className="flex flex-wrap gap-3 justify-center w-full mt-8">
              <Button
                variant="outline"
                onClick={handleSaveComp}
                className="h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border hover:bg-white hover:text-black transition-all"
              >
                <Save className="w-4 h-4 mr-2" /> {t("teamBuilder.saveComp")}
              </Button>
              <Button
                variant="outline"
                onClick={handleShareMeta}
                className="h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border hover:bg-white hover:text-black transition-all"
              >
                <Share2 className="w-4 h-4 mr-2" /> {t("teamBuilder.shareMeta")}
              </Button>
              <Button variant="default" onClick={handleExportImage} disabled={isExporting}>
                <Download className="w-4 h-4 mr-2" />{" "}
                {isExporting ? t("teamBuilder.processing") : t("teamBuilder.exportPng")}
              </Button>
              <Button
                variant="outline"
                onClick={handleAutoArrange}
                disabled={activeEntries.length === 0}
                className="h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest border-brand-border"
              >
                <LayoutGrid className="w-4 h-4 mr-2" /> {t("teamBuilder.autoArrange")}
              </Button>
              <Button
                variant="ghost"
                className="h-12 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest text-brand-text-sub hover:text-brand-red sm:ml-auto"
                onClick={handleClearBoard}
              >
                <Trash2 className="w-4 h-4 mr-2" /> {t("teamBuilder.refreshBoard")}
              </Button>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-lg font-bold uppercase text-white flex items-center gap-3">
              <div className="w-1.5 h-6 bg-brand-gold rounded-full" />
              {t("teamBuilder.activeSynergies")}
            </h3>
            {activeSynergies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {activeSynergies.map(({ name, count }) => {
                    const isMain = count >= 3
                    return (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02]",
                          isMain
                            ? "bg-brand-card border-brand-gold/30"
                            : "bg-brand-card border-brand-border"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 flex items-center justify-center font-bold text-sm rounded-xl shrink-0",
                            isMain
                              ? "bg-brand-gold text-black shadow-[0_0_15px_rgba(245,180,60,0.2)]"
                              : "bg-brand-card-2 text-brand-text-sub"
                          )}
                        >
                          {count}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={cn(
                              "text-[13px] font-bold uppercase tracking-tight truncate",
                              isMain ? "text-white" : "text-brand-text-sub"
                            )}
                          >
                            {name}
                          </span>
                          {isMain && (
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                              ACTIVE
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-brand-bg rounded-xl border-2 border-dashed border-brand-border space-y-4">
                <div className="w-16 h-16 bg-brand-card rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-brand-text-sub" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-brand-text-sub uppercase tracking-widest">
                    {t("teamBuilder.emptyBoard")}
                  </p>
                  <p className="text-[11px] text-brand-text-sub font-medium">
                    {t("teamBuilder.emptyBoardHint")}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <Card className="bg-brand-card border-brand-border p-4 flex flex-col max-h-[800px] shadow-2xl relative">
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub">
                {t("teamBuilder.heroLibrary")}
              </h3>

              <FilterToolbar className="space-y-2.5">
                <FilterToolbarRow>
                  <FilterSearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={t("teamBuilder.searchPlaceholder")}
                    aria-label={t("teamBuilder.searchPlaceholder")}
                    className="sm:max-w-none sm:flex-1"
                  />
                  <FilterSelect
                    value={selectedCost != null ? String(selectedCost) : "all"}
                    onValueChange={(v) => setSelectedCost(v === "all" ? null : Number(v))}
                    options={costSelectOptions}
                    aria-label={t("teamBuilder.filterByCost")}
                  />
                  <FilterClearButton visible={hasActiveFilters} onClick={clearFilters} />
                </FilterToolbarRow>

                <div className="grid grid-cols-2 gap-2">
                  <TraitSearchDropdown
                    label={t("teamBuilder.filterRace")}
                    placeholder={t("teamBuilder.allRaces")}
                    searchPlaceholder={t("teamBuilder.searchRacePlaceholder")}
                    emptyLabel={t("teamBuilder.noTraitMatch")}
                    traits={races.map((r) => r.name)}
                    selected={selectedRace}
                    open={raceDropdownOpen}
                    onOpenChange={(open) => {
                      setRaceDropdownOpen(open)
                      if (open) setClassDropdownOpen(false)
                    }}
                    onSelect={setSelectedRace}
                  />

                  <TraitSearchDropdown
                    label={t("teamBuilder.filterClass")}
                    placeholder={t("teamBuilder.allClasses")}
                    searchPlaceholder={t("teamBuilder.searchClassPlaceholder")}
                    emptyLabel={t("teamBuilder.noTraitMatch")}
                    traits={classes.map((c) => c.name)}
                    selected={selectedClass}
                    open={classDropdownOpen}
                    onOpenChange={(open) => {
                      setClassDropdownOpen(open)
                      if (open) setRaceDropdownOpen(false)
                    }}
                    onSelect={setSelectedClass}
                  />
                </div>
              </FilterToolbar>

              <FilterResultMeta
                shown={filteredHeroes.length}
                total={heroes.length}
                className="px-0.5"
              />
            </div>

            <Separator className="my-3 bg-brand-border" />

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar pb-10">
              <AnimatePresence mode="popLayout">
                {filteredHeroes.map((hero) => (
                  <React.Fragment key={hero.id}>
                  <LibraryHeroDraggable
                    hero={hero}
                    onClick={() => handleHeroInListClick(hero.id)}
                    disabled={isBoardFull}
                  />
                  </React.Fragment>
                ))}
              </AnimatePresence>
              {filteredHeroes.length === 0 && (
                <div className="text-center py-12 space-y-2">
                  <div className="text-3xl text-brand-text-sub">:(</div>
                  <div className="text-[12px] font-bold text-brand-text-sub uppercase">
                    {t("teamBuilder.noHeroes")}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDragHero ? (
          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-brand-gold shadow-2xl opacity-90">
            <HeroIcon hero={activeDragHero} size="md" className="w-full h-full rounded-xl" />
          </div>
        ) : null}
      </DragOverlay>
      </div>
    </DndContext>
  )
}

function BoardCellDrop({
  index,
  isLight,
  onCellClick,
  children,
}: {
  index: number
  isLight: boolean
  onCellClick: () => void
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `cell:${index}` })

  return (
    <div
      ref={setNodeRef}
      onClick={onCellClick}
      className={cn(
        "aspect-square w-9 xs:w-10 md:w-16 flex items-center justify-center rounded-xl relative transition-all border shrink-0",
        isLight ? "bg-brand-card-2" : "bg-brand-card",
        isOver ? "border-brand-gold bg-brand-gold/5" : "border-transparent hover:border-white/10",
        "cursor-pointer shadow-inner"
      )}
    >
      {children}
    </div>
  )
}

function BoardHeroDraggable({
  index,
  hero,
  stars,
  onRemove,
}: {
  index: number
  hero: Hero
  stars: number
  onRemove: (e: React.MouseEvent) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `board:${index}`,
  })

  const style = transform
    ? { transform: CSS.Translate.toString(transform), zIndex: 50 }
    : undefined

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
      animate={{ scale: 1, opacity: isDragging ? 0.4 : 1, rotate: 0 }}
      exit={{ scale: 0.5, opacity: 0 }}
      className="absolute inset-1 rounded-lg flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-white/10 group/hero touch-none"
    >
      <HeroIcon hero={hero} size="sm" className="absolute inset-0 w-full h-full rounded-lg" />
      <div className={cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost))} />
      <div className="absolute top-0.5 right-0.5 flex gap-0.5 z-10">
        {Array.from({ length: stars }).map((_, s) => (
          <Star key={s} className="w-[7px] h-[7px] text-white fill-white drop-shadow" />
        ))}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1 -left-1 bg-brand-bg text-white p-1 rounded-br-lg opacity-0 group-hover/hero:opacity-100 transition-opacity z-20 border border-brand-border"
      >
        <X className="w-3 h-3" />
      </button>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </motion.div>
  )
}

function LibraryHeroDraggable({
  hero,
  onClick,
  disabled,
}: {
  hero: Hero
  onClick: () => void
  disabled: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `lib:${hero.id}`,
    disabled,
  })

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-3 p-2 rounded-xl transition-all border group bg-brand-card touch-none",
        disabled
          ? "opacity-50 cursor-not-allowed border-transparent"
          : "border-transparent hover:border-brand-gold/30 cursor-pointer"
      )}
    >
      <div className="relative shrink-0">
        <HeroIcon
          hero={hero}
          size="sm"
          className={cn(hero.cost === 5 && "ring-2 ring-brand-gold/40")}
        />
        <div
          className={cn(
            "absolute -top-1 -right-1 px-1 py-0 text-[8px] font-bold z-10",
            heroCostBadgeOverlayClass(hero.cost)
          )}
        >
          ${hero.cost}
        </div>
      </div>
      <div className="flex-1 min-w-0 pointer-events-none">
        <div className="text-[13px] font-bold text-white truncate group-hover:text-brand-gold transition-colors">
          {hero.name}
        </div>
        <div className="text-[10px] font-medium text-brand-text-sub truncate">
          {hero.race.join(", ")} · {hero.class.join(", ")}
        </div>
      </div>
      <Plus className="w-4 h-4 text-brand-text-sub group-hover:text-brand-gold transition-colors shrink-0" />
    </motion.div>
  )
}

function TrashDropZone({ label }: { label: string }) {
  const { setNodeRef, isOver } = useDroppable({ id: "trash" })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "mt-4 w-full max-w-xs h-10 rounded-xl border border-dashed flex items-center justify-center gap-2 text-[11px] font-semibold transition-colors",
        isOver
          ? "border-brand-red bg-brand-red/10 text-brand-red"
          : "border-brand-border text-brand-text-sub"
      )}
    >
      <Trash2 className="w-3.5 h-3.5" />
      {label}
    </div>
  )
}
