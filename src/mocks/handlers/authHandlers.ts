
import { http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/utils'

export const authHandlers = [
  http.post(`${API_URL}/login`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string }

    if (!email || !password) {
      return HttpResponse.json({
        message: 'Email et mot de passe requis',
        error: 'Bad Request',
      }, { status: 400 })
    }

    if (email === 'admin@admin.io' && password === 'Azerty1234!') {
      return HttpResponse.json({
        token: 'fake-jwt-token-admin',
        user: {
          id: 'admin-1',
          email: 'admin@admin.io',
          name: 'Administrateur',
          role: 'admin'
        }
      }, { status: 200 })
    }

    if (email === 'employee@employee.io' && password === 'Azerty1234!') {
      return HttpResponse.json({
        token: 'fake-jwt-token-employee',
        user: {
          id: 'employee-1',
          email: 'employee@employee.io',
          name: 'Employé',
          role: 'employee'
        }
      }, { status: 200 })
    }

    return HttpResponse.json({
      message: 'Identifiants invalides',
      error: 'Unauthorized',
    }, { status: 401 })
  }),

  http.post(`${API_URL}/verifyToken`, async ({ request }) => {
    const { token } = await request.json() as { token: string }

    if (!token) {
      return HttpResponse.json({
        message: 'Token requis',
        error: 'Bad Request',
      }, { status: 400 })
    }

    if (token === 'fake-jwt-token-admin') {
      return HttpResponse.json({
        message: 'Token valide',
        user: {
          id: 'admin-1',
          email: 'admin@admin.io',
          name: 'Administrateur',
          role: 'admin'
        }
      }, { status: 200 })
    }

    if (token === 'fake-jwt-token-employee') {
      return HttpResponse.json({
        message: 'Token valide',
        user: {
          id: 'employee-1',
          email: 'employee@employee.io',
          name: 'Employé',
          role: 'employee'
        }
      }, { status: 200 })
    }

    return HttpResponse.json({
      message: 'Token invalide',
      error: 'Unauthorized',
    }, { status: 401 })
  }),

  http.post(`${API_URL}/logout`, async ({ request }) => {
    const { token } = await request.json() as { token: string }

    if (!token || token !== 'fake-jwt-token') {
      return HttpResponse.json({
        message: 'Token invalide',
        error: 'Unauthorized',
      }, { status: 401 })
    }

    return HttpResponse.json({
      message: 'Déconnexion réussie'
    }, { status: 200 })
  }),

  http.post(`${API_URL}/refresh-token`, async ({ request }) => {
    const { token } = await request.json() as { token: string }

    if (token === 'fake-jwt-token') {
      return HttpResponse.json({
        token: 'fake-jwt-token-refreshed',
        user: {
          id: 'admin-1',
          email: 'admin@admin.io',
          name: 'Administrateur',
          role: 'admin'
        }
      }, { status: 200 })
    }

    return HttpResponse.json({
      message: 'Token invalide',
      error: 'Unauthorized',
    }, { status: 401 })
  }),

  http.post(`${API_URL}/contact`, async ({ request }) => {
    const { nom, email, sujet, message } = await request.json() as {
      nom: string
      email: string
      sujet: string
      message: string
    }

    if (
      !nom ||
      nom.length > 50 ||
      !/^[A-Za-zÀ-ÿ -\s]+$/.test(nom) ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !sujet ||
      !message
    ) {
      return HttpResponse.json({
        message: 'Données invalides',
        error: 'Bad Request',
      }, { status: 400 })
    }

    return HttpResponse.json({
      message: 'Votre message a bien été envoyé',
    }, { status: 200 })
  }),
]