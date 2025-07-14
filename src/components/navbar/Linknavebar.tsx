import { Link } from "@/components/core/Link";

const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'reservation', label: 'Réservation' },
    { id: 'contact', label: 'Contact' },
];
export default function LinkNavbar() {
    return (
        <div className="hidden md:flex space-x-6 text-ghostly-white text-sm sm:text-base">
            {navItems.map((item) => (
                <Link key={item.id} path={`#${item.id}`} text={item.label} />
            ))}
        </div>
    );
};

