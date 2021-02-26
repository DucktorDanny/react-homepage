import EventCard from './EventCard';
import './style/CalendarEvents.css';

const AllEvents = ({ events, onEvent }) => {
   return (
      <>
         <EventCard title='Test' content='This is just some contentahklsdfh kjdhasklfh sdkah fjksdhf kasdhfkjhsd kfhas kjfhasdkl jhfkja dhsklf hasdkjl fhasdklj hfaklhjd fak jhsdkh faksdljh fklasjdh fkljasdhf' date={'19/02/2021'} onEvent={onEvent} showDate />
         
         <EventCard title='Test' content='This is just some content' date={'20/02/2021'} onEvent={onEvent} showDate />
      </>
   )
}

export default AllEvents;