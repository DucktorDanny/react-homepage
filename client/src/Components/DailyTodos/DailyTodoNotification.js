import Checkbox from '../Settings/Checkbox';
import './style/DailyTodoEvents.css';

const DailyTodoNotification = ({ dailyTodo, setTodoDone }) => {

   return (
      <section className='event-notifications-container'>
         {
            dailyTodo && dailyTodo.length > 0
            ? dailyTodo.map((todo, id) => {
               return (
                  <Notification key={id} title={todo.title} content={todo.content} done={todo.done} setDone={(newDoneValue) => {
                     const dateKey = new Date(new Date().toDateString()).getTime();
                     setTodoDone(id, newDoneValue, dateKey);
                  }} />
               )
            })
            : <h1 className='no-events-message'>There are no todo today...</h1>
         }
      </section>
   )
}

const Notification = ({ title, content, done, setDone }) => {
   return (
      <div className={`event-notification ${done ? 'event-done' : ''}`}>
         <div className='event-notification-title'>
            {/* <h1>{title}</h1> */}
            <Checkbox htmlName='event-done-checkbox' onClick={() => {
               setDone(!done);
            }} labelText={title} chekced={done} />
         </div>
         <p>{content}</p>
      </div>
   )
}

export default DailyTodoNotification;