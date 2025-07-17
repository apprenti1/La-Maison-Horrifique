// mocks/handlers.ts - fichier principal

import { authHandlers } from './handlers/authHandlers'
import { escapeGamesHandlers } from './handlers/escapeGamesHandlers'
import { employeesHandlers } from './handlers/employeesHandlers'
import { sessionsHandlers } from './handlers/sessionsHandlers'
import { statsHandlers } from './handlers/statsHandlers'

// exporter tous les handlers en un seul tableau
export const handlers = [
  ...authHandlers,
  ...escapeGamesHandlers,
  ...employeesHandlers,
  ...sessionsHandlers,
  ...statsHandlers,
]

// exporter aussi les handlers individuellement si besoin
export {
  authHandlers,
  escapeGamesHandlers,
  employeesHandlers,
  sessionsHandlers,
  statsHandlers,
}

// exporter les types et données si besoin dans d'autres fichiers
export * from './types/mockApi'
export * from './data/mockData'