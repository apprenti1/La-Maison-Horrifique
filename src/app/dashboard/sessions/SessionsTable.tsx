// components/sessions/SessionsTable.tsx
import { type ReactElement, useState } from 'react'
import { FuckingButton } from '@/components/core/Button'

// Types (gardez vos types existants)
interface EscapeGame {
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

interface Employee {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  poste: 'Game Master' | 'Accueil' | 'Manager' | 'Technicien'
  statut: 'Actif' | 'Inactif' | 'Congé' | 'Formation'
  dateEmbauche: string
  createdAt: string
  updatedAt: string
}

interface Session {
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

interface SessionWithRelations extends Session {
  escapeGame?: EscapeGame
  employee?: Employee
}

interface SessionsTableProps {
  sessions: SessionWithRelations[]
  onEdit: (session: SessionWithRelations) => void
  onDelete: (sessionId: string) => void
  onStatusChange: (sessionId: string, newStatus: string) => void
}

export default function SessionsTable({ 
  sessions, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: SessionsTableProps): ReactElement {
  
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null)
  
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Réservée': return 'text-blue-400'
      case 'En cours': return 'text-green-400'
      case 'Terminée': return 'text-gray-400'
      case 'Annulée': return 'text-red-400'
      default: return 'text-gray-300'
    }
  }

  const getStatusBg = (statut: string) => {
    switch (statut) {
      case 'Réservée': return 'bg-blue-900/20 border-blue-500/30'
      case 'En cours': return 'bg-green-900/20 border-green-500/30'
      case 'Terminée': return 'bg-gray-900/20 border-gray-500/30'
      case 'Annulée': return 'bg-red-900/20 border-red-500/30'
      default: return 'bg-gray-800/20 border-gray-500/30'
    }
  }

  const canChangeStatus = (currentStatus: string) => {
    return !['Terminée', 'Annulée'].includes(currentStatus)
  }

  const getNextStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Réservée': return ['En cours', 'Annulée']
      case 'En cours': return ['Terminée', 'Annulée']
      default: return []
    }
  }

  // 🎯 FONCTION SIMPLE POUR COPIER LE LIEN
  const copyPublicLink = async (sessionId: string) => {
    try {
      // Pour React Router, on génère le lien complet
      const publicUrl = `${window.location.origin}/dashboard/sessions/public/${sessionId}`
      await navigator.clipboard.writeText(publicUrl)
      
      // Feedback visuel
      setCopiedSessionId(sessionId)
      setTimeout(() => setCopiedSessionId(null), 2000)
      
      // Notification simple
      console.log('Lien copié:', publicUrl)
      
    } catch (error) {
      // Fallback pour navigateurs anciens
      const textArea = document.createElement('textarea')
      textArea.value = `${window.location.origin}/dashboard/sessions/public/${sessionId}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      setCopiedSessionId(sessionId)
      setTimeout(() => setCopiedSessionId(null), 2000)
    }
  }

  return (
    <div className="admin-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date & Heure
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Escape Game
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Joueurs
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-800/30 transition-colors">
                {/* Date & Heure */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {formatDate(session.dateHeure)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatTime(session.dateHeure)}
                  </div>
                </td>

                {/* Escape Game */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{session.escapeGame?.icon || '🎮'}</span>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {session.escapeGame?.title || 'Escape Game inconnu'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {session.escapeGame?.duration || 'Durée inconnue'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Client */}
                <td className="px-6 py-4">
                  <div className="text-sm text-white">
                    {session.clientInfo.prenom} {session.clientInfo.nom}
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    {session.clientInfo.email}
                  </div>
                  <div className="text-sm text-gray-400">
                    {session.clientInfo.telephone}
                  </div>
                </td>

                {/* Joueurs */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {session.clientInfo.nombrePersonnes} joueur{session.clientInfo.nombrePersonnes > 1 ? 's' : ''}
                  </div>
                </td>

                {/* Statut */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBg(session.statut)} ${getStatusColor(session.statut)}`}>
                    {session.statut}
                  </div>
                  {session.dureeReelle && (
                    <div className="text-xs text-gray-400 mt-1">
                      Durée: {session.dureeReelle}min
                    </div>
                  )}
                </td>

                {/* Prix */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white font-semibold">
                    {session.prixTotal}€
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    
                    {/* 🎯 BOUTON SIMPLE POUR COPIER LE LIEN PUBLIC */}
                    <FuckingButton
                      variant="secondary"
                      color={copiedSessionId === session.id ? "green" : "purple"}
                      size="sm"
                      onClick={() => copyPublicLink(session.id)}
                      title="Copier le lien public de la session"
                      className="min-w-0 px-2 relative"
                    >
                      {copiedSessionId === session.id ? '✅' : '🔗'}
                    </FuckingButton>

                    {/* Changer statut */}
                    {canChangeStatus(session.statut) && (
                      <div className="relative group">
                        <FuckingButton
                          variant="secondary"
                          color="blue"
                          size="sm"
                          className="min-w-0 px-2"
                        >
                          ⟲
                        </FuckingButton>
                        <div className="absolute right-0 top-8 hidden group-hover:block bg-gray-800 border border-gray-700 rounded shadow-lg py-1 z-10">
                          {getNextStatuses(session.statut).map(status => (
                            <button
                              key={status}
                              onClick={() => onStatusChange(session.id, status)}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                            >
                              → {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Éditer */}
                    <FuckingButton
                      variant="secondary"
                      color="gray"
                      size="sm"
                      onClick={() => onEdit(session)}
                    >
                      ✏️
                    </FuckingButton>

                    {/* Supprimer */}
                    {['Réservée', 'Annulée'].includes(session.statut) && (
                      <FuckingButton
                        variant="secondary"
                        color="red"
                        size="sm"
                        onClick={() => onDelete(session.id)}
                      >
                        🗑️
                      </FuckingButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende simple */}
      <div className="bg-gray-800/50 px-6 py-3 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-400">Réservée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-400">Terminée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400">Annulée</span>
          </div>
          <div className="ml-auto text-gray-500">
            🔗 Cliquer pour copier le lien public
          </div>
        </div>
      </div>
    </div>
  )
}