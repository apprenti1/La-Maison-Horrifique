import { Link } from "@/components/core/Link"
import { API_URL, Routes } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import z from "zod"
import icon from "@/assets/maison-hantee.png";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  surname: z.string().min(1, { message: "Le prénom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  telephone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Numéro de téléphone invalide" }),
  poste: z.enum(['Game Master', 'Accueil', 'Manager', 'Technicien'], { message: "Poste invalide" }),
  statut: z.enum(['Actif', 'Inactif', 'Congé', 'Formation'], { message: "Statut invalide" }),
  dateEmbauche: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date d'embauche invalide (format attendu : YYYY-MM-DD)" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export default function CreateEmployeePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      telephone: "",
      poste: "Game Master",
      statut: "Actif",
      dateEmbauche: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Une erreur est survenue lors de l\'envoi du formulaire')
      }

      await response.json()

      form.reset()
      toast.success("Employé créé avec succès !")
      navigate(Routes.dashboard.toString())
    } catch (error) {
      if (error instanceof Error) {
        form.setError("name", { message: error.message })
        form.setError("surname", { message: error.message })
        form.setError("email", { message: error.message })
        form.setError("password", { message: error.message })
        form.setError("confirmPassword", { message: error.message })
        form.setError("telephone", { message: error.message })
        form.setError("poste", { message: error.message })
        form.setError("statut", { message: error.message })
        form.setError("dateEmbauche", { message: error.message })
      } else {
        form.setError("email", { message: 'Une erreur inconnue est survenue' })
        form.setError("password", { message: 'Une erreur inconnue est survenue' })
        form.setError("confirmPassword", { message: 'Une erreur inconnue est survenue' })
      }
    }
  }

  return (
    <>
    {/* <!-- Background --> */}
    <div className="fixed inset-0 horror-gradient"></div>
    <div className="fixed inset-0 fog-effect"></div>
    
    {/* <!-- Floating Horror Elements --> */}
    <div className="fixed top-20 left-10 text-4xl opacity-20 floating" style={{ animationDelay: "0.5s" }}>👻</div>
    <div className="fixed top-40 right-20 text-3xl opacity-20 floating" style={{ animationDelay: "1s" }}>🕸️</div>
    <div className="fixed bottom-40 left-20 text-5xl opacity-20 floating" style={{ animationDelay: "1.5s" }}>💀</div>
    <div className="fixed top-60 left-1/2 text-2xl opacity-15 floating" style={{ animationDelay: "2s" }}>🦇</div>
    <div className="fixed bottom-20 right-10 text-3xl opacity-20 floating" style={{ animationDelay: "2.5s" }}>⚰️</div>

    {/* <!-- Navigation Back Button --> */}
    <div className="absolute z-50 p-6 pb-0">
        <Link path="../" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Retour au site</span>
        </Link>
    </div>
    <div className="min-h-screen z-50 flex flex-col items-center justify-center">
      {/* Logo and Title */}
      <div className="text-center z-50 mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-800 rounded-full mb-4 pulse-red">
          <span className="text-3xl p-4">
          <img src={icon} alt="Logo" />
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 text-shadow-horror">ADMINISTRATION</h1>
        <p className="text-gray-300">La Maison Horrifique</p>
      </div>

      <div className="admin-card rounded-2xl p-8 glow-red">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Connexion</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Nom
          </label>
          <FormControl>
            <Input
              id="name"
              placeholder="Nom"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-300 mb-2">
            Prénom
          </label>
          <FormControl>
            <Input
              id="surname"
              placeholder="Prénom"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <FormControl>
            <Input
              id="email"
              placeholder="Email"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-2">
            Téléphone
          </label>
          <FormControl>
            <Input
              id="telephone"
              placeholder="Téléphone"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Mot de passe
          </label>
          <FormControl>
            <div className="relative">
              <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            {...field}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
              />
              <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
              >
            {showPassword ? "Cacher" : "Voir"}
              </button>
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirmer le mot de passe
          </label>
          <FormControl>
            <div className="relative">
              <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            {...field}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
              />
              <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
              >
            {showConfirmPassword ? "Cacher" : "Voir"}
              </button>
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="poste"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="poste" className="block text-sm font-medium text-gray-300 mb-2">
            Poste
          </label>
          <FormControl>
            <select
              id="poste"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-800 focus:outline-none"
            >
              <option value="Game Master">Game Master</option>
              <option value="Accueil">Accueil</option>
              <option value="Manager">Manager</option>
              <option value="Technicien">Technicien</option>
            </select>
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statut"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="statut" className="block text-sm font-medium text-gray-300 mb-2">
            Statut
          </label>
          <FormControl>
            <select
              id="statut"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-800 focus:outline-none"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="Congé">Congé</option>
              <option value="Formation">Formation</option>
            </select>
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="dateEmbauche"
          render={({ field }) => (
            <FormItem>
          <label htmlFor="dateEmbauche" className="block text-sm font-medium text-gray-300 mb-2">
            Date d'embauche
          </label>
          <FormControl>
            <Input
              id="dateEmbauche"
              type="date"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />
          </div>
          <button type="submit" className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
        Se connecter
          </button>
        </form>
      </Form>
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-400">
          Accès réservé aux administrateurs autorisés<br/>
          <span className="text-red-400">La Maison Horrifique</span> © 2024
        </p>
      </div>
      </div>
    </div>
    </>
  )
}
