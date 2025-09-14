import { Question, QuestionSet, QuestionTopic } from '@/payload-types'
import React, { useMemo } from 'react'
import { LowImpactHero } from '@/heros/LowImpact'

type Args = {
  questionSet: QuestionSet
  questionTopic: QuestionTopic
  questions: Question[]
}

export default function ClientPage({ questionSet, questionTopic, questions }: Args) {
  const _ = useMemo(() => {
    return buildQuizItems(questions)
  }, [questions])

  return (
    <LowImpactHero>
      <h2 className="text-2xl font-bold mb-4">
        {questionSet.title}
      </h2>
      <h3 className="text-xl font-bold mb-4">
        {questionTopic.title}
      </h3>
    </LowImpactHero>
  )
}

export function buildQuizItems(questions: Question[]) {
  const items = []

  for (const q of questions) {
    const answers = [...q.answers]
    const correctIndex = answers.findIndex((a) => a.id === q.answers[0].id)
    items.push({
      id: q.id,
      question: q.title,
      answers: answers.map((a) => a.text),
      correctIndex,
    })
  }

  return items
}
