// Shared types and interfaces for Dashboard components

export interface StatInfo {
    label: string
    value: string
    valueColor?: string
  }
  
  export interface ActionButton {
    label: string
    href: string
    color: 'red' | 'purple' | 'green' | 'blue' | 'gray'
  }
  
  export interface StatData {
    title: string
    value: string
    icon: string
    iconBgColor: string
  }
  
  export interface QuickAction {
    label: string
    href: string
    color: 'red' | 'purple' | 'green' | 'blue' | 'gray'
  }
  
  export interface HorrorElement {
    emoji: string
    position: string
    size: string
    delay: string
  }
  
  export interface ManagementCardProps {
    title: string
    description: string
    icon: string
    iconColor: string
    stats: StatInfo[]
    primaryAction?: ActionButton
    secondaryAction?: Omit<ActionButton, 'color'>
    className?: string
  }
  
  export interface StatCardProps {
    title: string
    value: string | number
    icon: string
    iconBgColor: string
    className?: string
  }
  
  export interface StatInfoRowProps {
    label: string
    value: string
    valueColor?: string
  }