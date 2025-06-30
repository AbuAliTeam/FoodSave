// Тестовый скрипт для проверки API аутентификации
const testAuth = async () => {
  const baseUrl = 'http://localhost:3000/api'
  const phone = '+998 90 123 45 67'
  
  console.log('🧪 Тестирование API аутентификации...')
  console.log('📱 Номер телефона:', phone)
  
  try {
    // 1. Запрос кода
    console.log('\n1️⃣ Запрос кода верификации...')
    const requestResponse = await fetch(`${baseUrl}/auth/request-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    })
    
    const requestData = await requestResponse.json()
    console.log('Ответ запроса кода:', requestData)
    
    if (!requestData.success) {
      console.error('❌ Ошибка запроса кода:', requestData.error)
      return
    }
    
    // 2. Верификация с любым кодом (в dev-режиме)
    console.log('\n2️⃣ Верификация кода...')
    const testCode = '123456'
    console.log('Тестовый код:', testCode)
    
    const verifyResponse = await fetch(`${baseUrl}/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: testCode })
    })
    
    const verifyData = await verifyResponse.json()
    console.log('Ответ верификации:', verifyData)
    
    if (verifyData.success) {
      console.log('✅ Верификация успешна!')
      console.log('👤 Пользователь:', verifyData.user.name)
      console.log('🔑 Токен получен:', !!verifyData.token)
    } else {
      console.error('❌ Ошибка верификации:', verifyData.error)
    }
    
  } catch (error) {
    console.error('❌ Ошибка тестирования:', error.message)
  }
}

// Запуск теста
testAuth() 