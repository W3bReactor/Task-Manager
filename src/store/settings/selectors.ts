import { RootState } from '../index';

export const selectSettingsActiveMenu = (state: RootState) =>
	state.settings.activeMenu;
export const selectSettingsItems = (state: RootState) => state.settings.items;
export const selectSettingsProject = (id: string) => (state: RootState) =>
	state.settings.tasks.find((task) => task.id === id);
