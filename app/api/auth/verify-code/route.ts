import { NextRequest, NextResponse } from 'next/server'
import { AuthResponse, User } from '@/types'
import { sign } from 'jsonwebtoken'
import { 
  getVerificationCode, 
  deleteVerificationCode, 
  incrementAttempts,
  cleanupExpiredCodes 
} from '@/src/utils/verificationStore'

// Моковые пользователи (в продакшене используйте базу данных)
const mockUsers = new Map<string, User>()

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()

    console.log('Верификация кода:', { phone, code, nodeEnv: process.env.NODE_ENV })

    // Валидация входных данных
    if (!phone || !code) {
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Неверные данные'
      }, { status: 400 })
    }

    // Очистка устаревших кодов
    cleanupExpiredCodes()

    // Получение данных верификации
    const verificationData = getVerificationCode(phone)
    
    console.log('Данные верификации:', verificationData)
    
    if (!verificationData) {
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Код не найден. Запросите новый код.'
      }, { status: 400 })
    }

    // Проверка срока действия кода
    if (new Date() > verificationData.expiresAt) {
      deleteVerificationCode(phone)
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Код истек. Запросите новый код.'
      }, { status: 400 })
    }

    // Проверка количества попыток
    if (verificationData.attempts >= 3) {
      deleteVerificationCode(phone)
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Превышено количество попыток. Запросите новый код.'
      }, { status: 400 })
    }

    // Увеличение счетчика попыток
    incrementAttempts(phone)

    // Проверка кода (в dev-режиме разрешаем любой код)
    const isDevMode = process.env.NODE_ENV === 'development'
    const isCodeValid = isDevMode || verificationData.code === code
    
    console.log('Проверка кода:', { 
      isDevMode, 
      expectedCode: verificationData.code, 
      providedCode: code, 
      isCodeValid 
    })

    if (!isCodeValid) {
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Неверный код'
      }, { status: 400 })
    }

    // Код верный - удаляем из временного хранилища
    deleteVerificationCode(phone)

    // Поиск или создание пользователя
    let user = mockUsers.get(phone)
    
    if (!user) {
      // Создание нового пользователя
      user = {
        id: `user_${Date.now()}`,
        phone,
        name: 'Пользователь',
        profileType: 'client',
        preferences: {
          categories: [],
          maxDistance: 10,
          notifications: true
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockUsers.set(phone, user)
    }

    // Генерация JWT токена
    const token = sign(
      { userId: user.id, phone: user.phone },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    console.log('Успешная верификация для пользователя:', user.id)

    // Создание ответа с HttpOnly cookie
    const response = NextResponse.json<AuthResponse>({
      success: true,
      user,
      token,
      message: 'Успешный вход'
    })

    // Установка HttpOnly cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 дней
    })

    return response

  } catch (error) {
    console.error('Ошибка верификации кода:', error)
    return NextResponse.json<AuthResponse>({
      success: false,
      error: 'Ошибка верификации. Попробуйте позже.'
    }, { status: 500 })
  }
} 