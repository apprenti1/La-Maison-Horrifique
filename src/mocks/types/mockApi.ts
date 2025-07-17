

export interface EscapeGame {
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
  
  export interface Employee {
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
  
  export interface Session {
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
  
  export interface EnrichedSession extends Session {
    escapeGame?: EscapeGame
    employee?: Employee
  }
  
  export interface DashboardStats {
    escapeGames: {
      total: number
      active: number
      maintenance: number
      averageRating: number
    }
    sessions: {
      today: number
      current: number
      upcoming: number
      nextSessionTime: string | null
    }
    employees: {
      total: number
      active: number
      training: number
    }
    revenue: {
      today: number
      todayFormatted: string
    }
    escapeGamesDetails: Array<{
      id: string
      title: string
      icon: string
      level: string
      levelColor: string
      players: string
      duration: string
    }>
  }