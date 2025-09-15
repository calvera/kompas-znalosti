import type { Metadata } from 'next'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'
import { QuestionTopic } from '@/payload-types'
import { RenderHero } from '@/heros/RenderHero'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const getQuestionSet = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  return (
    await payload.find({
      collection: 'questionSets',
      limit: 1,
      depth: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0]
})

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const questionSet = await getQuestionSet(slug)

  const topicsList = questionSet.topics!.docs! as QuestionTopic[]
  return (
    <div className="max-w-[48rem] mx-auto">
      <RenderHero {...questionSet.hero} />
      <h2>{questionSet.title}</h2>
      <div className="pt-24 pb-24">
        <RichText data={questionSet.description} enableGutter={false} />
        {topicsList.map(({ slug: topicSlug, title }) => (
          <div key={topicSlug}>
            <CMSLink url={`/uceni/${slug}/${topicSlug}`}>{title}</CMSLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise

  const questionSet = await getQuestionSet(slug)

  return generateMeta({ doc: questionSet })
}
