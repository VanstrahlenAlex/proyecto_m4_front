import { I_Product } from "./Product.interface";
import { I_User } from "./User.interface";

export interface I_Orders {
	id: number;
	status: string;
	date: Date;
	user: I_User;
	products: I_Product[];
}