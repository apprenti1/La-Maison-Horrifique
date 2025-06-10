import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FooterBlock } from "./FooterBlock";
import { LinkIcon, Link } from "../core/Link";

export const block1 = [
  {
    title: "La Maison Maudite",
    path: "#",
  },
  {
    title: "Le Laboratoire",
    path: "#",
  },
  {
    title: "Le Cimetière Hanté",
    path: "#",
  },
  {
    title: "Le Navire Fantôme",
    path: "#",
  },
]

const block2 = [
  {
    title: "Réservation",
    path: "#",
  },
  {
    title: "Contact",
    path: "#contact",
    },
    {
    title: "Mentions Légales",
    path: "#",
  },
    {
        title: "CGV",
        path: "#",
    },
]

const listIcon = [
  {
    href: "https://www.instagram.com",
    icon: (<FaInstagram className="w-5 h-5 text-white" />)
  },{
    href: "https://twitter.com",
    icon: (<FaTwitter className="w-5 h-5 text-white" />)
  },{
    href: "https://www.facebook.com",
    icon: (<FaFacebook className="w-5 h-5 text-white" />)
  },
    {
    href: "https://www.linkedin.com",
    icon: (<FaLinkedin className="w-5 h-5 text-white" />)
  }
]

export default function footer() {
    return (
        <>
            <footer className="bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-15 h-15 rounded-lg flex items-center justify-center">
                                    <span className="text-lg"><img src={icon} alt="Logo" /></span>
                                </div>
                                <h3 className="text-xl font-bold text-white">La Maison Horrifique</h3>
                            </div>
                            <p className="text-gray-400 text-sm">
                                L'expérience d'escape game d'horreur la plus terrifiante de Paris.
                            </p>
                        </div>

                        <FooterBlock block={block1}/>
                        <FooterBlock block={block2} />

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
                            <div className="flex flex-wrap justify-start gap-2 w-full overflow-x-auto box-border">
                                {listIcon.map((item) => (
                                    <LinkIcon href={item.href} icon={item.icon} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <span className="flex justify-center text-sm">
                            © 2024 La Maison Horrifique. Tous droits réservés. |
                            <Link path="#" text=" Mentions Légales " /> |
                            <Link path="#" text=" Politique de Confidentialité" />
                        </span>
                    </div>
                </div>
            </footer>
        </>
    )
}
