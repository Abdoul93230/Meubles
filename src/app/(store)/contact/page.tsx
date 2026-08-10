import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
      <p className="text-[var(--muted)] mb-10">Notre équipe est disponible pour répondre à toutes vos questions.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
            {[
              {
                icon: MapPin,
                title: 'Adresse',
                content: 'Quartier Plateau, Charles de Gaulle\nNiamey, Niger',
              },
              {
                icon: Phone,
                title: 'Téléphone',
                content: '+227 91 41 41 65',
                href: 'tel:+22791414165',
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@istanbulmeubles.ne',
                href: 'mailto:contact@istanbulmeubles.ne',
              },
              {
                icon: Clock,
                title: 'Horaires',
                content: 'Lun – Sam : 8h00 – 19h00\nDimanche : 10h00 – 16h00',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#fdf4ec] rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{item.title}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-[var(--primary)] hover:underline">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--muted)] whitespace-pre-line">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/22791414165"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={24} />
            <div>
              <div className="font-bold">Discutez sur WhatsApp</div>
              <div className="text-sm text-white/80">Réponse rapide garantie</div>
            </div>
          </a>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
          <h2 className="font-bold text-lg mb-5">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input
                type="tel"
                placeholder="+227 XX XX XX XX"
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sujet</label>
              <input
                type="text"
                placeholder="Demande de devis, disponibilité..."
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Décrivez votre besoin..."
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
