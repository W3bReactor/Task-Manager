import React from 'react';
import styled, { css } from 'styled-components';
import {
	EmployCount,
	Goal,
	TaskCount,
	TaskTarget,
	TopEmploy,
	TotalStats,
} from '../components';

export const StatsPage = () => {
	return (
		<div>
			<Top>
				<TotalStats />
				<Goal />
			</Top>
			<Middle>
				<TaskTarget />
				<TaskCount />
				<TopEmploy />
			</Middle>
			<Bottom>
				<EmployCount
					count={940}
					percent={94}
					title={'Tachnology & Design Team'}
					styles={EmployCountStyles}
				/>
				<EmployCount
					count={194}
					percent={19}
					title={'Business & Marketing Team'}
					styles={EmployCountStyles}
				/>
				<EmployCount
					count={712}
					percent={71}
					title={'Customer Operation Team'}
				/>
			</Bottom>
		</div>
	);
};

const EmployCountStyles = css`
	margin-right: 20px;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Middle = styled.div`
	margin-top: 25px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Bottom = styled.div`
	margin-top: 25px;
	display: flex;
	flex-direction: row;
`;
