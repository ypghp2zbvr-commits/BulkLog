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
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">体重を記録</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-sm text-gray-500 mb-2">日付</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-3 bg-white mb-4"
        />

        <p className="text-sm text-gray-500 mb-2">体重</p>
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="63.8"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border rounded p-3 text-xl bg-white"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-black text-white p-4 rounded text-lg"
      >
        保存
      </button>
    </main>
  )
}