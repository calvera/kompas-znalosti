import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'
import ClientPage from './page.client'
import { QuestionSet } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    slug?: string
    topicSlug?: string
  }>
}

const getQuestionTopic = cache(async (slug: string, topicSlug: string) => {
  const payload = await getPayload({ config: configPromise })

  return (
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
})

export default async function Page({ params: paramsPromise }: Args) {
  const payload = await getPayload({ config: configPromise })

  const { slug = '', topicSlug = '' } = await paramsPromise

  const questionTopic = await getQuestionTopic(slug, topicSlug)

  const questions = (
    await payload.find({
      collection: 'questions',
      limit: -1,
      depth: 0,
      where: {
        questionTopic: {
          equals: questionTopic.id,
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
    />
  )
}

// ISR: statically generate with incremental revalidation
export const revalidate = 600

// Pre-generate all /uceni/[slug]/[topicSlug] pages at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const topics = (
    await payload.find({
      collection: 'questionTopics',
      depth: 1,
      limit: 1000,
    })
  ).docs as any[]

  return topics
    .filter((t) => t?.slug && t?.questionSet && typeof t.questionSet === 'object' && 'slug' in t.questionSet)
    .map((t) => ({ slug: t.questionSet.slug as string, topicSlug: t.slug as string }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', topicSlug = '' } = await paramsPromise

  const questionTopic = await getQuestionTopic(slug, topicSlug)

  return generateMeta({ doc: questionTopic })
}
