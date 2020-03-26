import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddTask extends React.Component {
	state = {
		buttonMode: true,
		textMode: false,
		value: ''
	};

	changeToText = () => this.setState({ buttonMode: false, textMode: true });

	saveTask = (e) => {
		this.setState({ value: e.target.value });
	};

	saveChanges = (e) => {
		// if (e.which === 13 && (e.target.value === '' || e.target.value.length <= 0)) {
		// 	this.setState({ buttonMode: true, textMode: false });
		// }
		e.preventDefault();
		if (this.state.value === '' || this.state.value.length <= 0) {
			this.setState({ buttonMode: true, textMode: false });
		}
	};

	//save task to dbms and makesure to return its ID

	render() {
		return (
			<div>
				{this.state.buttonMode && <FontAwesomeIcon className='add-task button' icon={faPlus} color={'grey'} onClick={this.changeToText}></FontAwesomeIcon>}
				{this.state.textMode && (
					<form onSubmit={this.saveChanges}>
						<input onChange={this.saveTask} value={this.state.value} className='add-task text' type='text' />
					</form>
				)}
			</div>
		);
	}
}
