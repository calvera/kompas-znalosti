import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'

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
