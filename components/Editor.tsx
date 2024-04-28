'use client'

import { updateEntry, deleteEntry } from '@/util/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'
import fontColorContrast from 'font-color-contrast'
import { useRouter } from 'next/navigation'
import { Entry } from '@/util/db'

const Editor = ({ entry }) => {
  const typedEntry: Entry = entry as Entry
  const [text, setText] = useState(typedEntry.content)
  const [createdDate, setCreatedAt] = useState(typedEntry.createdAt)
  const [currentEntry, setEntry] = useState(typedEntry)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const localCreatedAt: Date = new Date(typedEntry.createdAt.valueOf() - (typedEntry.createdAt.getTimezoneOffset() * 60000))

  const handleDelete = async () => {
    await deleteEntry(typedEntry.id)
    router.push('/journal')
  }

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === typedEntry.content) return
      setIsSaving(true)

      let utcCreatedAt = new Date(typedEntry.createdAt.valueOf())
      typedEntry.createdAt = utcCreatedAt
      typedEntry.analysis.createdAt = utcCreatedAt
      typedEntry.content = _text
      const { data } = await updateEntry(typedEntry.id, { content: _text, createdAt: utcCreatedAt})

      setEntry(data)
      setIsSaving(false)
    },
  })

  useAutosave({
    data: createdDate,
    onSave: async (_createdDate) => {
      if (_createdDate === typedEntry.createdAt) return
      setIsSaving(true)

      let utcCreatedAt = new Date(_createdDate.valueOf())
      typedEntry.createdAt = utcCreatedAt
      typedEntry.analysis.createdAt = utcCreatedAt
      const { data } = await updateEntry(typedEntry.id, typedEntry)

      setEntry(data)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="col-span-2">
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            <li className="text-1 py-4 pl-12 pr-4 flex items-center justify-right">
              <h2 className="text-2xl pr-4">Created:</h2>
              <input
                type="datetime-local"
                id="createdAt"
                defaultValue={localCreatedAt.toISOString().slice(0, 16)}
                onBlur={(e) => setCreatedAt(new Date(e.target.value))}
                className="text-1 border border-gray-300 rounded-md p-2 text-lg"
              />
            </li>
            <li className="py-4 px-4 flex items-center justify-between">
              <div className="relative left-0 top-0 p-2">
                {isSaving ? (
                  <Spinner />
                ) : (
                  <div className="w-[20px] h-[20px] rounded-full bg-green-500"></div>
                )}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-full text-1 border border-gray-300 px-8 py-4"
                autoFocus={true}
                rows={5}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-l border-black/5">
        <div
          style={{ background: currentEntry.analysis.color, color: fontColorContrast(currentEntry.analysis.color) }}>
          <h2 className="text-2xl pt-2 pb-1 px-6 flex justify-center">Mood Analysis</h2>
          <p className="text-l font-semibold pt-1 pb-2 px-6 flex justify-center">{currentEntry.analysis.mood.toUpperCase()}</p>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            <li className="py-4 px-4 flex items-center justify-between">
              <div className="text-l font-semibold w-1/3">Summary</div>
              <div className="text-l px-4">{currentEntry.analysis.summary}</div>
            </li>

            <li className="py-4 px-4 flex items-center justify-between">
              <div className="text-l font-semibold w-1/3">Subject</div>
              <div className="text-l px-4">{currentEntry.analysis.subject}</div>
            </li>

            <li className="py-4 px-4 flex items-center justify-between">
              <div className="text-l font-semibold">Mood</div>
              <div className="text-l px-4">{currentEntry.analysis.mood}</div>
            </li>

            <li className="py-4 px-4 flex items-center justify-between">
              <div className="text-l font-semibold">Negative</div>
              <div className="text-l px-4 ">
                {currentEntry.analysis.negative ? 'True' : 'False'}
              </div>
            </li>
            <li className="py-4 px-4 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
