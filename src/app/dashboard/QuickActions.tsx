import { type ReactElement } from "react"
import { FuckingButton } from '@/components/core/Button'

interface QuickAction {
  label: string
  href: string
  color: 'red' | 'purple' | 'green' | 'blue' | 'gray'
}

export default function QuickActions(): ReactElement {
  const actions: QuickAction[] = [
    { label: "+ Nouvel Escape Game", href: "/escape-games/new", color: "red" },
    { label: "+ Nouvelle Session", href: "/sessions/new", color: "purple" },
    { label: "+ Nouvel Employé", href: "/employees/new", color: "green" }
  ]

  return (
    <div className="admin-card rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Actions Rapides</h3>
      <div className="gap-4 flex justify-evenly">
        {actions.map((action: QuickAction, index: number) => (
          <FuckingButton
            key={index}
            variant="primary"
            color={action.color}
            size="md"
            href={action.href}
          >
            {action.label}
          </ FuckingButton>
        ))}
      </div>
    </div>
  )
}