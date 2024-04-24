import { PrismaClient } from '@prisma/client'
import { getUserFromClerkID } from './auth'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export type Entry = {
  analysis: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      entryId: string;
      userId: string;
      mood: string;
      subject: string;
      negative: boolean;
      summary: string;
      color: string;
      sentimentScore: number;
  };
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  statusId: number;
}

export const getEntry = async (id) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

