import { update } from '@/util/actions'
import { analyzeEntry } from '@/util/ai'
import { getUserFromClerkID } from '@/util/auth'
import { Entry, prisma } from '@/util/db'
import { NextResponse } from 'next/server'

export const DELETE = async (request: Request, { params }) => {
  const user = await getUserFromClerkID()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request: Request, { params }) => {
  const updates = await request.json()
  const typedEntry: Entry = updates.updates as Entry
  const { content, createdAt } = typedEntry

  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: {
      content: content,
      createdAt: createdAt
    },
  })

  const analysis = await analyzeEntry(entry)
  
  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: {
      createdAt: typedEntry.createdAt,
      ...analysis
    },
    create: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}
