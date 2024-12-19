"use client";

import { getProductsAPI } from "@/apis/getProductsAPI";
import { I_Product } from "../interfaces/Product.interface";
import { useQuery } from '@tanstack/react-query'


import Card from "./Card";

// const fakeProducts: I_Product[] = [
//   {
//     id: 1,
//     name: "Producto Premium",
//     description: "Una descripción detallada del producto premium",
//     price: 299.99,
//     image: "/placeholder.svg?height=300&width=300",
// 	stock: 10,
//     categoryId: 1
//   },
//   {
//     id: 2,
//     name: "Producto Especial",
//     description: "Características especiales del producto",
//     price: 199.99,
//     image: "/placeholder.svg?height=300&width=300",
//     stock: 15,
//     categoryId: 2
//   },
//   {
//     id: 3,
//     name: "Producto Básico",
//     description: "Un producto con características básicas",
//     price: 99.99,
//     image: "/placeholder.svg?height=300&width=300",
//     stock: 20,
//     categoryId: 3
//   }
// ]

export default function ProductList() {

	const { data: products, isLoading, error } = useQuery<I_Product[]>({
		queryKey: ['products'],
		queryFn: getProductsAPI
	})

	if (isLoading) return <div>Cargando productos...</div>
	if (error) return <div>Error al cargar los productos</div>

	
	
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{/* {fakeProducts.map(product => (
			<Card key={product.id} product={product} />
		))} */}

		{products?.map((product: I_Product) => (
			<Card key={product.id} product={product} />
		))}
		</div>
	)
}
