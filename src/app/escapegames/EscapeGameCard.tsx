import type {ReactElement} from "react";
import type { EscapeGame } from "@/mocks/types/mockApi";

type EscapeGameCardProps = {
    game: EscapeGame;
    emoji: string;
    status: "Actif" | "Maintenance" | "Inactif";
    title: string;
    description: string;
    duration: string;
    players: string;
    level: string;
    price: number;
    rating: number;
    ratingStars: string;
    sessionsThisMonth: number;
    onEdit?: () => void;
    onViewStats?: () => void;
    onToggleStatus?: () => void;
};

export default function EscapeGameCard({
                                           game,
                                           emoji,
                                           status,
                                           title,
                                           description,
                                           duration,
                                           players,
                                           level,
                                           price,
                                           rating,
                                           ratingStars,
                                           sessionsThisMonth,
                                           onEdit,
                                           onViewStats,
                                           onToggleStatus,
                                       }: EscapeGameCardProps): ReactElement {
    return (
        <div className="game-card rounded-xl overflow-hidden bg-zinc-900 z-50">
            <div className="relative h-48 bg-gradient-to-br from-blue-900/80 to-black flex items-center justify-center">
                <span className="text-6xl">{emoji}</span>
                <div className="absolute top-4 right-4">
          <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === "Actif" ? "bg-green-600" : "bg-red-600"
              }`}
          >
            {status}
          </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{description}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01"
                            />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                        <span className="text-gray-400">Durée:</span>
                        <span className="text-white ml-2">{duration}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Joueurs:</span>
                        <span className="text-white ml-2">{players}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Difficulté:</span>
                        <span className="bg-orange-600 px-2 py-1 rounded text-xs ml-2">
              {level}
            </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Prix:</span>
                        <span className="text-white ml-2">{price}€</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-gray-400 text-sm">Note moyenne:</span>
                        <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">{ratingStars}</span>
                            <span className="text-white ml-2">{rating}/5</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-semibold">{sessionsThisMonth}</p>
                        <p className="text-gray-400 text-sm">Sessions ce mois</p>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={onViewStats}
                        className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                        Statistiques
                    </button>
                    <button
                        onClick={onToggleStatus}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                        🔧
                    </button>
                </div>
            </div>
        </div>
    );
}
