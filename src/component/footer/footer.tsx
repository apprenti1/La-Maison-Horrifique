import {Button} from "@/components/ui/button.tsx";
import {Facebook, Instagram, Linkedin, Twitter} from "lucide-react";

export default function footer() {
    return (
        <>
            <footer className="bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blood-red rounded-lg flex items-center justify-center">
                                    <span className="text-lg">🏚️</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">La Maison Horrifique</h3>
                            </div>
                            <p className="text-gray-400 text-sm">
                                L'expérience d'escape game d'horreur la plus terrifiante de Paris.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Nos Sessions</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">La Maison Maudite</p></a>
                                </li>
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">Le Laboratoire</p></a></li>
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">Le Cimetière Hanté</p></a>
                                </li>
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">Le Navire Fantôme</p></a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4"><p className="text-white">Liens Utiles</p></h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">Réservation</p></a></li>
                                <li><a href="#contact" ><p className="text-gray-400 hover:text-white transition-colors">Contact</p></a></li>
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">Mentions Légales</p></a></li>
                                <li><a href="#" ><p className="text-gray-400 hover:text-white transition-colors">CGV</p></a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="ghost"
                                        className="bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300"
                                    >
                                        <Instagram className="w-5 h-5 text-white" />
                                    </Button>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="ghost"
                                        className="bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300"
                                    >
                                        <Twitter className="w-5 h-5 text-white" />
                                    </Button>
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="ghost"
                                        className="bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300"
                                    >
                                        <Facebook className="w-5 h-5 text-white" />
                                    </Button>
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="ghost"
                                        className="bg-gray-800 hover:bg-red-800 p-2 rounded-lg transition-colors duration-300"
                                    >
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <span className="flex justify-center text-sm">
                            © 2024 La Maison Horrifique. Tous droits réservés. |
                            <a href="#" ><p className="text-gray-400 hover:text-white transition-colors">&nbsp; Mentions Légales &nbsp;</p></a> |
                            <a href="#" ><p className="text-gray-400 hover:text-white transition-colors">&nbsp; Politique de Confidentialité</p></a>
                        </span>
                    </div>
                </div>
            </footer>
        </>
    )
}
