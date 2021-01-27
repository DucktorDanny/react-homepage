import { useState, useEffect } from 'react';

import Burger from '@animated-burgers/burger-arrow';
import '@animated-burgers/burger-arrow/dist/styles.css';

import Favorite from './Favorite';
import './Styles/Nav.css';

const Nav = ({ favorites }) => {
	const [ loaded, setLoaded ] = useState(false);
	const [ opened, setOpened ] = useState(false);

	const clicked = () => {
		setOpened(!opened);
	}

	useEffect(() => {
		if (loaded) {
			const settings = document.querySelector('.settings');
			const clockContainer = document.querySelector('.clock-container');
			const greeting = document.querySelector('.greeting');

			if (opened) {
				if (settings.classList.contains('settings-close')) {
					settings.classList.remove('settings-close');
					clockContainer.classList.remove('clock-when-settings-close');
					greeting.classList.remove('greeting-when-settings-close');
				}
				settings.classList.add('settings-open');
				clockContainer.classList.add('clock-when-settings-open');
				greeting.classList.add('greeting-when-settings-open');
			} else {
				if (settings.classList.contains('settings-open')) {
					settings.classList.remove('settings-open');
					clockContainer.classList.remove('clock-when-settings-open');
					greeting.classList.remove('greeting-shown');
					greeting.classList.remove('greeting-when-settings-open');
				}
				settings.classList.add('settings-close');
				clockContainer.classList.add('clock-when-settings-close');
				greeting.classList.add('greeting-when-settings-close');
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