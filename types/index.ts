// Типы для пользователей
export interface User {
  id: string
  phone: string
  name?: string
  email?: string
  avatar?: string
  profileType: 'client' | 'store' // тип профиля: клиент или магазин
  location?: {
    lat: number
    lng: number
  }
  preferences: {
    categories: string[]
    maxDistance: number
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

// Типы для аутентификации
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface LoginRequest {
  phone: string
}

export interface VerifyCodeRequest {
  phone: string
  code: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
  message?: string
}

// Типы для профиля магазина
export interface StoreProfile {
  id: string
  userId: string
  name: string
  description?: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  phone: string
  email?: string
  workingHours?: {
    open: string
    close: string
  }
  rating: number
  totalProductsSold: number
  ecoRating: number
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Типы для заказов клиента
export interface Order {
  id: string
  userId: string
  storeId: string
  products: {
    productId: string
    product: Product
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  pickupTime?: string
  createdAt: Date
  updatedAt: Date
}

// Типы для магазинов
export interface Store {
  id: string
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  rating: number
  distance: number // в километрах
  phone?: string
  email?: string
  website?: string
  workingHours?: {
    open: string
    close: string
  }
  ecoRating: number // рейтинг за борьбу с фуд-вэйстом
  totalProductsSold: number
  createdAt: Date
  updatedAt: Date
}

// Типы для товаров
export interface Product {
  id: string
  name: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  image: string
  category: string
  expiryDate: string // ISO date string
  store: Store
  description: string
  isUrgent: boolean // срочный товар с истекающим сроком
  quantity?: number
  unit?: string // кг, шт, л и т.д.
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Типы для категорий
export interface Category {
  id: string
  name: string
  icon: string
  description?: string
  color?: string
}

// Типы для фильтров
export interface ProductFilters {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  discountRange: {
    min: number
    max: number
  }
  distance: number // максимальное расстояние в км
  expiryDate?: string // дата истечения срока
  isUrgent?: boolean
  rating?: number // минимальный рейтинг магазина
}

// Типы для поиска
export interface SearchParams {
  query: string
  filters: ProductFilters
  sortBy: 'distance' | 'discount' | 'expiry' | 'rating'
  sortOrder: 'asc' | 'desc'
  page: number
  limit: number
}

// Типы для избранного
export interface Favorite {
  id: string
  userId: string
  productId: string
  product: Product
  createdAt: Date
}

// Типы для уведомлений
export interface Notification {
  id: string
  userId: string
  type: 'new_product' | 'price_drop' | 'expiry_reminder' | 'system'
  title: string
  message: string
  data?: any
  isRead: boolean
  createdAt: Date
}

// Типы для подписок
export interface Subscription {
  id: string
  userId: string
  category: string
  maxDistance: number
  isActive: boolean
  createdAt: Date
}

// Типы для чата
export interface ChatMessage {
  id: string
  chatId: string
  senderId: string
  senderType: 'user' | 'store'
  message: string
  timestamp: Date
  isRead: boolean
}

export interface Chat {
  id: string
  userId: string
  storeId: string
  productId?: string
  messages: ChatMessage[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Типы для аналитики
export interface Analytics {
  totalProducts: number
  totalStores: number
  totalUsers: number
  productsSaved: number
  moneySaved: number
  topCategories: {
    category: string
    count: number
  }[]
  topStores: {
    store: Store
    productsSold: number
  }[]
}

// Типы для API ответов
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Типы для геолокации
export interface Location {
  lat: number
  lng: number
  address?: string
}

// Типы для рекомендаций
export interface Recommendation {
  id: string
  userId: string
  product: Product
  reason: string
  score: number
  createdAt: Date
}

// Типы для экологического рейтинга
export interface EcoRating {
  storeId: string
  store: Store
  rating: number
  productsSaved: number
  wasteReduced: number // в кг
  lastUpdated: Date
}

// Типы для мобильного приложения
export interface PushNotification {
  id: string
  userId: string
  title: string
  body: string
  data?: any
  isSent: boolean
  sentAt?: Date
  createdAt: Date
}

// Типы для интеграции с Telegram
export interface TelegramBot {
  chatId: string
  userId: string
  isActive: boolean
  notifications: {
    newProducts: boolean
    priceDrops: boolean
    expiryReminders: boolean
  }
  createdAt: Date
}

// Типы для мультиязычности
export interface Translation {
  key: string
  uz: string
  ru: string
  en: string
}

// Типы для кэширования
export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // time to live в миллисекундах
}

// Типы для ошибок
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// Типы для валидации
export interface ValidationError {
  field: string
  message: string
  value?: any
}

// Типы для логирования
export interface LogEntry {
  id: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: any
  timestamp: Date
  userId?: string
  ip?: string
  userAgent?: string
}

// Типы для мониторинга
export interface SystemMetrics {
  cpu: number
  memory: number
  disk: number
  activeUsers: number
  requestsPerMinute: number
  averageResponseTime: number
  timestamp: Date
}

// Типы для безопасности
export interface SecurityEvent {
  id: string
  type: 'login' | 'logout' | 'failed_login' | 'suspicious_activity'
  userId?: string
  ip: string
  userAgent: string
  details?: any
  timestamp: Date
}

// Типы для платежей (будущая функциональность)
export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  method: 'card' | 'mobile' | 'cash'
  description: string
  createdAt: Date
  updatedAt: Date
}

// Типы для отзывов
export interface Review {
  id: string
  userId: string
  storeId: string
  productId?: string
  rating: number
  comment?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Типы для статистики магазина
export interface StoreStats {
  storeId: string
  totalProducts: number
  productsSold: number
  totalRevenue: number
  averageRating: number
  ecoRating: number
  period: 'day' | 'week' | 'month' | 'year'
  date: Date
}

// Типы для импорта/экспорта данных
export interface DataExport {
  id: string
  userId: string
  type: 'products' | 'stores' | 'analytics'
  format: 'csv' | 'json' | 'xlsx'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  fileUrl?: string
  createdAt: Date
  completedAt?: Date
} 