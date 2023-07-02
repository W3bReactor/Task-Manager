import { UserResponse } from './UserResponse';

export interface CommentResponse {
	_id: string;
	text: string;
	user: UserResponse;
	createdAt: string;
	updatedAt: string;
}
