'use client'

import React, { useState, useEffect } from 'react'
import { X, Upload, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: any) => void
}

const categories = [
  { id: 'dairy', name: 'Молочка', icon: '🥛' },
  { id: 'bakery', name: 'Выпечка', icon: '🥖' },
  { id: 'fruits', name: 'Фрукты', icon: '🍎' },
  { id: 'vegetables', name: 'Овощи', icon: '🥬' },
  { id: 'meat', name: 'Мясо', icon: '🥩' },
  { id: 'grocery', name: 'Бакалея', icon: '🛒' }
]

function AddStoreModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (store: any) => void }) {
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

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    unit: 'шт',
    expiryDate: '',
    imageUrl: '',
    image: null as File | null,
    storeId: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stores, setStores] = useState<any[]>([])
  const [loadingStores, setLoadingStores] = useState(true)
  const [showAddStore, setShowAddStore] = useState(false)

  useEffect(() => {
    fetch('/api/stores')
      .then(async res => {
        if (!res.ok) return [];
        try {
          return await res.json();
        } catch {
          return [];
        }
      })
      .then(data => setStores(Array.isArray(data) ? data : []))
      .catch(() => setStores([]))
      .finally(() => setLoadingStores(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const product = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        originalPrice: parseFloat(formData.originalPrice),
        discountedPrice: parseFloat(formData.discountedPrice),
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : new Date().toISOString(),
        image: formData.imageUrl || '/images/placeholder.jpg',
        discountPercentage: Math.round(
          ((parseFloat(formData.originalPrice) - parseFloat(formData.discountedPrice)) / parseFloat(formData.originalPrice)) * 100
        ),
        storeId: formData.storeId
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })

      if (!response.ok) throw new Error('Ошибка при добавлении товара')

      const savedProduct = await response.json()
      onAdd(savedProduct)
      onClose()
      resetForm()
    } catch (error) {
      console.error('Ошибка добавления товара:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      originalPrice: '',
      discountedPrice: '',
      quantity: '',
      unit: 'шт',
      expiryDate: '',
      imageUrl: '',
      image: null,
      storeId: ''
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const discountPercentage = formData.originalPrice && formData.discountedPrice
    ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.discountedPrice)) / parseFloat(formData.originalPrice)) * 100)
    : 0

  return (
    <>
      <AddStoreModal
        isOpen={showAddStore}
        onClose={() => setShowAddStore(false)}
        onAdd={store => {
          setStores(prev => [...prev, store]);
          setFormData(fd => ({ ...fd, storeId: store.id }));
          setShowAddStore(false);
        }}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900">
                    Добавить товар
                  </h2>
                  <p className="text-sm text-neutral-600">
                    Заполните информацию о товаре со скидкой
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Фото товара
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {formData.image ? (
                        <div className="space-y-2">
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="w-32 h-32 mx-auto rounded-lg object-cover"
                          />
                          <p className="text-sm text-neutral-600">{formData.image.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 mx-auto text-neutral-400" />
                          <p className="text-sm text-neutral-600">
                            Нажмите для загрузки фото
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Название товара *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Категория *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Опишите товар, его особенности..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Оригинальная цена *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                        required
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                        ₿
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Цена со скидкой *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.discountedPrice}
                        onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                        required
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                        ₿
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Скидка
                    </label>
                    <div className="px-3 py-2 bg-neutral-100 rounded-lg text-center">
                      <span className="text-lg font-semibold text-primary-600">
                        {discountPercentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Количество *
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Единица измерения
                    </label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="шт">шт</option>
                      <option value="кг">кг</option>
                      <option value="л">л</option>
                      <option value="г">г</option>
                      <option value="мл">мл</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Срок годности *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Ссылка на изображение товара
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Магазин
                  </label>
                  {loadingStores ? (
                    <div className="text-neutral-500 text-sm">Загрузка магазинов...</div>
                  ) : stores.length > 0 ? (
                    <select
                      value={formData.storeId || ''}
                      onChange={e => setFormData({ ...formData, storeId: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Без магазина</option>
                      {stores.map((store: any) => (
                        <option key={store.id} value={store.id}>{store.name} — {store.address}</option>
                      ))}
                    </select>
                  ) : (
                    <button type="button" onClick={() => setShowAddStore(true)} className="text-primary-600 underline">Добавить магазин</button>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Добавление...' : 'Добавить товар'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-400 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 