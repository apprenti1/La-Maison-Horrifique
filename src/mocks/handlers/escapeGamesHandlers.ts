
import { http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/utils'
import type { EscapeGame } from '../types/mockApi'
import { escapeGames, sessions, employees } from '../data/mockData'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const escapeGamesHandlers = [
  http.get(`${API_URL}/escape-games`, () => {
    return HttpResponse.json(escapeGames, { status: 200 })
  }),

  http.get(`${API_URL}/escape-games/:id`, ({ params }) => {
    const escapeGame = escapeGames.find(eg => eg.id === params.id)
    if (!escapeGame) {
      return HttpResponse.json({
        message: 'Escape Game non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }
    return HttpResponse.json(escapeGame, { status: 200 })
  }),

  http.post(`${API_URL}/escape-games`, async ({ request }) => {
    const newEscapeGame = await request.json() as Omit<EscapeGame, 'id' | 'createdAt' | 'updatedAt'>
    
    if (!newEscapeGame.title || !newEscapeGame.description) {
      return HttpResponse.json({
        message: 'Titre et description sont requis',
        error: 'Bad Request'
      }, { status: 400 })
    }
    
    const escapeGame: EscapeGame = {
      ...newEscapeGame,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    escapeGames.push(escapeGame)
    return HttpResponse.json(escapeGame, { status: 201 })
  }),

  http.put(`${API_URL}/escape-games/:id`, async ({ params, request }) => {
    const index = escapeGames.findIndex(eg => eg.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Escape Game non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const updates = await request.json() as Partial<EscapeGame>
    escapeGames[index] = {
      ...escapeGames[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return HttpResponse.json(escapeGames[index], { status: 200 })
  }),

  http.delete(`${API_URL}/escape-games/:id`, ({ params }) => {
    const index = escapeGames.findIndex(eg => eg.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Escape Game non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const hasLinkedSessions = sessions.some(s => s.escapeGameId === params.id)
    if (hasLinkedSessions) {
      return HttpResponse.json({
        message: 'Impossible de supprimer: des sessions sont liées à cet escape create',
        error: 'Conflict'
      }, { status: 409 })
    }

    escapeGames.splice(index, 1)
    return HttpResponse.json({ 
      message: 'Escape Game supprimé avec succès' 
    }, { status: 200 })
  }),

  http.get(`${API_URL}/escape-games/:id/sessions`, ({ params, request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    
    let linkedSessions = sessions.filter(s => s.escapeGameId === params.id)
    
    if (date) {
      linkedSessions = linkedSessions.filter(session => 
        session.dateHeure.startsWith(date)
      )
    }

    const enrichedSessions = linkedSessions.map(session => {
      const employee = employees.find(emp => emp.id === session.employeeId)
      return {
        ...session,
        employee
      }
    })

    return HttpResponse.json(enrichedSessions, { status: 200 })
  }),

  http.patch(`${API_URL}/escape-games/:id/status`, async ({ params, request }) => {
    const index = escapeGames.findIndex(eg => eg.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Escape Game non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const { statut } = await request.json() as { statut: EscapeGame['statut'] }
    
    if (!['Actif', 'Maintenance', 'Inactif'].includes(statut)) {
      return HttpResponse.json({
        message: 'Statut invalide',
        error: 'Bad Request'
      }, { status: 400 })
    }

    escapeGames[index] = {
      ...escapeGames[index],
      statut,
      updatedAt: new Date().toISOString()
    }
    
    return HttpResponse.json(escapeGames[index], { status: 200 })
  })
]
