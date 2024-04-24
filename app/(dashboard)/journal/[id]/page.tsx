import Editor from '@/components/Editor'
import { Entry, getEntry } from '@/util/db'

const JournalEditorPage = async ({ params }) => {

  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage
