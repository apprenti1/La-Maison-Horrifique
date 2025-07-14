import { Link } from "@/components/core/Link";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center horror-gradient">
        <div className="absolute inset-0 fog-effect"></div>
        <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl md:text-8xl font-gothic text-white mb-6 text-shadow-horror floating">
                LA MAISON HORRIFIQUE
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Plongez dans l'univers terrifiant de nos escape games immersifs. 
                Frissons garantis dans une atmosphère d'épouvante authentique.
            </p>
            <button className="bg-red-900 hover:bg-red-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 pulse-red">
                <Link path="#sessions" text="Découvrir nos sessions"/>
            </button>
        </div>
        
        {/* <!-- Floating Elements --> */}
        <div className="absolute top-20 left-10 text-4xl opacity-30 floating" style={{ animationDelay: "0.5s" }}>👻</div>
        <div className="absolute top-40 right-20 text-3xl opacity-30 floating" style={{ animationDelay: "1s" }}>🕸️</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-30 floating" style={{ animationDelay: "1.5s" }}>💀</div>
    </section>
  )
}
