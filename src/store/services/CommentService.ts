import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../customFetchBase';
import { IProject, IProjectUpdate } from '../../models/IProject';
import { ProjectResponse } from '../../models/response/ProjectResponse';
import { IComment } from '../../models/IComment';
import { CommentResponse } from '../../models/response/CommentResponse';

export const commentApi = createApi({
	reducerPath: 'commentApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Comment'],

	endpoints: (builder) => ({
		addComment: builder.mutation<ProjectResponse, IComment>({
			query: ({ text, projectId, taskId }) => ({
				url: `project/${projectId}/task/${taskId}/comment`,
				method: 'POST',
				body: { text },
			}),
			invalidatesTags: ['Comment'],
		}),
		updateComment: builder.mutation<ProjectResponse, IProjectUpdate>({
			query: ({ id, description, title, tags, status }) => ({
				url: 'project',
				method: 'PUT',
				body: { description: description, title, tags, _id: id, status },
			}),
			invalidatesTags: ['Comment'],
		}),
		deleteComment: builder.mutation<ProjectResponse, string>({
			query: (id) => ({
				url: `project/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Comment'],
		}),
		getComments: builder.query<
			CommentResponse[],
			{ projectId: string; taskId: string }
		>({
			query: ({ projectId, taskId }) => ({
				url: `project/${projectId}/task/${taskId}/comment`,
				method: 'GET',
			}),
			providesTags: (result) => ['Comment'],
		}),
		getComment: builder.query<
			CommentResponse,
			{ projectId: string; taskId: string }
		>({
			query: ({ projectId, taskId }) => ({
				url: `project/${projectId}/task/${taskId}/comment`,
				method: 'GET',
			}),
			providesTags: (result) => ['Comment'],
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
