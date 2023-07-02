import { RootState } from '../index';

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAuthUser = (state: RootState) => state.auth.user;
