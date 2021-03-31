import { useState } from 'react';
// import { useEffect } from 'react';

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

const todayKey = new Date(new Date().toDateString()).getTime();

const App = () => {
	const [ value, onChange ] = useState(new Date());
	const [ chosenDate, setChosenDate ] = useState(null);
	const [ calendarEventsShowing, setCalendarEventsShowing ] = useState(null);
	const [ favorites, setFavorites ] = useState(favoritesArray);
	const [ greetingPronouns, setGreetingPronouns ] = useState(greeting.pronouns);
	const [ greetingEmoji, setGreetingEmoji ] = useState(greeting.emoji);
	const [ showSeconds, setShowSeconds ] = useState(showElements.seconds);
	const [ twentyFourClockMode, setTwentyFourClockMode ] = useState(showElements.twentyFourClockMode);

	const openCalendarEvents = (e) => {
		// const convertedEvent = new Date(e.toString()).toLocaleDateString();
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

	return (
		<>
			{ showElements ?
				<ThemeProvider theme={theme}>
					<div className='app'>
						<Nav favorites={ favorites } />

						<main>
							<Greeting pronouns={ greetingPronouns } emojis={ greetingEmoji } />
							<Clock showSeconds={ showSeconds } twentyFourClockMode={ twentyFourClockMode } />
						</main>

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
						getShowSeconds={ setShowSeconds }
						getTwentyFourClockMode={ setTwentyFourClockMode }
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