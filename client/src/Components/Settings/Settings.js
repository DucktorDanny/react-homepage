import { useState, useEffect } from 'react';

// import Nav from '../Nav/Nav';
import Checkbox from './Checkbox';
import Line from './Line';
import FavoriteList from './FavoriteList';
import BackgroundChanging from './BackgroundChanging';
import Popup from '../Popup/Popup';
import { TextField, Button } from '@material-ui/core';
import ReactNotifications, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

// Setting Sections:
import ExportingImporting from './SettingSections/ExportingImporting';

import './style/Settings.css';

const Settings = ({
	showElements,
	greeting,
	favoritesArray,
	backgroundColor,
	getFavorites,
	getGreetingPronouns,
	getGreetingEmoji,
	getShowSeconds,
	getTwentyFourClockMode,
}) => {
	const [ showCalendar, setShowCalendar ] = useState(showElements.calendar !== null ? showElements.calendar : true);
	const [ showFavorites, setShowFavorites ] = useState(showElements.favorites !== null ? showElements.favorites : true);
	const [ showGreeting, setShowGreeting ] = useState(showElements.greeting !== null ? showElements.greeting : true);
	const [ showNotifications, setShowNotifications ] = useState(showElements.notifications !== null ? showElements.notifications : true);

	const [ showSeconds, setShowSeconds ] = useState(showElements.seconds !== null ? showElements.seconds : true);
	const [ twentyFourClockMode, setTwentyFourClockMode ] = useState(showElements.twentyFourClockMode !== null ? showElements.twentyFourClockMode : false);

	const [ greetingPronouns, setGreetingPronouns ] = useState(greeting.pronouns || 'friend');
	const [ greetingEmoji, setGreetingEmoji ] = useState(greeting.emoji || '🐣');

	const [ isEmojiValid, setIsEmojiValid ] = useState(true);
	const [ isPronounsValid, setIsPronounsValid ] = useState(true);

	const [ isFavoriteNameValid, setIsFavoriteNameValid ] = useState(true);
	const [ isFavoriteUrlValid, setIsFavoriteUrlValid ] = useState(true);

	const [ favorites, setFavorites ] = useState(favoritesArray);

	const [popup, setPopup] = useState(Object);

	// page load
	useEffect(() => {
		const favorites = document.querySelector('.favorites');
		const calendar = document.querySelector('.react-calendar-container');
		const greeting = document.querySelector('.greeting');
		const notifications = document.querySelector('.event-notifications-container');

		if (!favorites.classList.contains('favorites-hidden')) {
			favorites.style.display = 'none';
		}
		if (!calendar.classList.contains('react-calendar-hidden')) {
			calendar.style.display = 'none';
		}
		if (!greeting.classList.contains('greeting-hidden')) {
			greeting.style.display = 'none';
		}
		if (!notifications.classList.contains('event-notifications-container-hidden')) {
			notifications.style.display = 'none';
		}
	}, []);

	// showCalendar changes => animation changes (useing animationHandler function
	useEffect(() => {
		// animationHandler('react-calendar-container', 'react-calendar-hidden', null, showCalendar);
		bottomComponentsAnimationHandler('react-calendar-container', 'react-calendar-hidden', showCalendar, 600);
	}, [ showCalendar ]);

	// showFavorites changes => animation changes (useing animationHandler function)
	useEffect(() => {
		animationHandler('favorites', 'favorites-hidden', 'flex', showFavorites);
	}, [ showFavorites ]);

	// showGreeting changes => animation chagnges...
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

	useEffect(() => {
		bottomComponentsAnimationHandler('event-notifications-container', 'event-notifications-container-hidden', showNotifications, 600);
	}, [showNotifications]);
	
	// getFavorites if it changes
	useEffect(() => {
		if (getFavorites) {
			return getFavorites(favorites);
		}
		return;
	}, [favorites, getFavorites]);

	// getGreetingPronouns if it changes
	useEffect(() => {
		if (getGreetingPronouns) {
			return getGreetingPronouns(greetingPronouns);
		}
		return;
	}, [greetingPronouns, getGreetingPronouns]);

	// getGreetingEmoji if it changes
	useEffect(() => {
		if (getGreetingEmoji) {
			return getGreetingEmoji(greetingEmoji);
		}
		return;
	}, [greetingEmoji, getGreetingEmoji]);

	useEffect(() => {
		if (getShowSeconds) {
			return getShowSeconds(showSeconds);
		}
		return;
	}, [showSeconds, getShowSeconds]);

	useEffect(() => {
		if (getTwentyFourClockMode) {
			return getTwentyFourClockMode(twentyFourClockMode);
		}
		return;
	}, [twentyFourClockMode, getTwentyFourClockMode]);

	const animationHandler = (mainClass, hiddenClass, display, condition) => {
		const element = document.querySelector(`.${mainClass}`);
		if (condition) {
			element.style.display = display;
			element.classList.remove(hiddenClass);
		} else {
			element.classList.add(hiddenClass);
		}
	}

	const bottomComponentsAnimationHandler = (mainClass, hiddenClass, condition, delay) => {
		const element = document.querySelector(`.${mainClass}`);
		if (condition) {
			element.style.display = null;
			element.classList.remove(hiddenClass);
		} else {
			element.classList.add(hiddenClass);
			setTimeout(() => {
				element.style.display = 'none';
			}, delay);
		}
	}

	const greetingPronounsChange = (e) => {
		const pronouns = e.target.value;
		const isValid = pronouns.length <= 12;
		setIsPronounsValid(isValid);
	}

	const greetingEmjisChange = (e) => {
		const emoji = e.target.value.trim();
		const isValid = isEmoji(emoji) || emoji === '';
		setIsEmojiValid(isValid);
	}

	const changeGreeting = () => {
		const pronouns = document.querySelector('#greeting-pronouns').value;
		const emoji = document.querySelector('#greeting-emoji').value;
		try {
			if (pronouns === '' && emoji === '') {
				throw new Error('There were no changes!');
			}

			if (isPronounsValid && pronouns !== '') {
				setGreetingPronouns(pronouns);
				document.querySelector('#greeting-pronouns').value = '';
			}

			if (isEmojiValid && emoji !== '') {
				setGreetingEmoji(emoji);
				document.querySelector('#greeting-emoji').value = '';
			}
		} catch (err) {
			// (title, message, type)
			createNotification('Warning', err.message, 'warning');
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

		try {
			const isNameValid = name.length <= 20;
			const isUrlValid = url.includes('http://') || url.includes('https://') || url === '';
			
			setIsFavoriteNameValid(isNameValid);
			setIsFavoriteUrlValid(isUrlValid);
			
			if (name === '' || url === '') {
				throw new Error('Name and Url is required!');
			}

			if (isNameValid && isUrlValid) {
				const newFavorite = {
					name: name,
					url: url
				};
	
				setFavorites([...favorites, newFavorite]);
	
				form.reset();
			}
		} catch (err) {
			createNotification('Error', err.message, 'danger');
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

	const editFavorite = (e) => {
		setPopup(Object);
		const favoriteIndex = parseInt(e.target.getAttribute('id'));

		const type = 'favorite-edit';
		const titleField = favorites[favoriteIndex].name;
		const linkField = favorites[favoriteIndex].url;
		const acceptLabel = 'Edit';
		const declineLabel = 'Cancel';

		console.log(titleField, linkField);

		setPopup({
			type,
			open: true,
			datas: {
				titleField, linkField, acceptLabel, declineLabel,
				onAccept: () => {
					try {
						modifyFavorite(
							document.querySelector('#favorite-edit-title').value,
							document.querySelector('#favorite-edit-link').value,
							favoriteIndex
						);
						closeEditPopup({ type, titleField, linkField, acceptLabel, declineLabel });
					} catch(err) {
						createNotification('Error', err.message, 'danger');
					}
				},
				onDecline: () => {
					closeEditPopup({ type, titleField, linkField, acceptLabel, declineLabel });		
				}
			}
		});
	}

	const modifyFavorite = (name, url, idx) => {

		const isNameValid = name.length <= 20;
		const isUrlValid = url.includes('http://') || url.includes('https://') || url === '';

		if (isNameValid && isUrlValid) {
			if (name === '' && url === '') {
				throw new Error('There are no changes!');
			}
			
			const favoriteElements = favorites;
			
			if (name !== '') favoriteElements[idx].name = name;
			if (url !== '') favoriteElements[idx].url = url;
			
			setFavorites(favoriteElements);
			saveChanges();
		} else if (!isNameValid) {
			throw new Error('The new name is too long!');
		} else if (!isUrlValid) {
			throw new Error('Invalid URL! It need contain https:// or http://!');
		}
	}

	const closeEditPopup = ({ type, titleField, linkField, acceptLabel, declineLabel }) => {
		document.querySelector('#favorite-edit-title').value = '';
		document.querySelector('#favorite-edit-link').value = '';
		setPopup({
			type,
			open: false,
			datas: {
				titleField, linkField, acceptLabel, declineLabel
			}
		});
	}	

	const removeFavorite = (e) => {
		const favoriteIndex = parseInt(e.target.getAttribute('id'));

		const title = 'Remove favorite';
		const content = `Are you sure you want to remove the '${ favorites[favoriteIndex].name }' favorite?`;
		const acceptLabel = 'Yes';
		const declineLabel = 'Cancel';

		const closePopup = () => {
			setPopup({
				type: 'accept-decline',
				open: false,
				datas: {
					title, content, acceptLabel, declineLabel,
				}
			});
		};

		console.log(favorites[favoriteIndex]);
		setPopup({
			type: 'accept-decline',
			open: true,
			datas: {
				title, content, acceptLabel, declineLabel,
				onAccept: () => {
					// remove in a state array:
					// (made this way because other methods like splice doesnt re-render...)
					let test = [];
					for (let i = 0; i < favorites.length; i++) {
						if (i !== favoriteIndex) {
							test.push(favorites[i]);
						}
					}
					setFavorites(test);
					closePopup();
				},
				onDecline: () => {
					closePopup();
				}
			}
		});		
	}

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

	const saveChanges = (event) => {
		if (event) {
			event.preventDefault();
		}

		const bgColor = document.querySelector('body').style.backgroundImage
			.replace('linear-gradient(rgb(', '')
			.replace('), rgb(164, 164, 164))', '')
			.split(', ');
		
		const datas = {
			showElements: {
				calendar: showCalendar,
				favorites: showFavorites,
				greeting: showGreeting,
				notifications: showNotifications,
				seconds: showSeconds,
				twentyFourClockMode,
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

		greeting.pronouns = greetingPronouns;
		greeting.emoji = greetingEmoji;

		localStorage.setItem('datas', JSON.stringify(datas));
		createNotification('Success', 'Changes have been saved!', 'success');
	}

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

					<div className='element-visibility'>
						<Checkbox htmlName='show-favorites' onClick={ () => { setShowFavorites(!showFavorites) } } labelText='Show favorites' chekced={ showFavorites } />
						<Checkbox htmlName='show-greeting' onClick={ () => { setShowGreeting(!showGreeting) } } labelText='Show greeting' chekced={ showGreeting } />
						<Checkbox htmlName='show-calendar' onClick={ () => { setShowCalendar(!showCalendar) } } labelText='Show calendar' chekced={ showCalendar } />
						<Checkbox htmlName='show-notifications' onClick={ () => { setShowNotifications(!showNotifications) } } labelText='Show notifications' chekced={ showNotifications } />
					</div>

					<Line />

					<h2>Clock settings</h2>

					<div className='clock-settings'>
						<Checkbox
							htmlName='24-hour-mode'
							onClick={ () => { setTwentyFourClockMode(!twentyFourClockMode) } }
							labelText='24-hour mode'
							chekced={ twentyFourClockMode }
						/>
						<Checkbox
							htmlName='show-seconds'
							onClick={ () => { setShowSeconds(!showSeconds) } }
							labelText='Show seconds'
							chekced={ showSeconds }
						/>
					</div>

					<Line />

					<h2>Change background color</h2>
					<BackgroundChanging
						R={ backgroundColor.R }
						G={ backgroundColor.G }
						B={ backgroundColor.B }
					/>

					<Line />

					<h2>Greeting settings</h2>
					<div className='greeting-settings'>
						<TextField
							id='greeting-pronouns'
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
							id='greeting-emoji'
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
						<Button
							variant='contained'
							color='primary'
							onClick={changeGreeting}
						>Change</Button>
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

					<h2>Favorite changes</h2>
					<FavoriteList
						favorites={ favorites }
						editFunction={ editFavorite }
						removeFunction={ removeFavorite }
						onDragEnd={ onDragEnd }
					/>

					<Line />

					<ExportingImporting createNotification={createNotification} setPopup={setPopup} />

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
		</>
	)
}

export default Settings;