import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
// import EventCard from './EventCard';
import AllEvents from './AllEvents';
import SelectedDateEvent from './SelectedDateEvent';
import Popup from '../Popup/Popup';
import './style/CalendarEvents.css';

const CalendarEvents = ({ date, events, show, onClose }) => {

   // const [eventsState, setEventsState]
   const [selectedDate, setSelectedDate] = useState(date);
   const [isAllEventsSelected, setIsAllEventsSelected] = useState(null);

   const [popup, setPopup] = useState(Object);

   const selectEventPoint = (e) => {
      removeAllMenuSelection();
      e.target.classList.add('selected-event-point');
      setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
   }

   const removeAllMenuSelection = () => {
      const eventPoints = document.querySelector('.calendar-event-point-section').childNodes;
      for (const eventPoint of eventPoints) {
         eventPoint.classList.remove('selected-event-point');
      }
   }

   const onCloseByButton = (e) => {
      onClose(e);
      // wait for the animation
      setTimeout(() => {
         setSelectedDate(null);
      }, 500);
   }

   const onCloseByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         onCloseByButton(e);
      }
   }

   const selectEvent = (e) => {
      setSelectedDate(e);
   }

   const handleEventAdding = () => {
      const closeEventAddingPopup = () => {
         setPopup({
            type: 'event-handler',
            open: false,
            datas: {
               acceptLabel: 'Add',
               declineLabel: 'Cancel'
            }
         });
      }
      setPopup({
         type: 'event-handler',
         open: true,
         datas: {
            onAccept: (title, content, date) => {
               console.log('Add', title, content, date);
               date = new Date(date).toLocaleDateString();
               if (!events[date]) {
                  events[date] = [];
               }
               events[date].push({
                  title,
                  content
               });
               localStorage.setItem('events', JSON.stringify(events));
               closeEventAddingPopup();
            },
            onDecline: () => {
               console.log('Cancel');
               closeEventAddingPopup();
            },
            acceptLabel: 'Add',
            declineLabel: 'Cancel'
         }
      });
   }

   const eventOnRemove = (id, title, content, date) => {
      const popupTitle = 'Remove';
      const popupContent = 'Are you sure you want to remove this event?';
      const acceptLabel = 'Yes';
      const declineLabel = 'Cancel';

      const closeRemovePopup = () => {
         setPopup({
            type: 'accept-decline',
            open: false,
            datas: {
               title: popupTitle,
               content: popupContent,
               acceptLabel,
               declineLabel,
            }
         });
      }
      
      console.log(id, title, content, date);

      setPopup({
         type: 'accept-decline',
         open: true,
         datas: {
            title: popupTitle,
            content: popupContent,
            acceptLabel,
            declineLabel,
            onAccept: () => {
               events[date].splice(id, 1);
               localStorage.setItem('events', JSON.stringify(events));

               closeRemovePopup();
            },
            onDecline: () => {
               closeRemovePopup();
            }
         }
      });      

   }

   useEffect(() => {
      // console.log('selectedDate changed: ', selectedDate)
      if (selectedDate) {
         removeAllMenuSelection();
         document.querySelector('#event-point-date').classList.add('selected-event-point');
      }
      setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
   }, [selectedDate, setSelectedDate]);

   useEffect(() => {
      // console.log('date changed: ', date)
      setSelectedDate(date);
   }, [date]);

   useEffect(() => {
      // console.log('show changed: ', show, 'isAllEventsSelected value: ', isAllEventsSelected);
      setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
   }, [show, setIsAllEventsSelected]);

   useEffect(() => {
      console.log('isAllEventsSelected changed: ', isAllEventsSelected);
   }, [isAllEventsSelected]);

   return (
      <>
      <div onClick={onCloseByBackground} className={show === true ? 'popup-container' : show === false ? 'popup-container popup-container-hidden' : 'popup-load'}>
         <div className='popup-box calendar-events'>
            <div className='calendar-events-close' onClick={onCloseByButton}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z" /></svg>
            </div>

            {/*  header section where could be the close button and menu
               points like 'All', 'Chosen date' (if there is otherwise disabled show) */}

            <section className='calendar-event-point-section'>
               <h1 id='all-events' className={selectedDate ? 'event-point' : 'event-point selected-event-point'} onClick={selectEventPoint}>All events</h1>
               {selectedDate ? <h1 id='event-point-date' className='event-point selected-event-point' onClick={selectEventPoint}>Selected: {selectedDate}</h1> : ''}
            </section>

            <div className='events-container'>
               {isAllEventsSelected
                  ? <AllEvents events={events} onEvent={selectEvent} onRemove={eventOnRemove} />
                  : <SelectedDateEvent date={selectedDate} events={events[selectedDate] } onRemove={eventOnRemove} />}
               
               <section className='add-new-event'>
                  <Button
                     type='button'
                     variant='contained'
                     color='primary'
                     onClick={handleEventAdding}
                  >Add new event</Button>
               </section>

            </div>

         </div>
      </div>
      <Popup
         type={popup.type}
         open={popup.open}
         datas={popup.datas}
      />
      </>
   )
}

export default CalendarEvents;