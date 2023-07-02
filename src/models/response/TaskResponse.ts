import { UserResponse } from './UserResponse';

export interface TaskResponse {
	_id: string;
	title: string;
	description: string;
	tags: string[];
	workers: UserResponse[];
	admins: UserResponse[];
	comments: string[];
	status: 'waiting' | 'in progress' | 'completed';
	timer: number;
	timerPlay: number;
	dueDate: Date;
	createdAt: string;
	updatedAt: string;
}
