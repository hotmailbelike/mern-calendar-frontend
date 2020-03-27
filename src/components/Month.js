import React from 'react';

const Month = (props) =>
	console.log(props) || (
		<div className='month'>
			{props.monthNames.map((monthName) => (
				<div key={monthName}>
					<a href='#' onClick={() => props.onMonthClick(monthName)}>
						{monthName}
					</a>
				</div>
			))}
		</div>
	);

export default Month;
