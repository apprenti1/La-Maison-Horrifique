// components/sessions/Sessions.tsx
import { type ReactElement } from 'react'
import Cards from './cards/cards'
import { useEscapeGames } from '@/hooks/useEscapeGames'

export default function Sessions(): ReactElement {
  const { escapeGames, loading, error, refetch, isEmpty } = useEscapeGames({
    onlyActive: true
  })

  return (
    <section id="sessions" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Sessions d'Escape Game
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {!isEmpty 
              ? `${escapeGames.length} univers terrifiants vous attendent. Chaque session promet une expérience unique d'horreur et d'adrénaline.`
              : "Découvrez nos univers terrifiants dès qu'ils seront disponibles."
            }
          </p>
        </div>
        
        {/* État de chargement */}
        {loading && (
          <div className="text-center">
            <p className="text-gray-300 text-lg">Chargement...</p>
          </div>
        )}

        {/* État d'erreur */}
        {error && (
          <div className="text-center">
            <p className="text-red-400 mb-4">Erreur: {error}</p>
            <button 
              onClick={refetch}
              className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Contenu principal */}
        {!loading && !error && (
          <>
            {!isEmpty ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {escapeGames.map(session => (
                  <Cards
                    key={session.id}
                    color={session.color}
                    title={session.title}
                    description={session.description}
                    icon={session.icon}
                    duration={session.duration}
                    level={session.level}
                    levelColor={session.levelColor}
                    minPlayers={session.minPlayers}
                    maxPlayers={session.maxPlayers}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-300 text-lg">
                  Aucun escape game n'est disponible pour le moment
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}