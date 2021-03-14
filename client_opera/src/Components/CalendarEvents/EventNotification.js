import './style/CalendarEvents.css';

const EventNotification = ({ events }) => {
   // console.log(document.querySelector('.react-calendar-container'));
   return (
      <section className='event-notifications-container'>
         {
            events && events.length > 0
            ? events.map((event, id) => {
               return (
                  <Notification key={id} title={event.title} content={event.content} />
               )
            })
            : <h1 className='no-events-message'>There are no events today...</h1>
         }
      </section>
   )
}

const Notification = ({ title, content }) => (
   <div className='event-notification'>
      <div className='event-notification-title'>
         <h1>{title}</h1>
      </div>
      <p>{content}</p>
   </div>
)

export default EventNotification;