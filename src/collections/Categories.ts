import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: anyone,
    update: isSuperAdminAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
