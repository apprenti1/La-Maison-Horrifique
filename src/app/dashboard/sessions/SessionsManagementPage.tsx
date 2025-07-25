
import { useState, type ReactElement } from 'react'
import Navbar from '@/components/navbar/Navbar'
import BackgroundEffects from '@/components/BackgroundEffects'
import FloatingHorrorElements from '@/components/FloatingHorrorElements'
import { FuckingButton } from '@/components/core/Button'
import { useSessions } from '@/hooks/useSessions'
import { useEscapeGames } from '@/hooks/useEscapeGames'
import SessionsTable from './SessionsTable'
import SessionModal from './SessionModal'
import SessionsFilters from './SessionsFilters'
import { toast } from 'react-toastify'

export default function SessionsManagementPage(): ReactElement {
  const [filters, setFilters] = useState({
    date: '',
    escapeGameId: '',
    statut: ''
  })
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create' as 'create' | 'edit',
    sessionData: null as any
  })

  const { 
    sessions, 
    loading, 
    error, 
    refetch,
    createSession,
    updateSession,
    deleteSession,
    updateStatus 
  } = useSessions({
    date: filters.date || undefined,
    escapeGameId: filters.escapeGameId || undefined,
    statut: filters.statut || undefined,
    autoRefresh: true
  })

  const { escapeGames } = useEscapeGames({ onlyActive: false })

  const handleCreateSession = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      sessionData: null
    })
  }

  const handleEditSession = (session: any) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      sessionData: session
    })
  }

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) return
    
    try {
      await deleteSession(sessionId)
      alert('Session supprimée avec succès')
    } catch (error) {
      alert(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }

  const handleStatusChange = async (sessionId: string, newStatus: string) => {
    try {
      let additionalData = {}
      
      
      if (newStatus === 'Terminée') {
        const dureeInput = prompt('Durée réelle de la session (en minutes) :')
        if (dureeInput) {
          additionalData = { dureeReelle: parseInt(dureeInput) }
        }
      }
      
      await updateStatus(sessionId, newStatus, additionalData)
    } catch (error) {
      alert(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }

  const handleModalSubmit = async (sessionData: any) => {
    try {
      if (modalState.mode === 'create') {
        await createSession(sessionData)
        toast.success('Session créée avec succès') 
      } else {
        await updateSession(modalState.sessionData.id, sessionData)
        toast.success('Session modifiée avec succès')
      }
      
      
      
      
    } catch (error) {
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      
    }
  }

  const handleModalClose = () => {
    setModalState({ isOpen: false, mode: 'create', sessionData: null })
  }

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background Effects */}
      <BackgroundEffects />
      <FloatingHorrorElements />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Page Content */}
      <div className="relative my-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-shadow-horror">
            Gestion des Sessions
          </h1>
          <p className="text-gray-300">
            Gérez toutes les sessions d'escape games : réservations, planning et suivi
          </p>
        </div>

        {/* Actions et filtres */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex gap-4">
            <FuckingButton
              variant="primary"
              color="red"
              size="md"
              onClick={handleCreateSession}
            >
              + Nouvelle Session
            </FuckingButton>
            
            <FuckingButton
              variant="secondary"
              color="gray"
              size="md"
              onClick={() => setFilters({ date: getTodayDate(), escapeGameId: '', statut: '' })}
            >
              Aujourd'hui
            </FuckingButton>
            
            <FuckingButton
              variant="secondary"
              color="gray" 
              size="md"
              onClick={refetch}
            >
              Actualiser
            </FuckingButton>
          </div>

          <div className="text-sm text-gray-400">
            {loading ? (
              <span>Chargement...</span>
            ) : (
              <span>{sessions.length} session{sessions.length > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        {/* Filtres */}
        <SessionsFilters
          filters={filters}
          escapeGames={escapeGames}
          onFiltersChange={handleFiltersChange}
        />

        {/* Contenu principal */}
        {error ? (
          <div className="admin-card rounded-xl p-6 text-center">
            <div className="text-6xl mb-4">😱</div>
            <h3 className="text-red-400 font-bold mb-2">Erreur de chargement</h3>
            <p className="text-gray-300 mb-4">{error}</p>
            <FuckingButton variant="primary" color="red" onClick={refetch}>
              Réessayer
            </FuckingButton>
          </div>
        ) : loading ? (
          <div className="admin-card rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-300">Chargement des sessions...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="admin-card rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-white font-bold mb-2">Aucune session trouvée</h3>
            <p className="text-gray-400 mb-4">
              Aucune session ne correspond aux critères sélectionnés.
            </p>
            <FuckingButton variant="primary" color="red" onClick={handleCreateSession}>
              Créer la première session
            </FuckingButton>
          </div>
        ) : (
          <SessionsTable
            sessions={sessions}
            onEdit={handleEditSession}
            onDelete={handleDeleteSession}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Modal de création/édition */}
      {modalState.isOpen && (
        <SessionModal
          mode={modalState.mode}
          sessionData={modalState.sessionData}
          escapeGames={escapeGames}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}