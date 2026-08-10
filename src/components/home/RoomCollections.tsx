import Link from 'next/link';
import Image from 'next/image';
import { Tag } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'Séjour Moderne',
    sub: 'Lignes épurées et style contemporain',
    style: 'Moderne',
    articles: 4,
    range: '150 000 – 900 000 FCFA',
    slug: 'salon',
    items: ["Canapé d'angle", 'Table basse', 'Lampadaire', 'Tapis'],
    img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Chambre Cosy',
    sub: 'Espace de sommeil confortable et accueillant',
    style: 'Contemporain',
    articles: 4,
    range: '200 000 – 1 200 000 FCFA',
    slug: 'chambre',
    items: ['Lit plateforme', 'Tables de chevet', 'Commode', 'Fauteuil décoratif'],
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Salle à Manger Familiale',
    sub: 'Rassemblez la famille pour des repas inoubliables',
    style: 'Traditionnel',
    articles: 4,
    range: '100 000 – 700 000 FCFA',
    slug: 'salle-a-manger',
    items: ['Table à manger', 'Chaises de salle à manger', 'Buffet', 'Lustre'],
    img: 'https://images.unsplash.com/photo-1565183928294-7d22f2dfdf79?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Bureau à Domicile Productif',
    sub: 'Travaillez efficacement depuis chez vous',
    style: 'Moderne',
    articles: 4,
    range: '80 000 – 500 000 FCFA',
    slug: 'bureau',
    items: ['Bureau exécutif', 'Chaise de bureau', 'Bibliothèque', 'Lampe de bureau'],
    img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function RoomCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center text-[var(--dark)] mb-2">Acheter par Pièce</h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        Inspirez-vous avec des collections de meubles organisées pour chaque espace
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COLLECTIONS.map((col) => (
          <div key={col.slug} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative w-full" style={{ height: '220px' }}>
              <Image src={col.img} alt={col.title} fill className="object-cover" />
              {/* Price tag */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--dark)]">
                <Tag size={12} className="text-[var(--gold)]" />
                {col.range}
              </div>
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-lg font-bold text-white">{col.title}</h3>
                <p className="text-white/70 text-sm">{col.sub}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-[var(--gold)] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {col.style}
                  </span>
                  <span className="text-white/60 text-xs">{col.articles} articles</span>
                </div>
              </div>
            </div>

            {/* Items list */}
            <div className="p-4">
              <p className="text-xs font-bold text-[var(--dark)] mb-2">Comprend :</p>
              <ul className="space-y-1 mb-4">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/boutique?categorie=${col.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--gold)', color: 'white' }}
              >
                Acheter ce Look →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
