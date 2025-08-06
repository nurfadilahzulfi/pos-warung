import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `var` usage on development to prevent hot-reload error
  // and avoid multiple instances of PrismaClient
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
