import { ShoppingCart, LayoutDashboard , HomeIcon, ShoppingBasket  } from 'lucide-react'

interface NavItem {
	text: string;
	path: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const navItems: NavItem[] = [
	{
		text: 'Inicio',
		path: '/',
		icon: HomeIcon,
	},
	{
		text: 'Productos',
		path: '/products',
		icon: ShoppingBasket,
	},
	{
		text: 'Carrito',
		path: '/cart',
		icon: ShoppingCart,
	},
	{
		text: 'Dashboard',
		path: '/dashboard',
		icon: LayoutDashboard,
	},
];