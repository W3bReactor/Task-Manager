import { IUser } from '../IUser';

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export interface RegisterResponse {
	message: string;
}

export interface ErrorMessage {
	message: string;
	errors: string[];
}

export interface UserResponse {
	_id: string;
	name: string;
	email: string;
	surname: string;
	avatar: string;
	post: string;
}
