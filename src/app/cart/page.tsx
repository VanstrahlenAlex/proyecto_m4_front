'use client'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function Cart() {
  const { items, removeFromCart, clearCart, total } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

const createOrderMutation = useMutation({
  mutationFn: async (orderData: { userId: number; products: number[] }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found in localStorage')
    }

    console.log('Token:', token) // Debug

    return axios.post('http://localhost:3030/orders', orderData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    })
  },
  onSuccess: () => {
    toast({
      title: 'Compra realizada',
      description: 'Tu compra se ha procesado exitosamente.',
    })
    clearCart()
    router.push('/dashboard')
  },
  onError: (error: any) => {
    console.error('Error al procesar la compra:', error)

    const isInvalidToken = error.response?.data?.message === 'Invalid token'
    if (isInvalidToken) {
      toast({
        title: 'Sesión expirada',
        description: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
        variant: 'destructive',
      })
      router.push('/login')
    } else {
      toast({
        title: 'Error',
        description: 'Hubo un problema al procesar tu compra. Intenta de nuevo.',
        variant: 'destructive',
      })
    }
  },
})


  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para realizar una compra.',
        variant: 'destructive',
      })
      return
    }

    const orderData = {
      userId: user.id,
      products: items.flatMap((item) => Array(item.quantity).fill(item.id)),
    }
    console.log('Enviando orderData:', orderData) 
    createOrderMutation.mutate(orderData)
  }

  if (!isAuthenticated) {
    return <div className="container mx-auto px-4 py-8">Por favor, inicia sesión para ver tu carrito.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? 'Procesando...' : 'Proceder al Pago'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
