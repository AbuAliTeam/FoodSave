'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, LogOut, Settings, Store, ShoppingBag, Heart, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/src/contexts/AuthContext'
import AuthModal from './AuthModal'

export default function ProfileDropdown() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsOpen(!isOpen)
    } else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Кнопка профиля */}
        <button
          onClick={handleProfileClick}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
        >
          {isAuthenticated && user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'Профиль'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
          )}
          <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Выпадающее меню */}
        <AnimatePresence>
          {isOpen && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50"
            >
              {/* Информация о пользователе */}
              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-center space-x-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'Профиль'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {user?.name || 'Пользователь'}
                    </h3>
                    <p className="text-sm text-neutral-600">{user?.phone}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full mt-1">
                      {user?.profileType === 'store' ? 'Магазин' : 'Клиент'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Навигация */}
              <div className="p-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Мой профиль</span>
                </Link>

                {user?.profileType === 'client' ? (
                  <>
                    <Link
                      href="/orders"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Мои заказы</span>
                    </Link>
                    <Link
                      href="/favorites"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="w-5 h-5" />
                      <span>Избранное</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/store/dashboard"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <Store className="w-5 h-5" />
                      <span>Управление магазином</span>
                    </Link>
                    <Link
                      href="/store/products"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Мои товары</span>
                    </Link>
                  </>
                )}

                <Link
                  href="/settings"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Настройки</span>
                </Link>
              </div>

              {/* Выход */}
              <div className="p-2 border-t border-neutral-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выйти</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Модальное окно аутентификации */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
} 