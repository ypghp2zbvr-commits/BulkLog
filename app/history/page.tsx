'use client'

import { useEffect, useState } from "react"
import { getWeightLogs, WeightLog } from "@/lib/weightStorage"

export default function HistoryPage() {
  const [weights, setWeights] = useState<WeightLog[]>([])

  useEffect(() => {
    const logs = getWeightLogs()
    setWeights(logs)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">体重履歴</h1>

      {weights.length === 0 ? (
        <p className="text-zinc-400">まだ記録がありません</p>
      ) : (
        <div data-testid="history-list" className="space-y-3">
          {weights.map((item) => (
            <div
              key={item.date}
              className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl flex justify-between items-center"
            >
              <span className="text-zinc-300">{item.date}</span>
              <span className="text-white font-semibold text-lg">
                {item.weight} kg
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}