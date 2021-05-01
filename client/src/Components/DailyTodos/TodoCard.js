import Checkbox from '../Settings/Checkbox';
import { Button } from '@material-ui/core';
import './style/DailyTodoEvents.css';

const TodoCard = ({
   id,
   title,
   content,
   done,
   setTodoDone,
   date,
   onTodo,
   onRemove,
   showDate,
   marginTop
}) => {
   return (
      <section className={`event-card ${done ? 'event-done' : ''}`} style={{marginTop: `${marginTop || '0'}`}} onClick={(e) => {
         if (!e.target.classList.contains('MuiButton-label') && !e.target.classList.contains('MuiButtonBase-root') && !e.target.classList.contains('checkmark')) {
            return onTodo ? onTodo(date, id) : null;
         }
         return null;
      }}>
         {/* htmlName, onClick, labelText, chekced */}
         <div className='event-card-title'>
            <Checkbox htmlName='event-done' onClick={() => setTodoDone(id, !done, date)} chekced={done} />
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

export default TodoCard;