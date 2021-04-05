import Checkbox from '../Settings/Checkbox';
import { Button } from '@material-ui/core';
import './style/DailyTodos.css';

const EventCard = ({
   id,
   title,
   content,
   done,
   // setEvents,
   setEventDone,
   date,
   onEvent,
   onRemove,
   showDate
}) => {
   return (
      <section className={`event-card ${done ? 'event-done' : ''}`} onClick={(e) => {
         if (!e.target.classList.contains('MuiButton-label') && !e.target.classList.contains('MuiButtonBase-root') && !e.target.classList.contains('checkmark')) {
            return onEvent ? onEvent(date) : null;
         }
         return null;
      }}>
         {/* htmlName, onClick, labelText, chekced */}
         <div className='event-card-title'>
            <Checkbox htmlName='event-done' onClick={() => setEventDone(id, !done, date)} chekced={done} />
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