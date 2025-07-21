
import { http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/utils'
import type { Employee } from '../types/mockApi'
import { employees, sessions, escapeGames } from '../data/mockData'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const employeesHandlers = [
  http.get(`${API_URL}/employees`, ({ request }) => {
    const url = new URL(request.url)
    const poste = url.searchParams.get('poste')
    const statut = url.searchParams.get('statut')
    
    let filteredEmployees = employees

    if (poste) {
      filteredEmployees = filteredEmployees.filter(emp => emp.poste === poste)
    }
    if (statut) {
      filteredEmployees = filteredEmployees.filter(emp => emp.statut === statut)
    }

    return HttpResponse.json(filteredEmployees, { status: 200 })
  }),

  http.get(`${API_URL}/employees/:id`, ({ params }) => {
    const employee = employees.find(emp => emp.id === params.id)
    if (!employee) {
      return HttpResponse.json({
        message: 'Employé non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }
    return HttpResponse.json(employee, { status: 200 })
  }),

  http.post(`${API_URL}/employees`, async ({ request }) => {
    const newEmployee = await request.json() as Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
    if (!newEmployee.email || !newEmployee.password || !newEmployee.name || !newEmployee.surname) {
      return HttpResponse.json({
        message: 'Tous les champs sont requis',
        error: 'Bad Request'
      }, { status: 400 })
    }

    const emailExists = employees.some(emp => emp.email === newEmployee.email)
    if (emailExists) {
      return HttpResponse.json({
        message: 'Un employé avec cet email existe déjà',
        error: 'Conflict'
      }, { status: 409 })
    }
    
    const employee: Employee = {
      ...newEmployee,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    employees.push(employee)
    return HttpResponse.json(employee, { status: 201 })
  }),

  http.put(`${API_URL}/employees/:id`, async ({ params, request }) => {
    const index = employees.findIndex(emp => emp.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Employé non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const updates = await request.json() as Partial<Employee>
    
    if (updates.email && updates.email !== employees[index].email) {
      const emailExists = employees.some(emp => emp.email === updates.email && emp.id !== params.id)
      if (emailExists) {
        return HttpResponse.json({
          message: 'Un employé avec cet email existe déjà',
          error: 'Conflict'
        }, { status: 409 })
      }
    }

    employees[index] = {
      ...employees[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return HttpResponse.json(employees[index], { status: 200 })
  }),

  http.delete(`${API_URL}/employees/:id`, ({ params }) => {
    const index = employees.findIndex(emp => emp.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Employé non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const hasLinkedSessions = sessions.some(s => s.employeeId === params.id)
    if (hasLinkedSessions) {
      return HttpResponse.json({
        message: 'Impossible de supprimer: cet employé a des sessions assignées',
        error: 'Conflict'
      }, { status: 409 })
    }

    employees.splice(index, 1)
    return HttpResponse.json({ 
      message: 'Employé supprimé avec succès' 
    }, { status: 200 })
  }),

  http.get(`${API_URL}/employees/:id/sessions`, ({ params, request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const statut = url.searchParams.get('statut')
    
    let employeeSessions = sessions.filter(s => s.employeeId === params.id)
    
    if (date) {
      employeeSessions = employeeSessions.filter(session => 
        session.dateHeure.startsWith(date)
      )
    }
    if (statut) {
      employeeSessions = employeeSessions.filter(session => 
        session.statut === statut
      )
    }

    const enrichedSessions = employeeSessions.map(session => {
      const escapeGame = escapeGames.find(eg => eg.id === session.escapeGameId)
      return {
        ...session,
        escapeGame
      }
    })

    return HttpResponse.json(enrichedSessions, { status: 200 })
  }),

  http.patch(`${API_URL}/employees/:id/status`, async ({ params, request }) => {
    const index = employees.findIndex(emp => emp.id === params.id)
    if (index === -1) {
      return HttpResponse.json({
        message: 'Employé non trouvé',
        error: 'Not Found'
      }, { status: 404 })
    }

    const { statut } = await request.json() as { statut: Employee['statut'] }
    
    if (!['Actif', 'Inactif', 'Congé', 'Formation'].includes(statut)) {
      return HttpResponse.json({
        message: 'Statut invalide',
        error: 'Bad Request'
      }, { status: 400 })
    }

    employees[index] = {
      ...employees[index],
      statut,
      updatedAt: new Date().toISOString()
    }
    
    return HttpResponse.json(employees[index], { status: 200 })
  }),

  http.get(`${API_URL}/employees/game-masters`, () => {
    const gameMasters = employees.filter(emp => 
      emp.poste === 'Game Master' && emp.statut === 'Actif'
    )
    return HttpResponse.json(gameMasters, { status: 200 })
  })
]