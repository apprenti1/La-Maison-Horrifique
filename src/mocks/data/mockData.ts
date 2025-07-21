// data/mockData.ts

import type { EscapeGame, Employee, Session } from '../types/mockApi'

export const escapeGames: EscapeGame[] = [
  {
    id: '1',
    color: "#eba707",
    title: "La Maison Maudite",
    description: "Une famille a disparu dans cette demeure. Découvrez leur terrible secret avant qu'il ne soit trop tard.",
    icon: "🏚️",
    duration: "60 min",
    level: "Extrême",
    levelColor: "#eba707",
    minPlayers: 2,
    maxPlayers: 6,
    prix: 35,
    statut: 'Actif',
    theme: 'Horreur',
    note: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-15T10:00:00Z'
  },
  {
    id: '2',
    color: "#7A00E680",
    title: "Le Laboratoire",
    description: "Un scientifique fou a créé des créatures terrifiantes. Échappez-vous avant de devenir ses cobayes.",
    icon: "🧙‍♀️",
    duration: "45 min",
    level: "Intense",
    levelColor: "#7A00E680",
    minPlayers: 2,
    maxPlayers: 4,
    prix: 30,
    statut: 'Actif',
    theme: 'Science-Fiction',
    note: 4.5,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-07-10T10:00:00Z'
  },
  {
    id: '3',
    color: "#34C75980",
    title: "Le Cimetière Hanté",
    description: "Les morts ne reposent pas en paix ici. Trouvez un moyen de les apaiser avant l'aube.",
    icon: "🪦",
    duration: "75 min",
    level: "Extrême",
    levelColor: "#34C75980",
    minPlayers: 3,
    maxPlayers: 8,
    prix: 45,
    statut: 'Actif',
    theme: 'Paranormal',
    note: 4.9,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-07-12T10:00:00Z'
  },
  {
    id: '4',
    color: "#011949FF",
    title: "Le Navire Fantôme",
    description: "À bord de ce vaisseau maudit, l'équipage attend votre arrivée depuis des siècles.",
    icon: "🚢",
    duration: "90 min",
    level: "Modéré",
    levelColor: "#002775FF",
    minPlayers: 4,
    maxPlayers: 6,
    prix: 40,
    statut: 'Maintenance',
    theme: 'Maritime',
    note: 4.7,
    createdAt: '2024-04-05T10:00:00Z',
    updatedAt: '2024-07-14T10:00:00Z'
  },
  {
    id: '5',
    color: "#B91C1C",
    title: "L'Asile Abandonné",
    description: "Une enquête paranormale dans un asile psychiatrique où résonnent encore les cris des patients.",
    icon: "🏥",
    duration: "80 min",
    level: "Intense",
    levelColor: "#B91C1C",
    minPlayers: 3,
    maxPlayers: 5,
    prix: 42,
    statut: 'Actif',
    theme: 'Psychologique',
    note: 4.6,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-07-16T10:00:00Z'
  }
]

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Dubois',
    surname: 'Marie',
    password: 'password123',
    email: 'marie.dubois@maisonhorreur.com',
    telephone: '06.12.34.56.78',
    poste: 'Game Master',
    statut: 'Actif',
    salaire: 2200,
    dateEmbauche: '2023-01-15',
    createdAt: '2023-01-15T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '2',
    name: 'Martin',
    surname: 'Pierre',
    password: 'securePass456',
    email: 'pierre.martin@maisonhorreur.com',
    telephone: '06.23.45.67.89',
    poste: 'Game Master',
    statut: 'Actif',
    salaire: 2300,
    dateEmbauche: '2023-03-20',
    createdAt: '2023-03-20T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '3',
    name: 'Leroy',
    surname: 'Sophie',
    password: 'welcome789',
    email: 'sophie.leroy@maisonhorreur.com',
    telephone: '06.34.56.78.90',
    poste: 'Accueil',
    statut: 'Actif',
    salaire: 2000,
    dateEmbauche: '2023-02-10',
    createdAt: '2023-02-10T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '4',
    name: 'Moreau',
    surname: 'Jean',
    password: 'managerPass123',
    email: 'jean.moreau@maisonhorreur.com',
    telephone: '06.45.67.89.01',
    poste: 'Manager',
    statut: 'Actif',
    salaire: 3500,
    dateEmbauche: '2022-11-01',
    createdAt: '2022-11-01T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '5',
    name: 'Durand',
    surname: 'Lucie',
    password: 'gameMaster2250',
    email: 'lucie.durand@maisonhorreur.com',
    telephone: '06.56.78.90.12',
    poste: 'Game Master',
    statut: 'Actif',
    salaire: 2250,
    dateEmbauche: '2023-05-15',
    createdAt: '2023-05-15T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '6',
    name: 'Bernard',
    surname: 'Thomas',
    password: 'tech2400',
    email: 'thomas.bernard@maisonhorreur.com',
    telephone: '06.67.89.01.23',
    poste: 'Technicien',
    statut: 'Actif',
    salaire: 2400,
    dateEmbauche: '2023-04-01',
    createdAt: '2023-04-01T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '7',
    name: 'Petit',
    surname: 'Camille',
    password: 'formation2100',
    email: 'camille.petit@maisonhorreur.com',
    telephone: '06.78.90.12.34',
    poste: 'Game Master',
    statut: 'Formation',
    salaire: 2100,
    dateEmbauche: '2024-06-01',
    createdAt: '2024-06-01T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  },
  {
    id: '8',
    name: 'Garcia',
    surname: 'Nicolas',
    password: 'conge2200',
    email: 'nicolas.garcia@maisonhorreur.com',
    telephone: '06.89.01.23.45',
    poste: 'Game Master',
    statut: 'Congé',
    salaire: 2200,
    dateEmbauche: '2023-07-10',
    createdAt: '2023-07-10T09:00:00Z',
    updatedAt: '2024-07-15T09:00:00Z'
  }
]

