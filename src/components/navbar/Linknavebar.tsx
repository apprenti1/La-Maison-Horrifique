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
            <Link path={isAuth ? Routes.logout.toString() : Routes.login.toString()} text={isAuth ? "Se déconnecter" : "Se connecter"} />
        </div>
    );
};

