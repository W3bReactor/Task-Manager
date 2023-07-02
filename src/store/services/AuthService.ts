import { createApi } from '@reduxjs/toolkit/query/react';
import { ILogin, IRegister, IUser } from '../../models/IUser';
import {
	AuthResponse,
	RegisterResponse,
} from '../../models/response/UserResponse';
import { baseQuery } from '../customFetchBase';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQuery,
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		register: builder.mutation<RegisterResponse, IRegister>({
			query: ({ name, surname, password, email, post }) => ({
				url: 'register',
				method: 'POST',
				body: { name, surname, password, email, post },
			}),
		}),
		login: builder.mutation<AuthResponse, ILogin>({
			query: ({ password, email }) => ({
				url: 'login',
				method: 'POST',
				body: { password, email },
			}),
			invalidatesTags: ['Project'],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'logout',
				method: 'POST',
			}),
		}),
		checkAuth: builder.query<AuthResponse, void>({
			query: () => ({
				url: 'refresh',
				method: 'GET',
			}),
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
