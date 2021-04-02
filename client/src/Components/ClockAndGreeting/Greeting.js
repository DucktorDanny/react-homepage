import { useEffect, useState, useRef } from 'react';

import './style/Greeting.css';

const Greeting = ({ pronouns, emojis }) => {
   const [ greetings, setGreetings ] = useState('');
   
   const pronounsProp = useRef(pronouns);
   const emojisProp = useRef(emojis);

   useEffect(() => {
      const setGreeting = () => {
         const currentHour = new Date().getHours();
   
         if (!pronouns || pronouns.trim() === '') {
            const datas = localStorage.getItem('datas');
            pronounsProp.current = datas ? JSON.parse(datas).greeting.pronouns : 'friend';
         } else {
            pronounsProp.current = pronouns;
         }
   
         if (!emojis || emojis.trim() === '') {
            const datas = localStorage.getItem('datas');
            emojisProp.current = datas ? JSON.parse(datas).greeting.emoji : '🐣';
         } else {
            emojisProp.current = emojis;
         }
   
         if (currentHour > 19) {
            setGreetings(`Good night, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 16) {
            setGreetings(`Good evening, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 11) {
            setGreetings(`Good afternoon, ${pronounsProp.current}!  ${emojisProp.current}`);
         } else if (currentHour > 2) {
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

   useEffect(() => {
      setTimeout(() => {
         const greeting = document.querySelector('.greeting');
         greeting.classList.remove('greeting-onload-animation');
      }, 1400);
   })

   return(
      <div className='greeting greeting-onload-animation'>
         <h1>{greetings}</h1>
      </div>
   )
}

export default Greeting;