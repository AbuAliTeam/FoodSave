// Глобальное хранилище для кодов верификации (работает в dev-режиме Next.js)
const globalAny = globalThis as any;
if (!globalAny.__verificationCodes) {
  globalAny.__verificationCodes = new Map();
}
export const verificationCodes = globalAny.__verificationCodes as Map<string, { code: string; attempts: number; expiresAt: Date }>;

// Функция для очистки устаревших кодов
export const cleanupExpiredCodes = () => {
  const now = new Date()
  Array.from(verificationCodes.entries()).forEach(([phone, data]) => {
    if (now > data.expiresAt) {
      verificationCodes.delete(phone)
    }
  })
}

// Функция для получения кода верификации
export const getVerificationCode = (phone: string) => {
  return verificationCodes.get(phone)
}

// Функция для сохранения кода верификации
export const saveVerificationCode = (phone: string, code: string) => {
  const verificationData = {
    code,
    attempts: 0,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 минут
  }
  verificationCodes.set(phone, verificationData)
}

// Функция для удаления кода верификации
export const deleteVerificationCode = (phone: string) => {
  verificationCodes.delete(phone)
}

// Функция для увеличения счетчика попыток
export const incrementAttempts = (phone: string) => {
  const data = verificationCodes.get(phone)
  if (data) {
    data.attempts++
  }
} 