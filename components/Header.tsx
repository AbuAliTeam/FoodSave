'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, User, Menu, X, Bell, Heart, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchProducts } from '../src/utils/search'
import SearchSuggestions from './SearchSuggestions'
import ProfileDropdown from './ProfileDropdown'

// Компонент шапки сайта с навигацией и поиском
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Моковые данные для поиска (можно вынести в отдельный файл или получать из props)
  // Здесь для примера импортируем с главной страницы или используем аналогичные

  // Интеллектуальный поиск по мере ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSuggestions(true)
    if (value.trim()) {
      setSearchResults(searchProducts(mockProducts, value))
    } else {
      setSearchResults([])
    }
  }

  // Обработчик поиска (submit)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchResults(searchProducts(mockProducts, searchQuery))
      setShowSuggestions(false)
    }
  }

  // Обработчик выбора подсказки
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setSearchResults(searchProducts(mockProducts, suggestion))
    setShowSuggestions(false)
  }

  // Обработчик переключения меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Обработчик переключения поиска
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="FoodSave Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-neutral-900">FoodSave</span>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="nav-link font-medium"
            >
              Главная
            </Link>
            <Link 
              href="/map" 
              className="nav-link font-medium"
            >
              Карта
            </Link>
            <Link 
              href="/stores" 
              className="nav-link font-medium"
            >
              Магазины
            </Link>
            <Link 
              href="/about" 
              className="nav-link font-medium"
            >
              О проекте
            </Link>
          </nav>

          {/* Правая часть с действиями */}
          <div className="flex items-center space-x-4">
            {/* Поиск */}
            <button
              onClick={toggleSearch}
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Поиск"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Уведомления */}
            <button
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 relative"
              aria-label="Уведомления"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"></span>
            </button>

            {/* Избранное */}
            <Link
              href="/favorites"
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Избранное"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Профиль */}
            <ProfileDropdown />

            {/* Кнопка меню для мобильных */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Меню"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Поисковая строка (раскрывающаяся) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSearch} className="py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Поиск товаров, магазинов..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
                  >
                    Найти
                  </button>
                  {/* Подсказки поиска */}
                  <SearchSuggestions
                    isVisible={showSuggestions && !!searchQuery}
                    searchQuery={searchQuery}
                    onSuggestionClick={handleSuggestionClick}
                    onClose={() => setShowSuggestions(false)}
                  />
                </div>
              </form>
              {/* Результаты поиска */}
              {searchQuery && searchResults.length > 0 && (
                <div className="bg-white border-t border-neutral-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product, idx) => (
                    <div key={product.id || idx} className="px-6 py-3 border-b border-neutral-100 flex items-center gap-4 hover:bg-neutral-50 transition-colors duration-200">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-medium text-neutral-900">{product.name}</div>
                        <div className="text-xs text-neutral-500">{product.store?.name}</div>
                      </div>
                      <div className="ml-auto text-primary-600 font-bold">{product.discountedPrice?.toLocaleString()} сум</div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center text-neutral-500 py-6">Ничего не найдено</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-neutral-200"
            >
              <nav className="py-4 space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Главная
                </Link>
                <Link
                  href="/map"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Карта магазинов
                </Link>
                <Link
                  href="/stores"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Все магазины
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Избранное
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О проекте
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 