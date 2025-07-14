import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { API_URL } from "@/lib/utils"

const formSchema = z.object({
  nom: z.string()
    .min(1, { message: "Le nom est requis" })
    .max(50, { message: "Le nom ne doit pas dépasser 50 caractères" })
    .regex(/^[A-Za-zÀ-ÿ- \s]+$/, { message: "Le nom ne doit contenir que [ A-Z | a-z | - | ' ' ]" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  sujet: z.string().min(1, { message: "Le sujet est requis" }),
  message: z.string().min(1, { message: "Le message est requis" }),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      sujet: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email
    const nom = values.nom
    const sujet = values.sujet
    const message = values.message

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, email, sujet, message }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Une erreur est survenue lors de l\'envoi du message')
      }

      const data = await response.json()
      toast.success(data.message || 'Votre message a bien été envoyé')
      form.reset()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Une erreur est survenue')
      } else {
        toast.error('Une erreur inconnue est survenue')
      }
    }
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
      <Form {...form}>
      <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      >
      <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="nom"
        render={({ field }) => (
        <FormItem>
        <label htmlFor="nom" className="block text-white mb-1 font-medium">Nom</label>
        <FormControl>
        <Input
          id="nom"
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
      </div>
      <FormField
      control={form.control}
      name="sujet"
      render={({ field }) => (
        <FormItem>
        <label htmlFor="sujet" className="block text-white mb-1 font-medium">Sujet</label>
        <FormControl>
        <Input
        id="sujet"
        placeholder="Sujet"
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
      name="message"
      render={({ field }) => (
        <FormItem>
        <label htmlFor="message" className="block text-white mb-1 font-medium">Message</label>
        <FormControl>
        <textarea
        id="message"
        rows={4}
        placeholder="Message"
        {...field}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-800 focus:outline-none resize-none"
        />
        </FormControl>
        <FormMessage className="text-destructive text-sm mt-1" />
        </FormItem>
      )}
      />
      <button type="submit" className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
        Envoyer le message
      </button>
      </form>
      </Form>
    </div>
  )
}
