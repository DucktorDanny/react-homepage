// import { useEffect } from 'react';
// import { Button } from '@material-ui/core';
import EventCard from './EventCard';
import './style/CalendarEvents.css';

const CalendarEvents = ({ date, show, onClose }) => {

   // useEffect(() => {
   //    console.log(new Date(date));
   // }, []);

   const selectEventPoint = (e) => {
      const eventPoints = document.querySelector('.calendar-event-point-section').childNodes;

      for (const eventPoint of eventPoints) {
         eventPoint.classList.remove('selected-event-point');
      }
      e.target.classList.add('selected-event-point');

      // we should get localStorage data from here and bring it down to AllEvents and SelectedEvents
   }

   const onCloseByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         onClose(e);
      }
   }

   return (
      <div onClick={onCloseByBackground} className={show === true ? 'popup-container' : show === false ? 'popup-container popup-container-hidden' : 'popup-load'}>
         <div className='popup-box calendar-events'>
               <div className='calendar-events-close' onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z" /></svg>
               </div>

               {/*  header section where could be the close button and menu
               points like 'All', 'Chosen date' (if there is otherwise disabled show) */}

               <section className='calendar-event-point-section'>
                  <h1 className='event-point' onClick={selectEventPoint}>All events</h1>
                  {date ? <h1 className='event-point selected-event-point' onClick={selectEventPoint}>Selected: {date}</h1> : ''}
               </section>

               <EventCard title='Test' content='This is just some content' date={date} />
               <EventCard title='Test' content='This is just some content' date={date} />
               <EventCard title='Test' content='This is just some content' date={date} />
               
               
         </div>
      </div>
   )
}

export default CalendarEvents;