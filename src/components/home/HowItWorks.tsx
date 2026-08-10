import {
  LayoutGrid,
  PhoneCall,
  Truck,
  MessageCircle,
  CheckCircle,
  MapPin,
  Star,
  Smartphone,
  Wrench,
  ShieldCheck,
  Clock,
} from 'lucide-react';

const STEPS = [
  {
    icon: LayoutGrid,
    step: '01',
    title: 'Parcourez notre catalogue',
    desc: 'Explorez nos collections en ligne ou visitez directement notre showroom au Quartier Plateau à Niamey — plus de 100 modèles exposés.',
  },
  {
    icon: PhoneCall,
    step: '02',
    title: 'Commandez en ligne ou par téléphone',
    desc: 'Passez votre commande sur le site ou appelez le +227 91 41 41 65. Paiement par Orange Money, Airtel Money ou espèces au showroom.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Livraison & installation à domicile',
    desc: 'Nous livrons à Niamey et dans la région. Notre équipe monte et installe vos meubles directement chez vous.',
  },
  {
    icon: MessageCircle,
    step: '04',
    title: 'Service après-vente réactif',
    desc: 'Un problème après réception ? Notre équipe est joignable 6 jours sur 7 pour vous accompagner et trouver une solution rapide.',
  },
];

const TRUST = [
  'Showroom physique à Niamey',
  'Meubles de qualité garantis',
  'Paiement Orange Money & Airtel Money',
  'Livraison + installation incluses',
  'Service client 6j/7',
];

const BADGES = [
  {
    icon: MapPin,
    label: 'Showroom à Niamey',
    sub: 'Quartier Plateau, Charles de Gaulle',
  },
  {
    icon: Star,
    label: 'Qualité garantie',
    sub: 'Meubles sélectionnés avec soin',
  },
  {
    icon: Smartphone,
    label: 'Mobile Money',
    sub: 'Orange Money & Airtel Money',
  },
  {
    icon: Truck,
    label: 'Livraison Niamey',
    sub: 'Rapide dans toute la ville',
  },
  {
    icon: Wrench,
    label: 'Installation offerte',
    sub: 'Montage et mise en place inclus',
  },
  {
    icon: Clock,
    label: 'Ouvert Lun – Sam',
    sub: '8h00 – 19h00 sans interruption',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[var(--surface)] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Title ── */}
        <h2 className="text-2xl font-bold text-center text-[var(--dark)] mb-2">
          Comment fonctionne Istanbul Meubles
        </h2>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
          De la première visite à l'installation chez vous — un parcours simple, rapide et rassurant.
        </p>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-[var(--gold)] opacity-20 z-0" />

          {STEPS.map((step) => (
            <div key={step.step} className="text-center relative z-10">
              {/* Step number + icon */}
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div
                  className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-white"
                  style={{ borderColor: 'var(--gold)' }}
                >
                  <step.icon size={22} className="text-[var(--gold)]" />
                </div>
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ background: 'var(--gold)' }}
                >
                  {step.step}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[var(--dark)] mb-2 leading-snug">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Trust bar ── */}
        <div className="border-t border-b border-[var(--border)] py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--gold)' }}>
              <CheckCircle size={13} />
              {t}
            </span>
          ))}
        </div>

        {/* ── Why trust us ── */}
        <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
          Pourquoi nous faire confiance
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="text-center p-3 rounded-xl border border-transparent hover:border-[var(--gold-pale)] hover:bg-[var(--gold-pale)] transition-all duration-200"
            >
              <div
                className="w-11 h-11 mx-auto mb-2 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gold-pale)', border: '1.5px solid var(--gold)' }}
              >
                <b.icon size={18} className="text-[var(--gold)]" />
              </div>
              <p className="text-xs font-semibold text-[var(--dark)] leading-tight">{b.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{b.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
