import { type ReactElement } from "react"
import { FuckingButton } from '@/components/core/Button'
import StatInfoRow from './StatInfoRow'

interface StatInfo {
  label: string
  value: string
  valueColor?: string
}

interface ActionButton {
  label: string
  href: string
  color: 'red' | 'purple' | 'green' | 'blue' | 'gray'
}

interface ManagementCardProps {
  title: string
  description: string
  icon: string
  iconColor: string
  stats: StatInfo[]
  primaryAction?: ActionButton
  secondaryAction?: Omit<ActionButton, 'color'>
  className?: string
}

export default function ManagementCard({ 
  title, 
  description, 
  icon, 
  iconColor,
  stats = [],
  primaryAction,
  secondaryAction,
  className = "" 
}: ManagementCardProps): ReactElement {
  return (
    <div className={`admin-card rounded-xl p-8 ${className}`}>
      <div className="text-center mb-6">
        <div className={`${iconColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      
      <div className="space-y-4 mb-6">
        {stats.map((stat: StatInfo, index: number) => (
          <StatInfoRow 
            key={index}
            label={stat.label}
            value={stat.value}
            valueColor={stat.valueColor}
          />
        ))}
      </div>
      
      <div className="space-y-3">
        {primaryAction && (
          <FuckingButton
            variant="primary"
            color={primaryAction.color}
            size="lg"
            href={primaryAction.href}
            className="w-full"
          >
            {primaryAction.label}
          </FuckingButton>
        )}
        {secondaryAction && (
          <FuckingButton
            variant="secondary"
            color="gray"
            size="md"
            href={secondaryAction.href}
            className="w-full"
          >
            {secondaryAction.label}
          </FuckingButton>
        )}
      </div>
    </div>
  )
}
