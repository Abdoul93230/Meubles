'use client';

import { use, useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart, Truck, ChevronRight, ChevronDown, ChevronUp,
  X, Star, Share2, Mail, Shield,
  RotateCcw, Wrench, MessageCircle, Phone, MapPin, CheckCircle,
} from 'lucide-react';
import { SAMPLE_PRODUCTS, CATEGORIES, formatPrice, getDiscountPercent } from '@/lib/data';

const WA_NUMBER = '22791414165';
function buildWaUrl(name: string, price: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Bonjour Istanbul Meubles, je suis intéressé(e) par : ${name} — ${price}. Pouvez-vous me donner plus d'informations ?`
  )}`;
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

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);

  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<boolean[]>((product?.images ?? []).map(() => false));
  const [wished, setWished] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [activeTab, setActiveTab] = useState('TOUS');
  const [openAccordion, setOpenAccordion] = useState<string | null>('Description');
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.id === product.category_id);
  const images = product.images ?? [];
  const hasImg = (i: number) => !!images[i] && !imgErrors[i];

  const related = SAMPLE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const youMayLike = SAMPLE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);
  const roomSelection = SAMPLE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const savings = product.original_price
    ? product.original_price - product.price
    : null;

  const stockInfo = {
    in_stock:    { label: 'En stock',        color: '#16A34A', bg: '#F0FDF4' },
    out_of_stock:{ label: 'Rupture de stock',color: '#DC2626', bg: '#FEF2F2' },
    on_order:    { label: 'Sur commande',     color: '#D97706', bg: '#FFFBEB' },
  }[product.stock_status];

  const waUrl = buildWaUrl(product.name, formatPrice(product.price));

  const toggleAccordion = (key: string) =>
    setOpenAccordion(openAccordion === key ? null : key);

  const specs = [
    product.style     && { key: 'Style de Design',    val: product.style },
    product.material  && { key: 'Matériaux',           val: product.material },
    product.dimensions&& { key: 'Dimensions',          val: product.dimensions },
    { key: 'État du Stock', val: stockInfo.label },
    product.delivery_days && { key: 'Délai de livraison', val: `${product.delivery_days} jours` },
  ].filter(Boolean) as { key: string; val: string }[];

  return (
    <div className="bg-white min-h-screen pb-[180px] lg:pb-0">

      {/* ── Top info banner ── */}
      <div className="border-b border-[var(--border)] bg-white px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <p className="text-[10px] font-bold tracking-widest text-[var(--gold)] uppercase mb-2">
          SÉLECTION ISTANBUL MEUBLES
        </p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <h1 className="text-xl md:text-2xl font-bold text-[var(--dark)] flex-1 leading-snug">
            {product.name}
          </h1>
          <div className="grid grid-cols-2 lg:flex gap-2 lg:gap-3 flex-shrink-0">
            <div className="text-center px-3 py-2 border border-[var(--border)] rounded-xl">
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">PRIX</p>
              <p className="text-sm font-bold text-[var(--dark)]">{formatPrice(product.price)}</p>
            </div>
            <div className="text-center px-3 py-2 border border-[var(--border)] rounded-xl">
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">DISPONIBILITÉ</p>
              <p className="text-sm font-semibold" style={{ color: stockInfo.color }}>{stockInfo.label}</p>
            </div>
            <div className="col-span-2 lg:col-span-1 text-center px-3 py-2 border border-[var(--border)] rounded-xl">
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">CONFIANCE</p>
              <p className="text-sm font-semibold text-[var(--dark)]">WhatsApp direct</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left: Gallery ── */}
          <div>
            {/* Mobile: thumbnails as horizontal row above main image */}
            {images.length > 1 && (
              <div className="flex lg:hidden flex-row gap-2 mb-3 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                    style={{ borderColor: i === activeImg ? 'var(--gold)' : 'var(--border)' }}
                  >
                    {hasImg(i) ? (
                      <Image src={src} alt="" fill className="object-cover"
                        onError={() => setImgErrors(prev => { const n=[...prev]; n[i]=true; return n; })} />
                    ) : (
                      <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[i % FALLBACK_COLORS.length] }} />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              {/* Desktop only: thumbnails column */}
              {images.length > 1 && (
                <div className="hidden lg:flex flex-col gap-2 flex-shrink-0">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                      style={{ borderColor: i === activeImg ? 'var(--gold)' : 'var(--border)' }}
                    >
                      {hasImg(i) ? (
                        <Image src={src} alt="" fill className="object-cover"
                          onError={() => setImgErrors(prev => { const n=[...prev]; n[i]=true; return n; })} />
                      ) : (
                        <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[i % FALLBACK_COLORS.length] }} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden bg-gray-50" style={{ aspectRatio: '4/3' }}>
                  {hasImg(activeImg) ? (
                    <Image src={images[activeImg]} alt={product.name} fill className="object-cover object-center"
                      priority onError={() => setImgErrors(prev => { const n=[...prev]; n[activeImg]=true; return n; })} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: FALLBACK_COLORS[0] }}>
                      <span className="text-white/20 text-8xl font-bold select-none">{product.name.charAt(0)}</span>
                    </div>
                  )}
                  {product.original_price && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      -{getDiscountPercent(product.price, product.original_price)}%
                    </span>
                  )}
                </div>

                {/* Image tabs */}
                <div className="flex gap-2">
                  {['TOUS', 'DIMENSIONS', 'INSPIRATION'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        background: activeTab === tab ? 'var(--dark)' : 'white',
                        color: activeTab === tab ? 'white' : 'var(--gray)',
                        borderColor: activeTab === tab ? 'var(--dark)' : 'var(--border)',
                      }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Purchase panel ── */}
          <div className="space-y-4">

            {/* Breadcrumb + share */}
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-1 text-xs text-gray-400 flex-wrap">
                <Link href="/" className="hover:text-[var(--gold)]">Accueil</Link>
                <ChevronRight size={11} />
                {category && <><Link href={`/boutique?categorie=${category.slug}`} className="hover:text-[var(--gold)]">{category.name}</Link><ChevronRight size={11} /></>}
                <span className="text-[var(--dark)] font-medium truncate max-w-[140px]">{product.name}</span>
              </nav>
              <div className="flex items-center gap-1.5">
                {[Share2, Mail].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-gray-400 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* Seller badge */}
            <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--gold-pale)' }}>
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                    <path d="M8 32 L20 8 L32 32" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 24 L28 24" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--dark)]">ISTANBUL MEUBLES</p>
                  <p className="text-[10px] text-gray-400">Vendu par Istanbul Meubles · Niamey</p>
                </div>
              </div>
              <Link href="/contact" className="text-xs font-semibold text-[var(--gold)] hover:underline">
                Voir boutique
              </Link>
            </div>

            {/* Title + stars + wishlist */}
            <div>
              <h2 className="text-lg font-bold leading-snug mb-2" style={{ color: 'var(--gold)' }}>
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={13} className="text-gray-300" fill="#D1D5DB" />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">(0 avis)</span>
                </div>
                <button onClick={() => setWished(!wished)} style={{ color: wished ? '#DC2626' : '#9CA3AF' }}>
                  <Heart size={18} fill={wished ? '#DC2626' : 'none'} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--dark)]">{formatPrice(product.price)}</span>
                {product.original_price && (
                  <span className="text-base text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
              {savings && (
                <p className="text-xs text-[var(--gold)] mt-0.5">
                  Économisez {getDiscountPercent(product.price, product.original_price!)}% · {formatPrice(savings)} off
                </p>
              )}
            </div>

            {/* CTA block */}
            <div ref={ctaRef} className="border border-[var(--border)] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">COMMANDER PAR WHATSAPP</p>
                  <p className="text-xs text-gray-500 mt-0.5">Réponse rapide · Livraison & installation incluses</p>
                </div>
                <div className="flex items-center gap-1 border border-green-200 bg-green-50 rounded-full px-2.5 py-1">
                  <Shield size={10} className="text-green-600" />
                  <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">RÉPONSE RAPIDE</span>
                </div>
              </div>

              {/* WhatsApp CTA — primary */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm tracking-wider transition-all hover:opacity-90 text-white"
                style={{ background: '#25D366' }}
              >
                {/* WhatsApp icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                COMMANDER SUR WHATSAPP
              </a>

              {/* Phone call — secondary */}
              <a
                href="tel:+22791414165"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm tracking-wider transition-all hover:opacity-90 border-2"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: 'var(--gold-pale)' }}
              >
                <Phone size={15} />
                APPELER : +227 91 41 41 65
              </a>

              {/* 3 trust badges */}
              <div className="pt-1 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-2">
                {[
                  { icon: Truck,       title: 'Livraison incluse',  sub: 'Délais confirmés à la commande.' },
                  { icon: Wrench,      title: 'Installation',       sub: 'Montage professionnel sur place.' },
                  { icon: CheckCircle, title: 'Qualité garantie',   sub: 'Sélection vérifiée par notre équipe.' },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-3 sm:flex-col sm:items-center sm:gap-0 sm:text-center p-2 border border-[var(--border)] rounded-xl sm:border-0 sm:p-0">
                    <Icon size={16} className="text-[var(--gold)] flex-shrink-0 sm:mx-auto sm:mb-1 mt-0.5 sm:mt-0" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--dark)]">{title}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faire une offre */}
            <button
              onClick={() => setOfferOpen(true)}
              className="w-full py-3 rounded-2xl border-2 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--gold-pale)] transition-all"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
            >
              <MessageCircle size={15} />
              Faire une Offre
            </button>

            {/* On order warning */}
            {product.stock_status === 'on_order' && (
              <div className="border border-orange-200 bg-orange-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold text-orange-500">!</span>
                  </div>
                  <p className="text-sm font-bold text-orange-700">Fabriqué sur Commande</p>
                </div>
                <p className="text-xs text-orange-600 ml-6">
                  Cet article est actuellement en rupture de stock mais disponible en pré-commande.
                </p>
                <p className="text-xs font-semibold text-orange-600 ml-6 mt-1">
                  Livraison estimée : {product.delivery_days} jours
                </p>
              </div>
            )}

            {/* Services */}
            <div className="border border-[var(--border)] rounded-2xl p-4">
              <p className="text-sm font-bold text-[var(--dark)] mb-3">Nos services</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: RotateCcw, title: 'Retours faciles',      sub: 'Voir les conditions de retour' },
                  { icon: Shield,    title: 'Garantie 12 mois',     sub: 'Garantie fabricant incluse' },
                  { icon: CheckCircle, title: 'Plan de protection', sub: 'Couverture étendue disponible' },
                  { icon: Wrench,    title: 'Service de montage',   sub: 'Installation professionnelle' },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-2">
                    <Icon size={14} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--dark)]">{title}</p>
                      <p className="text-[10px] text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Below the fold ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-0">

            {/* Accordions */}
            {[
              {
                key: 'Description',
                content: (
                  <div className="text-sm text-gray-600 leading-relaxed space-y-3 py-4">
                    <p>{product.description}</p>
                    <p>
                      Fabriqué avec des matériaux soigneusement sélectionnés, ce meuble allie esthétique raffinée et durabilité.
                      Idéal pour les intérieurs modernes et les espaces de vie sophistiqués.
                    </p>
                    {product.material && <p><strong>Matière :</strong> {product.material}</p>}
                    {product.style && <p><strong>Style :</strong> {product.style}</p>}
                  </div>
                ),
              },
              {
                key: 'Poids & dimensions',
                content: (
                  <div className="py-4 text-sm text-gray-600">
                    {product.dimensions
                      ? <p><span className="font-medium">Dimensions :</span> {product.dimensions}</p>
                      : <p className="text-gray-400 italic">Informations disponibles sur demande — contactez-nous.</p>
                    }
                  </div>
                ),
              },
              {
                key: 'Spécifications',
                content: (
                  <div className="py-2 divide-y divide-[var(--border)]">
                    {specs.map(({ key, val }) => (
                      <div key={key} className="flex justify-between py-2.5 text-sm">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-medium text-[var(--dark)]">{val}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map(({ key, content }) => (
              <div key={key} className="border-b border-[var(--border)]">
                <button
                  onClick={() => toggleAccordion(key)}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-[var(--dark)] hover:text-[var(--gold)] transition-colors"
                >
                  {key}
                  {openAccordion === key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === key && content}
              </div>
            ))}

            {/* Encore indécis */}
            <div className="border border-[var(--border)] rounded-2xl p-4 mt-6 space-y-0 divide-y divide-[var(--border)]">
              <p className="text-sm font-bold text-[var(--dark)] pb-3">Encore indécis ?</p>
              <Link href="/contact" className="flex items-center justify-between py-3 text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--gold)]" />
                  Bienvenue dans notre showroom
                </div>
                <ChevronRight size={14} className="text-gray-300" />
              </Link>
              <Link href="/contact" className="flex items-center justify-between py-3 text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--gold)]" />
                  Demander un rendez-vous design gratuit
                </div>
                <ChevronRight size={14} className="text-gray-300" />
              </Link>
            </div>
          </div>

          {/* Sticky sidebar (desktop) */}
          <div className="hidden lg:block">
            <div
              className={`sticky top-[100px] border border-[var(--border)] rounded-2xl p-4 space-y-3 transition-all duration-300 ${
                showSticky ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'
              }`}
            >
              <div className="flex gap-3 items-start">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--gold-pale)]">
                  {hasImg(0) ? (
                    <Image src={images[0]} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[0] }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--dark)] line-clamp-2 leading-tight">{product.name}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-[var(--dark)]">{formatPrice(product.price)}</span>
                    {product.original_price && (
                      <span className="text-[10px] text-[var(--gold)] font-semibold">
                        Économisez {getDiscountPercent(product.price, product.original_price!)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white tracking-wide flex items-center justify-center gap-1.5"
                style={{ background: '#25D366' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Souvent achetés ensemble ── */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[var(--dark)] mb-6">Souvent achetés ensemble</h2>
            <div className="space-y-3">
              {/* Main product */}
              <div className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-2xl">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: 'var(--gold)' }}>1</div>
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--gold-pale)]">
                  {hasImg(0) ? <Image src={images[0]} alt={product.name} fill className="object-cover" /> : <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[0] }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--dark)] line-clamp-1">{product.name}</p>
                  <p className="text-sm font-bold mt-0.5">{formatPrice(product.price)}</p>
                  <p className="text-[10px] font-bold tracking-wider text-[var(--gold)] uppercase mt-0.5">PRODUIT PRINCIPAL</p>
                </div>
              </div>
              {/* Related products */}
              {related.map((rel, i) => {
                const relImg = rel.images?.[0];
                const relErr = false;
                return (
                  <div key={rel.id} className="flex items-center gap-4 p-4 border-2 rounded-2xl transition-all hover:border-[var(--gold)]" style={{ borderColor: 'var(--border)' }}>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--gold)] flex-shrink-0" />
                    <div className="w-8 h-8 rounded-full bg-[var(--dark)] flex items-center justify-center font-bold text-sm text-white flex-shrink-0">{i+2}</div>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {relImg && !relErr ? <Image src={relImg} alt={rel.name} fill className="object-cover" /> : <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[(i+1) % FALLBACK_COLORS.length] }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--dark)] line-clamp-1">{rel.name}</p>
                      <p className="text-sm font-bold mt-0.5">{formatPrice(rel.price)}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Istanbul Meubles</p>
                    </div>
                  </div>
                );
              })}
              {/* Bundle total */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
                <div>
                  <p className="text-sm font-bold text-[var(--dark)]">
                    Prix du lot : <span style={{ color: 'var(--gold)' }}>{formatPrice(product.price + related.reduce((s,p)=>s+p.price,0))}</span>
                    {' '}<span className="text-gray-400 line-through text-xs">{product.original_price ? formatPrice(product.original_price + related.reduce((s,p)=>s+(p.original_price||p.price),0)) : ''}</span>
                  </p>
                  <p className="text-xs text-green-600 font-medium">Économisez en achetant ensemble</p>
                  <p className="text-[10px] text-gray-400">{1 + related.length} article(s) prêts à être ajoutés.</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 flex items-center gap-2"
                  style={{ background: '#25D366' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  Commander le lot
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Sélection pour la pièce ── */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[var(--dark)] mb-1">Sélection pour la pièce</h2>
          <p className="text-sm text-gray-400 mb-6">Associez cette pièce à des accents complémentaires pour finaliser l'ambiance.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'PIÈCE MAÎTRESSE', idx: 0 },
              { label: 'COUCHE DE TEXTURE', idx: 1 },
              { label: 'ACCENT LUMINEUX', idx: 2 },
              { label: 'TOUCHE FINALE', idx: 3 },
            ].map(({ label, idx }) => {
              const p = roomSelection[idx];
              if (!p) return null;
              const img = p.images?.[0];
              return (
                <div key={label} className="group border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-gray-50">
                    {img ? <Image src={img} alt={p.name} fill className="object-cover" /> : <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[idx % FALLBACK_COLORS.length] }} />}
                    <span className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold tracking-widest px-2 py-1 rounded-full text-gray-600">{label}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-[var(--dark)] line-clamp-2 mb-1 leading-snug">{p.name}</p>
                    <p className="text-xs font-bold text-[var(--dark)]">{formatPrice(p.price)}</p>
                    <Link href={`/produit/${p.slug}`} className="text-[10px] font-bold text-[var(--gold)] hover:underline uppercase tracking-wider mt-1 block">
                      Voir la pièce
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Q&A ── */}
        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-[var(--gold)]" />
              <h2 className="text-xl font-bold text-[var(--dark)]">Questions & Réponses</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold border rounded-xl px-4 py-2 hover:bg-[var(--gold-pale)] transition-colors" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              Poser une question
            </Link>
          </div>
          <div className="text-center py-10">
            <MessageCircle size={36} className="mx-auto mb-3 text-gray-200" />
            <p className="text-sm font-medium text-gray-400">Aucune question pour l'instant</p>
            <p className="text-xs text-gray-300 mt-1">Soyez le premier à poser une question sur ce produit.</p>
          </div>
        </div>

        {/* ── Vous aimerez aussi ── */}
        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-bold text-[var(--dark)] mb-6">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {youMayLike.map((p, i) => {
              const img = p.images?.[0];
              return (
                <Link key={p.id} href={`/produit/${p.slug}`} className="group border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-gray-50">
                    {img ? <Image src={img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="absolute inset-0" style={{ background: FALLBACK_COLORS[i % FALLBACK_COLORS.length] }} />}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-[var(--dark)] line-clamp-2 mb-1 leading-snug">{p.name}</p>
                    <p className="text-sm font-bold text-[var(--dark)]">{formatPrice(p.price)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Istanbul Meubles</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom CTA bar ── */}
      <div
        className={`lg:hidden fixed bottom-[60px] left-0 right-0 z-40 bg-white border-t border-[var(--border)] px-4 py-2.5 transition-all duration-300 ${
          showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">À PARTIR DE</span>
          <span className="text-sm font-bold text-[var(--dark)]">{formatPrice(product.price)}</span>
          {savings && (
            <span className="text-xs text-[var(--gold)]">Économisez {getDiscountPercent(product.price, product.original_price!)}%</span>
          )}
        </div>
        <div className="flex gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl font-bold text-sm text-white tracking-wider flex items-center justify-center gap-1.5"
            style={{ background: '#25D366' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.863L0 24l6.335-1.508A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-4.99-1.363l-.358-.213-3.76.895.944-3.658-.234-.376A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            WHATSAPP
          </a>
          <a
            href="tel:+22791414165"
            className="flex-1 py-3 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-1.5 border-2"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: 'var(--gold-pale)' }}
          >
            <Phone size={14} />
            APPELER
          </a>
        </div>
      </div>

      {/* ── Offer modal ── */}
      {offerOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setOfferOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-2" style={{ borderColor: 'var(--gold)' }}>
              <div className="flex items-start justify-between p-5 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-[var(--dark)]">Faites Votre Offre</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Soumettez votre meilleur prix pour {product.name}
                  </p>
                </div>
                <button onClick={() => setOfferOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>
              <div className="px-5 pb-5 space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-[var(--border)]">
                  <span className="text-sm text-gray-500">Prix Actuel</span>
                  <span className="font-bold text-[var(--dark)]">FCFA {product.price.toLocaleString('fr-FR')}</span>
                </div>
                <div className="bg-[var(--gold-pale)] border border-[var(--gold)] rounded-xl px-3 py-2">
                  <p className="text-[11px] text-[var(--gold)] font-medium">
                    💡 Conseil : Les offres dans les 20% du prix ont plus de chances d'être acceptées
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--dark)] mb-2">Votre Prix Offert *</p>
                  <div className="relative">
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={e => setOfferPrice(e.target.value)}
                      placeholder=""
                      className="w-full border border-[var(--border)] rounded-xl px-4 py-3 pr-14 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">XAF</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOfferOpen(false)} className="flex-1 py-3 rounded-xl border border-[var(--border)] text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Annuler
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: 'var(--gold)', color: 'white', opacity: offerPrice ? 1 : 0.5 }}
                    disabled={!offerPrice}
                  >
                    Soumettre l'Offre
                  </button>
                </div>
                <p className="text-[10px] text-blue-500 leading-relaxed">
                  ℹ️ Votre offre sera examinée par notre équipe. Le délai de réponse dépend de la disponibilité et des détails de votre offre.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
