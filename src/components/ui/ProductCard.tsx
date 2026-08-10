'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Package, Clock } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, getDiscountPercent } from '@/lib/data';

const WA_NUMBER = '22791414165';
function waUrl(name: string, price: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Bonjour Istanbul Meubles, je suis intéressé(e) par : ${name} — ${price}. Pouvez-vous me donner plus d'informations ?`
  )}`;
}

interface ProductCardProps {
  product: Product;
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const img = product.images?.[0];
  const hasImg = !!img && !imgError;

  const stockLabel = {
    in_stock: { label: 'En stock', color: 'text-green-600 bg-green-50', icon: Package },
    out_of_stock: { label: 'Rupture', color: 'text-red-600 bg-red-50', icon: Package },
    on_order: { label: `Sur commande (${product.delivery_days}j)`, color: 'text-orange-600 bg-orange-50', icon: Clock },
  }[product.stock_status];

  const StockIcon = stockLabel.icon;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/produit/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] relative bg-gray-50">
          {hasImg ? (
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{ background: FALLBACK_COLORS[parseInt(product.id) % FALLBACK_COLORS.length] }}
            >
              <span className="text-white/20 text-7xl font-bold select-none">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.original_price && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{getDiscountPercent(product.price, product.original_price)}%
            </span>
          )}
          {product.is_new && (
            <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Nouveau
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
          <Heart size={16} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/produit/${product.slug}`}>
          <h3 className="font-semibold text-sm text-[var(--foreground)] line-clamp-2 hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.style && (
          <span className="text-xs text-[var(--muted)] mt-1">{product.style}</span>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-[var(--primary)] text-lg">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-xs text-[var(--muted)] line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full w-fit mt-2 ${stockLabel.color}`}>
          <StockIcon size={12} />
          {stockLabel.label}
        </div>

        <div className="mt-auto pt-4">
          {product.stock_status !== 'out_of_stock' ? (
            <a
              href={waUrl(product.name, formatPrice(product.price))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: '#25D366' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Commander sur WhatsApp
            </a>
          ) : (
            <span className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold">
              Indisponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
