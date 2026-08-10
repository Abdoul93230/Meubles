'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Heart, ShoppingCart } from 'lucide-react';
import { SAMPLE_PRODUCTS, formatPrice, getDiscountPercent } from '@/lib/data';
import { useCart } from '@/store/cart';

const FALLBACK_COLORS = [
  'linear-gradient(135deg,#5C3D2E,#8B6914)',
  'linear-gradient(135deg,#2E2E3D,#464660)',
  'linear-gradient(135deg,#3D2E1A,#6B5030)',
  'linear-gradient(135deg,#2E3D2E,#4A6040)',
  'linear-gradient(135deg,#3D2E3D,#604660)',
  'linear-gradient(135deg,#3D3D2E,#6A6A40)',
  'linear-gradient(135deg,#5C3D2E,#C4A035)',
  'linear-gradient(135deg,#1A1A2E,#3D3D60)',
];

function FlashCard({ product, index }: { product: typeof SAMPLE_PRODUCTS[0]; index: number }) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const img = product.images?.[0];
  const hasImg = !!img && !imgError;

  return (
    <div className="group flex-shrink-0 w-44 bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-md transition-shadow">
      <Link href={`/produit/${product.slug}`} className="block relative">
        <div className="w-full aspect-square relative bg-gray-50">
          {hasImg ? (
            <Image
              src={img} alt={product.name} fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: FALLBACK_COLORS[index % FALLBACK_COLORS.length] }}
            >
              <span className="text-white/20 text-5xl font-bold select-none">{product.name.charAt(0)}</span>
            </div>
          )}
          {product.stock_status === 'out_of_stock' && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                Épuisé
              </span>
            </div>
          )}
        </div>
        {product.original_price && (
          <span className="absolute top-2 left-2 bg-[var(--red-badge)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 z-10">
            <Zap size={9} />
            -{getDiscountPercent(product.price, product.original_price)}%
          </span>
        )}
        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Heart size={12} />
        </button>
      </Link>
      <div className="p-2.5">
        <p className="text-xs font-medium text-[var(--dark)] line-clamp-2 leading-snug">{product.name}</p>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-xs font-bold text-[var(--red-badge)]">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>
        <button
          onClick={() => product.stock_status !== 'out_of_stock' && addItem(product)}
          disabled={product.stock_status === 'out_of_stock'}
          className="w-full mt-2 flex items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold tracking-wide transition-all disabled:opacity-50"
          style={{ background: product.stock_status === 'out_of_stock' ? '#E5E7EB' : 'var(--gold)', color: 'white' }}
        >
          <ShoppingCart size={11} />
          {product.stock_status === 'out_of_stock' ? 'ÉPUISÉ' : 'AJOUTER'}
        </button>
      </div>
    </div>
  );
}

export default function FlashSales() {
  const promoProducts = SAMPLE_PRODUCTS.filter((p) => p.original_price);

  if (!promoProducts.length) return null;

  return (
    <section style={{ background: 'linear-gradient(180deg, #FFF8EE 0%, #FFFFFF 100%)' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-[var(--red-badge)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <Zap size={12} />
              Ventes Flash
            </span>
          </div>
          <Link href="/boutique?promo=1" className="text-sm font-medium text-[var(--gold)] hover:underline">
            Voir Toutes les Offres →
          </Link>
        </div>

        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {[...promoProducts, ...promoProducts].map((product, i) => (
            <FlashCard key={`${product.id}-${i}`} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
