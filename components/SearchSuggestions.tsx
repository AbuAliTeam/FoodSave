import React from 'react'
import { Search, Clock, TrendingUp } from 'lucide-react'

interface SearchSuggestionsProps {
  isVisible: boolean
  searchQuery: string
  onSuggestionClick: (suggestion: string) => void
  onClose: () => void
}

/**
 * Компонент подсказок для интеллектуального поиска
 * Показывает популярные запросы и помогает пользователям быстрее найти нужные товары
 */
export default function SearchSuggestions({
  isVisible,
  searchQuery,
  onSuggestionClick,
  onClose
}: SearchSuggestionsProps) {
  // Популярные поисковые запросы
  const popularSearches = [
    'молоко',
    'хлеб',
    'сыр',
    'фрукты',
    'овощи',
    'мясо',
    'кофе',
    'чай'
  ]

  // Недавние поиски (в реальном приложении будут храниться в localStorage)
  const recentSearches = [
    'сливочный сыр',
    'персики',
    'кофе nescafe'
  ]

  // Фильтруем подсказки на основе текущего запроса
  const filteredPopular = popularSearches.filter(
    search => search.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRecent = recentSearches.filter(
    search => search.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 mt-1">
      {/* Популярные запросы */}
      {filteredPopular.length > 0 && (
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center text-sm text-neutral-500 mb-3">
            <TrendingUp className="w-4 h-4 mr-2" />
            Популярные запросы
          </div>
          <div className="space-y-2">
            {filteredPopular.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 flex items-center"
              >
                <Search className="w-4 h-4 mr-3 text-neutral-400" />
                <span className="text-neutral-700">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Недавние поиски */}
      {filteredRecent.length > 0 && (
        <div className="p-4">
          <div className="flex items-center text-sm text-neutral-500 mb-3">
            <Clock className="w-4 h-4 mr-2" />
            Недавние поиски
          </div>
          <div className="space-y-2">
            {filteredRecent.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 flex items-center"
              >
                <Search className="w-4 h-4 mr-3 text-neutral-400" />
                <span className="text-neutral-700">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Если нет подсказок */}
      {filteredPopular.length === 0 && filteredRecent.length === 0 && searchQuery && (
        <div className="p-4 text-center text-neutral-500">
          <p>Попробуйте поискать что-то другое</p>
        </div>
      )}

      {/* Подсказка о возможностях поиска */}
      {!searchQuery && (
        <div className="p-4 border-t border-neutral-100">
          <p className="text-xs text-neutral-500">
            💡 Поиск поддерживает опечатки и неточные совпадения
          </p>
        </div>
      )}
    </div>
  )
} 