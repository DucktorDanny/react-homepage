import { useEffect, useState, useRef } from 'react';

import './Styles/Greeting.css';

const Greeting = ({ pronouns, emojis }) => {
   const [ greetings, setGreetings ] = useState('');
   
   const pronounsProp = useRef(pronouns);
   const emojisProp = useRef(emojis);

   useEffect(() => {
      const setGreeting = () => {
         const currentHour = new Date().getHours();
   
         if (!pronouns || pronouns.trim() === '') {
            pronounsProp.current = 'friend';
         } else {
            pronounsProp.current = pronouns;
         }
   
         if (!emojis || emojis.trim() === '') {
            emojisProp.current = '🐣';
         } else {
            emojisProp.current = emojis;
         }
   
         if (currentHour > 21) {
            setGreetings(`Good night, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 17) {
            setGreetings(`Good evening, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 12) {
            setGreetings(`Good afternoon, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 5) {
            setGreetings(`Good morning, ${pronounsProp.current}! ${emojisProp.current}`);
         } else {
            setGreetings(`Good night, ${pronounsProp.current}!  ${emojisProp.current}`);
         }
      }

      setGreeting();
      let interval = setInterval(() => {
         setGreeting();
      }, 1000);
      return () => clearInterval(interval);
   }, [ setGreetings, pronouns, emojis ]);

   return(
      <div className='greeting'>
         <h1>{greetings}</h1>
      </div>
   )
}

export default Greeting;