export const sessions: Session[] = [
  {
    id: '1',
    escapeGameId: '1',
    employeeId: '1',
    clientInfo: {
      nom: 'Dupont',
      prenom: 'Michel',
      email: 'michel.dupont@email.com',
      telephone: '06.11.22.33.44',
      nombrePersonnes: 4
    },
    dateHeure: '2024-07-16T14:00:00Z',
    statut: 'Réservée',
    prixTotal: 140,
    createdAt: '2024-07-10T10:00:00Z',
    updatedAt: '2024-07-10T10:00:00Z'
  },
  {
    id: '2',
    escapeGameId: '2',
    employeeId: '2',
    clientInfo: {
      nom: 'Lambert',
      prenom: 'Sarah',
      email: 'sarah.lambert@email.com',
      telephone: '06.22.33.44.55',
      nombrePersonnes: 3
    },
    dateHeure: '2024-07-16T16:30:00Z',
    statut: 'Réservée',
    prixTotal: 90,
    createdAt: '2024-07-12T15:00:00Z',
    updatedAt: '2024-07-12T15:00:00Z'
  },
  {
    id: '3',
    escapeGameId: '3',
    employeeId: '5',
    clientInfo: {
      nom: 'Rousseau',
      prenom: 'David',
      email: 'david.rousseau@email.com',
      telephone: '06.33.44.55.66',
      nombrePersonnes: 6
    },
    dateHeure: '2024-07-16T18:30:00Z',
    statut: 'En cours',
    prixTotal: 270,
    createdAt: '2024-07-13T11:00:00Z',
    updatedAt: '2024-07-16T18:30:00Z'
  },
  {
    id: '4',
    escapeGameId: '1',
    employeeId: '1',
    clientInfo: {
      nom: 'Moreau',
      prenom: 'Julie',
      email: 'julie.moreau@email.com',
      telephone: '06.44.55.66.77',
      nombrePersonnes: 2
    },
    dateHeure: '2024-07-15T20:00:00Z',
    statut: 'Terminée',
    prixTotal: 70,
    dureeReelle: 58,
    notes: 'Très bon groupe, ont réussi avec 2 minutes d\'avance',
    createdAt: '2024-07-10T14:00:00Z',
    updatedAt: '2024-07-15T21:00:00Z'
  },
  {
    id: '5',
    escapeGameId: '2',
    employeeId: '2',
    clientInfo: {
      nom: 'Vincent',
      prenom: 'Laura',
      email: 'laura.vincent@email.com',
      telephone: '06.55.66.77.88',
      nombrePersonnes: 4
    },
    dateHeure: '2024-07-16T10:00:00Z',
    statut: 'Terminée',
    prixTotal: 120,
    dureeReelle: 43,
    createdAt: '2024-07-14T09:00:00Z',
    updatedAt: '2024-07-16T11:00:00Z'
  },
  {
    id: '6',
    escapeGameId: '3',
    employeeId: '5',
    clientInfo: {
      nom: 'Simon',
      prenom: 'Marc',
      email: 'marc.simon@email.com',
      telephone: '06.66.77.88.99',
      nombrePersonnes: 5
    },
    dateHeure: '2024-07-16T20:30:00Z',
    statut: 'Réservée',
    prixTotal: 225,
    createdAt: '2024-07-15T16:00:00Z',
    updatedAt: '2024-07-15T16:00:00Z'
  }
]