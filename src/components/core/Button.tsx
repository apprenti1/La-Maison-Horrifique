import type { ReactNode, ReactElement } from "react"

export const FuckingButton = ({
  variant = "primary", 
  color = "red", 
  size = "md", 
  children, 
  href, 
  className = "", 
  onClick,
  disabled = false,
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'link'
  color?: 'red' | 'purple' | 'green' | 'blue' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}): ReactElement => {
  const baseClasses: string = "font-semibold transition-all duration-300 rounded-lg"
  
  const variants: Record<string, string> = {
    primary: "transform hover:scale-105 focus:outline-none focus:ring-2",
    secondary: "transition-colors duration-300",
    link: "transition-colors duration-300"
  }
  
  const colors: Record<string, Record<string, string>> = {
    red: {
      primary: "bg-red-800 hover:bg-red-700 text-white focus:ring-red-500/50",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      link: "text-red-400 hover:text-red-300"
    },
    purple: {
      primary: "bg-purple-800 hover:bg-purple-700 text-white focus:ring-purple-500/50",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      link: "text-purple-400 hover:text-purple-300"
    },
    green: {
      primary: "bg-green-800 hover:bg-green-700 text-white focus:ring-green-500/50",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      link: "text-green-400 hover:text-green-300"
    },
    blue: {
      primary: "bg-blue-800 hover:bg-blue-700 text-white focus:ring-blue-500/50",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      link: "text-blue-400 hover:text-blue-300"
    },
    gray: {
      primary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500/50",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white",
      link: "text-gray-300 hover:text-white"
    }
  }
  
  const sizes: Record<string, string> = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-sm",
    lg: "py-4 px-6 text-base"
  }
  
  const classes: string = `${baseClasses} ${variants[variant]} ${colors[color][variant]} ${sizes[size]} ${className}`
  
  if (href) {
    return (
      <a href={href} className={`${classes} block text-center`} {...props}>
        {children}
      </a>
    )
  }
  
  return (
    <button 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
