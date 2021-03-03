import EventCard from './EventCard';
import './style/CalendarEvents.css';

const AllEvents = ({ events, onEvent, onRemove }) => {
   return (
      <>
         {
            events
               ? Object.entries(events).map((date, i) => (
                  date[1].map((event, j) => {
                     const key = `all-${i}-${j}`;
                     return (
                        <EventCard
                           key={key}
                           id={j}
                           title={event.title}
                           content={event.content}
                           date={date[0] }
                           onEvent={onEvent}
                           onRemove={onRemove}
                           showDate
                        />
                     )
                  })
               ))
               : <h2>There are no events!</h2>
         }
      </>
   )
}

export default AllEvents;