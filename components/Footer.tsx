'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, Heart, Leaf } from 'lucide-react'

// Компонент подвала сайта
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О проекте */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="FoodSave Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold">FoodSave</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Платформа для поиска товаров со скидками и борьбы с фуд-вэйстом в Узбекистане. 
              Экономьте деньги и помогайте сохранить окружающую среду.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-400">
              <Leaf className="w-4 h-4 text-green-500" />
              <span>Спасаем продукты от утилизации</span>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  href="/map" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Карта магазинов
                </Link>
              </li>
              <li>
                <Link 
                  href="/stores" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Все магазины
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  О проекте
                </Link>
              </li>
              <li>
                <Link 
                  href="/how-it-works" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Как это работает
                </Link>
              </li>
            </ul>
          </div>

          {/* Для магазинов */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Для магазинов</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/store-registration" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Регистрация магазина
                </Link>
              </li>
              <li>
                <Link 
                  href="/store-dashboard" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Личный кабинет
                </Link>
              </li>
              <li>
                <Link 
                  href="/store-guide" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Руководство магазина
                </Link>
              </li>
              <li>
                <Link 
                  href="/eco-rating" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Эко-рейтинг
                </Link>
              </li>
              <li>
                <Link 
                  href="/analytics" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Аналитика
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-400">
                  Ташкент, Узбекистан
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-neutral-400" />
                <a 
                  href="tel:+998333000318" 
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  +998 33 300 03 18
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-neutral-400" />
                <a 
                  href="mailto:info@foodsave.uz" 
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  info@foodsave.uz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-neutral-400" />
                <a 
                  href="https://foodsave.uz" 
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  foodsave.uz
                </a>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Мы в соцсетях</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://t.me/foodsave_uz" 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <span className="text-white text-sm font-bold">T</span>
                </a>
                <a 
                  href="https://instagram.com/foodsave_uz" 
                  className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <span className="text-white text-sm font-bold">I</span>
                </a>
                <a 
                  href="https://facebook.com/foodsave.uz" 
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <span className="text-white text-sm font-bold">F</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-neutral-400">
              <span>&copy; {currentYear} FoodSave. Все права защищены.</span>
              <span>•</span>
              <Link 
                href="/privacy" 
                className="hover:text-white transition-colors duration-200"
              >
                Политика конфиденциальности
              </Link>
              <span>•</span>
              <Link 
                href="/terms" 
                className="hover:text-white transition-colors duration-200"
              >
                Условия использования
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-neutral-400">
              <span>Сделано с</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>в Узбекистане</span>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-400">1 250 000 UZS</div>
              <div className="text-xs text-neutral-400">Сэкономлено пользователями</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 