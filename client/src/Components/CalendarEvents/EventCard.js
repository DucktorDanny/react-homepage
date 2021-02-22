import './style/CalendarEvents.css';

const EventCard = ({ title, content, date, onEvent }) => {
   
   return (
      <section className='event-card' onClick={() => onEvent ? onEvent(date) : null}>
         <h3>{title}</h3>
         <p>{content}</p>
         <label htmlFor='date'>{date}</label>
      </section>
   )
}

export default EventCard;