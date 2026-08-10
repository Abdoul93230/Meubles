'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/store/cart';

const ITEMS = [
  { label: 'Accueil', href: '/', icon: Home },
  { label: 'Catégories', href: '/boutique', icon: LayoutGrid },
  { label: 'Favoris', href: '/favoris', icon: Heart },
  { label: 'Panier', href: null, icon: ShoppingCart, isCart: true },
  { label: 'Compte', href: '/compte', icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count, toggleCart } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--border)] safe-area-inset-bottom">
      <div className="flex items-stretch h-[60px]">
        {ITEMS.map((item) => {
          const isActive = item.href ? pathname === item.href : false;
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key="panier"
                onClick={toggleCart}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
                style={{ color: 'var(--gray)' }}
              >
                <div className="relative">
                  <Icon size={22} />
                  {count() > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                      style={{ background: 'var(--gold)' }}
                    >
                      {count()}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-medium leading-none">Panier</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
              style={{ color: isActive ? 'var(--gold)' : 'var(--gray)' }}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <span
                  className="absolute bottom-0 w-6 h-0.5 rounded-full"
                  style={{ background: 'var(--gold)' }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
