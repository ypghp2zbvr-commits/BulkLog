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
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">体重履歴</h1>

      {weights.length === 0 ? (
        <p className="text-gray-500">まだ記録がありません</p>
      ) : (
        <div data-testid="history-list" className="space-y-3">
          {weights.map((item) => (
            <div
              key={item.date}
              className="bg-gray-100 p-4 rounded flex justify-between"
            >
              <span>{item.date}</span>
              <span className="font-semibold">{item.weight} kg</span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}