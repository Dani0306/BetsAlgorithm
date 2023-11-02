"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AppContextProvider from '@/context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
