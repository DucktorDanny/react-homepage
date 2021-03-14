import { Button } from '@material-ui/core';
import './style/CalendarEvents.css';

const EventCard = ({ id, title, content, date, onEvent, onRemove, showDate }) => {
   
   return (
      <section className='event-card' onClick={(e) => {
         if (!e.target.classList.contains('MuiButton-label') && !e.target.classList.contains('MuiButtonBase-root')) {
            return onEvent ? onEvent(date) : null;
         }
         return null;
      }}>
         <h3>{title}</h3>
         <p>{content}</p>
         {showDate ? <label htmlFor='date'>{date}</label> : ''}
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