import Image from 'next/image'
import { I_Product } from '@/interfaces/Product.interface';
import { Button } from './ui/button';
import Link from 'next/link';

interface CardProps {
	product: I_Product;
}

export default function Card({ product }: CardProps) {
	return (
		<div className="bg-[#E2D5D5] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
		<div className="relative h-48">
			<Image 
			src={product.image} 
			alt={product.name}
			fill
			className="object-cover"
			/>
		</div>
		<div className="p-4">
			<div className="bg-[#FFA7A7] text-[#000000] inline-block px-2 py-1 rounded text-sm mb-2">
			{product.categoryId}
			</div>
			<h2 className="text-xl font-semibold mb-2 text-black">{product.name}</h2>
			<p className="text-gray-700 mb-4">{product.description}</p>
			<div className="flex justify-between items-center">
				<span className="text-2xl font-bold text-[#1b3c83]">
				{product.stock}
			</span>
			<span className="text-2xl font-bold text-[#C0AF4F]">
				${product.price}
			</span>
				<Link href={`/products/${product.id}`}>
					<Button size="default">
						Ver más
					</Button>
				</Link>
			</div>
		</div>
		</div>
	)
}

