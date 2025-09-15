import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import ClientPage from './page.client'
import { QuestionSet } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
    topicSlug?: string
    question: number
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const payload = await getPayload({ config: configPromise })

  const { slug, topicSlug, question = 1 } = await paramsPromise

  const questionTopic = (
    await payload.find({
      collection: 'questionTopics',
      limit: 1,
      depth: 1,
      where: {
        and: [
          {
            'questionSet.slug': {
              equals: slug,
            },
          },
          {
            slug: {
              equals: topicSlug,
            },
          },
        ],
      },
    })
  ).docs[0]

  const questions = (
    await payload.find({
      collection: 'questions',
      limit: -1,
      depth: 0,
      where: {
        questionTopic: {
          equals: questionTopic.id
        },
      },
      sort: 'order',
    })
  ).docs

  return (
    <ClientPage
      questionSet={questionTopic.questionSet as QuestionSet}
      questionTopic={questionTopic}
      questions={questions}
      number={question}
    />
  )
}
