import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../customFetchBase';
import { IProject, IProjectUpdate } from '../../models/IProject';
import { ProjectResponse } from '../../models/response/ProjectResponse';
import { IComment } from '../../models/IComment';
import { CommentResponse } from '../../models/response/CommentResponse';
import { PredictionResponse } from '../../models/response/PredictionResponse';
import {
	IPrediction,
	IPredictionGet,
	IPredictionUpdate,
} from '../../models/IPrediction';

export const predictionApi = createApi({
	reducerPath: 'predictionApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Prediction'],

	endpoints: (builder) => ({
		addPrediction: builder.mutation<PredictionResponse, IPrediction>({
			query: ({ count }) => ({
				url: 'prediction',
				method: 'POST',
				body: { count },
			}),
			invalidatesTags: ['Prediction'],
		}),
		updatePrediction: builder.mutation<PredictionResponse, IPredictionUpdate>({
			query: ({ count, _id }) => ({
				url: 'project',
				method: 'PUT',
				body: { _id, count },
			}),
			invalidatesTags: ['Prediction'],
		}),
		deletePrediction: builder.mutation<ProjectResponse, string>({
			query: (id) => ({
				url: `project/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Prediction'],
		}),
		getPrediction: builder.query<PredictionResponse, IPredictionGet>({
			query: ({ id }) => ({
				url: `prediction/${id}`,
				method: 'GET',
			}),
			providesTags: (result) => ['Prediction'],
		}),
	}),
});

// export const { useRegisterQuery } = userApi;
