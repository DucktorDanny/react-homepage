import { useState, useEffect } from 'react';

import Burger from '@animated-burgers/burger-arrow';
import '@animated-burgers/burger-arrow/dist/styles.css';
import Settings from './Settings';
import './Styles/Nav.css';

const Nav = () => {
	const [loaded, setLoaded] = useState(false);
	const [opened, setOpened] = useState(false);

	const clicked = () => {
		setOpened(!opened);
	}

	useEffect(() => {
		if (loaded) {
			const settings = document.querySelector('.settings');
			const clockContainer = document.querySelector('.clock-container');

			if (opened) {
				if (settings.classList.contains('settings-close')) {
					settings.classList.remove('settings-close');
					clockContainer.classList.remove('clock-when-settings-close');
				}
				settings.classList.add('settings-open');
				clockContainer.classList.add('clock-when-settings-open');
			} else {
				if (settings.classList.contains('settings-open')) {
					settings.classList.remove('settings-open');
					clockContainer.classList.remove('clock-when-settings-open');
				}
				settings.classList.add('settings-close');
				clockContainer.classList.add('clock-when-settings-close');
			}
		}
		if (opened) {
			setLoaded(true);
		}
	}, [opened, loaded])

	return (
		<>
			<nav>
				<section>
					<div>
						<div className='data'>
							<label htmlFor="data">asd adsa da dasasdasdasdsssssssss asdas ahd</label>
						</div>
					</div>
					<div>
						<div className='data'>
							<label htmlFor="data">asd adsa da dasasdasdasdsssssssss asdas ahd</label>
						</div>
					</div>
					<div>
						<div className='data'>
							<label htmlFor="data">asd </label>
						</div>
					</div>
					<div>
						<div className='data'>
							<label htmlFor="data">s ahd ashd kahs djhaks hdaksh dkahsdk hajkdh kash</label>
						</div>
					</div>

				</section>
				<Burger direction='right' isOpen={opened} onClick={clicked} />
			</nav>
			<Settings />
		</>
	)
}

export default Nav;