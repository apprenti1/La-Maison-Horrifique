import StatsGrid from "@/app/home/about/StatsGrid";

export default function About() {
    return (
        <>
            <section className="py-20 bg-black w-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">À Propos de Nous</h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Depuis 2018, La Maison Horrifique propose des expériences d'escape game uniques dans
                                l'univers de l'horreur.
                                Notre équipe de créateurs passionnés conçoit des scénarios immersifs qui vous plongeront
                                dans vos pires cauchemars.
                            </p>
                            <p className="text-lg text-gray-300 mb-8">
                                Avec plus de 10 000 joueurs terrifiés et satisfaits, nous sommes devenus la référence en
                                matière d'escape games d'horreur.
                                Nos décors authentiques, nos effets spéciaux et nos comédiens professionnels
                                garantissent une expérience inoubliable.
                            </p>
                            <StatsGrid></StatsGrid>
                        </div>
                        <div className="relative">
                            <div
                                className="bg-gradient-to-br from-red-800/20 to-purple-900/20 rounded-lg p-8 backdrop-blur-sm border border-red-800/30">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">👥</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Notre Équipe</h3>
                                    <p className="text-gray-300">
                                        Scénaristes, décorateurs, comédiens et techniciens travaillent ensemble pour
                                        créer
                                        des expériences d'horreur authentiques et mémorables.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
