import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

import Checkbox from './Checkbox';
import Line from './Line';
import './Styles/Settings.css';

const Settings = () => {
	const [showCalendar, setShowCalendar] = useState(true);
	const [showFavorites, setShowFavorites] = useState(true);
	const [showGreeting, setShowGreeting] = useState(true);

	useEffect(() => {
		const favorites = document.querySelector('.favorites');
		const calendar = document.querySelector('.react-calendar');
		const greeting = document.querySelector('.greeting');

		if (!favorites.classList.contains('favorites-hidden')) {
			favorites.style.display = 'none';
		}
		if (!calendar.classList.contains('react-calendar-hidden')) {
			calendar.style.display = 'none';
		}
		if (!greeting.classList.contains('greeting-hidden')) {
			greeting.style.display = 'none';
		}
	}, []);

	useEffect(() => {
		animationHandler('react-calendar', 'react-calendar-hidden', 'block', showCalendar);
	}, [showCalendar]);

	useEffect(() => {
		animationHandler('favorites', 'favorites-hidden', 'flex', showFavorites);
	}, [showFavorites]);

	useEffect(() => {
		// settings opened animation and show animation problem... :)
		// animationHandler('greeting', 'greeting-hidden', 'block', showGreeting);

		const greeting = document.querySelector('.greeting');
		if (showGreeting) {
			greeting.style.display = 'block';
			if (greeting.classList.contains('greeting-hidden')) {
				greeting.classList.add('greeting-shown');
			}
			greeting.classList.remove('greeting-hidden');
		} else {
			// greeting.classList.remove('greeting-shown');
			// greeting.classList.remove('greeting-when-settings-open');
			greeting.classList.remove('greeting-shown');
			greeting.classList.add('greeting-hidden');
		}
	}, [showGreeting]);
	
	const clickedShowCalendar = () => {
		setShowCalendar(!showCalendar);
	}
	
	const clickedShowFavorites = () => {
		setShowFavorites(!showFavorites);
	}

	const clickedShowGreeting = () => {
		setShowGreeting(!showGreeting);
	}
	
	const animationHandler = (mainClass, hiddenClass, display, condition) => {
		const element = document.querySelector(`.${mainClass}`);
		if (condition) {
			element.style.display = display;
			element.classList.remove(hiddenClass);
		} else {
			element.classList.add(hiddenClass);
		}
	}

	return (
		<div className='settings'>
			<h1>Settings</h1>
			<Line />
			<form>
				<Checkbox htmlName='show-favorites' onClick={ clickedShowFavorites } labelText='Show favorites' chekced={ showFavorites } />
				<Checkbox htmlName='show-greeting' onClick={ clickedShowGreeting } labelText='Show greeting' chekced={ showGreeting } />
				<Checkbox htmlName='show-calendar' onClick={ clickedShowCalendar } labelText='Show Calendar' chekced={ showCalendar } />
			</form>
		</div>
	)
}

export default Settings;