import { UserResponse } from './UserResponse';
import { TaskResponse } from './TaskResponse';

export interface ProjectResponse {
	title: string;
	description: string;
	tags: string[];
	workers: UserResponse[];
	admins: UserResponse[];
	tasks: string[];
	status: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface ProjectWithTasksResponse {
	title: string;
	description: string;
	tags: string[];
	workers: UserResponse[];
	admins: UserResponse[];
	tasks: TaskResponse[];
	status: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}
