import './style/CalendarEvents.css';

const EventCard = ({ title, content, date }) => {
   return (
      <section className='event-card'>
         <h3>{title}</h3>
         <p>{content}</p>
         <label htmlFor='date'>{date}</label>
      </section>
   )
}

export default EventCard;