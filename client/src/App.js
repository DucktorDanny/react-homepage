import { useState } from 'react';

import Clock from './Components/ClockAndGreeting/Clock';
import Settings from './Components/Settings/Settings';
import Calendar from 'react-calendar';
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
const favoritesArray = datas ? datas.favorites : [
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

	return (
		<>
			{ showElements ?
				<>
					<Clock />
					<Calendar
						className='react-calendar'
						onChange={onChange}
						value={value}
					/>
					<Settings
						showElements={ showElements }
						greeting={ greeting }
						favoritesArray={ favoritesArray }
						backgroundColor={ backgroundColor }
					/>
				</>
			: <h1>Loading...</h1> }
		</>
	)
	
}
export default App;