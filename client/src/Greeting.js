import { useState, useEffect } from 'react';

import './Styles/Greeting.css';

const Greeting = ({ pronouns = 'friend', emojis = '🦆' }) => {
   const [greetings, setGreetings] = useState('');

   const setGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour > 21) {
         setGreetings(`Good night, ${pronouns}!  ${emojis}`);
      } else if (currentHour > 17) {
         setGreetings(`Good evening, ${pronouns}!  ${emojis}`);
      } else if (currentHour > 12) {
         setGreetings(`Good afternoon, ${pronouns}!  ${emojis}`);
      } else if (currentHour > 5) {
         setGreetings(`Good morning, ${pronouns}! ${emojis}`);
      } else {
         setGreetings(`Good night, ${pronouns}!  ${emojis}`);
      }
   }

   useEffect(() => {
      setGreeting();
      setInterval(() => {
         setGreeting();
      }, 1000)
   }, []);

   return(
      <div className='greeting'>
         <h1>{greetings}</h1>
      </div>
   )
}

export default Greeting;