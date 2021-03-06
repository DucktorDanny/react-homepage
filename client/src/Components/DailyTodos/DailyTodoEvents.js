import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import AllDailyTodo from './AllDailyTodo';
import SelectedDateOfTodo from './SelectedDateOfTodo';
import Popup from '../Popup/Popup';

import './style/DailyTodoEvents.css';

const DailyTodoEvents = ({ date, events, setEvents, show, onClose, createNotification, setEventDone }) => {

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
      setTimeout(() => {
         setSelectedDate(date);
      }, 500);
   }

   const onCloseByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         onClose(e);
         setTimeout(() => {
            setSelectedDate(date);
         }, 500);
      }
   }

   const selectEvent = (e) => {
      if (selectedDate === e) {
         removeAllMenuSelection();
         document.querySelector('#event-point-date').classList.add('selected-event-point');   
         setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
      } else {
         setSelectedDate(e);
      }
   }

   const addSpecifiTodo = (title, content, date, done) => {
      if (!title || title === '' || !content || content === '') {
         throw new Error('Title and content are required!');
      }

      date = new Date(new Date(date).toDateString()).getTime();
      if (!events[date]) {
         events[date] = [];
         setEvents({...events, [date]: [{
            title, content, done,
         }]});
      } else {
         setEvents({...events, [date]: [...events[date], {
            title, content, done,
         }]});
      }
   }

   const handleEventAdding = () => {
      setPopup({
         type: 'event-handler',
         open: true,
         data: {
            date: !isAllEventsSelected ? selectedDate : null,
            onAccept: (title, content, date) => {
               try {
                  addSpecifiTodo(title, content, date, false);

                  createNotification('Success', 'New event successfully added!', 'success');
                  setPopup({});
                  console.log(events);
               } catch(err) {
                  console.error(err.message);
                  createNotification('Error', err.message, 'danger');
               }
            },
            onDecline: () => {
               setPopup({});
            },
            acceptLabel: 'Add',
            declineLabel: 'Cancel'
         }
      });
   }

   // the date is the timeKey of a group and the id is the index of that timeKey
   const removeSpecificTodo = (id, date) => {
      console.log('Removing: ', id, date);
      console.log(events);
      const modifiedEvents = {...events, [date]: events[date].filter((e, i) => i !== id)};
      // if on a day we have no more todo then delete empty parts
      Object.entries(modifiedEvents).forEach(event => {
         if (event[1].length === 0) {
            delete modifiedEvents[parseInt(event[0])];
         }
      });
      setEvents(modifiedEvents);
   }

   const eventOnRemove = (id, title, content, date) => {      
      console.log(id, title, content, date);

      setPopup({
         type: 'accept-decline',
         open: true,
         data: {
            title: 'Remove',
            content: 'Are you sure you want to remove this todo?',
            acceptLabel: 'Yes',
            declineLabel: 'Cancel',
            onAccept: () => {
               // remove spesific todo
               removeSpecificTodo(id, date);

               // still need to check if we have empty arrays... (in useEffect)
               createNotification('Success', 'The event was successfully removed!', 'success');
               setPopup({});
            },
            onDecline: () => {
               setPopup({});
            }
         }
      });      
   }

   const removeAllEvents = () => {

      try {
         if (Object.entries(events).length === 0 || (!isAllEventsSelected && !events[selectedDate])) {
            throw new Error('There are no events!');
         }
         const thisDayString = new Date(selectedDate).toDateString();
         setPopup({
            type: 'accept-decline',
            open: true,
            data: {
               title: 'Remove all events',
               content: `Are you sure you want to remove all todo${isAllEventsSelected ? '' : ` from this day (${thisDayString})`}?`,
               acceptLabel: 'Yes',
               declineLabel: 'Cancel',
               onAccept: () => {
                  if (isAllEventsSelected) {
                     setEvents({});
                     createNotification('Success', 'You have deleted all of your todo!', 'success');
                  } else {
                     setEvents(events => {
                        const eventsCopy = {...events};
                        delete eventsCopy[selectedDate];
                        return eventsCopy;
                     });
                     createNotification('Success', `You have deleted all of your todo from this day (${thisDayString})!`, 'success');
                  }

                  setPopup({});
               },
               onDecline: () => {
                  setPopup({});
               }
            }
         });
      } catch (err) {
         createNotification('Error', err.message, 'danger')
      }
   }

   useEffect(() => {
      if (selectedDate) {
         removeAllMenuSelection();
         document.querySelector('#event-point-date').classList.add('selected-event-point');
      }
      setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
   }, [selectedDate]);

   useEffect(() => {
      setSelectedDate(date);
   }, [date]);

   useEffect(() => {
      setIsAllEventsSelected(document.querySelector('#all-events').classList.contains('selected-event-point'));
   }, [setIsAllEventsSelected]);

   const todoEdit = (date, id) => {
      const { title, content } = events[date][id]
      console.log(title, content);
      setPopup(Object);
      setPopup({
         type: 'event-edit',
         open: true,
         data: {
            date,
				titleField: title,
				linkField: content,
				acceptLabel: 'Edit',
            declineLabel: 'Cancel',
            onAccept: (newDate, newTitle, newContent) => {
               try {
                  if (!newDate && !newTitle && !newContent) {
                     throw new Error('There were no changes!');
                  }
                  newDate = new Date(new Date(newDate).toDateString()).getTime();
                  modifyTodoEvent(id, date, newDate || date, newTitle || title, newContent || content);
                  setPopup({});
               } catch (err) {
                  createNotification('Error', err.message, 'danger');
               }
            },
            onDecline: () => {
               setPopup({});
            },
         }
      });
   }

   const modifyTodoEvent = (id, date, newDate, newTitle, newContent) => {
      console.log(id, date, newDate, newTitle, newContent);

      if (!newTitle || newTitle === '' || !newContent || newContent === '') {
         throw new Error('Title and content are required!');
      }

      const isTodoDone =  events[date][id].done;
      
      let modifiedEvents = null;
      if (newDate === date) {
         modifiedEvents = events;
         modifiedEvents[newDate][id] = {
            title: newTitle,
            content: newContent,
            done: isTodoDone,
         };
         localStorage.setItem('events', JSON.stringify(modifiedEvents));
      } else {
         modifiedEvents = {...events, [date]: events[date].filter((e, i) => i !== id)};
         Object.entries(modifiedEvents).forEach(event => {
            if (event[1].length === 0) {
               delete modifiedEvents[parseInt(event[0])];
            }
         });
         if (!modifiedEvents[newDate]) {
            modifiedEvents[newDate] = []
         }
         modifiedEvents[newDate].push({
            title: newTitle,
            content: newContent,
            done: isTodoDone,
         });
      }

      console.log(modifiedEvents);
      setEvents(modifiedEvents);
   }

   return (
      <>
         {/* <EventNotification events={events[todayKey]} /> */}
         <div onClick={onCloseByBackground} className={show === true ? 'popup-container' : show === false ? 'popup-container popup-container-hidden' : 'popup-load'}>
            <div className='popup-box calendar-events'>
               <div className='calendar-events-close' onClick={onCloseByButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                     <path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z" />
                  </svg>
               </div>

               {/*  header section where could be the close button and menu
               points like 'All', 'Chosen date' (if there is otherwise disabled show) */}

               <section className='calendar-event-point-section'>
                  <h1 id='all-events' className={selectedDate ? 'event-point' : 'event-point selected-event-point'} onClick={selectEventPoint}>All todo</h1>
                  {selectedDate ? <h1 id='event-point-date' className='event-point selected-event-point' onClick={selectEventPoint}>Selected: {new Date(parseInt(selectedDate)).toDateString()}</h1> : ''}
               </section>

               <div className='events-container'>
                  {isAllEventsSelected
                     ? <AllDailyTodo
                        dailyTodo={events}
                        onTodo={selectEvent}
                        onRemove={eventOnRemove}
                        setTodoDone={setEventDone}
                     />
                     : <SelectedDateOfTodo
                        date={selectedDate}
                        setTodoDone={setEventDone}
                        dailyTodo={events[selectedDate]}
                        onRemove={eventOnRemove}
                        todoEdit={todoEdit}
                     />
                  }
                  <section className='add-new-event'>
                     <Button
                        type='button'
                        variant='contained'
                        color='primary'
                        onClick={handleEventAdding}
                     >Add new todo</Button>
                     <Button
                        type='button'
                        variant='contained'
                        style={{
                           color: 'white',
                           background: 'rgb(142, 0, 0)'
                        }}
                        onClick={removeAllEvents}
                     >Remove all todo</Button>
                  </section>

               </div>

            </div>
         </div>
         <Popup
            type={popup.type}
            open={popup.open}
            data={popup.data}
         />
      </>
   )
}

export default DailyTodoEvents;