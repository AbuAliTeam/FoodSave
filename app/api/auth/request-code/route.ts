import { NextRequest, NextResponse } from 'next/server'
import { AuthResponse } from '@/types'
import { saveVerificationCode, cleanupExpiredCodes } from '@/src/utils/verificationStore'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    console.log('Запрос кода для номера:', phone)

    // Валидация номера телефона
    if (!phone || !phone.match(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/)) {
      console.log('Неверный формат номера телефона:', phone)
      return NextResponse.json<AuthResponse>({
        success: false,
        error: 'Неверный формат номера телефона'
      }, { status: 400 })
    }

    // Очистка устаревших кодов
    cleanupExpiredCodes()

    // Генерация 6-значного кода
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    console.log(`Генерирован код для ${phone}: ${code}`)
    
    // В реальном приложении здесь будет интеграция с SMS-сервисом
    // Например, Twilio, Sinch или локальный оператор
    console.log(`SMS код для ${phone}: ${code}`)

    // Сохранение кода в общем хранилище
    saveVerificationCode(phone, code)

    // Имитация задержки отправки SMS
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Код успешно сохранен и отправлен')

    return NextResponse.json<AuthResponse>({
      success: true,
      message: 'Код отправлен на ваш номер телефона',
      code
    })

  } catch (error) {
    console.error('Ошибка отправки SMS:', error)
    return NextResponse.json<AuthResponse>({
      success: false,
      error: 'Ошибка отправки кода. Попробуйте позже.'
    }, { status: 500 })
  }
} 