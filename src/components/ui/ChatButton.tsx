'use client';

import { useState } from 'react';
import { X, MessageCircle, Mail, Phone, HelpCircle, Shield } from 'lucide-react';

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="fixed right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            style={{ bottom: 'calc(60px + 12px + 52px + 8px)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-4 pb-3" style={{ background: 'var(--gold-pale)' }}>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[var(--gold)]" />
                <span className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase">
                  Chat en direct indisponible
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-base text-[var(--dark)] mb-1">Parlez à Istanbul Meubles</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Le chat en direct est indisponible pour le moment. Utilisez le centre d'aide, l'email ou le téléphone et nous vous aiderons rapidement.
              </p>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-semibold text-sm mb-3 hover:opacity-90 transition-opacity"
                style={{ background: 'var(--gold)' }}
              >
                <MessageCircle size={18} />
                <div className="text-left">
                  <div className="font-bold text-sm">Démarrer le chat</div>
                  <div className="text-xs text-white/80 font-normal">Ouvrir le centre d'aide</div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <a
                  href="mailto:contact@istanbulmeubles.ne"
                  className="flex flex-col items-start gap-1 p-3 border border-gray-100 rounded-xl hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] transition-all"
                >
                  <Mail size={16} className="text-[var(--gold)]" />
                  <span className="text-xs font-semibold text-[var(--dark)]">Support par email</span>
                  <span className="text-[10px] text-gray-400">contact@istanbulmeubles.ne</span>
                </a>
                <a
                  href="tel:+22791414165"
                  className="flex flex-col items-start gap-1 p-3 border border-gray-100 rounded-xl hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] transition-all"
                >
                  <Phone size={16} className="text-[var(--gold)]" />
                  <span className="text-xs font-semibold text-[var(--dark)]">Appeler le support</span>
                  <span className="text-[10px] text-gray-400">+227 91 41 41 65</span>
                </a>
              </div>

              <a
                href="/contact"
                className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] transition-all"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle size={16} className="text-[var(--gold)]" />
                  <div>
                    <p className="text-xs font-semibold text-[var(--dark)]">Centre d'aide</p>
                    <p className="text-[10px] text-gray-400">Commandes, retours, paiements, aide compte et plus</p>
                  </div>
                </div>
                <span className="text-gray-300 text-lg">›</span>
              </a>
            </div>
          </div>
        </>
      )}

      {/* ── Floating button ── */}
      {/* Mobile: bottom-[72px] = 60px nav + 12px gap. Desktop: bottom-4 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-4 z-50 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform bottom-[72px] md:bottom-4"
        style={{ background: 'var(--gold)', width: '52px', height: '52px' }}
        aria-label="Chat"
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>
    </>
  );
}
