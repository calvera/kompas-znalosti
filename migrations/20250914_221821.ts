import path from 'path'
import fs from 'fs/promises'
import type { Question, QuestionSet, QuestionTopic } from '@/payload-types'
import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import striptags from 'striptags'

type SrcQuestion = {
  question: string
  answers: string[]
}

type SrcTopic = {
  topic: string
  questions: SrcQuestion[]
}

const SLUG_SET = 'src'
const SET_TITLE = 'Omezený průkaz operátora námořní pohyblivé služby'

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

async function readSrcJson(): Promise<SrcTopic[]> {
  const filePath = path.resolve(process.cwd(), 'data', 'SRC.json')
  const raw = await fs.readFile(filePath, 'utf8')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed)) {
    throw new Error('SRC.json: očekáván kořenový JSON array')
  }
  return parsed as SrcTopic[]
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const src = await readSrcJson()

  // 1) QuestionSet
  const setData = {
    title: SET_TITLE,
    slug: SLUG_SET,
    slugLock: true,
    hero: { type: 'none' },
    description: {
      root: {
        type: 'root',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            children: [{ type: 'text', version: 1, text: 'Importováno ze SRC.json.' }],
          },
        ],
      },
    },
    _status: 'published',
  } satisfies Partial<QuestionSet>

  const createdSet = await payload.create({
    collection: 'questionSets',
    data: setData,
    draft: false,
  })
  let setId = createdSet.id as number

  // 2) Topics + Questions
  for (const t of src) {
    const topicSlug = slugify(t.topic)
    const topicData = {
      title: t.topic,
      slug: topicSlug,
      slugLock: true,
      questionSet: setId,
      hero: { type: 'none' },
      description: {
        root: {
          type: 'root',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          children: [
            {
              type: 'paragraph',
              version: 1,
              format: '',
              indent: 0,
              direction: 'ltr',
              children: [{ type: 'text', version: 1, text: `Téma: ${t.topic}` }],
            },
          ],
        },
      },
      _status: 'published',
    } satisfies Partial<QuestionTopic>

    const createdTopic = await payload.create({
      collection: 'questionTopics',
      data: topicData,
      draft: false,
    })
    let topicId = createdTopic.id as number

    let questionOrder = 1
    for (const q of t.questions) {
      const questionData = {
        title: striptags(q.question),
        text: {
          root: {
            type: 'root',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                format: '',
                indent: 0,
                direction: 'ltr',
                children: [{ type: 'text', version: 1, text: q.question }],
              },
            ],
          },
        },
        questionTopic: topicId,
        order: questionOrder++,
        answers: q.answers.map((answerText) => {
          return {
            text: {
              root: {
                type: 'root',
                version: 1,
                format: '',
                indent: 0,
                direction: 'ltr',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    format: '',
                    indent: 0,
                    direction: 'ltr',
                    children: [{ type: 'text', version: 1, text: answerText }],
                  },
                ],
              },
            },
          }
        }),
      } satisfies Partial<Question>

      await payload.create({
        collection: 'questions',
        data: questionData,
        draft: false,
      })
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  const src = await readSrcJson()

  // 1) Odstranit Questions podle slugu odvozeného z JSON
  for (const t of src) {
    for (const q of t.questions) {
      const qSlug = slugify(q.question)
      const { docs } = await payload.find({
        collection: 'questions',
        where: { slug: { equals: qSlug } },
        limit: 100,
      })
      for (const doc of docs) {
        await payload.delete({
          collection: 'questions',
          id: doc.id as number,
        })
      }
    }
  }

  // 2) Odstranit Topics podle slugu
  for (const t of src) {
    const topicSlug = slugify(t.topic)
    const { docs } = await payload.find({
      collection: 'questionTopics',
      where: { slug: { equals: topicSlug } },
      limit: 100,
    })
    for (const doc of docs) {
      await payload.delete({
        collection: 'questionTopics',
        id: doc.id as number,
      })
    }
  }

  // 3) Odstranit QuestionSet
  const { docs: setDocs } = await payload.find({
    collection: 'questionSets',
    where: { slug: { equals: SLUG_SET } },
    limit: 10,
  })
  for (const doc of setDocs) {
    await payload.delete({
      collection: 'questionSets',
      id: doc.id as number,
    })
  }
}

export default { up, down }
