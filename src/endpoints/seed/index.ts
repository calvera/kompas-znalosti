import type { Payload, PayloadRequest } from 'payload'

export const seed = async ({
  payload,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // TODO

  payload.logger.info('Seeded database successfully!')
}
