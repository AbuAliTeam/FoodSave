'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, MapPin, Star, Clock, ShoppingBag } from 'lucide-react'
import { Product } from '@/types'

// Интерфейс пропсов для компонента карточки товара
interface ProductCardProps {
  product: Product
  onAddToFavorites: (productId: string) => void
  onAddToCart?: (productId: string) => void
  isFavorite?: boolean
}

// Компонент карточки товара
export default function ProductCard({ 
  product, 
  onAddToFavorites, 
  onAddToCart,
  isFavorite = false 
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true)
  }

  // Обработчик добавления в избранное
  const handleFavoriteClick = async () => {
    setIsLoading(true)
    try {
      await onAddToFavorites(product.id)
    } catch (error) {
      console.error('Ошибка добавления в избранное:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id)
    }
  }

  // Вычисляем количество дней до истечения срока
  const daysUntilExpiry = Math.ceil(
    (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  // Определяем цвет для срочности
  const getUrgencyColor = () => {
    if (daysUntilExpiry <= 1) return 'bg-accent-500'
    if (daysUntilExpiry <= 3) return 'bg-secondary-500'
    return 'bg-primary-500'
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

  // Форматирование расстояния
  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}м`
    }
    return `${distance.toFixed(1)}км`
  }

  // Форматирование даты истечения
  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 0) return 'Истек'
    if (diffDays === 1) return 'Завтра'
    if (diffDays <= 7) return `${diffDays} дн.`
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="product-card group">
      {/* Изображение товара */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-neutral-100">
          {(!imageError && product.image && typeof product.image === 'string' && product.image.length > 5) ? (
            <Image
              src={product.image.startsWith('http') ? product.image : (product.image.startsWith('/') ? product.image : '/images/placeholder.jpg')}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          ) : (
            <Image
              src={'/images/placeholder.jpg'}
              alt="Нет фото"
              width={300}
              height={300}
              className="w-full h-full object-cover opacity-70"
            />
          )}
        </div>

        {/* Бейдж скидки */}
        <div className="discount-badge">
          -{product.discountPercentage}%
        </div>

        {/* Бейдж срочности */}
        {product.isUrgent && (
          <div className="urgent-badge">
            <Clock className="w-3 h-3 inline mr-1" />
            Срочно
          </div>
        )}

        {/* Кнопка избранного */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-medium' 
              : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} 
          />
        </button>

        {/* Кнопка добавления в корзину */}
        {onAddToCart && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors duration-200 shadow-medium"
            aria-label="Добавить в корзину"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="product-card-content">
        {/* Название товара */}
        <h3 className="product-card-title">
          {product.name}
        </h3>

        {/* Описание */}
        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Цены */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="product-card-price">
              {formatPrice(product.discountedPrice)}
            </span>
            <span className="product-card-original-price">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          
          {/* Скидка */}
          <span className="product-card-discount">
            -{product.discountPercentage}%
          </span>
        </div>

        {/* Информация о магазине */}
        <div className="border-t border-neutral-100 pt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900 text-sm">
              {product.store?.name || 'Без магазина'}
            </h4>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-neutral-600">
                {product.store?.rating ?? '-'}
              </span>
            </div>
          </div>

          {/* Адрес и расстояние */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">
                {product.store?.address ?? '-'}
              </span>
            </div>
            <span>
              {product.store?.distance !== undefined ? formatDistance(product.store.distance) : '-'}
            </span>
          </div>
        </div>

        {/* Срок годности */}
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-neutral-600">
              <Clock className="w-3 h-3" />
              <span>Срок годности:</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor()} text-white`}>
              {formatExpiryDate(product.expiryDate)}
            </span>
          </div>
          
          {/* Прогресс-бар срока годности */}
          <div className="mt-2">
            <div className="w-full bg-neutral-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  daysUntilExpiry <= 1 ? 'bg-accent-500' :
                  daysUntilExpiry <= 3 ? 'bg-secondary-500' : 'bg-primary-500'
                }`}
                style={{ 
                  width: `${Math.max(10, Math.min(100, (daysUntilExpiry / 7) * 100))}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Экологический рейтинг магазина */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-neutral-600">Эко-рейтинг:</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-2 h-2 rounded-full ${
                    star <= (product.store?.ecoRating ?? 0)
                      ? 'bg-green-500'
                      : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-neutral-600">
              {product.store?.ecoRating !== undefined ? product.store.ecoRating.toFixed(1) : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 