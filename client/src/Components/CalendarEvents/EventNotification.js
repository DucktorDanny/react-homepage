import { useState } from 'react';
import Checkbox from '../Settings/Checkbox';
import './style/CalendarEvents.css';

const EventNotification = ({ events, setEventDone }) => {
   // console.log(document.querySelector('.react-calendar-container'));

   return (
      <section className='event-notifications-container'>
         {
            events && events.length > 0
            ? events.map((event, id) => {
               return (
                  <Notification key={id} title={event.title} content={event.content} done={event.done} setDone={(newDoneValue) => setEventDone(id, newDoneValue, new Date(new Date().toDateString()).getTime())} />
               )
            })
            : <h1 className='no-events-message'>There are no events today...</h1>
         }
      </section>
   )
}

const Notification = ({ title, content, done, setDone }) => {
   // I use this for changing immediately the value of Checkbox
   // (without this it's not rerendering the Component)
   const [doneState, setDoneState] = useState(done);

   return (
      <div className={`event-notification ${doneState ? 'event-done' : ''}`}>
         <div className='event-notification-title'>
            {/* <h1>{title}</h1> */}
            <Checkbox htmlName='event-done-checkbox' onClick={() => {
               setDoneState(!doneState);
               setDone(!doneState);
            }} labelText={title} chekced={doneState} />
         </div>
         <p>{content}</p>
      </div>
   )
}

export default EventNotification;