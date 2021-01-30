import { useState } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppStyle/App.css';

// links:

// * basic heart favicon: https://iconmonstr.com/favorite-4-svg/
// * basic heart add new favicon: https://iconmonstr.com/favorite-13-png/
// burger: https://www.npmjs.com/package/@animated-burgers/burger-squeeze
// https://march08.github.io/animated-burgers/
// calendar component: https://www.npmjs.com/package/react-calendar
// checkbox component: https://www.npmjs.com/package/react-checkbox-component

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