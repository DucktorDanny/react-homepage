import { useState } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import Calendar from 'react-calendar';
import CalendarEvents from './Components/CalendarEvents/CalendarEvents';
import 'react-calendar/dist/Calendar.css';
import './AppStyle/App.css';

const datas = JSON.parse(localStorage.getItem('datas'));

const showElements = datas ? datas.showElements : {
   calendar: true,
   favorites: true,
   greeting: true,
};
const greeting = datas ? datas.greeting : {
   pronouns: 'friend',
   emoji: '🐣',
};
const favoritesArray = datas ? datas.favoritesArray : [
   {
      name: 'Youtube',
      url: 'https://youtube.com',
   },
   {
      name: 'Facebook',
      url: 'https://facebook.com'
   },
];
const backgroundColor = datas ? datas.backgroundColor : {
   R: 7,
   G: 55,
   B: 89,
};

const App = () => {
	const [ value, onChange ] = useState(new Date());
	const [ chosenDate, setChosenDate ] = useState(Date);
	const [ calendarEventsShowing, setCalendarEventsShowing ] = useState(null);

	const openCalendarEvents = (e) => {
		setChosenDate(e+'');
		setCalendarEventsShowing(true);
	}
	const closeCalendarEvents = (e) => {
		setCalendarEventsShowing(false);
	}

	return (
		<>
			{ showElements ?
				<>
					<Clock />
					<Calendar
						className='react-calendar'
						onChange={onChange}
						value={value}
						onClickDay={openCalendarEvents}
					/>
					<CalendarEvents
						date={chosenDate}
						show={calendarEventsShowing}
						onClose={closeCalendarEvents}
					/>
					<Settings
						showElements={ showElements }
						greeting={ greeting }
						favoritesArray={ favoritesArray }
						backgroundColor={ backgroundColor }
					/>
				</>
			: <h1 style={{
				display: 'block',
				margin: 'auto',
				color: 'white',
			}}>Loading...</h1> }
		</>
	)
	
}
export default App;