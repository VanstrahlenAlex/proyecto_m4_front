"use client"

import ProductList from "@/components/ProductList";
//import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
	

	return (
		// redirect('/login')
		<>
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="m-4 items-center">
				<h1 className="text-2xl text-center font-bold text-[#CA1A1A] mb-4">Welcome to Henry Ecommerce!</h1>
				<Image src="/ecommerce.png" alt="ecommerce" width={500} height={500} />
				</div>
				
				<p>¿Ya tienes una cuenta? <Link href="/login" className="text-blue-500 hover:underline">Inicia sesión</Link></p>
				{/* <Link href="/home">
					<Button>
						Go Home
					</Button>
				</Link> */}
			</div>
			<div className="-mt-16 p-8">
				<ProductList />
			</div>
		</>
	);
}
