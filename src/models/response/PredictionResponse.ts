import { UserResponse } from './UserResponse';

export interface PredictionResponse {
	_id: string;
	count: number;
	user: UserResponse;
}
