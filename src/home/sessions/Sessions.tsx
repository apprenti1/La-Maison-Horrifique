import Cards from './cards/cards'

const sessions = [
    {
        color: "#eba707",
        title: "La Maison Maudite",
        description: "Une famille a disparu dans cette demeure. Découvrez leur terrible secret avant qu'il ne soit trop tard.",
        duration: "60 min",
        players: "2-6 joueurs",
        level: "Extrême",
        levelColor: "#eba707",
        icon: "🏚️",
    },
    {
        color: "#7A00E680",
        title: "Le Laboratoire",
        description: "Un scientifique fou a créé des créatures terrifiantes. Échappez-vous avant de devenir ses cobayes.",
        duration: "45 min",
        players: "2-4 joueurs",
        level: "Intense",
        levelColor: "#7A00E680",
        icon: "🧙‍♀️",
    },
    {
        color: "#34C75980",
        title: "Le Cimetière Hanté",
        description: "Les morts ne reposent pas en paix ici. Trouvez un moyen de les apaiser avant l'aube.",
        duration: "75 min",
        players: "3-8 joueurs",
        level: "Extrême",
        levelColor: "#34C75980",
        icon: "🪦",
    },
    {
        color: "#011949FF",
        title: "Le Navire Fantôme",
        description: "À bord de ce vaisseau maudit, l'équipage attend votre arrivée depuis des siècles.",
        duration: "90 min",
        players: "4-6 joueurs",
        level: "Modéré",
        levelColor: "#002775FF",
        icon: "🚢",
    },
]

export default function Sessions() {
  return (
    <section id="sessions" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Sessions d'Escape Game</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Quatre univers terrifiants vous attendent. Chaque session promet une expérience unique d'horreur et d'adrénaline.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sessions.map(session => (
                <Cards
                    color={session.color}
                    title={session.title}
                    description={session.description}
                    icon={session.icon}
                    duration={session.duration}
                    level={session.level}
                    levelColor={session.levelColor}
                    minPlayers={parseInt(session.players.split('-')[0])}
                    maxPlayers={parseInt(session.players.split('-')[1])}
                />
            ))}

            </div>
        </div>
    </section>
  )
}
