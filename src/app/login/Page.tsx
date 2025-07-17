import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { API_URL } from "@/lib/utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Routes } from "@/components/core/Routes"
import { Link } from "@/components/core/Link"
import icon from "@/assets/maison-hantee.png";


const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email
    const password = values.password

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Une erreur est survenue lors de l\'envoi du formulaire')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      form.reset()
      toast.success("Connexion réussie !")
      navigate(Routes.dashboard.toString())
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { message: error.message })
        form.setError("password", { message: error.message })
      } else {
        form.setError("email", { message: 'Une erreur inconnue est survenue' })
        form.setError("password", { message: 'Une erreur inconnue est survenue' })
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
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
