import type {ReactElement} from "react";
import BackgroundEffects from "@/components/BackgroundEffects.tsx";
import Navbar from "@/components/navbar/Navbar.tsx"
import EscapegamesForm from "@/app/escapegames/create/escapegames-form.tsx";

export default function EscapeGamesCreatePage(): ReactElement {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Background Effects */}
            <BackgroundEffects/>

            {/* Navbar */}
            <Navbar/>

            <EscapegamesForm/>


        </div>
    )
}
