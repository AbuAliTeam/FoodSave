import React, { useState } from 'react';

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (store: any) => void;
}

export default function AddStoreModal({ isOpen, onClose, onAdd }: AddStoreModalProps) {
  const [form, setForm] = useState({ name: '', address: '', lat: '', lng: '', rating: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
          rating: form.rating ? parseFloat(form.rating) : 0
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Ошибка при добавлении магазина');
      }
      const store = await res.json();
      onAdd(store);
      setForm({ name: '', address: '', lat: '', lng: '', rating: '' });
      onClose();
    } catch (e: any) {
      setError(e.message || 'Ошибка при добавлении магазина');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700">✕</button>
        <h2 className="text-xl font-bold mb-4">Добавить магазин</h2>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required placeholder="Название" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input type="text" required placeholder="Адрес" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <div className="flex gap-2">
            <input type="number" step="any" required placeholder="Широта (lat)" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} className="w-1/2 px-3 py-2 border rounded" />
            <input type="number" step="any" required placeholder="Долгота (lng)" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} className="w-1/2 px-3 py-2 border rounded" />
          </div>
          <input type="number" step="0.1" min="0" max="5" placeholder="Рейтинг (0-5)" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">{isSubmitting ? 'Добавление...' : 'Добавить'}</button>
        </form>
      </div>
    </div>
  );
}
