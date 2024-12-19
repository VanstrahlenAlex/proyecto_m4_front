import { I_Product } from '@/interfaces/Product.interface';
import axios from 'axios';

const API_URL = 'http://localhost:3030';

export const getProductsAPI = async (): Promise<I_Product[]> => {
	try {
		const response = await axios.get(`${API_URL}/products`);
		return response.data
	} catch (error) {
		console.error('Error al obtener los productos:', error)
		throw error
	}
}


export const getProductByIdAPI = async (id: number) => {
	const products = await getProductsAPI();
	const product = products.find((product) => product.id === id);
	if(!product) throw new Error('Producto no encontrado');
	return product;
};



export const getOrdersAPI = async () => {
	const response = await axios.get(`${API_URL}/users/orders`);
	if (!response.data) throw new Error('No se pudieron obtener los pedidos');

	return response.data;
};
