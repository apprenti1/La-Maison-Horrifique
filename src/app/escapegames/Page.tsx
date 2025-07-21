import { type ReactElement } from "react"
import FloatingHorrorElements from '../../components/FloatingHorrorElements.tsx'
import BackgroundEffects from "@/components/BackgroundEffects.tsx";
import Navbar from "@/components/navbar/Navbar.tsx";
import EscapeGamesGrid from "@/app/escapegames/EscapeGamesGrid.tsx";


export default function EscapeGamesPage(): ReactElement {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Background Effects */}
            <BackgroundEffects />

            {/* Floating Horror Elements */}
            <FloatingHorrorElements />

            {/* Navbar */}
            <Navbar />

            <EscapeGamesGrid></EscapeGamesGrid>


        </div>
    )
}
