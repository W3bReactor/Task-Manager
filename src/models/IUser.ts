export interface IUser {
	email: string;
	isActivated: boolean;
	id: string;
	avatar?: string;
	name: string;
	surname: string;
	post: string;
	contacts: Contacts;
}

export interface IUserShort {
	email: string;
	_id: string;
	avatar?: string;
	name: string;
	surname: string;
	post: string;
}

export interface Contacts {
	vk?: string;
	inst?: string;
	twitter?: string;
	gh?: string;
}

export interface IRegister {
	name: string;
	surname: string;
	password: string;
	email: string;
	post: string;
}

export interface ILogin {
	password: string;
	email: string;
}
