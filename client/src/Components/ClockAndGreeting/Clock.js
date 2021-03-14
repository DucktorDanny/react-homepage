import { useEffect, useState } from 'react';

import './style/Clock.css';

const Clock = ({ showSeconds = true, twentyFourClockMode = false }) => {
   const [hours, setHours] = useState(null);
   const [minutes, setMinutes] = useState(null);
   const [seconds, setSeconds] = useState(null);
   const [amPm, setAmPm] = useState(null);

   const setTime = () => {
      const now = {
         hours: new Date().getHours(),
         minutes: new Date().getMinutes(),
         seconds: new Date().getSeconds()
      };
      // console.log(now.seconds);
      setHours(now.hours > 12 && !twentyFourClockMode ? now.hours - 12 + '': now.hours+'');
      setMinutes(now.minutes < 10 ? `0${now.minutes}` : now.minutes+'');
      setSeconds(now.seconds < 10 ? `0${now.seconds}` : now.seconds+'');
      setAmPm(now.hours >= 12 ? 'pm' : 'am');
   }
   
   useEffect(() => {

      setTime();
      setTimeout(() => {
         const clockContainer = document.querySelector('.clock-container');
         clockContainer.classList.remove('clock-container-onload-animation');
      }, 1400);

      const interval = setInterval(() => {
         setTime();
      }, 1000);

      return () => {
         console.log('Clean up...');
         clearInterval(interval);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
   return(
      <div className='clock-container clock-container-onload-animation'>
         <h1>{ hours && minutes ? `${hours}:${minutes}` : 'Loading...' }</h1>
         <div>
            <p>{showSeconds && seconds ? seconds : ''}</p>
            <p>{amPm ? amPm : '' }</p>
         </div>
      </div>
   )
}

export default Clock;