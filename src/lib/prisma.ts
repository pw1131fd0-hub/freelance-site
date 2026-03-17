import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const prismaClientSingleton = () => {
  const adapter = new PrismaBetterSqlite3({ url: 'prisma/dev.db' })
  return new PrismaClient({ adapter })
}

/* eslint-disable no-var */
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}
/* eslint-enable no-var */

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
