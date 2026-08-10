'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Zap, Phone } from 'lucide-react';
import { SAMPLE_PRODUCTS, formatPrice, getDiscountPercent } from '@/lib/data';

const WA_NUMBER = '22791414165';
function waUrl(name: string, price: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Bonjour Istanbul Meubles, je suis intéressé(e) par : ${name} — ${price}. Pouvez-vous me donner plus d'informations ?`
  )}`;
}

const TABS = ['Tendances', 'Meilleures Ventes', 'Nouveautés'];

const FALLBACK_COLORS = [
  'linear-gradient(135deg, #5C3D2E 0%, #8B6914 100%)',
  'linear-gradient(135deg, #2E2E3D 0%, #464660 100%)',
  'linear-gradient(135deg, #3D2E1A 0%, #6B5030 100%)',
  'linear-gradient(135deg, #2E3D2E 0%, #4A6040 100%)',
  'linear-gradient(135deg, #3D2E3D 0%, #604660 100%)',
  'linear-gradient(135deg, #3D3D2E 0%, #6A6A40 100%)',
  'linear-gradient(135deg, #5C3D2E 0%, #C4A035 100%)',
  'linear-gradient(135deg, #1A1A2E 0%, #3D3D60 100%)',
];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('Tendances');
  const [imgErrors, setImgErrors] = useState<boolean[]>(SAMPLE_PRODUCTS.map(() => false));

  const products = SAMPLE_PRODUCTS.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-[var(--gold)]" />
            <span className="text-xs font-bold tracking-widest text-[var(--gold)] uppercase">Achats du moment</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--dark)]">Tendances, nouveautés et meilleures ventes</h2>
          <p className="text-sm text-gray-400 mt-1">Des produits prêts à découvrir tout de suite.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeTab === tab ? 'var(--dark)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--gray)',
                border: activeTab === tab ? 'none' : '1px solid var(--border)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, i) => {
          const img = product.images?.[0];
          const hasImg = !!img && !imgErrors[i];

          return (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-md transition-shadow">
              {/* Image */}
              <Link href={`/produit/${product.slug}`} className="block relative aspect-square overflow-hidden">
                {hasImg ? (
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={() =>
                      setImgErrors((prev) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                      })
                    }
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{ background: FALLBACK_COLORS[i % FALLBACK_COLORS.length] }}
                  >
                    <span className="text-white/20 text-7xl font-bold select-none">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.is_new && (
                    <span className="bg-[var(--dark)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NOUVEAU
                    </span>
                  )}
                  {product.original_price && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{getDiscountPercent(product.price, product.original_price)}%
                    </span>
                  )}
                  {product.stock_status === 'out_of_stock' && (
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Épuisé
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                  <Heart size={14} />
                </button>
              </Link>

              {/* Info */}
              <div className="p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">ISTANBUL MEUBLES</p>
                <Link href={`/produit/${product.slug}`}>
                  <p className="text-sm font-medium text-[var(--dark)] line-clamp-2 hover:text-[var(--gold)] transition-colors leading-snug">
                    {product.name}
                  </p>
                </Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-bold text-[var(--dark)]">{formatPrice(product.price)}</span>
                  {product.original_price && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                  )}
                </div>
                {product.stock_status !== 'out_of_stock' ? (
                  <a
                    href={waUrl(product.name, formatPrice(product.price))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all hover:opacity-90"
                    style={{ background: '#25D366', color: 'white' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                    </svg>
                    COMMANDER
                  </a>
                ) : (
                  <span className="w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold tracking-wide bg-gray-100 text-gray-400">
                    ÉPUISÉ
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[var(--gold)] hover:text-white transition-all"
        >
          Voir tout →
        </Link>
      </div>
    </section>
  );
}
