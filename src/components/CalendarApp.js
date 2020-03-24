import React from 'react';
import moment from 'moment';

export default class funcName extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.style = props.style;
	// }

	state = {
		dateContext: moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false
	};

	weekdayNames = moment.weekdays();
	weekdayShortNames = moment.weekdaysShort();
	monthsNames = moment.months();

	year = () => this.state.dateContext.format('Y');

	month = () => this.state.dateContext.format('MMMM');

	daysInMonth = () => this.state.dateContext.daysInMonth();

	currentDate = () => this.state.dateContext.get('date');

	currentDay = () => this.state.dateContext.format('D');

	firstDayOfMonth = () =>
		moment(this.state.dateContext)
			.startOf('month')
			.format('d');

	/* 
    firstDay: 0 -> Sunday, ..... , 6 -> Saturday
  */

	render() {
		let weekdayNames = this.weekdayShortNames.map((day) => (
			<td key={day} className='week-day'>
				{day}
			</td>
		));

		let blanksInMonth = [];

		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanksInMonth.push(
				<td key={i} className='blank'>
					{''}
				</td>
			);
		}

		let daysInMonth = [];

		for (let i = 1; i <= this.daysInMonth(); i++) {
			let className = i === this.currentDay() ? 'day current-day' : 'day';
			daysInMonth.push(
				<td key={i} className={className}>
					<span>{i}</span>
				</td>
			);
		}

		let slotsInMonth = [...blanksInMonth, ...daysInMonth];
		let rows = [];
		let cells = [];
		slotsInMonth.forEach((slot, i) => {
			if (i % 7 !== 0) {
				cells.push(slot);
			} else {
				rows.push([...cells]);
				cells = [];
				cells.push(slot);
			}
			if (i === slotsInMonth.length - 1) {
				rows.push([...cells]);
			}
		});

		rows = rows.map((day, i) => <tr key={i}>{day}</tr>);

		return (
			<div className='calendar-container' /* style={this.props.style} */>
				<table className='calendar'>
					<thead>
						<tr className='calendar-header'></tr>
					</thead>
					<tbody>
						<tr>{weekdayNames}</tr>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}
