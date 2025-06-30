"use client";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import AddProductModal from '@/components/AddProductModal';
import FilterModal from '@/components/FilterModal';
import dynamic from 'next/dynamic';
import { Product, Category, ProductFilters } from '@/types';

const MapComponentClient = dynamic(() => import('@/components/MapComponentClient'), { ssr: false });

const categories: Category[] = [
  { id: 'all', name: 'Все', icon: '🍽️' },
  { id: 'dairy', name: 'Молочка', icon: '🥛' },
  { id: 'bakery', name: 'Выпечка', icon: '🥖' },
  { id: 'fruits', name: 'Фрукты', icon: '🍎' },
  { id: 'vegetables', name: 'Овощи', icon: '🥬' },
  { id: 'meat', name: 'Мясо', icon: '🥩' },
  { id: 'grocery', name: 'Бакалея', icon: '🛒' }
];

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: { min: 0, max: 100000 },
    discountRange: { min: 0, max: 100 },
    distance: 10,
    isUrgent: false,
    rating: 0
  });
  const [viewMode, setViewMode] = useState<'products' | 'map'>('products');
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => setUserLocation({ lat: 41.2995, lng: 69.2401 })
      );
    }
  }, []);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      return res.json();
    },
  });

  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const res = await fetch('/api/stores');
      return res.json();
    },
  });

  // Фильтрация и поиск по товарам
  const filteredProducts = products.filter((product) => {
    // Категория
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    // Поиск
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Фильтры
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (product.discountedPrice < filters.priceRange.min || product.discountedPrice > filters.priceRange.max) return false;
    if (product.discountPercentage < filters.discountRange.min || product.discountPercentage > filters.discountRange.max) return false;
    if (filters.isUrgent && !product.isUrgent) return false;
    if (filters.rating && product.store?.rating < filters.rating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Верхняя часть: заголовок, подзаголовок, поиск, переключатель */}
        <div className="flex flex-col items-center justify-center mb-10 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-3">
            Найдите товары со скидками рядом с вами
          </h1>
          <p className="text-lg text-neutral-600 text-center mb-6">
            Экономьте деньги и помогайте бороться с фуд-вэйстом в Узбекистане
          </p>
          <input
            type="text"
            placeholder="Поиск товаров или магазинов... (поддерживает опечатки)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-5 py-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-sm mb-6"
          />
          <div className="flex gap-2 bg-neutral-100 p-2 rounded-xl shadow mb-2">
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all text-lg ${viewMode === 'products' ? 'bg-green-500 text-white shadow' : 'bg-white text-neutral-700 border border-neutral-300'}`}
              onClick={() => setViewMode('products')}
            >
              <span className="mr-2">🛒</span>Список товаров
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all text-lg ${viewMode === 'map' ? 'bg-green-500 text-white shadow' : 'bg-white text-neutral-700 border border-neutral-300'}`}
              onClick={() => setViewMode('map')}
            >
              <span className="mr-2">📍</span>Карта магазинов
            </button>
          </div>
        </div>
        {/* Контент по режиму */}
        {viewMode === 'map' ? (
          <div className="mb-8 rounded-xl overflow-hidden shadow">
            <MapComponentClient products={filteredProducts} stores={stores} userLocation={userLocation} />
          </div>
        ) : (
          <>
            
            {/* Категории и фильтры */}
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategory === category.id ? 'bg-primary-100 text-primary-700 border-primary-200' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'}`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
              <button
                onClick={() => setShowFilters(true)}
                className="ml-auto px-4 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-all duration-200 flex items-center"
              >
                <span className="mr-2">🔎</span> Фильтры
              </button>
            </div>
            {/* Модалки */}
            <AddProductModal
              isOpen={showAddProduct}
              onClose={() => setShowAddProduct(false)}
              onAdd={() => {
                setShowAddProduct(false);
                queryClient.invalidateQueries({ queryKey: ['products'] });
              }}
            />
            <FilterModal
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onApplyFilters={(f) => { setFilters(f); setShowFilters(false); }}
              initialFilters={filters}
            />
            {/* Список товаров */}
            {isLoading ? (
              <div className="text-center py-12 text-lg">Загрузка...</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToFavorites={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Товары не найдены
                </h3>
                <p className="text-neutral-600">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
} 