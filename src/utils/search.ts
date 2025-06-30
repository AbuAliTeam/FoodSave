import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import { Product, Store } from '@/types';

/**
 * Интеллектуальный поиск товаров с поддержкой опечаток и неточного совпадения
 * Использует библиотеку Fuse.js для fuzzy-поиска
 * 
 * @param products - массив товаров для поиска
 * @param query - поисковый запрос пользователя
 * @returns отфильтрованный массив товаров, отсортированный по релевантности
 */
export function searchProducts(products: Product[], query: string): Product[] {
  // Если запрос пустой, возвращаем все товары
  if (!query.trim()) return products;

  // Создаем экземпляр Fuse с настройками для поиска
  const fuse = new Fuse(products, {
    // Поля для поиска: название товара, описание и название магазина
    keys: [
      { name: 'name', weight: 0.6 },        // Название товара - самый важный критерий
      { name: 'description', weight: 0.3 }, // Описание товара - средний приоритет
      { name: 'store.name', weight: 0.1 }   // Название магазина - низкий приоритет
    ],
    includeScore: true,     // Включаем оценку релевантности в результаты
    threshold: 0.4,         // Порог совпадения (0.0 = точное совпадение, 1.0 = любое совпадение)
    distance: 100,          // Максимальное расстояние между символами для поиска
    minMatchCharLength: 2,  // Минимальная длина совпадающей подстроки
    ignoreLocation: true,   // Игнорируем позицию совпадения в строке
    useExtendedSearch: false // Используем простой поиск (не расширенный синтаксис)
  });

  // Выполняем поиск
  const results = fuse.search(query);
  
  // Преобразуем результаты в массив товаров, отсортированный по релевантности
  // Fuse.js возвращает результаты в порядке возрастания score (лучшие совпадения первыми)
  return results.map((result: FuseResult<Product>) => result.item);
}

/**
 * Расширенный поиск с дополнительными фильтрами
 * Позволяет искать по категории товара и диапазону цен
 * 
 * @param products - массив товаров для поиска
 * @param query - поисковый запрос
 * @param category - категория товара (опционально)
 * @param minPrice - минимальная цена (опционально)
 * @param maxPrice - максимальная цена (опционально)
 * @returns отфильтрованный массив товаров
 */
export function searchProductsAdvanced(
  products: Product[], 
  query: string, 
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Product[] {
  // Сначала выполняем базовый поиск
  let filtered = searchProducts(products, query);

  // Фильтруем по категории, если указана
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }

  // Фильтруем по минимальной цене
  if (minPrice !== undefined) {
    filtered = filtered.filter(product => product.discountedPrice >= minPrice);
  }

  // Фильтруем по максимальной цене
  if (maxPrice !== undefined) {
    filtered = filtered.filter(product => product.discountedPrice <= maxPrice);
  }

  return filtered;
}

/**
 * Поиск магазинов по названию и адресу
 * 
 * @param products - массив товаров (для извлечения уникальных магазинов)
 * @param query - поисковый запрос
 * @returns массив уникальных магазинов, соответствующих запросу
 */
export function searchStores(products: Product[], query: string): Store[] {
  if (!query.trim()) return [];

  // Извлекаем уникальные магазины из товаров
  const stores = products.reduce((unique: Store[], product) => {
    const exists = unique.find(store => store.id === product.store.id);
    if (!exists) {
      unique.push(product.store);
    }
    return unique;
  }, []);

  // Создаем Fuse для поиска по магазинам
  const fuse = new Fuse(stores, {
    keys: [
      { name: 'name', weight: 0.7 },      // Название магазина - высокий приоритет
      { name: 'address', weight: 0.3 }    // Адрес магазина - средний приоритет
    ],
    includeScore: true,
    threshold: 0.4,
    distance: 100
  });

  const results = fuse.search(query);
  return results.map((result: FuseResult<Store>) => result.item);
} 