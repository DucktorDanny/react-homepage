import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import '../style/Settings.css';

const GreetingModifier = ({ showGreeting, setGreetingPronouns, setGreetingEmoji, createNotification }) => {

   const [ isEmojiValid, setIsEmojiValid ] = useState(true);
	const [ isPronounsValid, setIsPronounsValid ] = useState(true);

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
   
   const isEmoji = (emoji) => {
		return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
			.test(emoji);
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

   return (
      <>
         <h2>Greeting settings</h2>
         <div className='greeting-settings'>
            <TextField
               id='greeting-pronouns'
               name='greeting-pronouns'
               className='textfield'
               type='text'
               label='Pronouns'
               helperText={!isPronounsValid ? 'Too long pronouns!' : ''}
               variant='outlined'
               onChange={greetingPronounsChange}
               disabled={!showGreeting}
               error={!isPronounsValid}
            />
            <TextField
               id='greeting-emoji'
               name='greeting-emoji'
               className='textfield'
               type='text'
               label='Emojis'
               helperText={!isEmojiValid ? 'It is not an emoji!' : ''}
               variant='outlined'
               onChange={greetingEmjisChange}
               disabled={!showGreeting}
               error={!isEmojiValid}
            />
            <Button
               variant='contained'
               color='primary'
               onClick={changeGreeting}
            >Change</Button>
         </div>
      </>
   )
}

export default GreetingModifier;