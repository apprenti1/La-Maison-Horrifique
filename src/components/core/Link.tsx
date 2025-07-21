
import type { JSX } from "react"

import {Link as InternalLink } from "react-router-dom"
import {HashLink} from "react-router-hash-link"

export function Link({ text, path = '/', children, className }: { path?: string; text?: string; children?: JSX.Element | JSX.Element[]; className?: string }) {
  return (
    <HashLink smooth to={path} className={className}>
      {text ? (
        <p className="text-white hover:text-gray-400 transition duration-100">{text}</p>
      ) : (
        children
      )}
    </HashLink>
  );
}

export function LinkIcon({ href, icon }: { href:string, icon: JSX.Element}){
  return (
    <InternalLink to={href} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300">
        {icon}
    </InternalLink>
  )
}
