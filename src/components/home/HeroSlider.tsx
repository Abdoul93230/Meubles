'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const SLIDES = [
  {
    title: 'Le Mobilier de Prestige à Niamey',
    sub: 'Salons, chambres et salles à manger haut de gamme — directement dans votre maison',
    cta: 'DÉCOUVRIR NOS MEUBLES',
    href: '/boutique',
    align: 'left',
    image: '/images/hero/slide-1.jpg',
    fallback: 'linear-gradient(135deg, #3D2A1E 0%, #6B4226 50%, #8B5E3C 100%)',
  },
  {
    title: 'Votre Chambre, Votre Sanctuaire',
    sub: 'Lits capitonnés, armoires miroir et tables de nuit — des ensembles complets pour un sommeil de roi',
    badge: 'COLLECTION CHAMBRE',
    cta: 'VOIR LES CHAMBRES',
    href: '/boutique?categorie=chambre',
    align: 'right',
    image: '/images/hero/slide2.png',
    fallback: 'linear-gradient(135deg, #1A0E0A 0%, #3D2010 60%, #6B3A1A 100%)',
  },
  {
    title: 'Salle à Manger Istanbul — L\'Élégance à Table',
    sub: 'Tables marbre, chaises capitonnées dorées et buffets assortis — sublimez vos repas en famille',
    badge: 'NOUVELLE COLLECTION',
    cta: 'VOIR LA COLLECTION',
    href: '/boutique?categorie=salle-a-manger',
    align: 'center',
    image: '/images/hero/slide-3.png',
    fallback: 'linear-gradient(135deg, #0A1A0A 0%, #1A3A1A 50%, #2D5A2D 100%)',
  },
  {
    title: 'Visitez Notre Showroom à Niamey',
    sub: 'Plus de 100 modèles exposés — Quartier Plateau, Charles de Gaulle. Venez tester avant d\'acheter',
    badge: 'SHOWROOM OUVERT',
    extra: '📍 Lun – Sam : 8h00 – 19h00',
    cta: 'NOUS CONTACTER',
    href: '/contact',
    align: 'left',
    image: '/images/hero/slide-4.jpg',
    fallback: 'linear-gradient(135deg, #1A0A0A 0%, #3D1010 60%, #6B2A1A 100%)',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Track which images failed to load
  const [imgError, setImgError] = useState<boolean[]>(SLIDES.map(() => false));

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(420px, 60vw, 680px)' }}>

      {/* ── Background images (all preloaded, only active one is visible) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {!imgError[i] ? (
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover object-center"
              onError={() =>
                setImgError((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                })
              }
            />
          ) : (
            /* Fallback gradient when image not yet added */
            <div className="absolute inset-0" style={{ background: s.fallback }} />
          )}
        </div>
      ))}

      {/* ── Dark overlay for text readability ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            slide.align === 'right'
              ? 'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)'
              : slide.align === 'center'
              ? 'rgba(0,0,0,0.45)'
              : 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
        }}
      />

      {/* ── Text content ── */}
      <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex items-center">
        <div
          className={`w-full max-w-lg ${
            slide.align === 'right'
              ? 'ml-auto text-right'
              : slide.align === 'center'
              ? 'mx-auto text-center'
              : 'text-left'
          }`}
        >
          {slide.badge && (
            <span
              className="inline-block text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full mb-3"
              style={{ background: 'var(--gold)', color: 'white' }}
            >
              {slide.badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-white/90 text-sm sm:text-base mb-2 drop-shadow line-clamp-2 sm:line-clamp-none">
            {slide.sub}
          </p>
          {slide.extra && (
            <p className="text-yellow-300 text-xs sm:text-sm font-medium mb-3">{slide.extra}</p>
          )}
          <div
            className={`mt-4 md:mt-6 ${
              slide.align === 'right'
                ? 'flex justify-end'
                : slide.align === 'center'
                ? 'flex justify-center'
                : ''
            }`}
          >
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider transition-all hover:scale-105 shadow-lg"
              style={{ background: 'var(--gold)', color: 'white' }}
            >
              {slide.cta} →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Arrows — hidden on very small screens ── */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={18} />
      </button>

      {/* ── Dots only (centered bottom) ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? '20px' : '7px',
              height: '7px',
              background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* ── Pause button ── */}
      {/* Mobile: floats at junction (translate-y-1/2 on bottom-0). Desktop: inside slider bottom-right */}
      <button
        onClick={() => setPaused(!paused)}
        className="absolute z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all hover:scale-105
          bottom-0 right-4 translate-y-1/2
          md:bottom-5 md:right-5 md:translate-y-0 md:bg-white/20 md:border-white/40 md:shadow-none"
        style={{ background: 'var(--gold)' }}
      >
        {paused ? <Play size={14} className="text-white" /> : <Pause size={14} className="text-white" />}
      </button>
    </div>
  );
}
