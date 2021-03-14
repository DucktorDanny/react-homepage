import EventCard from './EventCard';
// import { Button } from '@material-ui/core';
import './style/CalendarEvents.css';

const SelectedDateEvent = ({ date, events, onRemove }) => {
   const eventEdit = (e) => {
      console.log(e);
   }

   return (
      <>
         {
            events && events.length !== 0
               ? events.map((event, id) => (
                  <EventCard
                     key={`selected-${id}`}
                     id={id}
                     title={event.title}
                     content={event.content}
                     date={date}
                     onEvent={eventEdit}
                     onRemove={onRemove}
                  />
               ))
               : <h2>There are no events!</h2>
         }
      </>
   )
}

export default SelectedDateEvent;