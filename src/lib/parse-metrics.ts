/** Parse display strings like "12K", "8.5K", "1.2M" to numbers */
export function parseMetric(value: string | number | undefined): number {
  if (typeof value === "number") return value
  if (!value) return 0
  const trimmed = value.trim().toUpperCase()
  if (trimmed.endsWith("K")) {
    return parseFloat(trimmed.replace("K", "")) * 1000
  }
  if (trimmed.endsWith("M")) {
    return parseFloat(trimmed.replace("M", "")) * 1_000_000
  }
  const n = parseFloat(trimmed.replace(/,/g, ""))
  return Number.isNaN(n) ? 0 : n
}

export const parseViews = parseMetric
export const parseLikes = parseMetric

export function formatMetric(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
  return String(Math.round(n))
}
