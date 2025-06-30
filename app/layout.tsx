import './globals.css'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/src/contexts/AuthContext'
import ReactQueryProvider from '@/src/contexts/ReactQueryProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head />
      <body className="antialiased">
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}

export const metadata = {
  title: 'FoodSave',
  icons: {
    icon: 'images/Logo4-modified.png',
  },
}; 