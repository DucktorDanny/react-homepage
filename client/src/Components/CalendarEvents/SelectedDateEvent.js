import EventCard from './EventCard';
import { Button } from '@material-ui/core';
import './style/CalendarEvents.css';

const SelectedDateEvent = ({ date }) => {
   const eventEdit = (e) => {
      console.log(e);
   }
   return (
      <>

         <EventCard title='Test1' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test12' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test13' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test13' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test14' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test15' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test16' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test17' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test188' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test1000' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test31' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test321' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test21' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test1111' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Tes2t1' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test221' content='This is just some content' date={date} onEvent={eventEdit} />
         <EventCard title='Test2111' content='This is just some content' date={date} onEvent={eventEdit} />

         <section className='add-new-event'>
            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={() => { console.log('Add new event') }}
            >Add new event</Button>
         </section>
      </>
   )
}

export default SelectedDateEvent;