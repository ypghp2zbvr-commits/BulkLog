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

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">BulkLog</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-sm text-gray-500">最新の体重</p>
        <p className="text-3xl font-bold">{latestWeight} kg</p>
        <p className="text-sm">前回 {prevWeight} kg</p>

        <p className="mt-3 text-sm font-semibold">
          {isTodayLogged ? "✅ 今日入力済み" : "⚪️ 今日は未入力"}
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4 space-y-2">
        <p>直近7日平均: {recentAvg ?? "--"} kg</p>
        <p>前の7日平均: {previousAvg ?? "--"} kg</p>
        <p className="font-bold">
          差分: {diff !== null ? `${diff > 0 ? "+" : ""}${diff} kg` : "--"}
        </p>
        <p className="text-lg font-semibold">{trendLabel}</p>
      </div>

      <div className="space-y-3">
        <Link
          href="/weight"
          className="block bg-black text-white text-center p-3 rounded"
        >
          体重を記録
        </Link>

        <Link
          href="/history"
          className="block bg-gray-300 text-center p-3 rounded"
        >
          履歴を見る
        </Link>
      </div>
    </main>
  )
}