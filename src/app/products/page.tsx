import ProductList from '@/components/ProductList'
import React from 'react'

export default async function ProductsPage() {
	
	
  return (
	<>
	<div className='m-8'>
		<h1 className='text-4xl font-bold mb-4'>Productos</h1>
		<ProductList />
	</div>
	</>
  )
}
