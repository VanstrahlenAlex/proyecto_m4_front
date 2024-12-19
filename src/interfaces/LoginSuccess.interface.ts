import { I_User } from "./User.interface";

export interface I_LoginSuccess {
	login: boolean;
	user: I_User;
	token: string;
}