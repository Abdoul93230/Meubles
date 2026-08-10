import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SAMPLE_PRODUCTS, CATEGORIES, formatPrice } from '@/lib/data';
import ProductPageClient from './ProductPageClient';

const SITE_URL = 'https://istanbulmeubles.ne';

export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Produit introuvable' };

  const category = CATEGORIES.find((c) => c.id === product.category_id);
  const image = product.images?.[0]
    ? `${SITE_URL}${product.images[0]}`
    : `${SITE_URL}/images/og-default.jpg`;
  const price = formatPrice(product.price);
  const stockLabel = product.stock_status === 'on_order' ? 'Sur commande' : 'En stock';

  return {
    title: `${product.name} — Istanbul Meubles`,
    description: `${product.description} Prix : ${price}. ${stockLabel}. Commandez sur WhatsApp.`,
    keywords: [product.name, category?.name ?? '', product.style ?? '', product.material ?? '', 'meuble Niamey', 'Istanbul Meubles Niger'].filter(Boolean),
    openGraph: {
      title: product.name,
      description: `${price} · ${stockLabel} — Istanbul Meubles Niamey, Niger`,
      images: [{ url: image, width: 1200, height: 630, alt: product.name }],
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Istanbul Meubles',
      url: `${SITE_URL}/produit/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Istanbul Meubles`,
      description: `${price} · ${stockLabel} — Niamey, Niger`,
      images: [image],
    },
    other: {
      'product:price:amount': String(product.price),
      'product:price:currency': 'XOF',
      'product:availability': product.stock_status === 'out_of_stock' ? 'out of stock' : 'in stock',
      'product:condition': 'new',
      'product:retailer_item_id': product.id,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductPageClient product={product} />;
}
