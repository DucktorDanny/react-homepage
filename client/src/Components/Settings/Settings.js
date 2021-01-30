import { useState, useEffect } from 'react';

import Nav from '../Nav/Nav';
import Checkbox from './Checkbox';
import Line from './Line';
import Greeting from '../ClockAndGreeting/Greeting';
import FavoriteList from './FavoriteList';
import { TextField, Button } from '@material-ui/core';
import './style/Settings.css';

const Settings = () => {
	const [ showCalendar, setShowCalendar ] = useState(true);
	const [ showFavorites, setShowFavorites ] = useState(true);
	const [ showGreeting, setShowGreeting ] = useState(true);

	const [ greetingPronouns, setGreetingPronouns ] = useState('');
	const [ greetingEmoji, setGreetingEmoji ] = useState('');

	const [ isEmojiValid, setIsEmojiValid ] = useState(true);
	const [ isPronounsValid, setIsPronounsValid ] = useState(true);

	const [ isFavoriteNameValid, setIsFavoriteNameValid ] = useState(true);
	const [ isFavoriteUrlValid, setIsFavoriteUrlValid ] = useState(true);

	const [ favorites, setFavorites ] = useState([
		{
			name: 'Youtube',
			url: 'https://youtube.com'
		},
		{
			name: 'Facebook',
			url: 'https://facebook.com'
		},
		{
			name: 'Stackoverflow',
			url: 'https://stackoverflow.com'
		},
		{
			name: 'Google',
			url: 'https://google.com'
		}
	]);

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
	}, [ showCalendar ]);

	useEffect(() => {
		animationHandler('favorites', 'favorites-hidden', 'flex', showFavorites);
	}, [ showFavorites ]);

	useEffect(() => {
		const greeting = document.querySelector('.greeting');

		if (showGreeting) {
			greeting.style.display = 'block';
			if (greeting.classList.contains('greeting-hidden')) {
				greeting.classList.add('greeting-shown');
			}
			greeting.classList.remove('greeting-hidden');
		} else {
			greeting.classList.remove('greeting-shown');
			greeting.classList.add('greeting-hidden');
		}
	}, [ showGreeting ]);
	
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

	const greetingPronounsChange = (e) => {
		const pronouns = e.target.value;
		const isValid = pronouns.length < 12;
		setIsPronounsValid(isValid);
		setGreetingPronouns(isValid ? pronouns : '');
	}

	const greetingEmjisChange = (e) => {
		const emoji = e.target.value.trim();
		const isValid = isEmoji(emoji) || emoji === '';
		setGreetingEmoji(isValid ? emoji : '');
		setIsEmojiValid(isValid);
	}

	const isEmoji = (emoji) => {
		return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
			.test(emoji);
	}

	const addNewFavorite = () => {
		const form = document.querySelector('.settings-form');
		const formData = new FormData(form);

		const name = formData.get('favorite-add-name');
		const url = formData.get('favorite-add-link');

		const isNameValid = name.length <= 20;
		const isUrlValid = url.includes('http://') || url.includes('https://');

		setIsFavoriteNameValid(isNameValid);
		setIsFavoriteUrlValid(isUrlValid);

		if (isNameValid && isUrlValid) {
			const newFavorite = {
				name: name,
				url: url
			};

			setFavorites([...favorites, newFavorite]);

			form.reset();
		}
	}

	const addNewFavoriteByEnter = (e) => {
		if (e.code === 'Enter') {
			addNewFavorite();
		}
	}

	const checkAddForm = (e) => {
		const favoriteField = e.target;

		if (favoriteField.value === '' && favoriteField.name === 'favorite-add-link') {
			setIsFavoriteUrlValid(true);
		} else if (favoriteField.name === 'favorite-add-name') {
			setIsFavoriteNameValid(favoriteField.value.length <= 20);
		}
	}

	const removeFavorite = (e) => {
		// if I click on the label then I get a span but if not then I get a button so this is required:
		const favoriteElementID = e.target.classList.contains('MuiButton-label') ? e.target.parentNode.parentNode.id : e.target.parentNode.id;
		const favoriteIndex = parseInt(favoriteElementID.split('-fav-lement')[0]);

		// remove in a state array:
		// (made this way because other methods like splice doesnt re-render...)
		let test = [];

		for (let i = 0; i < favorites.length; i++) {
			if (i !== favoriteIndex) {
				test.push(favorites[i]);
			}
		}

		setFavorites(test);
	}

	return (
		<>
			<Nav favorites={ favorites } />
			<div className='settings'>
				<h1>Settings</h1>
				<Line />
				<form className='settings-form'>
					<h2>Element visibility</h2>

					<Checkbox htmlName='show-favorites' onClick={ clickedShowFavorites } labelText='Show favorites' chekced={ showFavorites } />
					<Checkbox htmlName='show-greeting' onClick={ clickedShowGreeting } labelText='Show greeting' chekced={ showGreeting } />
					<Checkbox htmlName='show-calendar' onClick={ clickedShowCalendar } labelText='Show Calendar' chekced={ showCalendar } />

					<Line />

					<h2>Greeting</h2>

					<TextField
						name='greeting-pronouns'
						className='textfield'
						type='text'
						label='Greeting pronouns'
						helperText={ !isPronounsValid ? 'Too long pronouns!' : '' }
						variant='outlined'
						onChange={ greetingPronounsChange } 
						disabled={ !showGreeting }
						error={ !isPronounsValid }
					/>
					<TextField
					name='greeting-emoji'
						className='textfield'
						type='text'
						label='Greeting emojis'
						helperText={ !isEmojiValid ? 'It is not an emoji!' : '' }
						variant='outlined'
						onChange={ greetingEmjisChange } 
						disabled={ !showGreeting }
						error={ !isEmojiValid }
					/>
					<Line />
					<h2>Add new favorite</h2>
					<TextField
						id='favorite-add-name'
						className='textfield'
						name='favorite-add-name'
						type='text'
						label='Name'
						variant='outlined'
						onChange={ checkAddForm }
						onKeyUp={ addNewFavoriteByEnter }
						error={ !isFavoriteNameValid }
						helperText={ !isFavoriteNameValid ? 'The name is too long' : '' }
					/>
					<TextField
						id='favorite-add-url'
						className='textfield'
						name='favorite-add-link'
						type='text'
						label='Link'
						variant='outlined'
						onChange={ checkAddForm }
						onKeyUp={ addNewFavoriteByEnter }
						error={ !isFavoriteUrlValid }
						helperText={ !isFavoriteUrlValid ? 'Url is invalid' : '' }
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={ addNewFavorite }
					>Add</Button>

					<Line />

					<h2>Remove favorite</h2>
					<FavoriteList favorites={ favorites } removeFunction={ removeFavorite } />

					{/* <Line /> */}

				</form>
				<Line />
			</div>
			<Greeting pronouns={ greetingPronouns } emojis={ greetingEmoji } />
		</>
	)
}

export default Settings;