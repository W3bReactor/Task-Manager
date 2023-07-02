export interface IProject {
	title: string;
	description: string;
	tags?: string[];
}

export interface IProjectUpdate {
	title?: string;
	description?: string;
	tags?: string[];
	status?: string;
	id: string;
	admins?: string[];
	workers?: string[];
}

export interface IProjectLeave {
	id: string;
}
