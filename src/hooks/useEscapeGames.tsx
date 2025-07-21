// hooks/useEscapeGames.ts
import { useState, useEffect } from 'react'
import type { EscapeGame } from '@/mocks/types/mockApi'

interface UseEscapeGamesOptions {
  onlyActive?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
}

interface UseEscapeGamesReturn {
  escapeGames: EscapeGame[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  isEmpty: boolean
  createEscapeGame: (escapeGame: Omit<EscapeGame, 'id'>) => Promise<void>
  updateEscapeGame: (id: number, updatedFields: Partial<Omit<EscapeGame, 'id'>>) => Promise<void>
  deleteEscapeGame: (id: number) => Promise<void>
}

export function useEscapeGames(options: UseEscapeGamesOptions = {}): UseEscapeGamesReturn {
  const {
    onlyActive = true,
    autoRefresh = false,
    refreshInterval = 30000
  } = options

  const [escapeGames, setEscapeGames] = useState<EscapeGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEscapeGames = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/escape-games')

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data: EscapeGame[] = await response.json()

      const filteredData = onlyActive
          ? data.filter(game => game.statut === 'Actif')
          : data

      setEscapeGames(filteredData)

    } catch (err) {
      console.error('Erreur lors du chargement des escape games:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const createEscapeGame = async (escapeGame: Omit<EscapeGame, 'id'>) => {
    try {
      const response = await fetch('/api/escape-games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(escapeGame)
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data: EscapeGame = await response.json()

      setEscapeGames([...escapeGames, data])

    } catch (err) {
      console.error('Erreur lors de la création d\'un escape game:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  const updateEscapeGame = async (id: number, updatedFields: Partial<Omit<EscapeGame, 'id'>>) => {
    try {
      const response = await fetch(`/api/escape-games/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const updatedEscapeGame: EscapeGame = await response.json()

      setEscapeGames(current =>
          current.map(game => (Number(game.id) === id ? updatedEscapeGame : game))
      )

    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'escape game:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  const deleteEscapeGame = async (id: number) => {
    try {
      const response = await fetch(`/api/escape-games/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      setEscapeGames(current => current.filter(game => Number(game.id) !== id))

    } catch (err) {
      console.error('Erreur lors de la suppression de l\'escape game:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }


  useEffect(() => {
    fetchEscapeGames()
  }, [onlyActive])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchEscapeGames, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return {
    escapeGames,
    loading,
    error,
    refetch: fetchEscapeGames,
    isEmpty: escapeGames.length === 0,
    createEscapeGame,
    updateEscapeGame,
    deleteEscapeGame
  }
}
