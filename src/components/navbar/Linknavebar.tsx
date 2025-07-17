import { Link } from "@/components/core/Link";
import { Routes } from "@/components/core/Routes";
import { isAuthenticated } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'reservation', label: 'Réservation' },
    { id: 'contact', label: 'Contact' },
];
export default function LinkNavbar() {
    const [isAuth, setAuth] = useState(false);
    useEffect(() => {
        (async () => {
            const result = await isAuthenticated();
            setAuth(result);
        })();
    }, []);

    return (
        <div className="hidden md:flex space-x-6 text-ghostly-white text-sm sm:text-base">
            {navItems.map((item) => (
                <Link key={item.id} path={`#${item.id}`} text={item.label} />
            ))}
            <div className="flex items-center space-x-4">                
                <Link path={isAuth ? Routes.logout.toString() : Routes.login.toString()} className="flex items-center space-x-2 bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span className="hidden md:inline">{isAuth ? "Déconnexion" : "Connexion"}</span>
                </Link>
            </div>
        </div>
    );
};

