/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Кастомная цветовая палитра для FoodSave
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Основной зеленый цвет
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fef7ee',
          100: '#fdedd4',
          200: '#fbd7a9',
          300: '#f8bb72',
          400: '#f5953a',
          500: '#f3741d', // Оранжевый для скидок
          600: '#e45a12',
          700: '#bd4412',
          800: '#973615',
          900: '#7a2f15',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Красный для срочных товаров
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      
      // Кастомные шрифты
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      
      // Кастомные тени
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      
      // Кастомные анимации
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      
      // Кастомные размеры для карточек товаров
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Кастомные брейкпоинты для мобильных устройств
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    // Плагин для кастомных компонентов
    function({ addComponents, theme }) {
      addComponents({
        '.btn-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.medium'),
          },
        },
        '.card-product': {
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1rem',
          boxShadow: theme('boxShadow.soft'),
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.large'),
          },
        },
        '.discount-badge': {
          backgroundColor: theme('colors.secondary.500'),
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '600',
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
        },
      })
    }
  ],
} 