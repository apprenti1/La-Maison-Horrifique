import { type ReactElement } from "react"
import FloatingHorrorElements from '../../components/FloatingHorrorElements.tsx'
import BackgroundEffects from "@/components/BackgroundEffects.tsx";
import NavBarEscapeGames from "@/components/navbar/NavBarEscapeGames.tsx";


export default function EscapeGamesPage(): ReactElement {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Background Effects */}
            <BackgroundEffects />

            {/* Floating Horror Elements */}
            <FloatingHorrorElements />

            {/* Navbar */}
            <NavBarEscapeGames />




        </div>
    )
}
