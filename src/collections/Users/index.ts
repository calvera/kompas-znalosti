import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdmin, isSuperAdminAccess } from '@/access/isSuperAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isSuperAdminAccess,
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticated,
    update: isSuperAdminAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    },
  ],
  timestamps: true,
}
