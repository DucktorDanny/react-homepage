import { useState } from 'react';
// import { useEffect } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import Calendar from 'react-calendar';
import CalendarEvents from './Components/CalendarEvents/CalendarEvents';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
	}

	// useEffect(() => {
	// 	console.log('chosenDate changed: ', chosenDate);
	// }, [chosenDate]);

	return (
		<>
			{ showElements ?
				<ThemeProvider theme={theme}>
					<Clock />
					
					<div className='react-calendar-container'>
						<Calendar
							className='react-calendar'
							onChange={onChange}
							value={value}
							onClickDay={openCalendarEvents}
						/>
						{/* <button className='' onClick={() => {
							setCalendarEventsShowing(true);
							setChosenDate(null);
						}}>Show all events</button> */}
						<div className='calendar-events-show-all-button'>
							<Button
								type='button'
								variant='contained'
								// color='primary'
								onClick={() => {
									setChosenDate(null);
									setCalendarEventsShowing(true);
								}}
							>Show all events</Button>
						</div>
							
					</div>

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