'use client';

import { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface Prefs {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function PrivacyConsent() {
  const [status, setStatus] = useState<'banner' | 'modal' | 'done' | null>(null);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    preferences: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('privacy_consent');
    setStatus(saved ? 'done' : 'banner');
  }, []);

  const accept = (type: 'all' | 'necessary' | 'custom') => {
    const final: Prefs =
      type === 'all'
        ? { necessary: true, preferences: true, analytics: true, marketing: true }
        : type === 'necessary'
        ? { necessary: true, preferences: false, analytics: false, marketing: false }
        : prefs;
    localStorage.setItem('privacy_consent', JSON.stringify(final));
    setStatus('done');
  };

  if (status === null) return null;

  return (
    <>
      {/* ── Banner (bottom center, first visit) ── */}
      {status === 'banner' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--dark)] mb-1">
                  Privacy choices on Istanbul Meubles
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We use necessary technologies to run the marketplace and optional technologies for analytics, marketing, and support experiences. You can accept all, keep only necessary technologies, or customize your choices.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setStatus('modal')}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={() => accept('necessary')}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
              >
                Necessary only
              </button>
              <button
                onClick={() => accept('all')}
                className="px-4 py-2 text-sm font-bold rounded-lg text-white transition-colors hover:opacity-90"
                style={{ background: 'var(--gold)' }}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal (Customize) ── */}
      {status === 'modal' && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setStatus('banner')} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-3">
                <div>
                  <h2 className="font-bold text-lg text-[var(--dark)]">Privacy settings</h2>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Choose which optional technologies Istanbul Meubles can use on this device. Necessary technologies stay on because they support security, sign-in, checkout, fraud protection, and core marketplace functions.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('banner')}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 ml-4 flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Toggles */}
              <div className="px-6 space-y-3 pb-4">
                {[
                  {
                    key: 'necessary' as keyof Prefs,
                    label: 'Strictly necessary',
                    desc: 'Required for sign-in, security, checkout, fraud protection, and core marketplace operation.',
                    always: true,
                  },
                  {
                    key: 'preferences' as keyof Prefs,
                    label: 'Preferences and support',
                    desc: 'Used for language or country preferences and optional support experiences such as the live chat widget.',
                    always: false,
                  },
                  {
                    key: 'analytics' as keyof Prefs,
                    label: 'Analytics',
                    desc: 'Used to measure traffic, search behavior, product engagement, and marketplace performance.',
                    always: false,
                  },
                  {
                    key: 'marketing' as keyof Prefs,
                    label: 'Marketing',
                    desc: 'Used for conversion measurement, audience building, and campaign attribution tools such as advertising pixels and tags.',
                    always: false,
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between gap-4 p-4 border border-gray-100 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--dark)]">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      {item.always && (
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">ALWAYS<br />ON</span>
                      )}
                      {/* Toggle */}
                      <button
                        disabled={item.always}
                        onClick={() => !item.always && setPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          item.always || prefs[item.key] ? '' : 'bg-gray-200'
                        } disabled:cursor-default`}
                        style={{
                          background: item.always || prefs[item.key] ? 'var(--gold)' : '#D1D5DB',
                        }}
                      >
                        <span
                          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                          style={{
                            transform: item.always || prefs[item.key] ? 'translateX(22px)' : 'translateX(2px)',
                          }}
                        />
                      </button>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {item.always || prefs[item.key] ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 pb-2">
                <p className="text-xs text-gray-400">
                  Review our{' '}
                  <a href="#" className="text-[var(--gold)] underline">Privacy Policy</a>
                  {' '}&{' '}
                  <a href="#" className="text-[var(--gold)] underline">Cookies Policy</a>.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 p-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => accept('necessary')}
                  className="px-5 py-2.5 text-sm font-medium rounded-xl border transition-colors"
                  style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                >
                  Necessary only
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStatus('banner')}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 border border-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => accept('custom')}
                    className="px-5 py-2.5 text-sm font-bold text-white rounded-xl hover:opacity-90 transition-opacity"
                    style={{ background: 'var(--gold)' }}
                  >
                    Save choices
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── After consent: small bottom-left button ── */}
      {status === 'done' && (
        <button
          onClick={() => setStatus('modal')}
          className="fixed left-4 z-40 flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-2 text-xs font-medium text-gray-600 shadow-md hover:shadow-lg hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all bottom-[72px] md:bottom-4"
        >
          <Shield size={13} />
          Privacy settings
        </button>
      )}
    </>
  );
}
