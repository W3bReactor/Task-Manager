import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../customFetchBase';
import { IProject, IProjectLeave, IProjectUpdate } from '../../models/IProject';
import {
	ProjectResponse,
	ProjectWithTasksResponse,
} from '../../models/response/ProjectResponse';

export const projectApi = createApi({
	reducerPath: 'projectApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Project'],

	endpoints: (builder) => ({
		addProject: builder.mutation<ProjectResponse, IProject>({
			query: ({ description, title, tags }) => ({
				url: 'project',
				method: 'POST',
				body: { description, title, tags },
			}),
			invalidatesTags: ['Project'],
		}),
		updateProject: builder.mutation<ProjectResponse, IProjectUpdate>({
			query: ({ id, description, title, tags, status, admins, workers }) => ({
				url: 'project',
				method: 'PUT',
				body: {
					description: description,
					title,
					tags,
					_id: id,
					status,
					admins: admins,
					workers: workers,
				},
			}),
			invalidatesTags: ['Project'],
		}),
		leaveProject: builder.mutation<ProjectResponse, IProjectLeave>({
			query: ({ id }) => ({
				url: 'project/leave',
				method: 'PUT',
				body: {
					_id: id,
				},
			}),
			invalidatesTags: ['Project'],
		}),
		deleteProject: builder.mutation<ProjectResponse, string>({
			query: (id) => ({
				url: `project/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Project'],
		}),
		getProjects: builder.query<ProjectResponse[], void>({
			query: () => ({
				url: 'projects',
				method: 'GET',
			}),
			providesTags: (result) => ['Project'],
		}),
		getAdminProjects: builder.query<ProjectResponse[], void>({
			query: () => ({
				url: '/admin/projects',
				method: 'GET',
			}),
			providesTags: (result) => ['Project'],
		}),
		getProjectsWithTasks: builder.query<ProjectWithTasksResponse[], void>({
			query: () => ({
				url: 'projects/tasks',
				method: 'GET',
			}),
			providesTags: (result) => ['Project'],
		}),
		getProject: builder.query<ProjectResponse, string>({
			query: (id) => ({
				url: `projects/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => ['Project'],
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
