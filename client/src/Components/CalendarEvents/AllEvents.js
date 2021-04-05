import EventCard from './EventCard';
import './style/CalendarEvents.css';

const AllEvents = ({ events, onEvent, onRemove, setEventDone }) => {

   const hasEvents = () => {
      let isThereAnyEvent = false;
      if (events) {
         Object.entries(events).forEach(event => {
            if (event[1].length > 0) {
               isThereAnyEvent = true;
            }
         });
      }
      return isThereAnyEvent;
   }

   const objectEntriesWithIntKeys = (obj) => {
      try {
         const basicObjectEntries = Object.entries(obj);
         const convertedEntries = [];
         basicObjectEntries.forEach(element => {
            convertedEntries.push([
               parseInt(element[0]),
               element[1]
            ]);
         });
         const result = convertedEntries.sort((a, b) => a[0] - b[0]);
         return result;
      } catch (err) {
         console.log(err.message);
      }
      return;
   }

   return (
      <>
         {
            hasEvents()
               ? objectEntriesWithIntKeys(events).map((date, i) => (
                  date[1].map((event, j) => {
                     const key = `all-${i}-${j}`;
                     return (
                        <EventCard
                           key={key}
                           id={j}
                           title={event.title}
                           content={event.content}
                           done={event.done}
                           setEventDone={setEventDone}
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