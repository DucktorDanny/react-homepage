import { useEffect, useState } from 'react';

import './style/Clock.css';

const Clock = () => {
   const [hours, setHours] = useState(null);
   const [minutes, setMinutes] = useState(null);
   const [amPm, setAmPm] = useState(null);

   const setTime = () => {
      const now = {
         hours: new Date().getHours(),
         minutes: new Date().getMinutes()
      };
      setHours(now.hours > 12 ? now.hours - 12 + '': now.hours+'');
      setMinutes(now.minutes < 10 ? `0${now.minutes}` : now.minutes+'');
      setAmPm(now.hours >= 12 ? 'pm' : 'am');
   }

   useEffect(() => {
      setTime();
      setInterval(() => {
         setTime();
      }, 1000);
   }, []);
   
   return(
      <div className='clock-container'>
         <h1>{ hours && minutes ? `${hours}:${minutes}` : 'Loading...' }</h1>
         <p>{amPm ? amPm : '' }</p>
      </div>
   )
}

export default Clock;