import { useEffect, useState } from "react";
import type {ReactElement} from "react";
import type {EscapeGame} from "@/mocks/types/mockApi.ts";
import EscapeGameCard from "@/app/escapegames/EscapeGameCard.tsx";
import {Link} from "@/components/core/Link";
import { Routes as AppRoutes } from "@/lib/utils";
import {toast} from "react-toastify";


export default function EscapeGamesGrid(): ReactElement {
    const [games, setGames] = useState<EscapeGame[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch("/api/escape-games");
                const data = await res.json();
                setGames(data);
            } catch (err) {
                toast.error("Erreur lors du chargement des jeux. Veuillez réessayer plus tard.");
                console.error("Erreur lors du chargement des jeux :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <p className="text-white text-center mt-10">Chargement...</p>;
    }

    return (
        <div className="m-3 mt-20 relative z-50 display flex flex-col items-center justify-center">
        <Link path={AppRoutes.escapeGameCreate.toString()}
                className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2 w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Nouvel Escape Game</span>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {games.map((game) => (
                <EscapeGameCard
                    game={game}
                    key={game.id}
                    emoji={game.icon}
                    status={game.statut}
                    title={game.title}
                    description={game.description}
                    duration={game.duration}
                    players={game.minPlayers + " - " + game.maxPlayers + " joueurs"}
                    level={game.level}
                    price={game.prix}
                    rating={game.note}
                    ratingStars={"⭐".repeat(Math.round(game.note))}
                    sessionsThisMonth={Math.floor(Math.random() * 301)}
                    onEdit={() => console.log("Modifier", game.id)}
                    onViewStats={() => console.log("Statistiques", game.id)}
                    onToggleStatus={() => console.log("Toggle statut", game.id)}
                />
            ))}
        </div>
        </div>
    ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
