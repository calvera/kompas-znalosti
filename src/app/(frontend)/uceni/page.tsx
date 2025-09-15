import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'

// Next.js Route Segment Config (ISR): this page is statically generated and will be revalidated
// at most once every 600 seconds (10 minutes) when a request comes in. This enables incremental
// static regeneration so content can update over time without a full rebuild.
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const questionSets = (
    await payload.find({
      collection: 'questionSets',
      depth: 0,
    })
  ).docs

  return (
    <div className="pt-24 pb-24">
      {questionSets.map(({ slug, title }) => (
        <div key={slug}>
          <CMSLink url={`/uceni/${slug}`}>{title}</CMSLink>
        </div>
      ))}
    </div>
  )
}
