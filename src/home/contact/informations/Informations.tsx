import type { InfoProps } from "./Info"

const listInfo: InfoProps[] = [
  {
    name: "Adresse",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    content: "13 Rue des Ombres, 75013 Paris, France"
  },
  {
    name: "Téléphone",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
    ),
    content: "01 23 45 67 89"
  },
  {
    name: "Email",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
      </svg>
    ),
    content: "contact@maison-horrifique.fr"
  },
]

export default function Informations() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        {listInfo.map((info, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="bg-blood-red p-3 rounded-lg">
              {info.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{info.name}</h3>
              <p className="text-gray-300">{info.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}