

import { http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/utils'
import type { Session, EnrichedSession } from '../types/mockApi'
import { sessions, escapeGames, employees } from '../data/mockData'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const sessionsHandlers = [

  http.get(`${API_URL}/sessions`, ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const escapeGameId = url.searchParams.get('escapeGameId')
    const employeeId = url.searchParams.get('employeeId')
    const statut = url.searchParams.get('statut')
    
    let filteredSessions = sessions

    if (date) {
      filteredSessions = filteredSessions.filter(session => 
        session.dateHeure.startsWith(date)
      )
    }
    if (escapeGameId) {
      filteredSessions = filteredSessions.filter(session => 
        session.escapeGameId === escapeGameId
      )
    }
    if (employeeId) {
      filteredSessions = filteredSessions.filter(session => 
        session.employeeId === employeeId
      )
    }
    if (statut) {
      filteredSessions = filteredSessions.filter(session => 
        session.statut === statut
      )
    }


    const enrichedSessions: EnrichedSession[] = filteredSessions.map(session => {
      const escapeGame = escapeGames.find(eg => eg.id === session.escapeGameId)
      const employee = employees.find(emp => emp.id === session.employeeId)
      
      return {
        ...session,
        escapeGame,
        employee
      }
    })

    return HttpResponse.json(enrichedSessions, { status: 200 })
  }),


  http.get(`${API_URL}/sessions/:id`, ({ params }) => {
    const session = sessions.find(s => s.id === params.id)
    if (!session) {
      return HttpResponse.json({
        message: 'Session non trouvée',
        error: 'Not Found'
      }, { status: 404 })
    }

    const escapeGame = escapeGames.find(eg => eg.id === session.escapeGameId)
    const employee = employees.find(emp => emp.id === session.employeeId)

    const enrichedSession: EnrichedSession = {
      ...session,
      escapeGame,
      employee
    }

    return HttpResponse.json(enrichedSession, { status: 200 })
  }),


  http.post(`${API_URL}/sessions`, async ({ request }) => {
    const newSession = await request.json() as Omit<Session, 'id' | 'createdAt' | 'updatedAt'>
    

    if (!newSession.escapeGameId || !newSession.employeeId || !newSession.dateHeure) {
      return HttpResponse.json({
        message: 'Escape create, employé et date/heure sont requis',
        error: 'Bad Request'
      }, { status: 400 })
    }


    const escapeGame = escapeGames.find(eg => eg.id === newSession.escapeGameId)
    if (!escapeGame) {
      return HttpResponse.json({
        message: 'Escape create non trouvé',
        error: 'Bad Request'
      }, { status: 400 })
    }
    if (escapeGame.statut !== 'Actif') {
      return HttpResponse.json({
        message: 'Escape create non disponible',
        error: 'Bad Request'
      }, { status: 400 })
    }


    const employee = employees.find(emp => emp.id === newSession.employeeId)
    if (!employee) {
      return HttpResponse.json({
        message: 'Employé non trouvé',
        error: 'Bad Request'
      }, { status: 400 })
    }
    if (employee.statut !== 'Actif') {
      return HttpResponse.json({
        message: 'Employé non disponible',
        error: 'Bad Request'
      }, { status: 400 })
    }


    const conflictingSessions = sessions.filter(s => 
      s.employeeId === newSession.employeeId &&
      s.statut !== 'Annulée' &&
      s.dateHeure === newSession.dateHeure
    )
    
    if (conflictingSessions.length > 0) {
      return HttpResponse.json({
        message: 'Conflit d\'horaire: l\'employé a déjà une session à cette heure',
        error: 'Conflict'
      }, { status: 409 })
    }


    if (newSession.clientInfo.nombrePersonnes > escapeGame.maxPlayers) {
      return HttpResponse.json({
        message: `Nombre de joueurs trop élevé (max: ${escapeGame.maxPlayers})`,
        error: 'Bad Request'
      }, { status: 400 })
    }
    if (newSession.clientInfo.nombrePersonnes < escapeGame.minPlayers) {
      return HttpResponse.json({
        message: `Nombre de joueurs insuffisant (min: ${escapeGame.minPlayers})`,
        error: 'Bad Request'
      }, { status: 400 })
    }
    
    const session: Session = {
      ...newSession,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    sessions.push(session)
    return HttpResponse.json(session, { status: 201 })
  }),


  http.put(`${API_URL}/sessions/:id`, async ({ params, request }) => {
    const index = sessions.findIndex(s => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Session non trouvée',
        error: 'Not Found'
      }, { status: 404 })
    }

    const updates = await request.json() as Partial<Session>
    

    if (updates.escapeGameId || updates.employeeId || updates.dateHeure) {
    
    
    }

    sessions[index] = {
      ...sessions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return HttpResponse.json(sessions[index], { status: 200 })
  }),


  http.delete(`${API_URL}/sessions/:id`, ({ params }) => {
    const index = sessions.findIndex(s => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Session non trouvée',
        error: 'Not Found'
      }, { status: 404 })
    }


    if (['En cours', 'Terminée'].includes(sessions[index].statut)) {
      return HttpResponse.json({
        message: 'Impossible de supprimer une session en cours ou terminée',
        error: 'Bad Request'
      }, { status: 400 })
    }

    sessions.splice(index, 1)
    return HttpResponse.json({ 
      message: 'Session supprimée avec succès' 
    }, { status: 200 })
  }),


  http.patch(`${API_URL}/sessions/:id/status`, async ({ params, request }) => {
    const index = sessions.findIndex(s => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Session non trouvée',
        error: 'Not Found'
      }, { status: 404 })
    }

    const { statut, notes, dureeReelle } = await request.json() as { 
      statut: Session['statut']
      notes?: string
      dureeReelle?: number
    }
    
    if (!['Réservée', 'En cours', 'Terminée', 'Annulée'].includes(statut)) {
      return HttpResponse.json({
        message: 'Statut invalide',
        error: 'Bad Request'
      }, { status: 400 })
    }

    const updatedSession: Session = {
      ...sessions[index],
      statut,
      updatedAt: new Date().toISOString()
    }


    if (statut === 'Terminée') {
      if (notes) updatedSession.notes = notes
      if (dureeReelle) updatedSession.dureeReelle = dureeReelle
    }

    sessions[index] = updatedSession
    
    return HttpResponse.json(sessions[index], { status: 200 })
  }),


  http.get(`${API_URL}/sessions/availability/:escapeGameId`, ({ params, request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const time = url.searchParams.get('time')
    
    if (!date || !time) {
      return HttpResponse.json({
        message: 'Date et heure sont requises',
        error: 'Bad Request'
      }, { status: 400 })
    }

    const requestedDateTime = `${date}T${time}:00Z`
    

    const conflictingSession = sessions.find(s => 
      s.escapeGameId === params.escapeGameId &&
      s.dateHeure === requestedDateTime &&
      s.statut !== 'Annulée'
    )


    const availableEmployees = employees.filter(emp => 
      emp.poste === 'Game Master' && 
      emp.statut === 'Actif' &&
      !sessions.some(s => 
        s.employeeId === emp.id && 
        s.dateHeure === requestedDateTime && 
        s.statut !== 'Annulée'
      )
    )

    return HttpResponse.json({
      available: !conflictingSession && availableEmployees.length > 0,
      conflictingSession: conflictingSession || null,
      availableEmployees
    }, { status: 200 })
  })
]
