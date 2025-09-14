import type { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { hero } from '@/heros/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

export const QuestionSets: CollectionConfig<'questionSets'> = {
  slug: 'questionSets',
  access: {
    admin: isSuperAdminAccess,
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticatedOrPublished,
    update: isSuperAdminAccess,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Questions',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'questionSets',
          req,
        })
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'questionSets',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              name: 'topics',
              type: 'join',
              collection: 'questionTopics',
              on: 'questionSet',
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

export const QuestionTopics: CollectionConfig<'questionTopics'> = {
  slug: 'questionTopics',
  access: {
    admin: isSuperAdminAccess,
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticatedOrPublished,
    update: isSuperAdminAccess,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Questions',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questionSet',
      type: 'relationship',
      relationTo: 'questionSets',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              name: 'questions',
              type: 'join',
              collection: 'questions',
              on: 'questionTopic',
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

export const Questions: CollectionConfig<'questions'> = {
  slug: 'questions',
  defaultPopulate: {
    title: true,
    order: true,
  },
  access: {
    admin: isSuperAdminAccess,
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticatedOrPublished,
    update: isSuperAdminAccess,
  },
  admin: {
    group: 'Questions',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        step: 1,
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'questionTopic',
      type: 'relationship',
      relationTo: 'questionTopics',
      required: true,
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'answers',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  indexes: [
    {
      unique: true,
      fields: ['questionTopic', 'order'],
    },
  ],
  hooks: {
    // afterChange: [revalidatePage],
    // beforeChange: [populatePublishedAt],
    // afterDelete: [revalidateDelete],
  },
}
