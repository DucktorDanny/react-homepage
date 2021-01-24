import { useEffect, useState } from 'react';

import './Styles/Clock.css';

const Clock = () => {
   const [hours, setHours] = useState(null);
   const [minutes, setMinutes] = useState(null);
   const [ampm, setAmpm] = useState(null);

   useEffect(() => {
      setInterval(() => {
         const now = {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
         };
         setHours(now.hours > 12 ? now.hours - 12 : now.hours);
         setMinutes(now.minutes < 10 ? `0${now.minutes}` : now.minutes);
         setAmpm(now.hours >= 12 ? 'pm' : 'am');
      }, 1000);
   }, []);


   return(
      <div className='clock-container'>
         {hours && minutes ? <h1>{hours}:{minutes}</h1> : <h1>Loading...</h1>}
         {ampm ? <p>{ampm}</p> : <p></p>}
      </div>
   )
}

export default Clock;