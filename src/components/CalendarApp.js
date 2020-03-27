import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

//get components
import AddTask from './AddTask';
import MonthList from './MonthList';

export default class CalendarApp extends React.Component {
	state = {
		dateContext: moment(),
		showMonthList: false,
		showYearList: ''
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
		let dateContext = { ...this.state.dateContext };
		dateContext = moment(dateContext).set('month', monthNumber);
		this.setState({
			dateContext: dateContext
		});
	};

	onYearListDoubleClick = () => this.setState({ showYearList: true });

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

	//Components (will be separated later)

	// Month = (props) => (
	// 	<div className='month'>
	// 		{props.monthNames.map((monthName) => (
	// 			<div key={monthName}>
	// 				<a href='#' onClick={() => this.onMonthClick(monthName)}>
	// 					{monthName}
	// 				</a>
	// 			</div>
	// 		))}
	// 	</div>
	// );

	// MonthList = (props) => (
	// 	<span className='label-month' onClick={this.onMonthListClick}>
	// 		{this.currentMonth()}
	// 		{this.state.showMonthList && <this.Month monthNames={this.monthNames}></this.Month>}
	// 	</span>
	// );

	YearList = (props) =>
		this.state.showYearList ? (
			<input type='number' defaultValue={this.currentYear()} className='editor-year' onKeyUp={this.onYearListKeyUp} onChange={(e) => this.onYearListChange(e)} />
		) : (
			<span className='label-year' onDoubleClick={this.onYearListDoubleClick}>
				{this.currentYear()}
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
				<td key={i * 17} className='blank'>
					{''}
				</td>
			);
		}
		// i*17 just so key becomes unique

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
					{/* <FontAwesomeIcon className='add-task' icon={faPlus} color={'grey'}></FontAwesomeIcon> */}
					{/* <input className='add-task' type='button' value='+' /> */}
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

		// let temp = this.state.dateContext._d;
		// console.log(temp);

		return (
			<div className='calendar-container' /* style={this.props.style} */>
				<table className='calendar'>
					<thead>
						<tr className='calendar-header'>
							<td colSpan='5'>
								<MonthList onMonthClick={this.onMonthClick} showMonthList={this.state.showMonthList} monthNames={this.monthNames} currentMonth={this.currentMonth} onMonthListClick={this.onMonthListClick}></MonthList> <this.YearList></this.YearList>
							</td>
							<td colSpan='2' className='change-month'>
								<FontAwesomeIcon icon={faChevronLeft} onClick={this.prevMonth}></FontAwesomeIcon> <FontAwesomeIcon icon={faChevronRight} onClick={this.nextMonth}></FontAwesomeIcon>
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
