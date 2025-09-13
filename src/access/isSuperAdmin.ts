import type { AccessArgs } from 'payload'
import { User } from '@/payload-types'

type isSuperAdmin = (args: AccessArgs<User>) => boolean

export const isSuperAdminAccess: isSuperAdmin = ({ req: {user} }): boolean => {
  return isSuperAdmin(user)
}

export const isSuperAdmin = (user: User | null) => {
  return Boolean(user?.roles?.includes('super-admin'))
}
