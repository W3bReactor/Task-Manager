export interface settingsState {
	activeMenu: number;
	items: ISidebarMenu[];
	tasks: ISettingsProject[];
	modal: boolean;
}

interface ISidebarMenu {
	id: number;
	name: string;
	svgName: string;
}
export interface ISettingsProject {
	id: string;
	isOpen: boolean;
}
