import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await payload.create(
    {
      collection: 'users',
      data: {
        name: 'superadmin',
        email: 'karel.sommer@gmail.com',
        password: 'heslo?',
        roles: ['super-admin']
      }
    }
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    // Migration code
}
