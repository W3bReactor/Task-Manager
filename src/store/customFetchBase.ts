import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { Mutex } from 'async-mutex';
import { userApi } from './services/UserService';
import { setIsAuth, setUser } from './auth';
import { AuthResponse } from '../models/response/UserResponse';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_SERVER_URL}/api`,
	prepareHeaders: (headers) => {
		headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
		return headers;
	},
	credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: 'refresh',
						method: 'GET',
						credentials: 'include',
					},
					api,
					extraOptions
				);
				localStorage.setItem(
					'token',
					(refreshResult.data as AuthResponse).accessToken
				);
				api.dispatch(setUser((refreshResult.data as AuthResponse).user));

				if (refreshResult.data) {
					// Retry the initial query
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(setIsAuth(false));
				}
			} finally {
				// release must be called once the mutex should be released again.
				release();
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};
