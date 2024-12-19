'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { I_Product } from '@/interfaces/Product.interface'

interface CartItem extends I_Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: I_Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } else {
      setItems([])
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isAuthenticated])

  const addToCart = (product: I_Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

