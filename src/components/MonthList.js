import React from 'react';

//get component
import Month from './Month';

const MonthList = (props) => (
	<span className='label-month' onClick={props.onMonthListClick}>
		{props.currentMonth()}
		{props.showMonthList && <Month onMonthClick={props.onMonthClick} monthNames={props.monthNames}></Month>}
	</span>
);

export default MonthList;
