'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, ChevronDown, ChevronRight, X, Menu, Globe, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/store/cart';
import CartDrawer from './CartDrawer';

const NAV_ITEMS = [
  { label: 'Meubles', href: '/boutique?categorie=meubles', sub: ['Salon', 'Chambre', 'Salle à manger', 'Bureau', 'Rangement'] },
  { label: 'Extérieur', href: '/boutique?categorie=exterieur', sub: ['Salon de jardin', 'Chaises extérieur', 'Tables extérieur'] },
  { label: 'Literie & Salle de Bain', href: '/boutique?categorie=literie', sub: ['Matelas', 'Couettes', 'Draps', 'Salle de bain'] },
  { label: 'Tapis', href: '/boutique?categorie=tapis', sub: ['Tapis salon', 'Tapis chambre', 'Tapis couloir'] },
  { label: 'Décoration & Coussins', href: '/boutique?categorie=decoration', sub: ['Coussins', 'Miroirs', 'Art mural', 'Bougies'] },
  { label: 'Éclairage', href: '/boutique?categorie=eclairage', sub: ['Plafonniers', 'Lampadaires', 'Lampes de table', 'Appliques'] },
];

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const langRef = useRef<HTMLDivElement>(null);
  const { count, toggleCart } = useCart();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Announcement bar ── */}
      {!bannerClosed && (
        <div className="bg-[var(--gold)] text-white text-xs py-2 px-4 text-center relative">
          ✨ Livraison Gratuite sur Commandes de Plus de 150 000 FCFA |{' '}
          <Link href="/boutique" className="underline font-semibold">Achetez Maintenant</Link>
          <button
            onClick={() => setBannerClosed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Main header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-[56px] md:h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <path d="M8 32 L20 8 L32 32" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 24 L28 24" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="8" r="2.5" fill="var(--gold)"/>
              </svg>
              <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}>
                ISTANBUL<span className="font-light"> MEUBLES</span>
              </span>
            </Link>

            {/* Search bar — desktop only */}
            <div className="flex-1 hidden md:block">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des meubles, décoration et plus..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-full bg-gray-50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--gold)] text-white p-1.5 rounded-full hover:bg-[var(--gold-hover)] transition-colors">
                  <Search size={13} />
                </button>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-0.5 ml-auto md:ml-0 flex-shrink-0">

              {/* Language selector — tablet+ */}
              <div className="relative hidden sm:flex items-center" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  <Globe size={16} className="text-gray-500" />
                  <span className="font-medium">{currentLang.label}</span>
                  <ChevronDown size={13} className={`text-gray-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--border)] rounded-xl shadow-lg py-1 w-36 z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[var(--gold-pale)] transition-colors ${
                          currentLang.code === lang.code ? 'text-[var(--gold)] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                        {currentLang.code === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="hidden md:flex p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-[var(--gold)] transition-colors">
                <Heart size={20} />
              </button>

              <button
                onClick={toggleCart}
                className="hidden md:flex relative p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-[var(--gold)] transition-colors"
              >
                <ShoppingCart size={20} />
                {count() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                    {count()}
                  </span>
                )}
              </button>

              <button className="hidden md:flex flex-col items-center px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-[var(--gold)] transition-colors group">
                <User size={20} />
                <span className="text-[10px] mt-0.5 whitespace-nowrap text-gray-500 group-hover:text-[var(--gold)] leading-tight">
                  Connexion / Inscription
                </span>
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-600"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile search — always visible, no duplicate in menu */}
          <div className="md:hidden pb-2.5">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des meubles, décoration..."
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-[var(--border)] rounded-full bg-gray-50 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[var(--gold)] text-white p-1.5 rounded-full">
                <Search size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop nav row ── */}
        <div className="hidden md:block border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-3 text-sm font-medium text-gray-700 hover:text-[var(--gold)] whitespace-nowrap transition-colors"
                  >
                    {item.label}
                    <ChevronDown size={13} className="opacity-50" />
                  </Link>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white border border-[var(--border)] rounded-xl shadow-xl py-2 min-w-[190px] z-50">
                      {item.sub.map((s) => (
                        <Link
                          key={s}
                          href={`/boutique?q=${s.toLowerCase().replace(/ /g, '-')}`}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[var(--gold)] hover:bg-[var(--gold-pale)] transition-colors"
                        >
                          {s}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/boutique?promo=1" className="flex items-center gap-1.5 px-3 py-3 text-sm font-bold whitespace-nowrap" style={{ color: 'var(--gold)' }}>
                ✨ Deals
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Mobile side drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setMobileOpen(false)} />

          {/* Drawer panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-white z-50 md:hidden flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">EXPLORER</p>
                <p className="text-xl font-bold text-[var(--dark)]" style={{ fontFamily: 'Georgia, serif' }}>
                  Istanbul Meubles
                </p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors mt-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">

              {/* Language selector */}
              <button
                onClick={() => setCurrentLang(currentLang.code === 'fr' ? LANGUAGES[1] : LANGUAGES[0])}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] text-sm text-gray-700 hover:border-[var(--gold)] transition-colors"
              >
                <Globe size={15} className="text-gray-400" />
                <span className="font-medium">{currentLang.label}</span>
                <ChevronDown size={13} className="text-gray-400 ml-1" />
              </button>

              {/* Favoris + Panier cards */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/favoris"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[var(--border)] text-sm font-semibold text-[var(--dark)] hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] transition-all"
                >
                  <Heart size={16} className="text-[var(--gold)]" />
                  Favoris
                </Link>
                <button
                  onClick={() => { toggleCart(); setMobileOpen(false); }}
                  className="relative flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[var(--border)] text-sm font-semibold text-[var(--dark)] hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] transition-all"
                >
                  <ShoppingCart size={16} className="text-[var(--gold)]" />
                  Panier
                  {count() > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                      {count()}
                    </span>
                  )}
                </button>
              </div>

              {/* CATÉGORIES */}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">CATÉGORIES</p>
                <div className="rounded-2xl border border-[var(--border)] overflow-hidden divide-y divide-[var(--border)]">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 hover:bg-[var(--gold-pale)] transition-colors"
                    >
                      <span className="text-sm font-medium text-[var(--dark)]">{item.label}</span>
                      <span className="text-xs text-gray-400">{item.sub.length} sections</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* SERVICES */}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">SERVICES</p>
                <div className="rounded-2xl overflow-hidden divide-y divide-[var(--border)]" style={{ background: 'var(--gold-pale)' }}>
                  <Link
                    href="/boutique"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-[var(--cream)] transition-colors"
                  >
                    <span className="text-sm font-medium text-[var(--dark)]">Toutes les catégories</span>
                    <span className="text-xs font-semibold text-[var(--gold)]">Ouvrir</span>
                  </Link>
                  <Link
                    href="/boutique?promo=1"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-[var(--cream)] transition-colors"
                  >
                    <span className="text-sm font-medium text-[var(--dark)]">Promotions</span>
                    <span className="text-xs font-semibold text-[var(--gold)]">Ouvrir</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-[var(--cream)] transition-colors"
                  >
                    <span className="text-sm font-medium text-[var(--dark)]">Assistance</span>
                    <span className="text-xs font-semibold text-[var(--gold)]">Ouvrir</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Footer — contact info (kept from previous) */}
            <div className="border-t border-[var(--border)] px-5 py-4 space-y-2" style={{ background: 'var(--surface)' }}>
              <a href="tel:+22791414165" className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-[var(--gold)] transition-colors">
                <Phone size={13} className="text-[var(--gold)]" />
                +227 91 41 41 65
              </a>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <MapPin size={13} className="text-[var(--gold)]" />
                Quartier Plateau, Niamey · Lun–Sam 8h–19h
              </div>
            </div>
          </div>
        </>
      )}

      <CartDrawer />
    </>
  );
}
