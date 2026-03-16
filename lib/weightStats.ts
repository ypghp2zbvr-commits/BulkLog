import { WeightLog } from "@/lib/weightStorage"

function getDateOnly(dateString: string) {
  return new Date(dateString + "T00:00:00")
}

function diffDays(base: Date, target: Date) {
  const ms = base.getTime() - target.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export function getAverage(weights: number[]) {
  if (weights.length === 0) return null

  const total = weights.reduce((sum, w) => sum + w, 0)
  return Number((total / weights.length).toFixed(1))
}

export function getWeeklyStats(logs: WeightLog[]) {
  const today = new Date()
  const recentWeights: number[] = []
  const previousWeights: number[] = []

  for (const log of logs) {
    const logDate = getDateOnly(log.date)
    const daysAgo = diffDays(today, logDate)

    if (daysAgo >= 0 && daysAgo <= 6) {
      recentWeights.push(log.weight)
    } else if (daysAgo >= 7 && daysAgo <= 13) {
      previousWeights.push(log.weight)
    }
  }

  const recentAvg = getAverage(recentWeights)
  const previousAvg = getAverage(previousWeights)

  let diff: number | null = null
  if (recentAvg !== null && previousAvg !== null) {
    diff = Number((recentAvg - previousAvg).toFixed(1))
  }

  return {
    recentAvg,
    previousAvg,
    diff,
  }
}

export function getTrendLabel(diff: number | null) {
  if (diff === null) return "比較データ不足"
  if (diff > 0.2) return "増量OK 💪"
  if (diff < -0.2) return "減少傾向"
  return "停滞"
}
export function hasTodayLog(logs: WeightLog[]) {
  const today = new Date().toISOString().split("T")[0]
  return logs.some((log) => log.date === today)
}