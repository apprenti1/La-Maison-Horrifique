
export default function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Title */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blood-red rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🏚️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            La Maison Horrifique
                        </h2>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 text-ghostly-white text-sm sm:text-base">
                        <a href="#home" ><p className="text-white hover:text-white transition duration-300" >Accueil</p></a>
                        <a href="#sessions" ><p className="text-white hover:text-white transition duration-300">Sessions</p></a>
                        <a href="#reservation" ><p className="text-white hover:text-white transition duration-300">Réservation</p></a>
                        <a href="#contact" ><p className="text-white hover:text-white transition duration-300">Contact</p></a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-ghostly-white focus:outline-none"
                        aria-label="Ouvrir le menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}
