import fontColorContrast from "font-color-contrast"

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-2 sm:px-4">{date}</div>
      <div className="px-4 py-2 sm:p-4">{entry.analysis.summary}</div>
      <div style={{ background: entry.analysis.color, color: fontColorContrast(entry.analysis.color, .5) }}
        className="px-4 py-2 sm:px-4 flex justify-center">
          {entry.analysis.mood.toUpperCase()}
      </div>
    </div>
  )
}

export default EntryCard
