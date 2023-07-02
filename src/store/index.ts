import { configureStore } from '@reduxjs/toolkit';
import settings from './settings';
import total from './total';
import auth from './auth';

import { userApi } from './services/UserService';
import { authApi } from './services/AuthService';
import { projectApi } from './services/ProjectService';
import { tagsApi } from './services/TagsService';
import { taskApi } from './services/TaskService';
import { commentApi } from './services/CommentService';
import { predictionApi } from './services/PredictionService';

export const store = configureStore({
	reducer: {
		settings,
		total,
		auth,
		[userApi.reducerPath]: userApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[projectApi.reducerPath]: projectApi.reducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[tagsApi.reducerPath]: tagsApi.reducer,
		[predictionApi.reducerPath]: predictionApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(authApi.middleware)
			.concat(projectApi.middleware)
			.concat(tagsApi.middleware)
			.concat(taskApi.middleware)
			.concat(commentApi.middleware)
			.concat(predictionApi.middleware), // .concat(...) Чтобы добавить новый мидл
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
