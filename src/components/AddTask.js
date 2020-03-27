import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddTask extends React.Component {
	state = {
		buttonMode: true,
		textMode: false,
		value: '',
		taskId: '',
		id: ''
	};

	componentDidMount() {
		let taskId = this.props.id;
		// console.log(taskId);
		this.setState({ taskId });

		fetch('http://localhost:2000/calendarApp/' + taskId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((res) => {
				if (res[0]) {
					this.changeToText();
					this.setState({ value: res[0].task, id: res[0]._id });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	changeToText = () => this.setState({ buttonMode: false, textMode: true });
	changeToButton = () => this.setState({ buttonMode: true, textMode: false });
	removeTask = () => {
		let id = this.state.id;

		if (!this.state.value || this.state.value === '' || this.state.value.length <= 0) {
			this.changeToButton();
			fetch('http://localhost:2000/calendarApp/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((res) => {
					// console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	saveTask = (e) => {
		let value = e.target.value;
		this.setState({ value }, () => {
			this.removeTask();
		});
		let taskId = this.state.taskId;
		let id = this.state.id;
		if (!id || id.length <= 0 || id === '') {
			fetch('http://localhost:2000/calendarApp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ task: value, taskId })
			})
				.then((response) => response.json())
				.then((result) => {
					this.setState({ id: result._id });
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			fetch('http://localhost:2000/calendarApp/' + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ task: value })
			})
				.then((response) => response.json())
				.then((result) => {
					// console.log(result);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	render() {
		return (
			<div>
				{this.state.buttonMode && <FontAwesomeIcon className='add-task button' icon={faPlus} color={'grey'} onClick={this.changeToText}></FontAwesomeIcon>}
				{this.state.textMode && <textarea rows={'3'} onChange={this.saveTask} value={this.state.value} className='add-task text' type='text'></textarea>}
			</div>
		);
	}
}
