"use client";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";



export const dynamicParams = true; // Permite parámetros dinámicos (opcional)

// export async function generateStaticParams() {
// 	return [
// 		{ id: "1" },
// 		{ id: "2" },
// 		{ id: "3" },
// 	];
// }

export default function ProductIdPage() {
	// Validación del parámetro id
	const ID = useParams();
	console.log(ID);
	
	// const id = Number(params?.id);
	const id = Number(ID.id);

	if (isNaN(id)) {
		return <div>Error: Invalid Product ID</div>;
	}

	return (
		<>
			{/* Puedes personalizar el título u otras partes */}
			<ProductDetail id={id} />
		</>
	);
}
