// import { getProductByIdAPI } from "@/apis/getProductsAPI";

import ProductDetail from "@/components/ProductDetail";



export default async function ProductIdPage({ params }: { params: { id: number } }) {	
	const id = Number(params.id);

	return (
		<>
			{/* <div>ProductPage with {id}</div> */}
			<ProductDetail id={id} />
		</>
	)
}