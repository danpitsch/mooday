'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts'
import fontColorContrast from 'font-color-contrast'

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toDateString()

  if (active) {
    const analysis = payload[0].payload
    return (
      <div style={{ background: analysis.color, color: fontColorContrast(analysis.color, .5) }} className="custom-tooltip shadow-md border-4 border border-black/10 rounded-lg backdrop-blur-md relative">
        <p className="label text-sm px-1 py-1">{dateLabel}</p>
        <p className="intro text-sm px-1 py-1 bg-white text-black">{analysis.subject}</p>
        <p className="intro text-l px-1 py-1 uppercase">{analysis.mood}</p>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{r: 12}}
          activeDot={{ r: 12 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
