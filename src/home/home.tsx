import Navbar from '../component/navbar/navbar'
import Hero from './hero/hero'
import Sessions from './sessions/sessions'
import About from './about/about'
import Contact from './contact/contact'
import Footer from '../component/footer/footer'


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
