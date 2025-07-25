import { useEffect, useState } from "react"
import StatCard from './StatCard'
import ManagementCard from './ManagementCard'
import { isEmployee, Routes } from "@/lib/utils"

interface StatData {
  title: string
  value: string
  icon: string
  iconBgColor: string
}

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

interface ManagementCardData {
  title: string
  description: string
  icon: string
  iconColor: string
  stats: StatInfo[]
  primaryAction?: ActionButton
  secondaryAction?: Omit<ActionButton, 'color'>
}

  // Stats data
  const statsData: StatData[] = [
    { title: "Escape Games", value: "4", icon: "🏚️", iconBgColor: "bg-blue-600" },
    { title: "Sessions Aujourd'hui", value: "14", icon: "🎮", iconBgColor: "bg-green-600" },
    { title: "Game Masters", value: "8", icon: "👥", iconBgColor: "bg-purple-600" },
    { title: "Revenus du Jour", value: "€2,340", icon: "💰", iconBgColor: "bg-yellow-600" }
  ]

  // Management cards data
  const managementCards: ManagementCardData[] = [
    {
      title: "Escape Games",
      description: "Gérez vos différents <br/> scénarios d'horreur",
      icon: "🏚️",
      iconColor: "bg-gradient-to-br from-red-800 to-red-600",
      stats: [
        { label: "Total des jeux :", value: "4 actifs", valueColor: "text-white" },
        { label: "En maintenance :", value: "1 jeu", valueColor: "text-yellow-400" },
        { label: "Popularité :", value: "★ 4.8/5", valueColor: "text-green-400" }
      ],
      primaryAction: { label: "Gérer les Escape Games", href: Routes.escapeGames.toString(), color: "red" },
      secondaryAction: { label: "Voir les Statistiques", href: Routes.escapeGamesStats.toString() }
    },
    {
      title: "Sessions",
      description: "Planifiez et organisez <br/> les sessions de jeu",
      icon: "🎮",
      iconColor: "bg-gradient-to-br from-purple-800 to-purple-600",
      stats: [
        { label: "Aujourd'hui :", value: "12 sessions", valueColor: "text-white" },
        { label: "En cours :", value: "3 actives", valueColor: "text-green-400" },
        { label: "Prochaine :", value: "18h30", valueColor: "text-blue-400" }
      ],
      primaryAction: { label: "Gérer les Sessions", href: Routes.dashboard.sessions.toString(), color: "purple" },
      secondaryAction: { label: "Planning du Jour", href: Routes.dashboard.sessions.planning.toString() }
    },
    {
      title: "Game Masters",
      description: "Gérez votre équipe <br/> de maîtres du jeu",
      icon: "👥",
      iconColor: "bg-gradient-to-br from-green-800 to-green-600",
      stats: [
        { label: "Total équipe :", value: "8 employés", valueColor: "text-white" },
        { label: "En service :", value: "5 actifs", valueColor: "text-green-400" },
        { label: "Formations :", value: "2 en cours", valueColor: "text-blue-400" }
      ],
      primaryAction: { label: "Gérer les Employés", href: Routes.dashboard.employees.toString(), color: "green" },
      secondaryAction: { label: "Planning Équipe", href: '#' }
    }
  ]

export default function Dashboard() {
  const [visibleCards, setVisibleCards] = useState<ManagementCardData[]>([]);

  useEffect(() => {
    const checkUserRole = async () => {
      if (await isEmployee()) {
        setVisibleCards(managementCards.filter(card => card.title === "Sessions"));
      } else {
        setVisibleCards(managementCards);
      }
    };
    checkUserRole();
  }, []);

  return (
    <div className="relative mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-shadow-horror">Tableau de Bord</h1>
        <p className="text-gray-300">Gérez votre établissement d'escape games d'horreur</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat: StatData, index: number) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Management Cards */}
      <div className="w-fit gap-8 mb-8">
        {visibleCards.map((card: ManagementCardData, index: number) => (
          <ManagementCard
        key={index}
        title={card.title}
        description={card.description}
        icon={card.icon}
        iconColor={card.iconColor}
        stats={card.stats}
        primaryAction={card.primaryAction}
        secondaryAction={card.secondaryAction}
          />
        ))}
      </div>
    </div>
  )
}