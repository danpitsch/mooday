'use client'

import { askQuestion } from '@/util/api'
import { useState } from 'react'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data } = await askQuestion(question)

    setAnswer(data)
    setLoading(false)
    setQuestion('')
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 text-lg px-4 py-2 border border-gray-200 rounded-md"
            disabled={loading}
            placeholder="Ask a question..."
          />
          <button
            disabled={loading}
            type="submit"
            className="flex-none w-15 text-lg bg-blue-400 px-4 py-2 rounded-md"
          >
            Ask
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  )
}

export default Question
