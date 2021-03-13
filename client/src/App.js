import { useState } from 'react';
import { useEffect } from 'react';

import Nav from './Components/Nav/Nav';
import Greeting from './Components/ClockAndGreeting/Greeting';
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

// localStorage.setItem('events', JSON.stringify(events));

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
	const [ favorites, setFavorites ] = useState(favoritesArray);
	const [ greetingPronouns, setGreetingPronouns ] = useState(greeting.pronouns);
	const [ greetingEmoji, setGreetingEmoji ] = useState(greeting.emoji);
	const [ calendarContainerHeight, setCalendarContainerHeight ] =useState(null);

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
	
	/**
	 * These are required because of notification-container's 
	 * height to be equal to calendar's height
	 */
	const updateCalendarContainerHeight = () => {
		// the setTimeout is required because the Calendar's size not changing immediately...
		setTimeout(() => {
			setCalendarContainerHeight(document.querySelector('.react-calendar-container').offsetHeight);
		}, 1);
	}

	// Start up height
	useEffect(() => {
		setCalendarContainerHeight(document.querySelector('.react-calendar-container').offsetHeight);
	}, []);

	// If the height of Calendar is changing
	useEffect(() => {
		if (calendarContainerHeight) {
			document.querySelector('.event-notifications-container').style.height = `${calendarContainerHeight}px`;
		}
	}, [calendarContainerHeight]);

	return (
		<>
			{ showElements ?
				<ThemeProvider theme={theme}>
					<div className='app'>
						<Nav favorites={ favorites } />

						<main>
							<Greeting pronouns={ greetingPronouns } emojis={ greetingEmoji } />
							<Clock />
						</main>

						<div className='bottom-components'>
							<div className='react-calendar-container' onMouseUp={ updateCalendarContainerHeight }>
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
						</div>
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
						getFavorites={ setFavorites }
						getGreetingPronouns={ setGreetingPronouns }
						getGreetingEmoji={ setGreetingEmoji }
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