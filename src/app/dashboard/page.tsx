'use client'

import { useAuth } from '@/contexts/AuthContext'
import { I_Orders } from '@/interfaces/Orders.interface'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Purchase {
  id: number
  date: string
  total: number
  products: Array<{ id: number; name: string; quantity: number; price: number }>
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  // Asegurarse de obtener el token solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken)
    }
  }, [])

  const { data: purchases, isLoading, error } = useQuery<Purchase[]>({
    queryKey: ['purchases'],
    queryFn: () =>
      axios
        .get('http://localhost:3030/users/orders', {
          headers: { Authorization: `${token}` }, 
        })
        .then((res) =>
          res.data.map((order: I_Orders) => ({
            id: order.id,
            date: order.date,
            total: order.products.reduce((sum, product) => sum + product.price, 0), 
            products: order.products.map((product) => ({
              id: product.id,
              name: product.name,
              quantity: 1, 
              price: product.price,
            })),
          }))
        ),
    enabled: !!user && !!token, // Solo se ejecuta si user y token existen
  })

  if (!user) return <div>Por favor, inicia sesión para ver esta página.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mis Pedidos</h2>
          {isLoading ? (
            <p>Cargando pedidos...</p>
          ) : error ? (
            <p>Error al cargar los pedidos</p>
          ) : purchases && purchases.length > 0 ? (
            <ul className="space-y-4">
              {purchases.map((purchase) => (
                <li key={purchase.id} className="border-b pb-4">
                  <p>
                    <strong>Fecha:</strong> {new Date(purchase.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${purchase.total.toFixed(2)}
                  </p>
                  <ul className="list-disc pl-5">
                    {purchase.products.map((product) => (
                      <li key={product.id}>
                        {product.name} - Cantidad: {product.quantity}, Precio: ${product.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No has realizado ninguna compra aún.</p>
          )}
        </div>
      </div>
    </div>
  )
}
