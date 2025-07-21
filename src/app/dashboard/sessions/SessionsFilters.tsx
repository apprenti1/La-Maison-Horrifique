// components/sessions/SessionsFilters.tsx
import { type ReactElement } from 'react'

// ✅ Types définis localement
interface EscapeGame {
  id: string
  color: string
  title: string
  description: string
  icon: string
  duration: string
  level: string
  levelColor: string
  minPlayers: number
  maxPlayers: number
  prix: number
  statut: 'Actif' | 'Maintenance' | 'Inactif'
  theme: string
  note: number
  createdAt: string
  updatedAt: string
}

interface SessionsFiltersProps {
  filters: {
    date: string
    escapeGameId: string
    statut: string
  }
  escapeGames: EscapeGame[]
  onFiltersChange: (filters: any) => void
}

export default function SessionsFilters({ 
  filters, 
  escapeGames, 
  onFiltersChange 
}: SessionsFiltersProps): ReactElement {
  
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      date: '',
      escapeGameId: '',
      statut: ''
    })
  }

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const hasActiveFilters = filters.date || filters.escapeGameId || filters.statut

  return (
    <div className="admin-card rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filtre par date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📅 Date
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <button
              onClick={() => handleFilterChange('date', getTodayDate())}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              title="Aujourd'hui"
            >
              Auj.
            </button>
          </div>
        </div>

        {/* Filtre par escape game */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎮 Escape Game
          </label>
          <select
            value={filters.escapeGameId}
            onChange={(e) => handleFilterChange('escapeGameId', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <option value="">Tous les escape games</option>
            {escapeGames.map(game => (
              <option key={game.id} value={game.id}>
                {game.icon} {game.title}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par statut */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🔄 Statut
          </label>
          <select
            value={filters.statut}
            onChange={(e) => handleFilterChange('statut', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <option value="">Tous les statuts</option>
            <option value="Réservée">🔵 Réservée</option>
            <option value="En cours">🟢 En cours</option>
            <option value="Terminée">⚫ Terminée</option>
            <option value="Annulée">🔴 Annulée</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-end">
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              hasActiveFilters
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            🗑️ Effacer
          </button>
        </div>
      </div>

      {/* Indicateurs de filtres actifs */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-400">Filtres actifs :</span>
            
            {filters.date && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">
                📅 {new Date(filters.date).toLocaleDateString('fr-FR')}
                <button
                  onClick={() => handleFilterChange('date', '')}
                  className="ml-1 hover:text-blue-300"
                >
                  ×
                </button>
              </span>
            )}
            
            {filters.escapeGameId && (
              <span className="inline-flex items-center px-2 py-1 bg-purple-900/20 text-purple-400 rounded-full text-xs">
                🎮 {escapeGames.find(g => g.id === filters.escapeGameId)?.title}
                <button
                  onClick={() => handleFilterChange('escapeGameId', '')}
                  className="ml-1 hover:text-purple-300"
                >
                  ×
                </button>
              </span>
            )}
            
            {filters.statut && (
              <span className="inline-flex items-center px-2 py-1 bg-green-900/20 text-green-400 rounded-full text-xs">
                🔄 {filters.statut}
                <button
                  onClick={() => handleFilterChange('statut', '')}
                  className="ml-1 hover:text-green-300"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}