export type WeightLog = {
  date: string
  weight: number
}

const STORAGE_KEY = "bulklog_weights"

export function getWeightLogs(): WeightLog[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored) as WeightLog[]
  } catch {
    return []
  }
}

export function saveWeightLog(newLog: WeightLog) {
  const logs = getWeightLogs()

  const filteredLogs = logs.filter((log) => log.date !== newLog.date)

  const updatedLogs = [newLog, ...filteredLogs].sort((a, b) =>
    b.date.localeCompare(a.date)
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))
}