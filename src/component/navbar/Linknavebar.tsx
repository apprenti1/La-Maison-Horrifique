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
                <a key={item.id} href={`#${item.id}`}>
                    <p className="text-white hover:text-gray-400 transition duration-100">
                        {item.label}
                    </p>
                </a>
            ))}
        </div>
    );
};

