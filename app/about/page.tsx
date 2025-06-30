'use client'

import React from 'react'
import { Leaf, Target, Users, Award, Globe, TrendingUp, Shield, Heart } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/**
 * Страница "О проекте" - детальное описание миссии FoodSave
 * 
 * Эта страница содержит:
 * - Описание миссии и целей проекта
 * - Обзор предлагаемых функций и возможностей
 * - Обоснование для участия в President Tech Award
 * - Статистику достижений
 * - Призыв к действию для пользователей
 * 
 * Страница полностью интегрирована в существующий дизайн сайта
 * и использует те же компоненты (Header, Footer) и стили.
 */
export default function AboutProject() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Шапка сайта - общий компонент для всех страниц */}
      <Header />
      
      {/* Основной контент страницы */}
      <main className="container mx-auto px-4 py-8">
        {/* Заголовок страницы с описанием проекта */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              О проекте FoodSave
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Первая в Узбекистане социально-ориентированная цифровая платформа для борьбы с продовольственными отходами и поддержки устойчивого развития
            </p>
          </div>
        </section>

        {/* Секция с основной миссией проекта */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Текстовое описание миссии */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                    Наша миссия
                  </h2>
                  <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                    <p>
                      FoodSave — это инновационная платформа, которая помогает людям экономить деньги и одновременно спасает продукты от утилизации. Мы создаем экосистему, соединяющую магазины, стремящиеся сократить списания продуктов, и покупателей, которые хотят сэкономить и заботятся об экологии.
                    </p>
                    <p>
                      Наша цель — превратить борьбу с фуд-вейстом в современный и удобный процесс для каждого жителя Узбекистана, создавая культуру осознанного потребления.
                    </p>
                  </div>
                </div>
                {/* Визуальный элемент с иконкой */}
                <div className="flex justify-center items-center">
                  <img src="/images/logo.svg" alt="FoodSave Logo" className="w-64 h-64 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Секция с описанием предлагаемых функций */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Что мы предлагаем
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Карточка: Интерактивная карта скидок */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Интерактивная карта скидок
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Геолокация и фильтры для быстрого поиска товаров со скидками в ближайших магазинах
                </p>
              </div>

              {/* Карточка: Система эко-рейтинга */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Система эко-рейтинга
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Стимулируем ответственное поведение магазинов и помогаем покупателям делать осознанный выбор
                </p>
              </div>

              {/* Карточка: Личный кабинет для магазинов */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Личный кабинет для магазинов
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Аналитика и удобная загрузка товаров для эффективного управления скидками
                </p>
              </div>

              {/* Карточка: Умные подписки */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Умные подписки
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Персонализированные уведомления о выгодных предложениях в любимых магазинах
                </p>
              </div>

              {/* Карточка: AI-модуль рекомендаций */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  AI-модуль рекомендаций
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Искусственный интеллект подскажет, где собрать список покупок дешевле и экологичнее
                </p>
              </div>

              {/* Карточка: Эко-статистика в реальном времени */}
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  Эко-статистика в реальном времени
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Отслеживаем сколько товаров спасено, семей сэкономили и магазинов участвует
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Секция обоснования для President Tech Award */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              {/* Декоративный фон */}
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    Почему мы достойны President Tech Award
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Социально-ориентированное решение */}
                  <div className="space-y-4 bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white drop-shadow-md">Социально-ориентированное digital-решение</h3>
                    <p className="text-green-100 leading-relaxed font-medium drop-shadow-sm">
                      Мы решаем реальную социальную проблему фуд-вейста в Узбекистане, используя современные технологии для создания положительного социального воздействия.
                    </p>
                  </div>
                  {/* Инновационные технологии */}
                  <div className="space-y-4 bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white drop-shadow-md">Инновационные технологии</h3>
                    <p className="text-green-100 leading-relaxed font-medium drop-shadow-sm">
                      Используем AI для персонализированных рекомендаций, создаем Micro-SaaS для магазинов и открываем новый канал в AdTech с персонализированными акциями.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="bg-white bg-opacity-15 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-lg font-semibold text-white drop-shadow-md">
                      Это решение меняет культуру потребления и снижает экологический ущерб, создавая устойчивую экосистему для всех участников.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Секция статистики и достижений */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              Наши достижения
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Статистика: Товары спасено */}
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="text-4xl font-bold text-primary-600 mb-2">1,247</div>
                <div className="text-sm text-neutral-600">Товаров спасено от утилизации</div>
              </div>
              {/* Статистика: Сэкономлено */}
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="text-4xl font-bold text-secondary-600 mb-2">₿ 12.5M</div>
                <div className="text-sm text-neutral-600">Сэкономлено покупателями</div>
              </div>
              {/* Статистика: Магазинов участвует */}
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="text-4xl font-bold text-accent-600 mb-2">89</div>
                <div className="text-sm text-neutral-600">Магазинов участвует</div>
              </div>
              {/* Статистика: Довольных покупателей */}
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="text-4xl font-bold text-green-600 mb-2">2,450</div>
                <div className="text-sm text-neutral-600">Довольных покупателей</div>
              </div>
            </div>
          </div>
        </section>

        {/* Секция призыва к действию */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary-600" />
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Присоединяйтесь к FoodSave!
              </h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Вместе мы сделаем Узбекистан примером осознанного потребления и борьбы с фуд-вейстом. Каждая покупка со скидкой — это шаг к более устойчивому будущему.
              </p>
              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
                >
                  Начать экономить
                </a>
                <a
                  href="/store-registration"
                  className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
                >
                  Регистрация магазина
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Подвал сайта - общий компонент для всех страниц */}
      <Footer />
    </div>
  )
} 