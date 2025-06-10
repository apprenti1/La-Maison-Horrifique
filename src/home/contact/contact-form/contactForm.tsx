import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
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
    if (!email) {
      form.setError("email", { type: "manual", message: "Veuillez entrer une adresse e-mail." })
      return
    }
    if (!nom) {
      form.setError("nom", { type: "manual", message: "Veuillez entrer votre nom." })
      return
    }
    if (!sujet) {
      form.setError("sujet", { type: "manual", message: "Veuillez entrer un sujet." })
      return
    }
    if (!message) {
      form.setError("message", { type: "manual", message: "Veuillez entrer un message." })
      return
    }
    // Simulate sending email
    alert(`Email envoyé avec succès !\n\nNom: ${nom}\nEmail: ${email}\nSujet: ${sujet}\nMessage: ${message}`)
    form.reset()
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
            <FormControl>
            <Input
              placeholder="Nom"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blood-red focus:outline-none"
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
            <FormControl>
            <Input
              placeholder="Email"
              {...field}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blood-red focus:outline-none"
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
          <FormControl>
            <Input
            placeholder="Sujet"
            {...field}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blood-red focus:outline-none"
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
          <FormControl>
            <textarea
            rows={4}
            placeholder="Message"
            {...field}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blood-red focus:outline-none resize-none"
            />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
          </FormItem>
        )}
        />
        <Button
        type="submit"
        className="w-full bg-blood-red hover:bg-red-800 py-3 rounded-lg font-semibold transition-colors duration-300 text-gray-800"
        >
        Envoyer le message
        </Button>
      </form>
      </Form>
    </div>
  )
}