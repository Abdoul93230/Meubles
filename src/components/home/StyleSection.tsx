import Link from 'next/link';
import Image from 'next/image';

const STYLES = [
  { name: 'Moderne',            slug: 'moderne',      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Traditionnel',       slug: 'traditionnel', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mid-Century',        slug: 'mid-century',  img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80' },
  { name: 'Africain',           slug: 'africain',     img: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?auto=format&fit=crop&w=400&q=80' },
  { name: 'Scandinave',         slug: 'scandinave',   img: 'https://images.unsplash.com/photo-1628745277919-f4d32b80948e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Industriel',         slug: 'industriel',   img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' },
];

export default function StyleSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center text-[var(--dark)] mb-2">Trouvez Votre Style</h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        Pas sûr de ce que vous cherchez ? Parcourez par style de design pour découvrir des meubles qui correspondent à vos goûts
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {STYLES.map((style) => (
          <Link
            key={style.slug}
            href={`/boutique?style=${style.slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
          >
            <Image
              src={style.img} alt={style.name} fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
              <p className="text-white text-xs font-semibold">{style.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
