import './style/CalendarEvents.css';

const EventNotification = () => {
   return (
      <section className='event-notifications-container'>
         <Notification title={'Shit'} content={`I don't know what to write here...`} />
         <Notification title={'Shit'} content={`I don't know what to write here... And I do need something even more to test the more characters blah blah...`} />
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