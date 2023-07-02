import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISettingsProject, settingsState } from './types';

const initialState: settingsState = {
	activeMenu: 6546546,
	tasks: [
		{
			id: '351252',
			isOpen: false,
		},
	],
	modal: false,
	items: [
		{
			id: 6546546,
			name: 'Dashboard',
			svgName: 'dashboard',
		},
		{
			id: 6346346,
			name: 'Projects',
			svgName: 'projects',
		},
		{
			id: 6456534,
			name: 'My Task',
			svgName: 'task',
		},
		{
			id: 64235643,
			name: 'Message',
			svgName: 'message',
		},
		{
			id: 6587657543,
			name: 'Analytics',
			svgName: 'analytics',
		},
	],
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setActiveMenu: (state, action: PayloadAction<number>) => {
			state.activeMenu = action.payload;
		},

		setSettingsTask: (state, action: PayloadAction<ISettingsProject>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
			state.tasks = [...state.tasks, action.payload];
		},
	},
});

export const { setActiveMenu, setSettingsTask } = settingsSlice.actions;

export default settingsSlice.reducer;
