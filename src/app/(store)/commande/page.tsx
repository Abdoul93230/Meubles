'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check, Phone } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/data';

export default function CommandePage() {
  const { items, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Niamey',
    payment: 'orange_money',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    clearCart();
    setLoading(false);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-[var(--muted)] mb-6">Ajoutez des articles avant de passer commande.</p>
        <Link href="/boutique" className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          Voir la boutique
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Commande envoyée !</h1>
        <p className="text-[var(--muted)] mb-2">Merci {form.name}. Votre commande a bien été reçue.</p>
        <p className="text-[var(--muted)] mb-6">
          Notre équipe vous contactera sous peu au{' '}
          <span className="font-semibold text-[var(--foreground)]">{form.phone}</span>{' '}
          pour confirmer et organiser la livraison.
        </p>
        <div className="bg-[#fdf4ec] rounded-2xl p-4 mb-6 text-sm text-left">
          <div className="flex items-center gap-2 text-[var(--primary)] font-medium mb-2">
            <Phone size={16} />
            Un doute ? Appelez-nous
          </div>
          <a href="tel:+22791414165" className="text-[var(--primary)] font-bold text-lg">+227 91 41 41 65</a>
        </div>
        <Link href="/" className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Finaliser ma commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
              <h2 className="font-bold text-lg">Vos informations</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Nom complet *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom et prénom"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Téléphone *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+227 XX XX XX XX"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email (optionnel)</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Adresse de livraison *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="Quartier, rue, point de repère"
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ville *</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] bg-white"
                >
                  <option>Niamey</option>
                  <option>Dosso</option>
                  <option>Tillabéri</option>
                  <option>Tahoua</option>
                  <option>Maradi</option>
                  <option>Zinder</option>
                  <option>Agadez</option>
                  <option>Diffa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes (optionnel)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Instructions spéciales, étage, etc."
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] resize-none"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-3">
              <h2 className="font-bold text-lg">Mode de paiement</h2>
              {[
                { value: 'orange_money', label: 'Orange Money', desc: 'Paiement mobile sécurisé' },
                { value: 'airtel_money', label: 'Airtel Money', desc: 'Paiement mobile sécurisé' },
                { value: 'cash', label: 'Paiement à la livraison', desc: 'En espèces à réception' },
              ].map((opt) => (
                <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${form.payment === opt.value ? 'border-[var(--primary)] bg-[#fdf4ec]' : 'border-[var(--border)] hover:border-[var(--primary-light)]'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={form.payment === opt.value}
                    onChange={handleChange}
                    className="accent-[var(--primary)]"
                  />
                  <div>
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-[var(--muted)]">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] text-white py-4 rounded-xl font-bold text-base hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-60"
            >
              {loading ? 'Envoi en cours...' : 'Confirmer ma commande'}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-[var(--border)] p-5 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-[var(--muted)] flex-1 pr-2 line-clamp-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[var(--primary)]">{formatPrice(total())}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">Livraison calculée à la confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
