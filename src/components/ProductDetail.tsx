'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductByIdAPI } from '@/apis/getProductsAPI'
import Image from 'next/image'

import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'

import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'

export default function ProductDetail({ id }: { id: number }) {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByIdAPI(id)
  })

  if (isLoading) return <div>Cargando producto...</div>
  if (error) return <div>Error al cargar el producto</div>
  if (!product) return <div>Producto no encontrado</div>

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Producto agregado",
      description: "El producto se ha agregado al carrito exitosamente.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image 
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-[#C0AF4F] mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </Button>
          ) : (
            <p className="text-gray-600">Inicia sesión para agregar al carrito</p>
          )}
        </div>
      </div>
    </div>
  )
}

