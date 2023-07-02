import { RootState } from '../index';

export const selectTotalItems = (state: RootState) => state.total.items;
