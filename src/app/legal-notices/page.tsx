import Navbar from "@/components/navbar/Navbar";

export default function LegalNoticesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <LegalNoticesContent />
      </main>
    </>
  );
}

function LegalNoticesContent() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 text-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 border-b-2 border-gray-300 pb-2 text-gray-800">
        Mentions Légales
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Éditeur du site</h2>
        <p className="leading-relaxed">
          Nom du site : <span className="font-medium text-gray-800">La Maison Horrifique</span><br />
          Responsable de la publication : <span className="font-medium text-gray-800">John Doe</span><br />
          Email : <a href="mailto:contact@lamaisonhorrifique.fr" className="text-blue-500 hover:underline">contact@lamaisonhorrifique.fr</a><br />
          Téléphone : <span className="font-medium text-gray-800">06 00 00 00 00</span><br />
          Adresse : <span className="font-medium text-gray-800">123 Rue de l’Horreur, 75000 Paris, France</span>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Hébergement</h2>
        <p className="leading-relaxed">
          Hébergeur : <span className="font-medium text-gray-800">FauxHebergeur SAS</span><br />
          Adresse : <span className="font-medium text-gray-800">456 Avenue Fantôme, 75001 Paris, France</span><br />
          Téléphone : <span className="font-medium text-gray-800">01 23 45 67 89</span><br />
          Site : <a href="https://www.fauxhebergeur.fr" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">www.fauxhebergeur.fr</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Collecte des données personnelles</h2>
        <p className="leading-relaxed">
          Les données suivantes peuvent être collectées : nom, prénom, adresse email et numéro de téléphone. Ces informations sont utilisées uniquement dans le cadre du fonctionnement du site et ne sont jamais transmises à des tiers sans consentement préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Propriété intellectuelle</h2>
        <p className="leading-relaxed">
          Tous les contenus présents sur La Maison Horrifique (textes, images, logos, etc.) sont protégés par le droit de la propriété intellectuelle. Toute reproduction est interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact</h2>
        <p className="leading-relaxed">
          Pour toute question, vous pouvez nous écrire à l’adresse suivante : <a href="mailto:contact@lamaisonhorrifique.fr" className="text-blue-500 hover:underline">contact@lamaisonhorrifique.fr</a>.
        </p>
      </section>
    </div>
  )
}
