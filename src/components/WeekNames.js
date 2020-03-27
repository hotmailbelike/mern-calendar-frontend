import React from 'react';

const WeekNames = (props) => (
	<tr>
		{props.weekdayShortNames.map((weekName) => (
			<td key={weekName} className='week-name'>
				{weekName}
			</td>
		))}
	</tr>
);

export default WeekNames;
