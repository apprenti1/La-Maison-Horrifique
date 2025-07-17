import { type ReactElement } from "react"

export default function BackgroundEffects(): ReactElement {
  return (
    <>
      <div className="fixed inset-0 horror-gradient"></div>
      <div className="fixed inset-0 fog-effect"></div>
    </>
  )
}