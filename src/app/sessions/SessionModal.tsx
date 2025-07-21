// components/sessions/SessionModal.tsx
import { useState, useEffect, type ReactElement } from 'react'
import type { EscapeGame, Employee } from '@/mocks/types/mockApi'
import { FuckingButton } from '@/components/core/Button'

interface SessionModalProps {
  mode: 'create' | 'edit'
  sessionData?: any
  escapeGames: EscapeGame[]
  onSubmit: (sessionData: any) => void
  onClose: () => void
}

export default function SessionModal({
  mode,
  sessionData,
  escapeGames,
  onSubmit,
  onClose
}: SessionModalProps): ReactElement {
  
  const [formData, setFormData] = useState({
    escapeGameId: '',
    employeeId: '',
    dateHeure: '',
    clientInfo: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      nombrePersonnes: 2
    }
  })

  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // Charger les employés (Game Masters)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees')
        if (response.ok) {
          const data = await response.json()
          setEmployees(data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error)
      }
    }
    
    fetchEmployees()
  }, [])

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (mode === 'edit' && sessionData) {
      const dateTime = new Date(sessionData.dateHeure)
      const dateStr = dateTime.toISOString().slice(0, 16) // Format YYYY-MM-DDTHH:mm

      setFormData({
        escapeGameId: sessionData.escapeGameId,
        employeeId: sessionData.employeeId,
        dateHeure: dateStr,
        clientInfo: {
          nom: sessionData.clientInfo.nom,
          prenom: sessionData.clientInfo.prenom,
          email: sessionData.clientInfo.email,
          telephone: sessionData.clientInfo.telephone,
          nombrePersonnes: sessionData.clientInfo.nombrePersonnes
        }
      })
    }
  }, [mode, sessionData])

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target
    const finalValue = type === 'number' ? parseInt(value) : value

    if (name.startsWith('clientInfo.')) {
      const field = name.replace('clientInfo.', '')
      setFormData(prev => ({
        ...prev,
        clientInfo: {
          ...prev.clientInfo,
          [field]: finalValue
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: finalValue
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.escapeGameId) {
      newErrors.escapeGameId = 'Escape game requis'
    }

    if (!formData.employeeId) {
      newErrors.employeeId = 'Game Master requis'
    }

    if (!formData.dateHeure) {
      newErrors.dateHeure = 'Date et heure requises'
    } else {
      // Vérifier que la date n'est pas dans le passé (sauf en mode édition)
      const selectedDate = new Date(formData.dateHeure)
      const now = new Date()
      if (mode === 'create' && selectedDate < now) {
        newErrors.dateHeure = 'La date ne peut pas être dans le passé'
      }
    }

    if (!formData.clientInfo.nom.trim()) {
      newErrors['clientInfo.nom'] = 'Nom requis'
    }

    if (!formData.clientInfo.prenom.trim()) {
      newErrors['clientInfo.prenom'] = 'Prénom requis'
    }

    if (!formData.clientInfo.email.trim()) {
      newErrors['clientInfo.email'] = 'Email requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientInfo.email)) {
      newErrors['clientInfo.email'] = 'Email invalide'
    }

    if (!formData.clientInfo.telephone.trim()) {
      newErrors['clientInfo.telephone'] = 'Téléphone requis'
    }

    if (formData.clientInfo.nombrePersonnes < 1 || formData.clientInfo.nombrePersonnes > 10) {
      newErrors['clientInfo.nombrePersonnes'] = 'Nombre de joueurs invalide (1-10)'
    }

    // Vérifier les limites de l'escape game sélectionné
    if (formData.escapeGameId) {
      const selectedGame = escapeGames.find(g => g.id === formData.escapeGameId)
      if (selectedGame) {
        if (formData.clientInfo.nombrePersonnes < selectedGame.minPlayers) {
          newErrors['clientInfo.nombrePersonnes'] = `Minimum ${selectedGame.minPlayers} joueur(s) pour cet escape game`
        }
        if (formData.clientInfo.nombrePersonnes > selectedGame.maxPlayers) {
          newErrors['clientInfo.nombrePersonnes'] = `Maximum ${selectedGame.maxPlayers} joueur(s) pour cet escape game`
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      // Calculer le prix total
      const selectedGame = escapeGames.find(g => g.id === formData.escapeGameId)
      const prixTotal = selectedGame ? selectedGame.prix * formData.clientInfo.nombrePersonnes : 0

      const sessionData = {
        ...formData,
        dateHeure: new Date(formData.dateHeure).toISOString(),
        prixTotal,
        statut: mode === 'create' ? 'Réservée' : undefined // Ne pas modifier le statut en édition
      }

      await onSubmit(sessionData)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedGame = escapeGames.find(g => g.id === formData.escapeGameId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="admin-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'create' ? '🎮 Nouvelle Session' : '✏️ Modifier Session'}
            </h2>
            <FuckingButton
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </FuckingButton>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Escape Game */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Escape Game *
              </label>
              <select
                name="escapeGameId"
                value={formData.escapeGameId}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                required
              >
                <option value="">Sélectionner un escape game</option>
                {escapeGames.filter(g => g.statut === 'Actif').map(game => (
                  <option key={game.id} value={game.id}>
                    {game.icon} {game.title} - {game.duration} ({game.minPlayers}-{game.maxPlayers} joueurs)
                  </option>
                ))}
              </select>
              {errors.escapeGameId && (
                <p className="text-red-400 text-sm mt-1">{errors.escapeGameId}</p>
              )}
            </div>

            {/* Game Master */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Game Master *
              </label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                required
              >
                <option value="">Sélectionner un Game Master</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} {emp.surname}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="text-red-400 text-sm mt-1">{errors.employeeId}</p>
              )}
            </div>

            {/* Date et Heure */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date et Heure *
              </label>
              <input
                type="datetime-local"
                name="dateHeure"
                value={formData.dateHeure}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                required
              />
              {errors.dateHeure && (
                <p className="text-red-400 text-sm mt-1">{errors.dateHeure}</p>
              )}
            </div>

            {/* Informations Client */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">👤 Informations Client</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="clientInfo.prenom"
                    value={formData.clientInfo.prenom}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                  {errors['clientInfo.prenom'] && (
                    <p className="text-red-400 text-sm mt-1">{errors['clientInfo.prenom']}</p>
                  )}
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="clientInfo.nom"
                    value={formData.clientInfo.nom}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                  {errors['clientInfo.nom'] && (
                    <p className="text-red-400 text-sm mt-1">{errors['clientInfo.nom']}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="clientInfo.email"
                    value={formData.clientInfo.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                  {errors['clientInfo.email'] && (
                    <p className="text-red-400 text-sm mt-1">{errors['clientInfo.email']}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="clientInfo.telephone"
                    value={formData.clientInfo.telephone}
                    onChange={handleInputChange}
                    placeholder="06.12.34.56.78"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    required
                  />
                  {errors['clientInfo.telephone'] && (
                    <p className="text-red-400 text-sm mt-1">{errors['clientInfo.telephone']}</p>
                  )}
                </div>
              </div>

              {/* Nombre de joueurs */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de joueurs *
                </label>
                <input
                  type="number"
                  name="clientInfo.nombrePersonnes"
                  value={formData.clientInfo.nombrePersonnes}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  required
                />
                {selectedGame && (
                  <p className="text-gray-400 text-sm mt-1">
                    Limite: {selectedGame.minPlayers}-{selectedGame.maxPlayers} joueurs pour cet escape game
                  </p>
                )}
                {errors['clientInfo.nombrePersonnes'] && (
                  <p className="text-red-400 text-sm mt-1">{errors['clientInfo.nombrePersonnes']}</p>
                )}
              </div>
            </div>

            {/* Récapitulatif prix */}
            {selectedGame && formData.clientInfo.nombrePersonnes > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">💰 Récapitulatif</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {selectedGame.prix}€ × {formData.clientInfo.nombrePersonnes} joueur{formData.clientInfo.nombrePersonnes > 1 ? 's' : ''}
                  </span>
                  <span className="text-white font-semibold">
                    {selectedGame.prix * formData.clientInfo.nombrePersonnes}€
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
              <FuckingButton
                type="FuckingButton"
                variant="secondary"
                color="gray"
                onClick={onClose}
                disabled={loading}
              >
                Annuler
              </FuckingButton>
              
              <FuckingButton
                type="submit"
                variant="primary"
                color="red"
                disabled={loading}
              >
                {loading ? 'En cours...' : (mode === 'create' ? 'Créer Session' : 'Modifier Session')}
              </FuckingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}