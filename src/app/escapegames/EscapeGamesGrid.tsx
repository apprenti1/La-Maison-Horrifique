import { useEffect, useState } from "react";
import type {ReactElement} from "react";
import type {EscapeGame} from "@/mocks/types/mockApi.ts";
import EscapeGameCard from "@/app/escapegames/EscapeGameCard.tsx";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mt-20">
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
    ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
