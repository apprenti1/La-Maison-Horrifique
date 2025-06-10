import Informations from "./informations/Informations";
import ContactForm from "./contact-form/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nous Contacter
          </h2>
          <p className="text-xl text-gray-300">
            Prêt à vivre l'expérience la plus terrifiante de votre vie ?
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0">
          <div className="md:w-1/2">
            <Informations />
          </div>
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}