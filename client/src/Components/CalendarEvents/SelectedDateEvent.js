import EventCard from './EventCard';
import './style/CalendarEvents.css';

const SelectedDateEvent = () => {
   return (
      <>
         <section>
            Test
         </section>
         <section className='date-events-container'>
            <EventCard title='Test1' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test2' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test3' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test4' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test5' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test6' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test7' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test8' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test9' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test10' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test11' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test12' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test13' content='This is just some content' date={'22/02/2021'} />
            <EventCard title='Test14' content='This is just some content' date={'22/02/2021'} />
         </section>
      </>
   )
}

export default SelectedDateEvent;