import HistoryChart from '@/components/HistoryChart'
import { currentUser, User } from '@clerk/nextjs/server'
import { prisma } from '@/util/db'
import { getUserFromClerkID } from '@/util/auth'
import { redirect } from 'next/navigation'

const getData = async () => {
  const clrkUser: User = await currentUser() as User

  if (!clrkUser) {
    return redirect('/')
  }
  // console.log("/app/(dashboard)/history/page.tsx > getData() > user: ", clrkUser)
  const user = await getUserFromClerkID()
  const analyses = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  // console.log("/app/(dashboard)/history/page.tsx > getData() > analyses: ", analyses)
  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = total / analyses.length
  return { analyses, average }
}

const HistoryPage = async () => {
  const { analyses, average } = await getData()
  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
      </div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage
