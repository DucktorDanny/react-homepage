import { useEffect } from 'react';

import Line from './Line';
import './Styles/Settings.css';

const Settings = () => {

	useEffect(() => {
		console.log('Hello React! 🦆');
	}, [])

	return (
		<div className='settings'>
			<h1>Settings</h1>
			<Line />
			<form>
				<label htmlFor="show-calendar">Show calendar</label>
				<input className='checkbox' type="checkbox" name="show-calendar" id="show-calendar" />
			</form>
		</div>
	)
}

export default Settings;