import { createSlice } from '@reduxjs/toolkit';
import { totalState } from './types';
import { Colors } from '../../styles';

const initialState: totalState = {
	items: [
		{
			id: 46523426436,
			svgName: 'employ',
			title: 'Total Employees',
			color: Colors.AQUA,
			count: 2316,
			percent: 0,
		},
		{
			id: 46533426436,
			svgName: 'bag',
			title: 'Total Tasks',
			color: Colors.ORANGE,
			count: 2316,
			percent: 0,
		},
		{
			id: 46523424436,
			svgName: 'multiselect',
			title: 'Complated Task',
			color: Colors.PINK,
			count: 2316,
			percent: 0,
		},
		{
			id: 46523466436,
			svgName: 'close',
			title: 'Incompleted Task',
			color: Colors.PRIMARY,
			count: 2316,
			percent: 0,
		},
	],
};

export const totalSlice = createSlice({
	name: 'total',
	initialState,
	reducers: {},
});

// export const {} = totalSlice.actions;

export default totalSlice.reducer;
