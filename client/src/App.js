import { useState } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppStyle/App.css';

const App = () => {
	const [value, onChange] = useState(new Date());

	return (
		<>
			<Clock />
			<Calendar
				className='react-calendar'
				onChange={onChange}
				value={value}
			/>
			<Settings />
		</>
	)
	
}
export default App;