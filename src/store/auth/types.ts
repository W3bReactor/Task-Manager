import { IUser } from '../../models/IUser';

export interface authState {
	isAuth: boolean;
	user: IUser;
}
