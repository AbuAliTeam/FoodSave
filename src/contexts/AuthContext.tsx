'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, AuthState, AuthResponse } from '@/types'

// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null
}

// Типы действий
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }

// Редьюсер для управления состоянием
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: action.payload
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

// Интерфейс контекста
interface AuthContextType extends AuthState {
  login: (phone: string) => Promise<string | null>
  verifyCode: (phone: string, code: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: User) => void
  clearError: () => void
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Провайдер контекста
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Проверка токена при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          // Здесь будет API запрос для проверки токена
          // Пока используем моковые данные
          const mockUser: User = {
            id: '1',
            phone: '+998 90 123 45 67',
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
          dispatch({ type: 'AUTH_SUCCESS', payload: mockUser })
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: '' })
        }
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Ошибка проверки аутентификации' })
      }
    }

    checkAuth()
  }, [])

  // Функция входа
  const login = async (phone: string) => {
    dispatch({ type: 'AUTH_START' })
    try {
      // Здесь будет API запрос для отправки SMS
      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone })
      })

      const data: AuthResponse = await response.json()
      
      if (data.success) {
        // Код отправлен успешно
        dispatch({ type: 'CLEAR_ERROR' })
        return data.code
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: data.error || 'Ошибка отправки кода' })
        return null
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Ошибка сети' })
      return null
    }
  }

  // Функция верификации кода
  const verifyCode = async (phone: string, code: string) => {
    let success = false
    dispatch({ type: 'AUTH_START' })
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      })
      const data: AuthResponse = await response.json()
      console.log('Ответ verifyCode:', data)
      if (data.success && data.user && data.token) {
        localStorage.setItem('auth_token', data.token)
        dispatch({ type: 'AUTH_SUCCESS', payload: data.user })
        success = true
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: data.error || 'Неверный код' })
      }
    } catch (error) {
      console.error('Ошибка верификации:', error)
      dispatch({ type: 'AUTH_FAILURE', payload: 'Ошибка сети' })
    }
    return success
  }

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  // Функция обновления пользователя
  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user })
  }

  // Функция очистки ошибки
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    verifyCode,
    logout,
    updateUser,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Хук для использования контекста
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 