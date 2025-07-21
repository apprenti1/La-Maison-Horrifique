import React, {useState} from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';
import {Link} from "@/components/core/Link";
import {Routes as AppRoutes} from "@/components/core/Routes.tsx";
import {useEscapeGames} from '@/hooks/useEscapeGames'
import type {EscapeGame} from "@/mocks/types/mockApi.ts";
import { useNavigate } from "react-router-dom";

type Status = 'Actif' | 'Maintenance' | 'Inactif';

type FormData = {
    name: string;
    description: string;
    level: string;
    duration: string;
    minPlayers: string;
    maxPlayers: string;
    price: string;
    status: Status;
    icon: string;
};

const EscapegamesForm: React.FC = () => {

    const navigate = useNavigate();
    const {createEscapeGame} = useEscapeGames()
    const [form, setForm] = useState<FormData>({
        name: '',
        description: '',
        level: '',
        duration: '',
        minPlayers: '',
        maxPlayers: '',
        price: '',
        status: 'Actif',
        icon: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        function getRandomFromArray<T>(arr: T[]): T {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const minPlayers = form.minPlayers !== undefined ? Number(form.minPlayers) : getRandomInt(1, 4);
        const maxPlayers = form.maxPlayers !== undefined ? Number(form.maxPlayers) : getRandomInt(minPlayers, 10);

        const escapeGameToCreate: Omit<EscapeGame, 'id'> = {
            color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`,
            title: form.name ?? `Escape Game ${getRandomInt(1, 100)}`,
            description: form.description ?? "Description générique de l'escape game.",
            icon: "🎲",
            duration: form.duration ?? `${getRandomInt(30, 120)} minutes`,
            level: form.level ?? getRandomFromArray(['Facile', 'Moyen', 'Difficile']),
            levelColor: getRandomFromArray(['#00FF00', '#FFFF00', '#FF0000']),
            minPlayers,
            maxPlayers,
            prix: Number(form.price) || 0,
            statut: form.status,
            theme: getRandomFromArray(['Horreur', 'Aventure', 'Mystère', 'Science-fiction']),
            note: Number((Math.random() * 5).toFixed(1)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            await createEscapeGame(escapeGameToCreate);
            navigate(AppRoutes.escapeGames.toString());
        } catch (error) {
            console.error('Erreur création escape game:', error);
        }

    };


    return (
        <form
            onSubmit={handleSubmit}
            className="z-50 relative mt-20 max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-white">Créer un Escape Game</h2>

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
                        {value: '🏚️', label: '🏚️ Maison Hantée'},
                        {value: '🧙‍♀️', label: '🧙‍♀️ Laboratoire'},
                        {value: '🪦', label: '🪦 Cimetière'},
                        {value: '🚢', label: '🚢 Navire'},
                        {value: '👻', label: '👻 Fantôme'},
                        {value: '🕸️', label: '🕸️ Araignée'},
                        {value: '💀', label: '💀 Crâne'},
                        {value: '🦇', label: '🦇 Chauve-souris'},
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
                        {value: 'Modéré', label: 'Modéré'},
                        {value: 'Intense', label: 'Intense'},
                        {value: 'Extrême', label: 'Extrême'},
                    ]}
                />
                <SelectInput
                    id="status"
                    label="Statut"
                    value={form.status}
                    onChange={handleChange}
                    required
                    options={[
                        {value: 'Actif', label: 'Actif'},
                        {value: 'Maintenance', label: 'Maintenance'},
                        {value: 'Inactif', label: 'Inactif'},
                    ]}
                />
            </div>

            <div className="flex justify-end space-x-4">
                <Link
                    path={AppRoutes.escapeGames.toString()}
                    text={"Annuler"}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                </Link>
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

export default EscapegamesForm;
