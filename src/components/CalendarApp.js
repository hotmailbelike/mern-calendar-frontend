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
		showMonthList: false,
		showYearSelector: false
	};

	weekdayNames = moment.weekdays();
	weekdayShortNames = moment.weekdaysShort();
	monthNames = moment.months();

	currentYear = () => this.state.dateContext.format('Y');

	currentMonth = () => this.state.dateContext.format('MMMM');

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

	onMonthListClick = () => this.setState({ showMonthList: !this.state.showMonthList });

	onMonthClick = (monthName) => {
		let monthNumber = this.monthNames.indexOf(monthName);
		let dateContext = this.state.dateContext;
	};

	//Components (will be separated later)

	Month = (props) => (
		<div className='month'>
			{props.monthNames.map((monthName) => (
				<div key={monthName}>
					<a href='#' onClick={() => this.onMonthClick(monthName)}>
						{monthName}
					</a>
				</div>
			))}
		</div>
	);

	MonthList = (props) => (
		<span className='label-month' onClick={this.onMonthListClick}>
			{this.currentMonth()}
			{this.state.showMonthList && <this.Month monthNames={this.monthNames}></this.Month>}
		</span>
	);

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
						<tr className='calendar-header'>
							<td colSpan='5'>
								<this.MonthList></this.MonthList>
							</td>
						</tr>
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
