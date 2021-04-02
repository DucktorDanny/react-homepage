import { useState, useEffect } from 'react';

import Nav from './Components/Nav/Nav';
import Greeting from './Components/ClockAndGreeting/Greeting';
import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import EventNotification from './Components/CalendarEvents/EventNotification';
import CalendarEvents from './Components/CalendarEvents/CalendarEvents';

import ReactNotifications, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './AppStyle/App.css';

// if a user has an older version what used datas instead of data
const datas = JSON.parse(localStorage.getItem('datas'));
let updated = false;
if (datas) {
	localStorage.removeItem('datas');
	localStorage.setItem('data', JSON.stringify(datas));
	updated = true;
	console.log('Refreshed older version.');
}

const data = JSON.parse(localStorage.getItem('data'));
const events = JSON.parse(localStorage.getItem('events')) || {};

const showElements = data ? data.showElements : {
   calendar: true,
   favorites: true,
	greeting: true,
	notifications: true,
	seconds: true,
	twentyFourClockMode: false,
};
const greeting = data ? data.greeting : {
   pronouns: 'friend',
   emoji: '🐣',
};
const favoritesArray = data ? data.favoritesArray : [
   {
      name: 'Youtube',
      url: 'https://youtube.com',
   },
   {
      name: 'Facebook',
      url: 'https://facebook.com'
   },
];
const backgroundColor = data ? data.backgroundColor : {
   R: 7,
   G: 55,
   B: 89,
};

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			'"Comic Neue"',
			'cursive'
		].join(','),
	}
});

const todayKey = new Date(new Date().toDateString()).getTime();

const App = () => {
	const [ calendarValue, setCalendarValue ] = useState(new Date());
	const [ chosenDate, setChosenDate ] = useState(null);
	const [ calendarEventsShowing, setCalendarEventsShowing ] = useState(null);

	const [ favorites, setFavorites ] = useState(favoritesArray);
	const [ greetingPronouns, setGreetingPronouns ] = useState(greeting.pronouns);
	const [ greetingEmoji, setGreetingEmoji ] = useState(greeting.emoji);
	const [ showSeconds, setShowSeconds ] = useState(showElements.seconds);
	const [ twentyFourClockMode, setTwentyFourClockMode ] = useState(showElements.twentyFourClockMode);

	// if old localStorage type updated it sends a notification
	useEffect(() => {
		if (updated) {
			createNotification('Success', 'Refreshed older version.', 'success');
		}
	}, []);

	const openCalendarEvents = (e) => {
		const convertedEvent = e.getTime();
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

	/*
	* It is a template/pattern for the imported addNotification to be easier to use it
	* and by this you don't have to specify so many properties every time.
	*/
	const createNotification = (title, message, type) => {
		store.addNotification({
			title, message, type,
			container: 'bottom-center',
			animationIn: ['animate__animated animate__flipInX'],
			animationOut: ['animate__animated animate__fadeOut'],
			dismiss: {
				duration: 3000
			}
		});
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<ReactNotifications />
				<div className='app'>
					<Nav favorites={ favorites } />

					<main>
						<Greeting pronouns={ greetingPronouns } emojis={ greetingEmoji } />
						<Clock showSeconds={ showSeconds } twentyFourClockMode={ twentyFourClockMode } />
					</main>

					<div className='bottom-components'>
						<div className='react-calendar-container'>
							<Calendar
								onChange={setCalendarValue}
								value={calendarValue}
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
					// props
					showElements={ showElements }
					greeting={ greeting }
					favoritesArray={ favoritesArray }
					backgroundColor={ backgroundColor }
					createNotification={createNotification}
					// getters
					getFavorites={ setFavorites }
					getGreetingPronouns={ setGreetingPronouns }
					getGreetingEmoji={ setGreetingEmoji }
					getShowSeconds={ setShowSeconds }
					getTwentyFourClockMode={ setTwentyFourClockMode }
				/>
			</ThemeProvider>
		</>
	)
}
export default App;