import EventCard from './EventCard';
import './style/CalendarEvents.css';

const AllEvents = ({ events, onEvent }) => {
   return (
      <>
         <EventCard title='Test' content='This is just some content' date={'19/02/2021'} onEvent={onEvent} />
         <EventCard title='Test' content='This is just some content' date={'20/02/2021'} onEvent={onEvent} />
      </>
   )
}

export default AllEvents;