import { searchProducts, searchProductsAdvanced, searchStores } from './search'
import { Product } from '@/types'

// Тестовые данные для демонстрации
const testProducts: Product[] = [
  {
    id: '1',
    name: 'Сливочный плавленый сыр "President"',
    originalPrice: 36000,
    discountedPrice: 24000,
    discountPercentage: 33,
    image: '/images/small_685bf28125b93.webp',
    category: 'dairy',
    expiryDate: '2024-01-15',
    store: {
      id: '1',
      name: 'Korzinka.uz - Чиланзар',
      address: 'ул. Чиланзарская, 15',
      rating: 4.5,
      distance: 0.8,
      coordinates: { lat: 41.2995, lng: 69.2401 },
      ecoRating: 4.2,
      totalProductsSold: 1250,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    isUrgent: true,
    description: 'Сливочный сыр высокого качества, отличный для завтрака и перекусов.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Молоко "Nestle" 3.2%',
    originalPrice: 12000,
    discountedPrice: 8000,
    discountPercentage: 33,
    image: '/images/small_685bf2817a253.webp',
    category: 'dairy',
    expiryDate: '2024-01-14',
    store: {
      id: '1',
      name: 'Korzinka.uz - Чиланзар',
      address: 'ул. Чиланзарская, 15',
      rating: 4.5,
      distance: 0.8,
      coordinates: { lat: 41.2995, lng: 69.2401 },
      ecoRating: 4.2,
      totalProductsSold: 1250,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    isUrgent: false,
    description: 'Свежее пастеризованное молоко высшего качества.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Кофе растворимый "Nescafe Gold"',
    originalPrice: 35000,
    discountedPrice: 21000,
    discountPercentage: 40,
    image: '/images/small_685bf27dc6e22.webp',
    category: 'grocery',
    expiryDate: '2024-02-10',
    store: {
      id: '3',
      name: 'Carrefour - Мирабад',
      address: 'ул. Мирабадская, 25',
      rating: 4.7,
      distance: 2.1,
      coordinates: { lat: 41.3111, lng: 69.2797 },
      ecoRating: 4.5,
      totalProductsSold: 2100,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    isUrgent: false,
    description: 'Ароматный растворимый кофе для бодрого утра и приятных встреч.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
]

/**
 * Демонстрация работы интеллектуального поиска
 * Этот файл можно запустить для тестирования функций поиска
 */
export function demonstrateSearch() {
  console.log('🔍 Демонстрация интеллектуального поиска в SaveFood\n')

  // Тест 1: Поиск по точному названию
  console.log('1️⃣ Поиск по точному названию "сыр":')
  const cheeseResults = searchProducts(testProducts, 'сыр')
  console.log(`Найдено товаров: ${cheeseResults.length}`)
  cheeseResults.forEach(product => {
    console.log(`  - ${product.name}`)
  })
  console.log()

  // Тест 2: Поиск с опечаткой
  console.log('2️⃣ Поиск с опечаткой "сырр":')
  const typoResults = searchProducts(testProducts, 'сырр')
  console.log(`Найдено товаров: ${typoResults.length}`)
  typoResults.forEach(product => {
    console.log(`  - ${product.name}`)
  })
  console.log()

  // Тест 3: Поиск по описанию
  console.log('3️⃣ Поиск по описанию "свежее":')
  const freshResults = searchProducts(testProducts, 'свежее')
  console.log(`Найдено товаров: ${freshResults.length}`)
  freshResults.forEach(product => {
    console.log(`  - ${product.name}`)
  })
  console.log()

  // Тест 4: Поиск по магазину
  console.log('4️⃣ Поиск по магазину "korzinka":')
  const storeResults = searchProducts(testProducts, 'korzinka')
  console.log(`Найдено товаров: ${storeResults.length}`)
  storeResults.forEach(product => {
    console.log(`  - ${product.name} (${product.store.name})`)
  })
  console.log()

  // Тест 5: Расширенный поиск
  console.log('5️⃣ Расширенный поиск молочных продуктов до 10000 сум:')
  const advancedResults = searchProductsAdvanced(testProducts, 'молоко', 'dairy', undefined, 10000)
  console.log(`Найдено товаров: ${advancedResults.length}`)
  advancedResults.forEach(product => {
    console.log(`  - ${product.name} (${product.discountedPrice} сум)`)
  })
  console.log()

  // Тест 6: Поиск магазинов
  console.log('6️⃣ Поиск магазинов по названию "carrefour":')
  const stores = searchStores(testProducts, 'carrefour')
  console.log(`Найдено магазинов: ${stores.length}`)
  stores.forEach(store => {
    console.log(`  - ${store.name} (${store.address})`)
  })
  console.log()

  // Тест 7: Пустой поиск
  console.log('7️⃣ Пустой поиск (должен вернуть все товары):')
  const allResults = searchProducts(testProducts, '')
  console.log(`Найдено товаров: ${allResults.length}`)
  console.log()

  console.log('✅ Демонстрация завершена!')
}

// Запуск демонстрации, если файл выполняется напрямую
if (typeof window !== 'undefined') {
  // В браузере можно вызвать через консоль
  (window as any).demonstrateSearch = demonstrateSearch
  console.log('🚀 Для запуска демонстрации введите: demonstrateSearch()')
} 