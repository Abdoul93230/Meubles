'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Meubles',
    slug: 'meubles',
    desc: 'Salon, chambre, salle à manger',
    image: '/images/categories/meubles.webp',
    color: 'linear-gradient(135deg, #5C3D2E 0%, #8B5E3C 100%)',
  },
  {
    name: 'Éclairage',
    slug: 'eclairage',
    desc: 'Lampes, plafonniers, appliques',
    image: '/images/categories/eclairage.webp',
    color: 'linear-gradient(135deg, #3D2E1A 0%, #6B5030 100%)',
  },
  {
    name: 'Tapis',
    slug: 'tapis',
    desc: 'Tapis salon, chambre, couloir',
    image: '/images/categories/tapis.webp',
    color: 'linear-gradient(135deg, #2E3D2E 0%, #4A6040 100%)',
  },
  {
    name: 'Décoration',
    slug: 'decoration',
    desc: 'Miroirs, art mural, coussins',
    image: '/images/categories/decoration.webp',
    color: 'linear-gradient(135deg, #3D3D2E 0%, #6A6A40 100%)',
  },
  {
    name: 'Literie & Salle de Bain',
    slug: 'literie',
    desc: 'Matelas, draps, salle de bain',
    image: '/images/categories/literie.webp',
    color: 'linear-gradient(135deg, #2E2E3D 0%, #464660 100%)',
  },
  {
    name: 'Cuisine & Table',
    slug: 'cuisine',
    desc: 'Vaisselle, ustensiles, rangement',
    image: '/images/categories/cuisine.webp',
    color: 'linear-gradient(135deg, #3D2E3D 0%, #604660 100%)',
  },
  {
    name: 'Extérieur',
    slug: 'exterieur',
    desc: 'Salon jardin, terrasse',
    image: '/images/categories/exterieur.avif',
    color: 'linear-gradient(135deg, #2E3A2E 0%, #3A5C3A 100%)',
  },
  {
    name: 'Rangement & Organisation',
    slug: 'rangement',
    desc: 'Étagères, commodes, dressings',
    image: '/images/categories/rangement.webp',
    color: 'linear-gradient(135deg, #3A3A3A 0%, #5A5A5A 100%)',
  },
];

export default function CategoryGrid() {
  const [imgError, setImgError] = useState<boolean[]>(CATEGORIES.map(() => false));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--dark)]">Acheter par Catégorie</h2>
          <p className="text-gray-500 text-sm mt-1">Explorez notre large sélection de meubles</p>
        </div>
        <Link href="/boutique" className="flex items-center gap-1 text-sm font-medium text-[var(--gold)] hover:underline">
          Voir tout <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/boutique?categorie=${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
          >
            {/* Background: real image or gradient fallback */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              {!imgError[i] ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
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
                <div className="absolute inset-0" style={{ background: cat.color }} />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-base leading-tight">{cat.name}</p>
              <p className="text-white/70 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {cat.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
