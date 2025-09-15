'use client'

import { Question, QuestionSet, QuestionTopic } from '@/payload-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LowImpactHero } from '@/heros/LowImpact'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { useSearchParams } from 'next/navigation'

type Args = {
  questionSet: QuestionSet
  questionTopic: QuestionTopic
  questions: Question[]
}

export default function ClientPage({ questionSet, questionTopic, questions }: Args) {
  const buildQuestions = useMemo(() => {
    return buildQuizItems(questions)
  }, [questions])

  const q = useSearchParams().get('q')
  const [questionNumber, setQuestionNumber] = useState(q ? parseInt(q) : 1)
  const [answered, setAnswered] = useState<string[]>([])
  const timeoutRef = useRef<number | null>(null)

  // Clear pending auto-advance timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function prevHandler() {
    setQuestionNumber((prev) => Math.max(1, prev - 1))
  }

  function nextHandler() {
    setQuestionNumber((prev) => Math.min(buildQuestions.length, prev + 1))
  }

  function answerHandler(answerId: string) {
    setAnswered((prev) => {
      const next = prev.slice() // copy array
      next[questionNumber - 1] = answerId
      return next
    })

    // Auto-advance after 1s; clear any previous pending timer first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setQuestionNumber((curr) => Math.min(buildQuestions.length, curr + 1))
    }, 500)
  }

  useEffect(() => {
    window?.history.pushState(null, '', `?q=${questionNumber}`)
  }, [questionNumber])

  return (
    <>
      <LowImpactHero>
        <h2 className="text-3xl font-bold mb-4">{questionSet.title}</h2>
        <h3 className="text-2xl font-bold mb-4">{questionTopic.title}</h3>
      </LowImpactHero>
      <div className="container">
        <div className="max-w-[48rem]">
          <p className="text-lg font-medium">
            {questionNumber}. {buildQuestions[questionNumber - 1].title}
          </p>
          <div className="mt-4 ml-4">
            {buildQuestions[questionNumber - 1].answers.map((answer) => {
              const selectedAnswerId = answered[questionNumber - 1]
              const isCorrectSelection = selectedAnswerId === buildQuestions[questionNumber - 1].correctId
              const isSelected = selectedAnswerId === answer.id

              return (
                <button
                  onClick={() => answerHandler(answer.id!)}
                  key={answer.id}
                  className={cn(
                    'block w-full rounded-md border p-2 text-left outline-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    {
                      'bg-green-600': isSelected && isCorrectSelection,
                      'bg-red-600': isSelected && !isCorrectSelection,
                    },
                  )}
                >
                  <RichText data={answer.text!} enableGutter={false} />
                </button>
              )
            })}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={prevHandler}
            >
              Previous
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={nextHandler}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export function buildQuizItems(questions: Question[]) {
  const items = []

  function shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  for (const q of questions) {
    const correctId = q.answers?.[0]?.id ?? undefined
    const shuffledAnswers = shuffleArray(q.answers || [])

    items.push({
      id: q.id,
      title: q.title,
      answers: shuffledAnswers,
      correctId,
    })
  }

  return items
}
