'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getWeightLogs, saveWeightLog } from "@/lib/weightStorage"

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

export default function WeightPage() {
  const router = useRouter()
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState(getTodayDate())
  const [isEditingDate, setIsEditingDate] = useState(false)

  useEffect(() => {
    const logs = getWeightLogs()
    const latestWeight = logs[0]?.weight

    if (latestWeight !== undefined) {
      setWeight(String(latestWeight))
    }
  }, [])

  function changeWeight(delta: number) {
    const current = Number(weight || 0)
    const next = Math.round((current + delta) * 10) / 10
    setWeight(next.toFixed(1))
  }

  function handleSave() {
    if (!weight) {
      alert("体重を入力してください")
      return
    }

    saveWeightLog({
      date,
      weight: Number(weight),
    })

    alert(`体重 ${weight} kg を保存しました`)
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">体重を記録</h1>

      <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl mb-6">
        <p className="text-sm text-zinc-400 mb-2">日付</p>

        {!isEditingDate ? (
          <div className="mb-5">
            <div className="w-full rounded-lg p-4 bg-zinc-800 text-white border border-zinc-700">
              {date}
            </div>
            <button
              type="button"
              onClick={() => setIsEditingDate(true)}
              className="mt-3 text-sm text-zinc-300 underline underline-offset-4"
            >
              日付を変更
            </button>
          </div>
        ) : (
          <div className="mb-5">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg p-3 bg-zinc-800 text-white border border-zinc-700"
            />
            <button
              type="button"
              onClick={() => setIsEditingDate(false)}
              className="mt-3 text-sm text-zinc-300 underline underline-offset-4"
            >
              日付変更を閉じる
            </button>
          </div>
        )}

        <p className="text-sm text-zinc-400 mb-2">体重</p>

        <div className="mb-4">
          <input
            type="number"
            step="0.1"
            inputMode="decimal"
            placeholder="63.8"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg p-4 text-2xl bg-zinc-800 text-white border border-zinc-700 text-center mb-3"
          />

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => changeWeight(-0.1)}
              className="w-full py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-semibold"
            >
              -0.1
            </button>

            <button
              type="button"
              onClick={() => changeWeight(0.1)}
              className="w-full py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-semibold"
            >
              +0.1
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSave}
          className="w-full bg-white text-black p-4 rounded-xl text-lg font-semibold"
        >
          保存
        </button>

        <Link
          href="/"
          className="block w-full text-center bg-zinc-800 text-white p-4 rounded-xl text-lg font-semibold border border-zinc-700"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  )
}