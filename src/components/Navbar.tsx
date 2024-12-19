'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from './ui/button'


export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const { items } = useCart()

  return (
    <nav className="bg-[#E2D5D5] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-black">
            Logo
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-black hover:text-gray-700">
              Productos
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-black hover:text-gray-700">
                  <User className="h-6 w-6" />
                </Link>
                <Link href="/cart" className="text-black hover:text-gray-700 relative">
                  <ShoppingCart className="h-6 w-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                <Button onClick={logout} variant="ghost">
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Iniciar sesión</Button>
                </Link>
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

