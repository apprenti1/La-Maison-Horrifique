// app/session/SessionPublicPage.tsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackgroundEffects from '@/components/BackgroundEffects'
import FloatingHorrorElements from '@/components/FloatingHorrorElements'

export default function SessionPublicPage() {
  const { id } = useParams()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    // Fetch vers votre API existante
    fetch(`/api/sessions/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setSession(data)
        setLoading(false)
      })
      .catch(() => {
        setSession(null)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <BackgroundEffects />
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-300 text-xl">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <BackgroundEffects />
        <div className="text-center">
          <div className="text-6xl mb-4">😱</div>
          <h1 className="text-red-400 text-2xl font-bold mb-4">Session introuvable</h1>
          <p className="text-gray-300">Cette session n'existe pas.</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Réservée': return 'text-blue-400 bg-blue-900/20'
      case 'En cours': return 'text-green-400 bg-green-900/20'
      case 'Terminée': return 'text-gray-400 bg-gray-900/20'
      case 'Annulée': return 'text-red-400 bg-red-900/20'
      default: return 'text-gray-300 bg-gray-800/20'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <BackgroundEffects />
      <FloatingHorrorElements />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{session.escapeGame?.icon || '🎮'}</div>
          <h1 className="text-4xl font-bold text-white mb-2 text-shadow-horror">
            Votre Session d'Escape Game
          </h1>
          <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold ${getStatusColor(session.statut)}`}>
            {session.statut}
          </div>
        </div>

        {/* Infos principales */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Escape Game */}
          <div className="admin-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">{session.escapeGame?.icon || '🎮'}</span>
              {session.escapeGame?.title || 'Escape Game'}
            </h2>
            <p className="text-gray-300 mb-4">
              {session.escapeGame?.description || 'Une expérience inoubliable vous attend...'}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Durée:</span>
                <span className="text-white ml-2">{session.escapeGame?.duration || '60min'}</span>
              </div>
              <div>
                <span className="text-gray-400">Difficulté:</span>
                <span className="text-yellow-400 ml-2">{session.escapeGame?.level || 'Moyen'}</span>
              </div>
              <div>
                <span className="text-gray-400">Thème:</span>
                <span className="text-white ml-2">{session.escapeGame?.theme || 'Mystère'}</span>
              </div>
              <div>
                <span className="text-gray-400">Note:</span>
                <span className="text-yellow-400 ml-2">
                  {session.escapeGame?.note ? `${session.escapeGame.note}/5 ⭐` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Date et infos */}
          <div className="admin-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📅</span>
              Votre Réservation
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 block">Date et heure</span>
                <span className="text-white text-lg font-semibold">
                  {formatDate(session.dateHeure)}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Réservé par</span>
                <span className="text-white font-semibold">
                  {session.clientInfo?.prenom} {session.clientInfo?.nom}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Nombre de joueurs</span>
                <span className="text-white font-semibold">
                  {session.clientInfo?.nombrePersonnes} personne{session.clientInfo?.nombrePersonnes > 1 ? 's' : ''}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Contact</span>
                <span className="text-white font-semibold">
                  {session.clientInfo?.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Prix et Game Master */}
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="admin-card rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">💰 Prix Total</h2>
            <div className="text-4xl font-bold text-green-400">
              {session.prixTotal}€
            </div>
          </div>

          <div className="admin-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🎭</span>
              Game Master
            </h2>
            <div className="text-white text-lg">
              {session.employee ? 
                `${session.employee.prenom} ${session.employee.nom}` : 
                'À définir'
              }
            </div>
            {session.employee?.poste && (
              <div className="text-gray-400 text-sm mt-1">
                {session.employee.poste}
              </div>
            )}
          </div>
        </div>

        {/* Notes si présentes */}
        {session.notes && (
          <div className="admin-card rounded-xl p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <span className="text-2xl mr-2">📝</span>
              Notes
            </h2>
            <p className="text-gray-300">{session.notes}</p>
          </div>
        )}

        {/* Durée réelle si terminée */}
        {session.dureeReelle && session.statut === 'Terminée' && (
          <div className="admin-card rounded-xl p-6 mt-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">⏱️ Durée de votre session</h2>
            <div className="text-2xl font-bold text-green-400">
              {session.dureeReelle} minutes
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-lg">Merci de nous faire confiance ! 🎮</p>
          <p className="text-sm mt-2">
            Session créée le {new Date(session.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  )
}