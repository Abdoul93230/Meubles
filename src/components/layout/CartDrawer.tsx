'use client';

import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/data';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="font-bold text-lg">Mon panier ({items.length})</h2>
          <button onClick={toggleCart} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gray-200" />
              <div>
                <p className="font-medium">Votre panier est vide</p>
                <p className="text-sm text-gray-400 mt-1">Ajoutez des articles pour commencer</p>
              </div>
              <button
                onClick={toggleCart}
                className="px-6 py-2 rounded-full text-sm font-medium text-white"
                style={{ background: 'var(--gold)' }}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #5C3D2E, #8B6914)' }}>
                    <span className="text-white/40 text-xl font-bold">{item.product.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                    <p className="font-bold text-sm mt-1" style={{ color: 'var(--gold)' }}>
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-200">-</button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-200">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="font-bold text-xl" style={{ color: 'var(--gold)' }}>{formatPrice(total())}</span>
            </div>
            <Link
              href="/commande"
              onClick={toggleCart}
              className="w-full py-3 rounded-full font-bold text-sm text-center block text-white hover:opacity-90 transition-opacity"
              style={{ background: 'var(--gold)' }}
            >
              Passer la commande →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
