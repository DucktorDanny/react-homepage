import { useState, useEffect } from 'react';

import Burger from '@animated-burgers/burger-arrow';
import '@animated-burgers/burger-arrow/dist/styles.css';

import Favorite from './Favorite';
import './style/Nav.css';

const Nav = ({ favorites }) => {
	const [ loaded, setLoaded ] = useState(false);
	const [ opened, setOpened ] = useState(false);

	const clicked = () => {
		setOpened(!opened);
		
		const form = document.querySelector('.settings-form');
		form.scrollTo(0, 0);
	}

	useEffect(() => {
		if (loaded) {
			const settings = document.querySelector('.settings');
			const clockContainer = document.querySelector('.clock-container');
			const greeting = document.querySelector('.greeting');
			// Calendar and Notificiations
			const bottomComponents = document.querySelector('.bottom-components');

			if (opened) {
				if (settings.classList.contains('settings-close')) {
					settings.classList.remove('settings-close');
					clockContainer.classList.remove('clock-when-settings-close');
					greeting.classList.remove('greeting-when-settings-close');
					bottomComponents.classList.remove('bottom-components-settings-close');
				}
				settings.classList.add('settings-open');
				clockContainer.classList.add('clock-when-settings-open');
				greeting.classList.add('greeting-when-settings-open');
				bottomComponents.classList.add('bottom-components-settings-open');
				// setTimeout(() => {
				// 	clockContainer.classList.remove('clock-when-settings-open');
				// 	greeting.classList.remove('greeting-when-settings-open');
				// 	bottomComponents.classList.remove('bottom-components-settings-open');
				// }, 1000);
			} else {
				if (settings.classList.contains('settings-open')) {
					settings.classList.remove('settings-open');
					clockContainer.classList.remove('clock-when-settings-open');
					greeting.classList.remove('greeting-shown');
					greeting.classList.remove('greeting-when-settings-open');
					bottomComponents.classList.remove('bottom-components-settings-open');
				}
				settings.classList.add('settings-close');
				clockContainer.classList.add('clock-when-settings-close');
				greeting.classList.add('greeting-when-settings-close');
				bottomComponents.classList.add('bottom-components-settings-close');

				/* if we are resizing the window the animation may noy be necessary
				 * and then it is not gonna run the animation but when we size it back we
				 * don't want it to run so we need to remove the animation
				 * (It might not be the best way to do it but it works later we could find another solution for this)
				*/
				setTimeout(() => {
					clockContainer.classList.remove('clock-when-settings-close');
					greeting.classList.remove('greeting-when-settings-close');
					bottomComponents.classList.remove('bottom-components-settings-close');
				}, 1000);
			}
		}
		if (opened) {
			setLoaded(true);
		}
	}, [opened, loaded])

	return (
		<>
			<nav>
				<section className='favorites'>
					{favorites.map((favorite, i) => {
						return(
							<Favorite key={i} name={favorite.name} url={favorite.url} />
						);
					})}

				</section>
				<Burger direction='right' isOpen={ opened } onClick={ clicked } />
			</nav>
		</>
	)
}

export default Nav;