import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';

import '../style/Settings.css';

const GreetingModifier = ({
   showGreeting,
   // greetingPronouns,
   setGreetingPronouns,
   // greetingEmoji,
   setGreetingEmoji,
   createNotification
}) => {   
   const [pronouns, setPronouns] = useState('');
   const [chosenEmoji, setChosenEmoji] = useState(null);
   
   const changeGreeting = () => {   
      try {
         if (pronouns === '' && !chosenEmoji) {
            throw new Error('At least one value is required!');
         }

         if (pronouns !== '') {
            setGreetingPronouns(pronouns);
            setPronouns('');
         }
         if (chosenEmoji) {
            setGreetingEmoji(chosenEmoji.emoji);
            setChosenEmoji(null);
         }
      } catch (err) {
         createNotification('Error', err.message, 'danger');
      }
	}

   useEffect(() => {
      console.log(chosenEmoji);
   }, [chosenEmoji]);

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
               helperText={pronouns.length === 12 ? 'This is the maximum length!' : ''}
               error={pronouns.length === 12}
               variant='outlined'
               value={pronouns}
               onChange={(e) => setPronouns(e.target.value)}
               inputProps={{
                  maxLength: 12,
               }}
               disabled={!showGreeting}
            />

            {/* Selected emoji */}
            <div className='chosen-emoji'>{
               chosenEmoji
               ? <h3>{chosenEmoji.emoji}</h3>
               : <label>Choose an emoji</label>
            }</div>
            <Picker
               onEmojiClick={(e, emoji) => {
                  if (!chosenEmoji || chosenEmoji.unified !== emoji.unified) {
                     setChosenEmoji(emoji)
                  } else {
                     setChosenEmoji(null);
                  }
               }}
               disableSearchBar
               skinTone={SKIN_TONE_NEUTRAL}
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