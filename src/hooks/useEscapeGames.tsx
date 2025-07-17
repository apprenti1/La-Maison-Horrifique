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
    isEmpty: escapeGames.length === 0
  }
}