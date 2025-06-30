'use client'

import { useState } from 'react'
import { X, Filter, Sliders } from 'lucide-react'
import { ProductFilters } from '@/types'

// Интерфейс пропсов для модального окна фильтров
interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: ProductFilters) => void
  initialFilters?: ProductFilters
}

// Компонент модального окна с фильтрами
export default function FilterModal({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  initialFilters 
}: FilterModalProps) {
  // Состояние фильтров
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: { min: 0, max: 100000 },
    discountRange: { min: 0, max: 100 },
    distance: 10,
    isUrgent: false,
    rating: 0,
    ...initialFilters
  })

  // Категории товаров
  const categories = [
    { id: 'dairy', name: 'Молочка', icon: '🥛' },
    { id: 'bakery', name: 'Выпечка', icon: '🥖' },
    { id: 'fruits', name: 'Фрукты', icon: '🍎' },
    { id: 'vegetables', name: 'Овощи', icon: '🥬' },
    { id: 'meat', name: 'Мясо', icon: '🥩' },
    { id: 'grocery', name: 'Бакалея', icon: '🛒' },
    { id: 'frozen', name: 'Замороженные', icon: '🧊' },
    { id: 'beverages', name: 'Напитки', icon: '🥤' }
  ]

  // Обработчик изменения категории
  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  // Обработчик изменения ценового диапазона
  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }))
  }

  // Обработчик изменения диапазона скидок
  const handleDiscountRangeChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      discountRange: {
        ...prev.discountRange,
        [type]: value
      }
    }))
  }

  // Обработчик изменения расстояния
  const handleDistanceChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      distance: value
    }))
  }

  // Обработчик изменения рейтинга
  const handleRatingChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      rating: value
    }))
  }

  // Обработчик применения фильтров
  const handleApplyFilters = () => {
    onApplyFilters(filters)
  }

  // Обработчик сброса фильтров
  const handleResetFilters = () => {
    const resetFilters: ProductFilters = {
      categories: [],
      priceRange: { min: 0, max: 100000 },
      discountRange: { min: 0, max: 100 },
      distance: 10,
      isUrgent: false,
      rating: 0
    }
    setFilters(resetFilters)
  }

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Заголовок модального окна */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-neutral-900">
              Фильтры
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Содержимое модального окна */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Категории */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Категории товаров
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700">
                    {category.icon} {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Ценовой диапазон */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Ценовой диапазон
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                  placeholder="От"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <span className="text-neutral-500">—</span>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                  placeholder="До"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="text-xs text-neutral-500">
                От {formatPrice(filters.priceRange.min)} до {formatPrice(filters.priceRange.max)}
              </div>
            </div>
          </div>

          {/* Диапазон скидок */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Размер скидки
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={filters.discountRange.min}
                  onChange={(e) => handleDiscountRangeChange('min', Number(e.target.value))}
                  placeholder="От"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <span className="text-neutral-500">—</span>
                <input
                  type="number"
                  value={filters.discountRange.max}
                  onChange={(e) => handleDiscountRangeChange('max', Number(e.target.value))}
                  placeholder="До"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <span className="text-neutral-500">%</span>
              </div>
              <div className="text-xs text-neutral-500">
                От {filters.discountRange.min}% до {filters.discountRange.max}%
              </div>
            </div>
          </div>

          {/* Расстояние */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Максимальное расстояние
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={filters.distance}
                onChange={(e) => handleDistanceChange(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-neutral-500">
                До {filters.distance} км
              </div>
            </div>
          </div>

          {/* Минимальный рейтинг */}
          <div>
            <h3 className="text-sm font-medium text-neutral-900 mb-3">
              Минимальный рейтинг магазина
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={(e) => handleRatingChange(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-neutral-500">
                От {filters.rating} звезд
              </div>
            </div>
          </div>

          {/* Срочные товары */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isUrgent}
                onChange={(e) => setFilters(prev => ({ ...prev, isUrgent: e.target.checked }))}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">
                Только срочные товары (с истекающим сроком)
              </span>
            </label>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
          >
            Сбросить
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
            >
              Отмена
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 