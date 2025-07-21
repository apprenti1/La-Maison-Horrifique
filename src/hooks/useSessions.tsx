// hooks/useSessions.ts
import { useState, useEffect } from 'react'

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

interface Employee {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  poste: 'Game Master' | 'Accueil' | 'Manager' | 'Technicien'
  statut: 'Actif' | 'Inactif' | 'Congé' | 'Formation'
  salaire: number
  dateEmbauche: string
  createdAt: string
  updatedAt: string
}

interface Session {
  id: string
  escapeGameId: string
  employeeId: string
  clientInfo: {
    nom: string
    prenom: string
    email: string
    telephone: string
    nombrePersonnes: number
  }
  dateHeure: string
  statut: 'Réservée' | 'En cours' | 'Terminée' | 'Annulée'
  prixTotal: number
  dureeReelle?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

interface SessionWithRelations extends Session {
  escapeGame?: EscapeGame
  employee?: Employee
}

interface UseSessionsOptions {
  date?: string
  escapeGameId?: string
  employeeId?: string
  statut?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

interface UseSessionsReturn {
  sessions: SessionWithRelations[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  isEmpty: boolean
  createSession: (sessionData: any) => Promise<SessionWithRelations>
  updateSession: (id: string, updates: any) => Promise<SessionWithRelations>
  deleteSession: (id: string) => Promise<void>
  updateStatus: (id: string, statut: string, data?: { notes?: string, dureeReelle?: number }) => Promise<SessionWithRelations>
}

export function useSessions(options: UseSessionsOptions = {}): UseSessionsReturn {
  const { 
    date,
    escapeGameId,
    employeeId,
    statut,
    autoRefresh = false, 
    refreshInterval = 30000 
  } = options

  const [sessions, setSessions] = useState<SessionWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const buildUrl = () => {
    const params = new URLSearchParams()
    if (date) params.append('date', date)
    if (escapeGameId) params.append('escapeGameId', escapeGameId)
    if (employeeId) params.append('employeeId', employeeId)
    if (statut) params.append('statut', statut)
    
    const queryString = params.toString()
    return `/api/sessions${queryString ? `?${queryString}` : ''}`
  }

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(buildUrl())
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }
      
      const data: SessionWithRelations[] = await response.json()
      setSessions(data)
      
    } catch (err) {
      console.error('Erreur lors du chargement des sessions:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const createSession = async (sessionData: any): Promise<SessionWithRelations> => {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la création')
    }
    
    const newSession = await response.json()
    await fetchSessions()
    return newSession
  }

  const updateSession = async (id: string, updates: any): Promise<SessionWithRelations> => {
    const response = await fetch(`/api/sessions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la modification')
    }
    
    const updatedSession = await response.json()
    await fetchSessions()
    return updatedSession
  }

  const deleteSession = async (id: string): Promise<void> => {
    const response = await fetch(`/api/sessions/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la suppression')
    }
    
    await fetchSessions()
  }

  const updateStatus = async (
    id: string, 
    newStatut: string, 
    data?: { notes?: string, dureeReelle?: number }
  ): Promise<SessionWithRelations> => {
    const response = await fetch(`/api/sessions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: newStatut, ...data })
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du changement de statut')
    }
    
    const updatedSession = await response.json()
    await fetchSessions()
    return updatedSession
  }

  useEffect(() => {
    fetchSessions()
  }, [date, escapeGameId, employeeId, statut])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchSessions, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
    isEmpty: sessions.length === 0,
    createSession,
    updateSession,
    deleteSession,
    updateStatus
  }
}