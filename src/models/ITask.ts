import { UserResponse } from './response/UserResponse';

export interface ITask {
	title: string;
	description: string;
	tags?: string[];
	dueDate: Date;
	timer?: number;
	projectId: string;
}

export interface ITaskUpdate {
	id: string;
	title?: string;
	description?: string;
	tags?: string[];
	dueDate?: Date;
	timer?: number;
	projectId: string;
	status?: string;
	admins?: string[];
	workers?: string[];
}
