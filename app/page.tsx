'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWeightLogs, WeightLog } from "@/lib/weightStorage";
import { getTrendLabel, getWeeklyStats, hasTodayLog } from "@/lib/weightStats";

export default function Home() {
  const [logs, setLogs] = useState<WeightLog[]>([])

  useEffect(() => {
    setLogs(getWeightLogs())
  }, [])

  const latestWeight = logs[0]?.weight ?? "--"
  const prevWeight = logs[1]?.weight ?? "--"

  const { recentAvg, previousAvg, diff } = getWeeklyStats(logs)
  const trendLabel = getTrendLabel(diff)
  const isTodayLogged = hasTodayLog(logs)

  const statusTextClass = isTodayLogged ? "text-green-400" : "text-zinc-300"

  let trendTextClass = "text-zinc-300"
  if (trendLabel.includes("OK")) {
    trendTextClass = "text-green-400"
  } else if (trendLabel.includes("停滞")) {
    trendTextClass = "text-yellow-300"
  } else if (trendLabel.includes("減少")) {
    trendTextClass = "text-red-400"
  }

  let diffTextClass = "text-white"
  if (diff !== null) {
    if (diff > 0) {
      diffTextClass = "text-green-400"
    } else if (diff < 0) {
      diffTextClass = "text-red-400"
    } else {
      diffTextClass = "text-yellow-300"
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">BulkLog</h1>

      <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl mb-4">
        <p className="text-sm text-zinc-400">最新の体重</p>
        <p className="text-4xl font-bold mt-2">{latestWeight} kg</p>
        <p className="text-sm text-zinc-300 mt-1">前回 {prevWeight} kg</p>

        <p className={`mt-4 text-sm font-semibold ${statusTextClass}`}>
          {isTodayLogged ? "✅ 今日入力済み" : "⚪️ 今日は未入力"}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl mb-6 space-y-3">
        <p className="text-zinc-200">直近7日平均: {recentAvg ?? "--"} kg</p>
        <p className="text-zinc-200">前の7日平均: {previousAvg ?? "--"} kg</p>
        <p className={`font-bold ${diffTextClass}`}>
          差分: {diff !== null ? `${diff > 0 ? "+" : ""}${diff} kg` : "--"}
        </p>
        <p className={`text-lg font-semibold ${trendTextClass}`}>{trendLabel}</p>
      </div>

      <div className="space-y-3">
        <Link
          href="/weight"
          className="block bg-white text-black text-center p-4 rounded-xl font-semibold"
        >
          体重を記録
        </Link>

        <Link
          href="/history"
          className="block bg-zinc-800 text-white text-center p-4 rounded-xl font-semibold border border-zinc-700"
        >
          履歴を見る
        </Link>
      </div>
    </main>
  )
}