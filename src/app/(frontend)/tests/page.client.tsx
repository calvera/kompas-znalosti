'use client'

import React, { useMemo } from 'react'
import { QuizItem } from '@/model/QuizTypes'
import { Quiz } from '@/components/Quiz/Quiz'
import { LowImpactHero } from '@/heros/LowImpact' // Next.js zvládá import JSON

export default function TestsClientPage() {
  const items = useMemo(() => {
    const blocks = (SRC as unknown as TopicBlock[])
    // Volitelně limit na počet otázek z každého tématu:
    return buildQuizItems(blocks /*, 20 */)
  }, [])

  return (
    <LowImpactHero>
      <h1 className="text-2xl font-bold mb-4">Test – otázky SRC</h1>
      <Quiz items={items} />
    </LowImpactHero>
  )
}

// use v lib/quizUtils.ts
function shuffle<T>(arr: T[], rng = Math.random): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildQuizItems(blocks: TopicBlock[], limitPerTopic?: number): QuizItem[] {
  const items: QuizItem[] = []
  for (const b of blocks) {
    const qs = limitPerTopic ? b.questions.slice(0, limitPerTopic) : b.questions
    for (const q of qs) {
      const answers = shuffle([q.answer, ...q.others])
      const correctIndex = answers.findIndex(a => a === q.answer)
      items.push({
        id: `${b.topic}:${q.question}`.slice(0, 180),
        topic: b.topic,
        question: q.question,
        answers,
        correctIndex,
      })
    }
  }
  return items
}
