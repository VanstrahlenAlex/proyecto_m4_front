'use client'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from '@/components/ui/toaster'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
		<CartProvider>
        {children}
		</CartProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}



