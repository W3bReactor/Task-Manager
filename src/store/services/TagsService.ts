import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../customFetchBase';
import { ITag } from '../../models/ITag';
import { TagResponse } from '../../models/response/TagResponse';

export const tagsApi = createApi({
	reducerPath: 'tagsApi',
	baseQuery: baseQueryWithReauth,

	endpoints: (builder) => ({
		getTags: builder.query<
			TagResponse[],
			{ limit?: number; search?: string; exclude: string[] }
		>({
			query: ({ limit, search, exclude }) => ({
				url: 'tag',
				method: 'GET',
				params: {
					limit: limit,
					search: search,
					exclude: exclude,
				},
			}),
		}),
		addTag: builder.mutation<TagResponse, ITag>({
			query: ({ value }) => ({
				url: 'tag',
				method: 'POST',
				body: { value: value },
			}),
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
