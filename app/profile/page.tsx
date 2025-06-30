'use client'

import React, { useState } from 'react'
import { User, ShoppingBag, Store, Edit, Camera, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/src/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfileTypeSwitcher from '@/components/ProfileTypeSwitcher'
import AddProductModal from '@/components/AddProductModal'
import AddStoreModal from '@/components/AddStoreModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type TabType = 'profile' | 'orders' | 'store'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddStore, setShowAddStore] = useState(false)
  const [storeProducts, setStoreProducts] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })
  const queryClient = useQueryClient()

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      }
      updateUser(updatedUser)
      setIsEditing(false)
    }
  }

  const handleAddProduct = (product: any) => {
    setStoreProducts([...storeProducts, product])
  }

  const handleAddStore = async (store: any) => {
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: store.name,
          address: store.address,
          lat: Number(store.lat),
          lng: Number(store.lng),
          rating: 0
        })
      });
      if (!res.ok) throw new Error('Ошибка при добавлении магазина');
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    } catch (e) {
      alert('Ошибка: ' + (e as Error).message);
    }
  }

  const tabs = [
    { id: 'profile', name: 'Профиль', icon: User },
    { id: 'orders', name: 'Мои заказы', icon: ShoppingBag },
    ...(user?.profileType === 'store' ? [{ id: 'store', name: 'Мой магазин', icon: Store }] : [])
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Личный кабинет
            </h1>
            <p className="text-neutral-600">
              Управляйте своим профилем и настройками
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-soft mb-8">
            <div className="border-b border-neutral-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-12 h-12 text-primary-600" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold text-neutral-900">
                            {user?.name || 'Пользователь'}
                          </h2>
                          <div className="flex items-center space-x-3">
                            <ProfileTypeSwitcher />
                            <button
                              onClick={() => setIsEditing(!isEditing)}
                              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              <span>{isEditing ? 'Отмена' : 'Редактировать'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-neutral-700">{user?.phone}</p>
                          {user?.email && <p className="text-neutral-700">{user.email}</p>}
                          <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                            {user?.profileType === 'store' ? 'Магазин' : 'Клиент'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-neutral-50 rounded-lg p-6 space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Имя
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            Сохранить
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-400 transition-colors"
                          >
                            Отмена
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                      История заказов
                    </h2>
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        Заказов пока нет
                      </h3>
                      <p className="text-neutral-600">
                        Ваши заказы появятся здесь после покупок
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'store' && user?.profileType === 'store' && (
                  <motion.div
                    key="store"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-neutral-900">
                        Управление магазином
                      </h2>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowAddProduct(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Добавить товар</span>
                        </button>
                        <button
                          onClick={() => setShowAddStore(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <Store className="w-4 h-4" />
                          <span>Добавить магазин</span>
                        </button>
                      </div>
                    </div>
                    <AddStoreModal
                      isOpen={showAddStore}
                      onClose={() => setShowAddStore(false)}
                      onAdd={async (store) => {
                        await handleAddStore(store);
                        setShowAddStore(false);
                      }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary-600">{storeProducts.length}</div>
                        <div className="text-sm text-neutral-600">Активных товаров</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">47</div>
                        <div className="text-sm text-neutral-600">Продано сегодня</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">4.8</div>
                        <div className="text-sm text-neutral-600">Рейтинг магазина</div>
                      </div>
                    </div>

                    {/* Список товаров */}
                    {storeProducts.length > 0 ? (
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                          Мои товары
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {storeProducts.map((product) => (
                            <div key={product.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                              <img
                                src={product && typeof product.image === 'string' && product.image ? product.image : '/images/placeholder.jpg'}
                                alt={product?.name || 'Товар'}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-semibold text-neutral-900 mb-2">{product.name}</h4>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-neutral-600 line-through">
                                    {product.originalPrice.toLocaleString()} сум
                                  </span>
                                  <span className="font-bold text-primary-600">
                                    {product.discountedPrice.toLocaleString()} сум
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-neutral-600">
                                  <span>Остаток: {product.quantity} {product.unit}</span>
                                  <span>Скидка: {product.discountPercentage}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Store className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                          Товаров пока нет
                        </h3>
                        <p className="text-neutral-600 mb-4">
                          Добавьте свой первый товар со скидкой
                        </p>
                        <button 
                          onClick={() => setShowAddProduct(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Добавить товар</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Модальное окно добавления товара */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAdd={handleAddProduct}
      />
    </div>
  )
} 