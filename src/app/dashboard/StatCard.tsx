import { useState, type ReactNode, type ReactElement } from "react"
export default function StatCard({
  title,
  value,
  icon,
  iconBgColor,
  className = "",
}: {
  title: string
  value: string | number
  icon: string
  iconBgColor: string
  className?: string
}): ReactElement {
  return (
    <div className={`stat-card rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}
