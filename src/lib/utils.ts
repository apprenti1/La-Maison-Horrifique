import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api'
  : process.env.VITE_API_URL || '/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function checkRole(role?: string) {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const response = await fetch(`${API_URL}/verifyToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  if (!response.ok || response.status !== 200) return false;
  if (!role) return true;
  const data = await response.json();
  return data.user.role === role;
}

export async function isAuthenticated() {
  return checkRole();
}

export async function isAdmin() {
  return checkRole('admin');
}

export async function isEmployee() {
  return checkRole('employee');
}

export const Routes = {
  home: {
    toString: () => "/" as const,
  },
  login: {
    toString: () => "/login" as const,
  },
  logout: {
    toString: () => "/logout" as const,
  },
  dashboard: {
    toString: () => "/dashboard" as const,
    employees: {
      toString: () => "/dashboard/employees" as const,
      create: {
        toString: () => "/dashboard/employees/create" as const,
      },
    },
    sessions: {
      toString: () => "/dashboard/sessions" as const,
      public: {
        toString: () => "/dashboard/sessions/public/:id" as const,
      },
      planning: {
        toString: () => "/dashboard/sessions/planning" as const,
      },
    },
  },
  escapeGames: {
    toString: () => "/escape-games" as const,
  },
  escapeGame: {
    toString: (id: string) => `/escape-games/${id}` as const,
  },
  escapeGameCreate: {
    toString: () => "/escape-games/create" as const,
  },
  escapeGameEdit: {
    toString: (id: string) => `/escape-games/${id}/edit` as const,
  },
  escapeGameDelete: {
    toString: (id: string) => `/escape-games/${id}/delete` as const,
  },
  escapeGameStats: {
    toString: (id: string) => `/escape-games/${id}/stats` as const,
  },
  escapeGamesStats: {
    toString: () => `/escape-games/stats` as const,
  },
  legalNotices: {
    toString: () => "/legal-notices" as const,
  },
}