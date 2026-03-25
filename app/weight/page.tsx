'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveWeightLog } from "@/lib/weightStorage"

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

export default function WeightPage() {
  const router = useRouter()
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState(getTodayDate())

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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg p-3 bg-zinc-800 text-white border border-zinc-700 mb-5"
        />

        <p className="text-sm text-zinc-400 mb-2">体重</p>
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="63.8"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full rounded-lg p-4 text-xl bg-zinc-800 text-white border border-zinc-700"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-white text-black p-4 rounded-xl text-lg font-semibold"
      >
        保存
      </button>
    </main>
  )
}