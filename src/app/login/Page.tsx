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
      navigate(Routes.home.toString())
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
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
                  <label htmlFor="email" className="block text-white mb-1 font-medium">Email</label>
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
                  <label htmlFor="password" className="block text-white mb-1 font-medium">Mot de passe</label>
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
      </div>
    </div>
  )
}
