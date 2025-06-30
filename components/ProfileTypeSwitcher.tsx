'use client'

import React, { useState } from 'react'
import { User, Store, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/src/contexts/AuthContext'

export default function ProfileTypeSwitcher() {
  const { user, updateUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleProfileTypeChange = (profileType: 'client' | 'store') => {
    if (user) {
      const updatedUser = {
        ...user,
        profileType
      }
      updateUser(updatedUser)
      setIsOpen(false)
    }
  }

  const profileTypes = [
    {
      id: 'client',
      name: 'Клиент',
      description: 'Покупайте товары со скидками',
      icon: User,
      features: [
        'Просмотр товаров со скидками',
        'История заказов',
        'Избранные товары',
        'Уведомления о новых скидках'
      ]
    },
    {
      id: 'store',
      name: 'Магазин',
      description: 'Управляйте своими товарами',
      icon: Store,
      features: [
        'Добавление товаров со скидками',
        'Управление ассортиментом',
        'Статистика продаж',
        'Аналитика просмотров'
      ]
    }
  ]

  const currentProfile = profileTypes.find(p => p.id === user?.profileType)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
      >
        {currentProfile && (
          <>
            <currentProfile.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{currentProfile.name}</span>
          </>
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full mt-2 left-0 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50"
        >
          <div className="p-4 border-b border-neutral-100">
            <h3 className="font-semibold text-neutral-900 mb-2">
              Выберите тип профиля
            </h3>
            <p className="text-sm text-neutral-600">
              Переключитесь между режимами клиента и магазина
            </p>
          </div>

          <div className="p-4 space-y-3">
            {profileTypes.map((profile) => {
              const Icon = profile.icon
              const isActive = user?.profileType === profile.id
              
              return (
                <button
                  key={profile.id}
                  onClick={() => handleProfileTypeChange(profile.id as 'client' | 'store')}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                    isActive
                      ? 'border-primary-200 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-primary-100' : 'bg-neutral-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-primary-600' : 'text-neutral-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold ${
                          isActive ? 'text-primary-900' : 'text-neutral-900'
                        }`}>
                          {profile.name}
                        </h4>
                        {isActive && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">
                        {profile.description}
                      </p>
                      
                      <ul className="space-y-1">
                        {profile.features.map((feature, index) => (
                          <li key={index} className="text-xs text-neutral-500 flex items-center">
                            <div className="w-1 h-1 bg-neutral-400 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="p-4 bg-neutral-50 border-t border-neutral-100">
            <p className="text-xs text-neutral-600">
              Вы можете изменить тип профиля в любое время в настройках
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
} 