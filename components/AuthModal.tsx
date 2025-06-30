'use client'

import React, { useState, useEffect } from 'react'
import { X, Phone, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/src/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, verifyCode, isLoading, error, clearError } = useAuth()
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const [testCode, setTestCode] = useState<string | null>(null)

  // Таймер для повторной отправки кода
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Очистка формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      setStep('phone')
      setPhone('')
      setCode('')
      setCodeSent(false)
      setCountdown(0)
      clearError()
    }
  }, [isOpen])

  // Обработка отправки номера телефона
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    try {
      const code = await login(phone)
      setTestCode(code || null)
      setCodeSent(true)
      setStep('code')
      setCountdown(60) // 60 секунд до возможности повторной отправки
    } catch (error) {
      console.error('Ошибка отправки кода:', error)
    }
  }

  // Обработка верификации кода
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    const success = await verifyCode(phone, code)
    console.log('verifyCode success:', success)
    if (success) {
      onClose()
    }
    // Ошибки будут показаны через error из контекста
  }

  // Повторная отправка кода
  const handleResendCode = async () => {
    if (countdown > 0) return

    setIsResending(true)
    try {
      const code = await login(phone)
      setTestCode(code || null)
      setCountdown(60)
    } catch (error) {
      console.error('Ошибка повторной отправки кода:', error)
    } finally {
      setIsResending(false)
    }
  }

  // Возврат к вводу номера
  const handleBackToPhone = () => {
    setStep('phone')
    setCode('')
    clearError()
  }

  // Форматирование номера телефона
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.startsWith('998')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  return (
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Баннер с тестовым кодом */}
            {testCode && (
              <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 text-lg font-semibold">
                Тестовый код: <span className="font-mono">{testCode}</span>
              </div>
            )}
            {/* Заголовок */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center space-x-3">
                {step === 'code' && (
                  <button
                    onClick={handleBackToPhone}
                    className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-neutral-600" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {step === 'phone' ? 'Вход в аккаунт' : 'Подтверждение'}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {step === 'phone' 
                      ? 'Введите номер телефона для получения кода' 
                      : `Код отправлен на ${phone}`
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            {/* Форма */}
            <div className="p-6">
              {step === 'phone' ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Номер телефона
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+998 90 123 45 67"
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !phone.trim()}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                      ${isLoading || !phone.trim()
                        ? 'bg-primary-300 text-white cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'}
                    `}
                  >
                    {isLoading ? 'Отправка...' : 'Получить код'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Код подтверждения
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-center text-lg font-mono"
                        required
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Введите 6-значный код из SMS
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={code.length !== 6}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                      ${isLoading
                        ? 'bg-primary-400 text-white cursor-wait'
                        : code.length === 6
                          ? 'bg-primary-500 text-white hover:bg-primary-600'
                          : 'bg-primary-200 text-white cursor-not-allowed'}
                    `}
                  >
                    {isLoading ? 'Проверка...' : 'Войти'}
                  </button>

                  {/* Повторная отправка кода */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={countdown > 0 || isResending}
                      className="text-sm text-primary-600 hover:text-primary-700 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isResending 
                        ? 'Отправка...' 
                        : countdown > 0 
                          ? `Отправить код повторно через ${countdown}с` 
                          : 'Отправить код повторно'
                      }
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Подпись о тестовом режиме */}
            <div className="text-xs text-neutral-500 text-center pb-3">
              Сейчас код отображается на сайте для теста. В будущем он будет приходить по SMS.
            </div>

            {/* Информация о безопасности */}
            <div className="bg-neutral-50 p-4 border-t border-neutral-100">
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Ваши данные защищены и не передаются третьим лицам</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 