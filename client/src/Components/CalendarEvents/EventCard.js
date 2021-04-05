import { useState } from 'react';
import Checkbox from '../Settings/Checkbox';
import { Button } from '@material-ui/core';
import './style/CalendarEvents.css';

const EventCard = ({ id, title, content, done, setEvents, date, onEvent, onRemove, showDate }) => {
   return (
      <section className={`event-card ${done ? 'event-done' : ''}`} onClick={(e) => {
         if (!e.target.classList.contains('MuiButton-label') && !e.target.classList.contains('MuiButtonBase-root') && !e.target.classList.contains('checkmark')) {
            return onEvent ? onEvent(date) : null;
         }
         return null;
      }}>
         {/* htmlName, onClick, labelText, chekced */}
         <div className='event-card-title'>
            <Checkbox htmlName='event-done' onClick={() => {
               // (index, newDoneValue, dateKey)
               // -------- HERE I NEED THAT SHIT --------
               // setEvents(id, !doneState, date);
               // i don't have access to events
               setEvents(events => {
                  return {...events, [date]: events[date].map((e, i) => {
                     if (i === id) {
                        e.done = !done;
                     }
                     return e;
                  })}
               });
               // setEvents(events => {
               //    console.log(events);
               //    return events;
               // })
               // setDoneState(!doneState);
            }} chekced={done} />
            <h3>{title}</h3>
         </div>
         <p>{content}</p>
         {showDate ? <label htmlFor='date'>{new Date(parseInt(date)).toDateString()}</label> : ''}
         <div className='event-card-buttons'>
            <Button
               type='button'
               variant='contained'
               className='event-remove-button'
               onClick={(e) => {
                  return onRemove ? onRemove(id, title, content, date) : null;
               }}
            >Remove</Button>
         </div>
      </section>
   )
}

export default EventCard;