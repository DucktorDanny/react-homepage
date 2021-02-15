import { useState, useEffect } from 'react';

import Nav from '../Nav/Nav';
import Checkbox from './Checkbox';
import Line from './Line';
import Greeting from '../ClockAndGreeting/Greeting';
import FavoriteList from './FavoriteList';
import BackgroundChanging from './BackgroundChanging';
import Popup from '../Popup/Popup';
import { TextField, Button } from '@material-ui/core';
import ReactNotifications, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import './style/Settings.css';

const Settings = ({ showElements, greeting, favoritesArray, backgroundColor }) => {
	const [ showCalendar, setShowCalendar ] = useState(showElements.calendar);
	const [ showFavorites, setShowFavorites ] = useState(showElements.favorites);
	const [ showGreeting, setShowGreeting ] = useState(showElements.greeting);

	const [ greetingPronouns, setGreetingPronouns ] = useState(greeting.pronouns);
	const [ greetingEmoji, setGreetingEmoji ] = useState(greeting.emoji);

	const [ isEmojiValid, setIsEmojiValid ] = useState(true);
	const [ isPronounsValid, setIsPronounsValid ] = useState(true);

	const [ isFavoriteNameValid, setIsFavoriteNameValid ] = useState(true);
	const [ isFavoriteUrlValid, setIsFavoriteUrlValid ] = useState(true);

	const [ favorites, setFavorites ] = useState(favoritesArray);

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
		// setGreetingPronouns(isValid && pronouns !== '' ? pronouns : greeting.pronouns);
		if (isValid && pronouns !== '') {
			setGreetingPronouns(pronouns);
		} else if (isValid && pronouns === '') {
			setGreetingPronouns(greeting.pronouns);
		}
	}

	const greetingEmjisChange = (e) => {
		const emoji = e.target.value.trim();
		const isValid = isEmoji(emoji) || emoji === '';
		setIsEmojiValid(isValid);
		// setGreetingEmoji(isValid && emoji !== '' ? emoji : greeting.emoji);
		console.log(greeting.emoji);
		if (isValid && emoji !== '') {
			setGreetingEmoji(emoji);
		} else if (isValid && emoji === '') {
			setGreetingEmoji(greeting.emoji);
		}
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

	// const addNewFavoriteByEnter = (e) => {
	// 	if (e.code === 'Enter') {
	// 		addNewFavorite();
	// 	}
	// }

	const checkAddForm = (e) => {
		const favoriteField = e.target;

		if (favoriteField.value === '' && favoriteField.name === 'favorite-add-link') {
			setIsFavoriteUrlValid(true);
		} else if (favoriteField.name === 'favorite-add-name') {
			setIsFavoriteNameValid(favoriteField.value.length <= 20);
		}
	}

	const removeFavorite = (e) => {
		const favoriteIndex = parseInt(e.target.getAttribute('id') || e.target.parentNode.getAttribute('id'));
		console.log(favoriteIndex);

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

	// reorder the array
	const reorder = (arr, from, to) => {

		if (arr) {
			arr.splice(to, 0, arr.splice(from, 1)[0]);
			return arr;
		}
		return;
	}

	const onDragEnd = (result) => {
		// if the destinatin is null don't do anything
		if (!result.destination) {
			return;
		}

		// We need te re-order the array by these indexes
		if (favorites) {
			let newArray = [];
			const orderedArray = reorder(favorites, result.source.index, result.destination.index);
			// reset the array state
			for (let i = 0; i < orderedArray.length; i++) {
				newArray.push(orderedArray[i]);
			}
			setFavorites(newArray);
		}

	}

	const copySettingsDatas = () => {
		try {
			const datas = localStorage.getItem('datas');
	
			if (!datas) {
				throw new Error('You have no saved datas!');
			}

			navigator.clipboard.writeText(datas)
				.then(() => {
					createNotification('Success', 'You have copied your settings!', 'success');
				})
				.catch((err) => {
					createNotification('Error', `Error in copying: ${err}`, 'danger');
				})
			
		} catch(err) {
			createNotification('Error', err.message, 'danger');
		}
	}

	const setExportedDatas = () => {
		
		const exportSettingsField = document.querySelector('#export-settings-field');
		
		// verify datas
		try {
			const datas = JSON.parse(exportSettingsField.value);

			if (datas.showElements && datas.greeting && datas.favoritesArray && datas.backgroundColor) {
				localStorage.setItem('datas', JSON.stringify(datas));
				createNotification('Success', 'You have exported settings!', 'success');
				
				// easy way:
				window.location.reload(true);
			}
		} catch (err) {
			createNotification('Error', err.message, 'danger');
		}
	}

	const resetSettings = () => {
		try {
			const datas = JSON.parse(localStorage.getItem('datas'));
			if (!datas) {
				throw new Error('There are no saved settings.');
			}

			setPopup({
				type: 'accept-decline',
				open: true,
				datas: {
					title: 'Reset settings',
					content: 'Are you sure you want to delete your saved settings?',
					acceptLabel: 'Reset',
					declineLabel: 'Cancel',
					onAccept: () => {
						localStorage.removeItem('datas');

						// easy way:
						window.location.reload(true);
						// close popup
						setPopup({...popup, open: false});
					},
					onDecline: () => {
						setPopup({...popup, open: false});
					}
				}
			});
		} catch(err) {
			createNotification('Error', err.message, 'danger');
		}
	}

	const saveChanges = (event) => {
		event.preventDefault();
		// const form = document.querySelector('form');

		const bgColor = document.querySelector('body').style.backgroundImage
			.replace('linear-gradient(rgb(', '')
			.replace('), rgb(164, 164, 164))', '')
			.split(', ');
		
		const datas = {
			showElements: {
				calendar: showCalendar,
				favorites: showFavorites,
				greeting: showGreeting,
			},
			greeting: {
				pronouns: greetingPronouns,
				emoji: greetingEmoji,
			},
			favoritesArray: favorites,
			backgroundColor: {
				R: parseInt(bgColor[0]),
				G: parseInt(bgColor[1]),
				B: parseInt(bgColor[2]),
			}
		}
		// form.reset();

		greeting.pronouns = greetingPronouns;
		greeting.emoji = greetingEmoji;

		localStorage.setItem('datas', JSON.stringify(datas));
		createNotification('Success', 'Changes have been saved!', 'success');
	}

	const createNotification = (title, message, type) => {
		store.addNotification({
			title,
			message,
			type,
			container: 'bottom-center',
			animationIn: ['animate__animated animate__flipInX'],
			animationOut: ['animate__animated animate__fadeOut'],
			dismiss: {
				duration: 2000
			}
		});
	}

	const [popup, setPopup] = useState(Object);

	return (
		<>
			<Nav favorites={ favorites } />
			<ReactNotifications />
			<Popup
				type={popup.type}
				open={popup.open}
				datas={popup.datas}
			/>
			<div className='settings'>
				<h1>Settings</h1>
				<Line />
				<form className='settings-form' onSubmit={ saveChanges }>
					<h2>Element visibility</h2>

					<Checkbox htmlName='show-favorites' onClick={ clickedShowFavorites } labelText='Show favorites' chekced={ showFavorites } />
					<Checkbox htmlName='show-greeting' onClick={ clickedShowGreeting } labelText='Show greeting' chekced={ showGreeting } />
					<Checkbox htmlName='show-calendar' onClick={ clickedShowCalendar } labelText='Show Calendar' chekced={ showCalendar } />

					<Line />

					<h2>Change background color</h2>
					<BackgroundChanging
						R={ backgroundColor.R }
						G={ backgroundColor.G }
						B={ backgroundColor.B }
					/>

					<Line />

					<h2>Greeting</h2>
					<div className='greeting-settings'>
						<TextField
							name='greeting-pronouns'
							className='textfield'
							type='text'
							label='Pronouns'
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
							label='Emojis'
							helperText={ !isEmojiValid ? 'It is not an emoji!' : '' }
							variant='outlined'
							onChange={ greetingEmjisChange } 
							disabled={ !showGreeting }
							error={ !isEmojiValid }
						/>
					</div>

					<Line />

					<h2>Add new favorite</h2>
					<div className='favorite-add'>
						<TextField
							id='favorite-add-name'
							className='textfield'
							name='favorite-add-name'
							type='text'
							label='Name'
							variant='outlined'
							onChange={ checkAddForm }
							// onKeyUp={ addNewFavoriteByEnter }
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
							// onKeyUp={ addNewFavoriteByEnter }
							error={ !isFavoriteUrlValid }
							helperText={ !isFavoriteUrlValid ? 'Url is invalid' : '' }
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={ addNewFavorite }
						>Add</Button>
					</div>

					<Line />

					<h2>Remove favorite</h2>
					<FavoriteList favorites={ favorites } removeFunction={ removeFavorite } onDragEnd={ onDragEnd } />

					

					<Line />

					<h2>Import, export and reset settings</h2>
					<div className='imp-exp-settings'>

						<TextField
							id='export-settings-field'
							className='textfield'
							name='favorite-add-link'
							type='text'
							label='Copied datas'
							variant='outlined'
						/>

						<Button
							type='button'
							variant='contained'
							color='primary'
							onClick={ setExportedDatas }
						>Export</Button>

						<Button
							type='button'
							variant='contained'
							color='primary'
							onClick={ copySettingsDatas }
						>Copy settings datas</Button>

						<Button
							type='button'
							variant='contained'
							className='reset-settings'
							onClick={ resetSettings }
						>Reset settings</Button>
					</div>


					{/* Save changes */}
					<div className='save-changes'>
						<Button
							type='submit'
							variant='contained'
							color='primary'
						>Save</Button>
					</div>

				</form>
				<Line />
			</div>
			<Greeting pronouns={ greetingPronouns } emojis={ greetingEmoji } />
		</>
	)
}

export default Settings;