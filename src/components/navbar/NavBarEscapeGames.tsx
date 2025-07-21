import { Link } from "@/components/core/Link";
import {Routes as AppRoutes} from "@/components/core/Routes.tsx"
export default function NavBarEscapeGames() {


    return (
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm shadow-md">
            <nav className="relative z-50 bg-black/90 backdrop-blur-sm border-b border-red-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <Link path="/dashboard"
                               className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15 19l-7-7 7-7"></path>
                                </svg>
                                <span>Retour</span>
                            </Link>
                            <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🏚️</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Gestion des Escape Games</h1>
                                <p className="text-xs text-gray-400">Administration - La Maison Horrifique</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link path={AppRoutes.escapeGameCreate.toString()}
                                    className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Nouvel Escape Game</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
