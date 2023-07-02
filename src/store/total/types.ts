import { Colors } from '../../styles';

export interface totalState {
	items: ITotalItem[];
}

export interface ITotalItem {
	id: number;
	svgName: string;
	title: string;
	count: number;
	percent: number;
	color: Colors;
}
