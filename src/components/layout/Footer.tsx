import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--cream)' }} className="mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Logo size="sm" variant="dark" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Meubles, décoration et pièces artisanales pour les maisons à travers le Niger et la région.
            </p>
            {/* Social icons SVG */}
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[var(--gold)] hover:text-white transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[var(--gold)] hover:text-white transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-600"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[var(--gold)] hover:text-white transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-600"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="font-bold text-sm text-[var(--dark)] mb-4">Boutique</h3>
            <ul className="space-y-2.5">
              {['Salon', 'Chambre', 'Salle à Manger', 'Bureau à Domicile', 'Extérieur', 'Offres Spéciales'].map((item) => (
                <li key={item}>
                  <Link href="/boutique" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service client */}
          <div>
            <h3 className="font-bold text-sm text-[var(--dark)] mb-4">Service Client</h3>
            <ul className="space-y-2.5">
              {["Centre d'Aide", 'Info Livraison', 'Retours & Échanges', 'Suivre Commande', 'Nous Contacter', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-bold text-sm text-[var(--dark)] mb-4">Nous Contacter</h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={15} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                Quartier Plateau, Charles de Gaulle, Niamey, Niger
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={15} className="text-[var(--gold)]" />
                contact@istanbulmeubles.ne
              </li>
            </ul>
            <p className="text-sm font-medium text-[var(--dark)] mb-2">Abonnez-vous à notre newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--gold)] bg-white"
              />
              <button className="bg-[var(--gold)] text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-[var(--gold-hover)] transition-colors whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t border-[var(--cream-dark)] mt-10 pt-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Méthodes de paiement acceptées</p>
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            {['Orange Money', 'Airtel Money', 'Cash'].map((m) => (
              <span key={m} className="bg-white border border-[var(--border)] px-4 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm">
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Istanbul Meubles SARLU. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Expédition & Livraison', 'Retours & Remboursements', 'Sécurité des Paiements', 'Politique de Confidentialité', 'Conditions Générales'].map((l) => (
                <Link key={l} href="#" className="hover:text-[var(--gold)] transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
