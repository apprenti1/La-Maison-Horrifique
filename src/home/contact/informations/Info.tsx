import type { JSX } from "react";

export interface InfoProps {
  name: string;
  icon: JSX.Element;
  content: string;
}
export default function Info({name, icon, content}: InfoProps) {
  return(
    <div className="flex items-start space-x-4">
      <div className="bg-red-900 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <p className="text-gray-300">{content}</p>
      </div>
    </div>
  )
}