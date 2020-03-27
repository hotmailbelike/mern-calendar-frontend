import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

//get components
import AddTask from './AddTask';
import MonthList from './MonthList';
import YearList from './YearList';
import WeekNames from './WeekNames';

export default class CalendarApp extends React.Component {
	state = {
		dateContext: moment(),
		showMonthList: false,
		showYearList: ''
	};

	// weekNames = moment.weekdays();
	weekdayShortNames = moment.weekdaysShort();
	monthNames = moment.months();

	currentYear = () => this.state.dateContext.format('Y');

	currentMonth = () => this.state.dateContext.format('MMMM');

	daysInMonth = () => this.state.dateContext.daysInMonth();

	// currentDate = () => this.state.dateContext.get('date');

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
		let dateContext = { ...this.state.dateContext };
		dateContext = moment(dateContext).set('month', monthNumber);
		this.setState({
			dateContext: dateContext
		});
	};

	onYearListClick = () => this.setState({ showYearList: true });

	setYear = (year) => {
		let dateContext = { ...this.state.dateContext };
		dateContext = moment(dateContext).set('year', year);
		this.setState({ dateContext });
	};

	onYearListChange = (e) => {
		this.setYear(e.target.value);
	};

	onYearListKeyUp = (e) => {
		if (e.which === 13 || e.which === 27) {
			this.setYear(e.target.value);
			this.setState({ showYearList: false });
		}
	};

	nextMonth = () => {
		let dateContext = { ...this.state.dateContext };
		dateContext = moment(dateContext).add(1, 'month');
		this.setState({ dateContext });
	};

	prevMonth = () => {
		let dateContext = { ...this.state.dateContext };
		dateContext = moment(dateContext).subtract(1, 'month');
		this.setState({ dateContext });
	};

	render() {
		let blanksInMonth = [];

		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanksInMonth.push(
				<td key={i * 17} className='blank'>
					{''}
				</td>
			);
		}
		// i*17 just to generate unique key

		let daysInMonth = [];

		let dateContext = this.state.dateContext;
		dateContext = dateContext.format().split('-');
		// console.log(dateContext[1]);
		// console.log(dateContext[0]);
		dateContext = dateContext[1] + dateContext[0];

		for (let i = 1; i <= this.daysInMonth(); i++) {
			// let className = i == this.currentDay() ? 'day current-day' : 'day';
			let className = 'day';
			daysInMonth.push(
				<td valign='top' key={i + dateContext} className={className}>
					<span>{i}</span>
					<br />

					<AddTask id={i + dateContext}></AddTask>
				</td>
			);
		}

		// console.log(daysInMonth);

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
								<MonthList onMonthClick={this.onMonthClick} showMonthList={this.state.showMonthList} monthNames={this.monthNames} currentMonth={this.currentMonth} onMonthListClick={this.onMonthListClick}></MonthList> <YearList showYearList={this.state.showYearList} currentYear={this.currentYear} onYearListKeyUp={this.onYearListKeyUp} onYearListChange={this.onYearListChange} onYearListClick={this.onYearListClick}></YearList>
							</td>
							<td colSpan='2' className='change-month'>
								<FontAwesomeIcon icon={faChevronLeft} onClick={this.prevMonth}></FontAwesomeIcon> <FontAwesomeIcon icon={faChevronRight} onClick={this.nextMonth}></FontAwesomeIcon>
							</td>
						</tr>
					</thead>
					<tbody>
						<WeekNames weekdayShortNames={this.weekdayShortNames}></WeekNames>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}
