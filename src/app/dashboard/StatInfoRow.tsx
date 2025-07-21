import type { ReactElement } from "react"
export default function StatInfoRow({ 
    label, 
    value, 
    valueColor = "text-white" 
}: {
    label: string
    value: string
    valueColor?: string
  }): ReactElement {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`${valueColor} font-semibold`}>{value}</span>
    </div>
  )
}
