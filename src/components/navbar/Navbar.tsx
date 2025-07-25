import LinkNavbar from "@/components/navbar/Linknavebar";
import icon from "@/assets/maison-hantee.png";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { Link } from "@/components/core/Link";
import { Routes } from "@/lib/utils";

export default function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm shadow-md">
            <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 w-full">
                    {/* Logo & Title */}
                    <Link path={Routes.home.toString()} className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <span className="text-2xl"><img src={icon} alt="Logo" /></span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            La Maison Horrifique
                        </h2>
                    </Link>
                    
                    {/* Theme Toggle */}
                    <ThemeToggle className="ml-4" />

                    {/* Navigation Links */}
                    <LinkNavbar />

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
