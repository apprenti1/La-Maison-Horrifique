import Navbar from '../component/navbar/Navbar'
import Hero from './hero/Hero'
import Sessions from './sessions/Sessions'
import About from './about/About'
import Contact from './contact/Contact'
import Footer from '../component/footer/Footer'


export default function Home() {
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
