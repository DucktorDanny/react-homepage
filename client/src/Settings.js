import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

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
		if (greeting.classList.contains('greeting-hidden')) {
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
		// const greeting = document.querySelector('.greeting');
		// if (!showGreeting) {
		// 	// animationHandler('greeting', 'greeting-hidden', 'block', showGreeting);
		// 	greeting.classList.remove('greeting-shown');
		// 	greeting.classList.add('greeting-hidden');
		// } else {
		// 	greeting.classList.remove('greeting-hidden');
		// 	greeting.classList.add('greeting-shown');
		// }
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
				<label className='container' htmlFor='show-calendar' onClick={clickedShowCalendar} >Show calendar
					<input name='show-calendar' type='checkbox' checked={showCalendar} readOnly />
					<span className='checkmark'></span>
				</label>

				<label className='container' htmlFor='show-favorites' onClick={clickedShowFavorites} >Show favorites
					<input name='show-favorites' type='checkbox' checked={showFavorites} readOnly />
					<span className='checkmark'></span>
				</label>

				<label className='container' htmlFor='show-greeting' onClick={clickedShowGreeting} >Show greeting
					<input name='show-greeting' type='checkbox' checked={showGreeting} readOnly />
					<span className='checkmark'></span>
				</label>
			</form>
		</div>
	)
}

export default Settings;