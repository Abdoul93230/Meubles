'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SlidersHorizontal, X, ChevronDown, ChevronUp,
  Heart, Eye, Scale, Truck,
  Package, Star, CheckCircle, Tag, Clock, Sparkles,
} from 'lucide-react';

const WA_NUMBER = '22791414165';
function waUrl(name: string, price: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Bonjour Istanbul Meubles, je suis intéressé(e) par : ${name} — ${price}. Pouvez-vous me donner plus d'informations ?`
  )}`;
}
import { CATEGORIES, SAMPLE_PRODUCTS, formatPrice, getDiscountPercent } from '@/lib/data';
import { Product } from '@/lib/types';

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

const ITEMS_PER_PAGE = 12;

function BoutiqueCard({ product, index }: { product: Product; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [wished, setWished] = useState(false);
  const img = product.images?.[0];
  const hasImg = !!img && !imgError;

  const stockInfo = {
    in_stock:     { label: 'En stock',                            color: '#16A34A', sym: '✓' },
    out_of_stock: { label: 'Rupture de Stock',                    color: '#DC2626', sym: '✗' },
    on_order:     { label: `Sur commande (${product.delivery_days}j)`, color: '#D97706', sym: '⏱' },
  }[product.stock_status];

  const specs = [
    product.style    && { key: 'Style',    val: product.style },
    product.material && { key: 'Matériau', val: product.material },
  ].filter(Boolean) as { key: string; val: string }[];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image zone */}
      <Link href={`/produit/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-square relative bg-gray-50">
          {hasImg ? (
            <Image
              src={img} alt={product.name} fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{ background: FALLBACK_COLORS[index % FALLBACK_COLORS.length] }}
            >
              <span className="text-white/20 text-7xl font-bold select-none">{product.name.charAt(0)}</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.original_price && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{getDiscountPercent(product.price, product.original_price)}%
              </span>
            )}
            {product.is_new && (
              <span className="bg-[var(--dark)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}
          </div>

          {/* Hover: action icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => { e.preventDefault(); setWished(!wished); }}
              className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-colors"
              style={{ color: wished ? '#DC2626' : '#9CA3AF' }}
            >
              <Heart size={14} fill={wished ? '#DC2626' : 'none'} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-400 hover:text-[var(--gold)] transition-colors"
            >
              <Eye size={14} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-400 hover:text-[var(--gold)] transition-colors"
            >
              <Scale size={14} />
            </button>
          </div>

          {/* Hover: WhatsApp quick order bar */}
          <a
            href={waUrl(product.name, formatPrice(product.price))}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 left-0 right-0 py-2.5 flex items-center justify-center gap-2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10"
            style={{ background: '#25D366' }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Commander sur WhatsApp
          </a>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 mb-1">par Istanbul Meubles</p>
        <Link href={`/produit/${product.slug}`}>
          <p className="text-sm font-bold text-[var(--dark)] line-clamp-2 hover:text-[var(--gold)] transition-colors leading-snug mb-2">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Truck size={11} className="text-[var(--gold)]" />
          <span className="text-[10px] font-semibold text-[var(--gold)]">Livraison Gratuite</span>
        </div>

        {specs.length > 0 && (
          <div className="space-y-0.5 mb-2">
            {specs.map(({ key, val }) => (
              <div key={key} className="flex justify-between text-[10px]">
                <span className="text-gray-400">{key}</span>
                <span className="font-medium text-[var(--dark)]">{val}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-bold text-[var(--dark)]">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>

        <p className="text-xs font-semibold mt-1" style={{ color: stockInfo.color }}>
          {stockInfo.sym} {stockInfo.label}
        </p>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyInStock,      setOnlyInStock]      = useState(false);
  const [onlyPromo,        setOnlyPromo]         = useState(false);
  const [onlyNew,          setOnlyNew]           = useState(false);
  const [onlyFastDelivery, setOnlyFastDelivery]  = useState(false);
  const [maxPrice,         setMaxPrice]          = useState(10000000);
  const [filtersOpen,      setFiltersOpen]       = useState(false);
  const [catOpen,          setCatOpen]           = useState(true);
  const [priceOpen,        setPriceOpen]         = useState(true);
  const [ratingOpen,       setRatingOpen]        = useState(false);
  const [currentPage,      setCurrentPage]       = useState(1);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    setCurrentPage(1);
  };

  const filtered = useMemo(() =>
    SAMPLE_PRODUCTS.filter((p) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category_id)) return false;
      if (onlyInStock      && p.stock_status !== 'in_stock') return false;
      if (onlyPromo        && !p.original_price)             return false;
      if (onlyNew          && !p.is_new)                     return false;
      if (onlyFastDelivery && (p.delivery_days ?? 99) > 3)   return false;
      if (p.price > maxPrice)                                return false;
      return true;
    }),
    [selectedCategories, onlyInStock, onlyPromo, onlyNew, onlyFastDelivery, maxPrice]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSelectedCategories([]);
    setOnlyInStock(false); setOnlyPromo(false); setOnlyNew(false); setOnlyFastDelivery(false);
    setMaxPrice(10000000); setCurrentPage(1);
  };

  const hasFilters = selectedCategories.length > 0 || onlyInStock || onlyPromo || onlyNew || onlyFastDelivery || maxPrice < 10000000;
  const newCount   = SAMPLE_PRODUCTS.filter(p => p.is_new).length;
  const promoCount = SAMPLE_PRODUCTS.filter(p => p.original_price).length;

  const filterPanel = (
    <div className="space-y-4">
      {/* Quick filters */}
      <div className="space-y-2">
        {([
          { label: 'En Stock',                  value: onlyInStock,      setter: setOnlyInStock,      icon: CheckCircle, color: '#16A34A' },
          { label: 'En Promotion',              value: onlyPromo,        setter: setOnlyPromo,        icon: Tag,         color: '#DC2626' },
          { label: 'Nouveautés',                value: onlyNew,          setter: setOnlyNew,          icon: Sparkles,    color: 'var(--gold)' },
          { label: 'Livraison Rapide (≤ 3 j)',  value: onlyFastDelivery, setter: setOnlyFastDelivery, icon: Clock,       color: 'var(--gold)' },
        ] as const).map((f) => {
          const Icon = f.icon;
          return (
            <label key={f.label} className="flex items-center gap-2 cursor-pointer group/f">
              <input
                type="checkbox" checked={f.value}
                onChange={(e) => { (f.setter as (v: boolean) => void)(e.target.checked); setCurrentPage(1); }}
                className="w-4 h-4 rounded flex-shrink-0"
                style={{ accentColor: 'var(--gold)' }}
              />
              <Icon size={13} style={{ color: f.color }} className="flex-shrink-0" />
              <span className="text-sm text-gray-700 group-hover/f:text-[var(--gold)] transition-colors">{f.label}</span>
            </label>
          );
        })}
      </div>

      <hr className="border-[var(--border)]" />

      {/* Catégorie */}
      <div>
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex items-center justify-between font-semibold text-sm text-[var(--dark)] mb-2"
        >
          Catégorie {catOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {catOpen && (
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer group/cat">
                <input
                  type="checkbox" checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="w-4 h-4 rounded flex-shrink-0"
                  style={{ accentColor: 'var(--gold)' }}
                />
                <span className="text-sm text-gray-700 group-hover/cat:text-[var(--gold)] transition-colors">{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[var(--border)]" />

      {/* Gamme de Prix */}
      <div>
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between font-semibold text-sm text-[var(--dark)] mb-2"
        >
          Gamme de Prix {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {priceOpen && (
          <div>
            <input
              type="range" min={0} max={10000000} step={100000} value={maxPrice}
              onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
              className="w-full" style={{ accentColor: 'var(--gold)' }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 XAF</span>
              <span className="font-semibold" style={{ color: 'var(--gold)' }}>
                {maxPrice.toLocaleString('fr-FR')} XAF
              </span>
            </div>
          </div>
        )}
      </div>

      <hr className="border-[var(--border)]" />

      {/* Évaluation Client */}
      <div>
        <button
          onClick={() => setRatingOpen(!ratingOpen)}
          className="w-full flex items-center justify-between font-semibold text-sm text-[var(--dark)] mb-2"
        >
          Évaluation Client {ratingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {ratingOpen && (
          <div className="space-y-1.5">
            {[5, 4, 3].map((stars) => (
              <label key={stars} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: 'var(--gold)' }} />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < stars ? '#F59E0B' : 'none'}
                      className={i < stars ? 'text-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">& plus</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {hasFilters && (
        <>
          <hr className="border-[var(--border)]" />
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors"
          >
            <X size={16} /> Réinitialiser les filtres
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <div className="py-10 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--gold-pale)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs font-semibold mb-4 shadow-sm">
              <Sparkles size={12} className="text-[var(--gold)]" />
              Découvrez des Meubles Premium
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--dark)] mb-2 leading-tight">
              Sublimez Votre<br />
              <span style={{ color: 'var(--gold)' }}>Espace de Vie</span>
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Explorez des collections organisées de meubles de haute qualité conçus pour transformer votre maison en un havre de style et de confort.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: 'var(--gold)' }}
              >
                Parcourir Tous les Produits →
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-[var(--dark)] text-[var(--dark)] hover:bg-[var(--dark)] hover:text-white transition-all"
              >
                Acheter par Catégorie
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-8">
            <div className="bg-white rounded-2xl px-5 py-3 text-center shadow-sm">
              <p className="text-xl font-bold text-[var(--dark)]">{newCount}+</p>
              <p className="text-xs text-gray-500">Nouveautés</p>
            </div>
            <div className="rounded-2xl px-5 py-3 text-center shadow-sm relative" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">CHAUD</span>
              <p className="text-xl font-bold text-red-500">{promoCount}</p>
              <p className="text-xs text-red-400">Ventes Flash</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-3 text-center shadow-sm">
              <p className="text-xl font-bold text-[var(--dark)]">25+</p>
              <p className="text-xs text-gray-500">Livraison Gratuite</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Collections Organisées ── */}
      <div id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--dark)]">Collections Organisées</h2>
            <p className="text-sm text-gray-400 mt-1">Styles sélectionnés pour inspirer votre prochain projet</p>
          </div>
          <a href="#products" className="text-sm font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
            Voir tout →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            { title: 'Salon & Séjour',    sub: 'Transformez votre espace avec des meubles sélectionnés', badge: 'NOUVEAU',   badgeColor: 'var(--gold)', id: '1', img: '/images/categories/meubles.webp' },
            { title: 'Chambre à Coucher', sub: 'Dormez dans le style et le luxe',                        badge: 'POPULAIRE', badgeColor: '#D97706',     id: '2', img: '/images/categories/literie.webp' },
            { title: 'Bureau & Travail',  sub: 'Travaillez à la maison avec confort',                    badge: 'TENDANCE',  badgeColor: '#DC2626',     id: '4', img: '/images/categories/decoration.webp' },
          ] as const).map((col) => (
            <button
              key={col.id}
              onClick={() => {
                setSelectedCategories([col.id]);
                setCurrentPage(1);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative rounded-2xl overflow-hidden group text-left cursor-pointer"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={col.img} alt={col.title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span
                className="absolute top-3 left-3 text-white text-[10px] font-bold px-3 py-1 rounded-full"
                style={{ background: col.badgeColor }}
              >
                {col.badge}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-lg leading-tight">{col.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{col.sub}</p>
                <p className="text-white text-xs font-semibold mt-2">Explorer Maintenant →</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Products ── */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-[var(--gold)]">Accueil</Link>
          <span>/</span>
          <span className="font-medium text-[var(--dark)]">
            {selectedCategories.length === 1
              ? (CATEGORIES.find(c => c.id === selectedCategories[0])?.name ?? 'Tous les produits')
              : 'Tous les produits'}
          </span>
        </nav>

        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-[90px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base text-[var(--dark)]">Filtres</h2>
                {hasFilters && (
                  <button onClick={resetFilters} className="text-xs hover:underline" style={{ color: 'var(--gold)' }}>
                    Tout effacer
                  </button>
                )}
              </div>
              {filterPanel}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter button + count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-[var(--dark)]">{filtered.length}</span> produit{filtered.length > 1 ? 's' : ''}
              </p>
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-[var(--border)] px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filtres
                {hasFilters && <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />}
              </button>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <Package size={40} className="mx-auto mb-4 text-gray-200" />
                <p className="text-gray-400 font-medium">Aucun produit ne correspond à vos filtres.</p>
                <button onClick={resetFilters} className="mt-3 text-sm underline" style={{ color: 'var(--gold)' }}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {paginated.map((product, i) => (
                  <BoutiqueCard key={product.id} product={product} index={(currentPage - 1) * ITEMS_PER_PAGE + i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: currentPage === i + 1 ? 'var(--gold)' : 'white',
                      color:      currentPage === i + 1 ? 'white'        : 'var(--dark)',
                      border:     currentPage === i + 1 ? 'none'         : '1px solid var(--border)',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 p-6 overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Filtres</h2>
              <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
            </div>
            {filterPanel}
          </div>
        </>
      )}
    </div>
  );
}
