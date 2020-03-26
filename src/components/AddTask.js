import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddTask extends React.Component {
	state = {
		buttonMode: true,
		textMode: false,
		value: '',
		id: ''
	};

	componentDidMount() {
		let id = this.state.id;
		if (id || id.length >= 0 || id !== '') {
			fetch('localhost:2000/calendarApp/' + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})
				.then((response) => response.json())
				.then((result) => {
					this.setState({ task: result.task });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	changeToText = () => this.setState({ buttonMode: false, textMode: true });
	changeToButton = () => this.setState({ buttonMode: true, textMode: false });

	saveTask = (e) => {
		this.setState({ value: e.target.value });
		let id = this.state.id;
		if (!id || id.length <= 0 || id === '') {
			fetch('localhost:2000/calendarApp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(this.state.value)
			})
				.then((response) => response.json())
				.then((result) => {
					this.setState({ id: result._id });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	saveChanges = (e) => {
		e.preventDefault();
		if (this.state.value === '' || this.state.value.length <= 0) {
			this.changeToButton();
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
