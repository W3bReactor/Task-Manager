import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../customFetchBase';
import { IProject, IProjectUpdate } from '../../models/IProject';
import { ProjectResponse } from '../../models/response/ProjectResponse';
import { TaskResponse } from '../../models/response/TaskResponse';
import { ITask, ITaskUpdate } from '../../models/ITask';
import { projectApi } from './ProjectService';

export const taskApi = createApi({
	reducerPath: 'taskApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Task'],

	endpoints: (builder) => ({
		addTask: builder.mutation<TaskResponse, ITask>({
			query: ({ description, title, tags, dueDate, projectId, timer }) => ({
				url: `project/${projectId}/task`,
				method: 'POST',
				body: { description, title, tags, timer, dueDate },
			}),
			invalidatesTags: ['Task'],
			async onQueryStarted(__, { dispatch }) {
				dispatch(projectApi.util.invalidateTags(['Project']));
			},
		}),
		updateTask: builder.mutation<TaskResponse, ITaskUpdate>({
			query: ({
				id,
				description,
				title,
				tags,
				status,
				projectId,
				timer,
				dueDate,
				admins,
				workers,
			}) => ({
				url: `project/${projectId}/task/`,
				method: 'PUT',
				body: {
					description: description,
					title,
					tags,
					_id: id,
					status,
					timer,
					dueDate,
					admins,
					workers,
				},
			}),
			invalidatesTags: ['Task'],
			async onQueryStarted(__, { dispatch }) {
				dispatch(projectApi.util.invalidateTags(['Project']));
			},
		}),
		deleteTask: builder.mutation<void, { projectId: string; taskId: string }>({
			query: ({ taskId, projectId }) => ({
				url: `project/${projectId}/task/${taskId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Task'],
			async onQueryStarted(__, { dispatch }) {
				dispatch(projectApi.util.invalidateTags(['Project']));
			},
		}),
		getTasks: builder.query<TaskResponse[], string>({
			query: (projectId) => ({
				url: `project/${projectId}/task`,
				method: 'GET',
			}),
			providesTags: (result) => ['Task'],
		}),
		leave: builder.mutation<TaskResponse[], string>({
			query: (taskId) => ({
				url: `project/task/leave`,
				method: 'PUT',
				body: {
					_id: taskId,
				}
			}),
			invalidatesTags: ['Task'],
			async onQueryStarted(__, { dispatch }) {
				dispatch(projectApi.util.invalidateTags(['Project']));
			},
		}),
		getAdminTasks: builder.query<TaskResponse[], string>({
			query: (projectId) => ({
				url: `/admin/project/${projectId}/task`,
				method: 'GET',
			}),
			providesTags: (result) => ['Task'],
		}),
		getTask: builder.query<TaskResponse, { projectId: string; taskId: string }>(
			{
				query: ({ projectId, taskId }) => ({
					url: `project/${projectId}/task/${taskId}`,
					method: 'GET',
				}),
				providesTags: (result) => ['Task'],
			}
		),
	}),
});

// export const { useRegisterQuery } = userApi;
