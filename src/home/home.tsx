import Navbar from '../component/navbar/navbar'
import Hero from './hero/hero'
import Sessions from './sessions/sessions'
import About from './about/about'
import Contact from './contact/contact'
import Footer from '../component/footer/footer'

import Navbar from "../component/navbar/navbar.tsx";

export default function Home() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>La Maison Horrifique - Escape Games d'Horreur</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-ghostly-white font-inter overflow-x-hidden">
        <Navbar />
        <Hero />
        <Sessions />
        <About />
        <Contact />
        <Footer />

      </body>
    </html>
  )
}

