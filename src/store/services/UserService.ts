import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser, IUserShort } from '../../models/IUser';
import { baseQueryWithReauth } from '../customFetchBase';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUsers: builder.query<
			IUserShort[],
			{ search?: string; exclude?: string }
		>({
			query: ({ search, exclude }) => ({
				url: 'users',
				method: 'GET',
				params: {
					search: search,
					exclude: exclude,
				},
			}),
			providesTags: (result) => ['User'],
		}),
		getUser: builder.query<IUser, string>({
			query: (id) => ({
				url: `users/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => ['User'],
		}),
		getMe: builder.query<IUser, void>({
			query: () => ({
				url: 'me',
				method: 'GET',
			}),
			providesTags: (result) => ['User'],
		}),
		upload: builder.mutation<IUser, FormData>({
			query: (file) => ({
				url: 'upload',
				method: 'POST',
				body: file,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
