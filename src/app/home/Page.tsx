import Navbar from '@/components/navbar/Navbar'
import Hero from './hero/Hero'
import Sessions from './sessions/Sessions'
import About from './about/About'
import Contact from './contact/Contact'
import Footer from '@/components/footer/Footer'


export default function HomePage() {
  return (
    <>
        <Navbar />
        <Hero />
        <Sessions />
        <About />
        <Contact />
        <Footer />
    </>
  )
}
