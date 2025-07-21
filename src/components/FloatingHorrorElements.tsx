import { type ReactElement } from "react"

interface HorrorElement {
  emoji: string
  position: string
  size: string
  delay: string
}

export default function FloatingHorrorElements(): ReactElement {
  const elements: HorrorElement[] = [
    { emoji: "👻", position: "top-20 left-10", size: "text-2xl", delay: "0.5s" },
    { emoji: "🕸️", position: "top-60 right-20", size: "text-xl", delay: "1s" },
    { emoji: "💀", position: "bottom-40 left-20", size: "text-2xl", delay: "1.5s" },
    { emoji: "🦇", position: "bottom-20 right-10", size: "text-xl", delay: "2s" }
  ]

  return (
    <>
      {elements.map((element: HorrorElement, index: number) => (
        <div 
          key={index}
          className={`fixed ${element.position} ${element.size} opacity-10 floating`} 
          style={{ animationDelay: element.delay }}
        >
          {element.emoji}
        </div>
      ))}
    </>
  )
}