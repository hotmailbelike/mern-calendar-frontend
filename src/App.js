import React from 'react';

import CalendarApp from './components/CalendarApp';

import 'normalize.css/normalize.css';

import './styles/style.scss';

const styles = {
	position: 'relative',
	margin: '50px auto',
	width: '500px'
};

function App() {
	return <CalendarApp style={styles}></CalendarApp>;
}

export default App;
