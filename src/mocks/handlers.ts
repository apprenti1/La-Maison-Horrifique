import { API_URL } from '@/lib/utils'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post(`${API_URL}/login`, async (req) => {
    const { email, password } = await req.request.json() as { email: string; password: string };

    if (email === 'admin@admin.io' && password === 'Azerty1234!') {
      return HttpResponse.json({
        token: 'fake-jwt-token',
      }, { status: 200 })
    } 
    return HttpResponse.json({
      message: 'Identifiants invalides',
      error: 'Unauthorized',
    }, { status: 401})
  }),

  http.post(`${API_URL}/contact`, async (req) => {
    const { nom, email, sujet, message } = await req.request.json() as {
      nom: string;
      email: string;
      sujet: string;
      message: string;
    };

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
      }, { status: 400 });
    }

    return HttpResponse.json({
      message: 'Votre message a bien été envoyé',
    }, { status: 200 });

  }),
]