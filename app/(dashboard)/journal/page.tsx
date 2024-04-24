import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import Question from '@/components/Question'
import { getEntries } from '@/util/db'
import Link from 'next/link'

const JournalPage = async () => {
  const data = await getEntries()
  // console.log('JournalPage -> data', data)
  return (
    <div className="px-6 py-6 bg-zinc-400/20 h-full">
      <div className="grid grid-cols-3 gap-4">
        <h1 className="text-4xl mb-8">Journal</h1>
        <span className="col-span-2" ><Question /></span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
