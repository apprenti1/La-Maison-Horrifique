

import { http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/utils'
import type { DashboardStats } from '../types/mockApi'
import { escapeGames, employees, sessions } from '../data/mockData'

export const statsHandlers = [

  http.get(`${API_URL}/stats`, () => {
    const today = new Date().toISOString().split('T')[0]
    

    const todaysSessions = sessions.filter(session => 
      session.dateHeure.startsWith(today)
    )


    const activeEmployees = employees.filter(emp => emp.statut === 'Actif')
    const employeesInTraining = employees.filter(emp => emp.statut === 'Formation')
    

    const activeEscapeGames = escapeGames.filter(eg => eg.statut === 'Actif')
    const maintenanceGames = escapeGames.filter(eg => eg.statut === 'Maintenance')
    

    const todaysRevenue = todaysSessions
      .filter(s => s.statut === 'Terminée')
      .reduce((total, session) => total + session.prixTotal, 0)


    const currentSessions = sessions.filter(s => s.statut === 'En cours')
    const upcomingSessions = sessions.filter(s => 
      s.statut === 'Réservée' && 
      new Date(s.dateHeure) > new Date()
    )


    const nextSession = upcomingSessions
      .sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())[0]


    const averageRating = escapeGames.length > 0 
      ? escapeGames.reduce((sum, eg) => sum + eg.note, 0) / escapeGames.length 
      : 0

    const stats: DashboardStats = {
      escapeGames: {
        total: escapeGames.length,
        active: activeEscapeGames.length,
        maintenance: maintenanceGames.length,
        averageRating: Math.round(averageRating * 10) / 10
      },
      sessions: {
        today: todaysSessions.length,
        current: currentSessions.length,
        upcoming: upcomingSessions.length,
        nextSessionTime: nextSession ? new Date(nextSession.dateHeure).toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }) : null
      },
      employees: {
        total: employees.length,
        active: activeEmployees.length,
        training: employeesInTraining.length
      },
      revenue: {
        today: todaysRevenue,
        todayFormatted: `€${todaysRevenue.toLocaleString('fr-FR')}`
      },
      escapeGamesDetails: activeEscapeGames.map(eg => ({
        id: eg.id,
        title: eg.title,
        icon: eg.icon,
        level: eg.level,
        levelColor: eg.levelColor,
        players: `${eg.minPlayers}-${eg.maxPlayers} joueurs`,
        duration: eg.duration
      }))
    }

    return HttpResponse.json(stats, { status: 200 })
  }),


  http.get(`${API_URL}/stats/revenue`, ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '7days'
    
    const now = new Date()
    let startDate: Date
    
    switch (period) {
      case '30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    const periodSessions = sessions.filter(s => 
      s.statut === 'Terminée' && 
      new Date(s.dateHeure) >= startDate
    )

    const totalRevenue = periodSessions.reduce((sum, s) => sum + s.prixTotal, 0)
    const averagePerSession = periodSessions.length > 0 ? totalRevenue / periodSessions.length : 0


    const revenueByEscapeGame = escapeGames.map(eg => {
      const egSessions = periodSessions.filter(s => s.escapeGameId === eg.id)
      const egRevenue = egSessions.reduce((sum, s) => sum + s.prixTotal, 0)
      
      return {
        escapeGameId: eg.id,
        title: eg.title,
        icon: eg.icon,
        sessions: egSessions.length,
        revenue: egRevenue,
        averagePerSession: egSessions.length > 0 ? egRevenue / egSessions.length : 0
      }
    })

    return HttpResponse.json({
      period,
      totalRevenue,
      totalSessions: periodSessions.length,
      averagePerSession: Math.round(averagePerSession * 100) / 100,
      revenueByEscapeGame: revenueByEscapeGame.sort((a, b) => b.revenue - a.revenue)
    }, { status: 200 })
  }),


  http.get(`${API_URL}/stats/employees-performance`, ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30days'
    
    const now = new Date()
    let startDate: Date
    
    switch (period) {
      case '7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const periodSessions = sessions.filter(s => 
      new Date(s.dateHeure) >= startDate
    )

    const employeeStats = employees
      .filter(emp => emp.poste === 'Game Master')
      .map(emp => {
        const empSessions = periodSessions.filter(s => s.employeeId === emp.id)
        const completedSessions = empSessions.filter(s => s.statut === 'Terminée')
        const totalRevenue = completedSessions.reduce((sum, s) => sum + s.prixTotal, 0)
        
        return {
          employeeId: emp.id,
          nom: emp.name,
          prenom: emp.surname,
          totalSessions: empSessions.length,
          completedSessions: completedSessions.length,
          revenue: totalRevenue,
          averageSessionDuration: completedSessions.length > 0 
            ? completedSessions
                .filter(s => s.dureeReelle)
                .reduce((sum, s) => sum + (s.dureeReelle || 0), 0) / completedSessions.filter(s => s.dureeReelle).length 
            : null,
          completionRate: empSessions.length > 0 ? (completedSessions.length / empSessions.length) * 100 : 0
        }
      })
      .sort((a, b) => b.totalSessions - a.totalSessions)

    return HttpResponse.json({
      period,
      employeeStats
    }, { status: 200 })
  }),


  http.get(`${API_URL}/stats/escape-games-popularity`, ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get('period') || '30days'
    
    const now = new Date()
    let startDate: Date
    
    switch (period) {
      case '7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const periodSessions = sessions.filter(s => 
      new Date(s.dateHeure) >= startDate
    )

    const escapeGameStats = escapeGames.map(eg => {
      const egSessions = periodSessions.filter(s => s.escapeGameId === eg.id)
      const completedSessions = egSessions.filter(s => s.statut === 'Terminée')
      const totalPlayers = egSessions.reduce((sum, s) => sum + s.clientInfo.nombrePersonnes, 0)
      
      return {
        escapeGameId: eg.id,
        title: eg.title,
        icon: eg.icon,
        color: eg.color,
        level: eg.level,
        totalSessions: egSessions.length,
        completedSessions: completedSessions.length,
        totalPlayers,
        averagePlayersPerSession: egSessions.length > 0 ? totalPlayers / egSessions.length : 0,
        rating: eg.note,
        revenue: completedSessions.reduce((sum, s) => sum + s.prixTotal, 0)
      }
    }).sort((a, b) => b.totalSessions - a.totalSessions)

    return HttpResponse.json({
      period,
      escapeGameStats
    }, { status: 200 })
  })
]