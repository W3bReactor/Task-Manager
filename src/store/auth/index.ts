import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authState } from './types';
import { IUser } from '../../models/IUser';

const initialState: authState = {
	isAuth: false,
	user: {
		email: '',
		isActivated: false,
		id: '',
		post: '',
		avatar: '',
		name: '',
		surname: '',
		contacts: {},
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
	},
});

export const { setIsAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
