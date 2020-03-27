import React from 'react';

const YearList = (props) =>
	props.showYearList ? (
		<input min={1} max={9999} type='number' defaultValue={props.currentYear()} className='editor-year' onKeyUp={props.onYearListKeyUp} onChange={props.onYearListChange} />
	) : (
		<span className='label-year' onClick={props.onYearListClick}>
			{props.currentYear()}
		</span>
	);

export default YearList;
