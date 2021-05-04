import { useState, useEffect } from 'react';

import useSettings from './Hooks/useSettings';
import useEvents from './Hooks/useEvents';

import Nav from './Components/Nav/Nav';
import Greeting from './Components/ClockAndGreeting/Greeting';
import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import DailyTodoNotification from './Components/DailyTodos/DailyTodoNotification';
import DailyTodoEvents from './Components/DailyTodos/DailyTodoEvents';

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

const font = "'Comic Neue', cursive";

const App = () => {
	const [events, setEvents] = useEvents();
	const { showElements, greeting, favoritesArray, backgroundColor } = useSettings();

	const [calendarValue, setCalendarValue] = useState(new Date());
	const [todayKey, setTodayKey] = useState(new Date(new Date().toDateString()).getTime());
	const [chosenDate, setChosenDate] = useState(null);
	const [DailyTodosShowing, setDailyTodosShowing] = useState(null);

	const [favorites, setFavorites] = useState(favoritesArray);
	const [greetingPronouns, setGreetingPronouns] = useState(greeting.pronouns);
	const [greetingEmoji, setGreetingEmoji] = useState(greeting.emoji);
	const [showSeconds, setShowSeconds] = useState(showElements.seconds);
	const [twentyFourClockMode, setTwentyFourClockMode] = useState(showElements.twentyFourClockMode);

	// const [font, setFont] = useState(localStorage.getItem('font') || "'Comic Neue', cursive");

	// if old localStorage type updated it sends a notification
	useEffect(() => {
		if (updated) {
			createNotification('Success', 'Refreshed older version.', 'success');
		}
		const interval = setInterval(() => {
			setTodayKey(new Date(new Date().toDateString()).getTime());
		}, 1000 * 60);

		return () => {
			console.log('Clear todayKey interval...');
			clearInterval(interval);
		}
	}, []);

	const openDailyTodo = (e) => {
		const convertedEvent = e.getTime();
		setChosenDate(convertedEvent);
		setDailyTodosShowing(true);
	}
	const closeDailyTodos = (e) => {
		setDailyTodosShowing(false);
		// time to end the animation of window closing
		setTimeout(() => {
			setChosenDate(null);
		}, 500);
	}

	const setEventDone = (index, newDoneValue, dateKey) => {
		setEvents({...events, [dateKey]: events[dateKey].map((e, i) => {
				if (i === index) {
					e.done = newDoneValue;
				}
				return e;
			})
		});
		console.log(`${events[dateKey][index].title} ${newDoneValue ? 'done' : 'not done'}...`);
		localStorage.setItem('events', JSON.stringify(events));
	}

	// save events
	useEffect(() => {
		console.log('Change is detected...');
		console.log(events);
		localStorage.setItem('events', JSON.stringify(events));
	}, [events]);

	/*
	* It is a template/pattern for the imported addNotification to be easier to use it
	* and by this you don't have to specify so many properties every time.
	*/
	const createNotification = (title, message, type) => {
		if (type === 'danger') {
			console.error(message);
		}
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
			<ThemeProvider theme={
				createMuiTheme({
					typography: {
						fontFamily: [
							font.split(', ')
						].join(','),
					}
				}
			)}>
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
								onClickDay={openDailyTodo}
							/>

							<div className='calendar-events-show-all-button'>
								<Button
									type='button'
									variant='contained'
									onClick={() => {
										setChosenDate(null);
										setDailyTodosShowing(true);
									}}
								>Show all todo</Button>
							</div>
						</div>

						<DailyTodoNotification dailyTodo={events[todayKey]} setTodoDone={setEventDone} />
					</div>
				</div>

				<DailyTodoEvents
					date={chosenDate}
					events={events}
					setEvents={setEvents}
					setEventDone={setEventDone}
					show={DailyTodosShowing}
					onClose={closeDailyTodos}
					createNotification={createNotification}
				/>
				<Settings
					// props
					showElements={ showElements }
					greeting={ greeting }
					favorites={favorites}
					setFavorites={setFavorites}
					backgroundColor={ backgroundColor }
					createNotification={createNotification}
					// getters
					getFavorites={ setFavorites }
					getGreetingPronouns={ setGreetingPronouns }
					getGreetingEmoji={ setGreetingEmoji }
					getShowSeconds={ setShowSeconds }
					getTwentyFourClockMode={ setTwentyFourClockMode }
					// getFont={setFont}
				/>
			</ThemeProvider>
		</>
	)
}
export default App;