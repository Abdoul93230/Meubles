import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const ROOMS = [
  {
    name: 'Salon',
    slug: 'salon',
    sub: 'Explorer la Collection',
    img: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750',
  },
  {
    name: 'Salle à Manger',
    slug: 'salle-a-manger',
    sub: 'Explorer la Collection',
    img: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750',
  },
  {
    name: 'Chambre',
    slug: 'chambre',
    sub: 'Explorer la Collection',
    img: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750',
  },
  {
    name: 'Bureau à Domicile',
    slug: 'bureau',
    sub: 'Explorer la Collection',
    img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750',
  },
];

export default function InspirationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center text-[var(--dark)] mb-2">Inspirez-vous</h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        Explorez de superbes combinaisons de meubles et d'idées de design
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROOMS.map((room) => (
          <Link
            key={room.slug}
            href={`/boutique?categorie=${room.slug}`}
            className="group relative overflow-hidden rounded-2xl"
            style={{ minHeight: '280px' }}
          >
            <Image
              src={room.img}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white">{room.name}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-white/80 text-sm font-medium group-hover:text-[var(--gold-light)] transition-colors">
                {room.sub} <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
