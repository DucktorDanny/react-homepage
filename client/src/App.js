import { useState } from 'react';
// import { useEffect } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import EventNotification from './Components/CalendarEvents/EventNotification';
import Calendar from 'react-calendar';
import CalendarEvents from './Components/CalendarEvents/CalendarEvents';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './AppStyle/App.css';

const datas = JSON.parse(localStorage.getItem('datas'));
const events = JSON.parse(localStorage.getItem('events')) || {};

// events['27/02/2021'].push({
// 	title: 'I dont know',
// 	content: 'I dont even know what I am doing here just writing something shit...'
// });

// console.log(events['27/02/2021']);

// localStorage.setItem('events', JSON.stringify(events));
console.log(datas);
const showElements = datas ? datas.showElements : {
   calendar: true,
   favorites: true,
	greeting: true,
	notifications: true,
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

// font-family: 'Combo', cursive;
// font-family: 'Comic Neue', cursive;
const theme = createMuiTheme({
	typography: {
		fontFamily: [
			'"Comic Neue"',
			'cursive'
		].join(','),
	}
});

const todayKey = new Date().toLocaleDateString();

const App = () => {
	const [ value, onChange ] = useState(new Date());
	const [ chosenDate, setChosenDate ] = useState(null);
	const [ calendarEventsShowing, setCalendarEventsShowing ] = useState(null);

	const openCalendarEvents = (e) => {
		const convertedEvent = new Date(e.toString()).toLocaleDateString();
		setChosenDate(convertedEvent);
		setCalendarEventsShowing(true);
	}
	const closeCalendarEvents = (e) => {
		setCalendarEventsShowing(false);

		// time to end the animation of window closing
		setTimeout(() => {
			setChosenDate(null);
		}, 500);
	}

	return (
		<>
			{ showElements ?
				<ThemeProvider theme={theme}>
					<Clock />
					<div className='bottom-components'>
						<div className='react-calendar-container'>
							<Calendar
								// className='react-calendar'
								onChange={onChange}
								value={value}
								onClickDay={openCalendarEvents}
							/>
							<div className='calendar-events-show-all-button'>
								<Button
									type='button'
									variant='contained'
									onClick={() => {
										setChosenDate(null);
										setCalendarEventsShowing(true);
									}}
								>Show all events</Button>
							</div>
						</div>

						<EventNotification events={events[todayKey]} />

						{/* <div style={{
							width: '50px',
							height: '100px',
							background: 'white',
							margin: '.8rem',
						}}></div> */}
					</div>

					<CalendarEvents
						date={chosenDate}
						events={events}
						show={calendarEventsShowing}
						onClose={closeCalendarEvents}
					/>
					<Settings
						showElements={ showElements }
						greeting={ greeting }
						favoritesArray={ favoritesArray }
						backgroundColor={ backgroundColor }
					/>
				</ThemeProvider>
			: <h1 style={{
				display: 'block',
				margin: 'auto',
				color: 'white',
			}}>Loading...</h1> }
		</>
	)
	
}
export default App;