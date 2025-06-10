
import type { JSX } from "react"

export function Link({text, path='#', key}: {path?:string, text:string, key?:string}){
  return(
    <a key={key} href={path}><p className="text-white hover:text-gray-400 transition duration-100">{text}</p></a>
  )
}

export function LinkIcon({ href, icon }: { href:string, icon: JSX.Element}){
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300">
        {icon}
    </a>
  )
}