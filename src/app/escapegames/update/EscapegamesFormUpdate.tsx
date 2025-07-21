import React, { useState, useEffect } from 'react';
import { Link } from "@/components/core/Link";
import { Routes as AppRoutes } from "@/components/core/Routes.tsx";
import { useEscapeGames } from '@/hooks/useEscapeGames';
import type { EscapeGame } from "@/mocks/types/mockApi";
import { useNavigate } from "react-router-dom";
import TextInput from "@/app/escapegames/create/TextInput.tsx";
import SelectInput from "@/app/escapegames/create/SelectInput.tsx";
import TextArea from "@/app/escapegames/create/TextArea.tsx";
import NumberInput from "@/app/escapegames/create/NumberInput.tsx";

type Props = {
    escapeGame: EscapeGame;
};

const EscapegamesFormUpdate: React.FC<Props> = ({ escapeGame }) => {
    const navigate = useNavigate();
    const { updateEscapeGame } = useEscapeGames();

    const [form, setForm] = useState({
        name: '',
        description: '',
        level: '',
        duration: '',
        minPlayers: '',
        maxPlayers: '',
        price: '',
        status: 'Actif' as 'Actif' | 'Maintenance' | 'Inactif',
        icon: '',
    });

    useEffect(() => {
        if (escapeGame) {
            setForm({
                name: escapeGame.title,
                description: escapeGame.description,
                level: escapeGame.level,
                duration: escapeGame.duration,
                minPlayers: escapeGame.minPlayers.toString(),
                maxPlayers: escapeGame.maxPlayers.toString(),
                price: escapeGame.prix.toString(),
                status: escapeGame.statut,
                icon: escapeGame.icon,
            });
        }
    }, [escapeGame]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedEscapeGame: EscapeGame = {
            ...escapeGame,
            title: form.name,
            description: form.description,
            level: form.level,
            duration: form.duration,
            minPlayers: Number(form.minPlayers),
            maxPlayers: Number(form.maxPlayers),
            prix: Number(form.price),
            statut: form.status,
            icon: form.icon,
            updatedAt: new Date().toISOString(),
        };

        try {
            await updateEscapeGame(Number(updatedEscapeGame.id),updatedEscapeGame);
            navigate(AppRoutes.escapeGames.toString());
        } catch (error) {
            console.error('Erreur mise à jour escape game:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="z-50 relative mt-20 max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-white">Modifier un Escape Game</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                    id="name"
                    label="Nom"
                    placeholder="Ex: La Maison Maudite"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <SelectInput
                    id="icon"
                    label="Icône"
                    value={form.icon}
                    onChange={handleChange}
                    required
                    options={[
                        { value: '🏚️', label: '🏚️ Maison Hantée' },
                        { value: '🧙‍♀️', label: '🧙‍♀️ Laboratoire' },
                        { value: '🪦', label: '🪦 Cimetière' },
                        { value: '🚢', label: '🚢 Navire' },
                        { value: '👻', label: '👻 Fantôme' },
                        { value: '🕸️', label: '🕸️ Araignée' },
                        { value: '💀', label: '💀 Crâne' },
                        { value: '🦇', label: '🦇 Chauve-souris' },
                    ]}
                />
            </div>

            <TextArea
                id="description"
                label="Description"
                placeholder="Description terrifiante de votre escape game..."
                value={form.description}
                onChange={handleChange}
                required
            />

            <div className="grid md:grid-cols-4 gap-4">
                <NumberInput
                    id="duration"
                    label="Durée (min)"
                    placeholder="60"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    min={1}
                />
                <NumberInput
                    id="minPlayers"
                    label="Joueurs Min"
                    placeholder="2"
                    value={form.minPlayers}
                    onChange={handleChange}
                    required
                    min={1}
                />
                <NumberInput
                    id="maxPlayers"
                    label="Joueurs Max"
                    placeholder="6"
                    value={form.maxPlayers}
                    onChange={handleChange}
                    required
                    min={1}
                />
                <NumberInput
                    id="price"
                    label="Prix (€/pers)"
                    placeholder="35"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min={0}
                    step={0.01}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <SelectInput
                    id="level"
                    label="Difficulté"
                    value={form.level}
                    onChange={handleChange}
                    required
                    options={[
                        { value: 'Modéré', label: 'Modéré' },
                        { value: 'Intense', label: 'Intense' },
                        { value: 'Extrême', label: 'Extrême' },
                    ]}
                />
                <SelectInput
                    id="status"
                    label="Statut"
                    value={form.status}
                    onChange={handleChange}
                    required
                    options={[
                        { value: 'Actif', label: 'Actif' },
                        { value: 'Maintenance', label: 'Maintenance' },
                        { value: 'Inactif', label: 'Inactif' },
                    ]}
                />
            </div>

            <div className="flex justify-end space-x-4">
                <Link
                    path={AppRoutes.escapeGames.toString()}
                    text="Annuler"
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                />
                <button
                    type="submit"
                    className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                    Sauvegarder
                </button>
            </div>
        </form>
    );
};

export default EscapegamesFormUpdate;
