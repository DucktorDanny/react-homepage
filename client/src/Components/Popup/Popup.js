import { useState, useRef, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Line from '../Settings/Line';
import './style/Popup.css';

const Popup = ({
   type,
   open,
   data
}) => {
   const [cache, setCache] = useState(null);
   const cacheRef = useRef(null);

   const onDeclineByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         data.onDecline();
      }
   }

   useEffect(() => {
      // console.log(type, open, data);
      if (type && open && data) {
         cacheRef.current = {
            type, open, data
         };
         setCache(cacheRef.current);
      } else if (cacheRef.current && !type && !open && !data) {
         setCache({...cacheRef.current, open: false});
      }
   }, [type, open, data]);

   return (
      <div onClick={onDeclineByBackground} className={cache ? cache.open === true ? 'popup-container' : cache.open === false ? 'popup-container popup-container-hidden' : 'popup-load' : ''} >
         <div className='popup-box'>
            {
               cache ?
               cache.type === 'accept-decline'
                  ? <AcceptDecline
                     title={cache.data.title}
                     content={cache.data.content}
                     acceptLabel={cache.data.acceptLabel}
                     declineLabel={cache.data.declineLabel}
                     onAccept={cache.data.onAccept}
                     onDecline={cache.data.onDecline}
                  />
               : cache.type === 'favorite-edit'
                     ? <FavoriteEdit
                        titleField={cache.data.titleField}
                        linkField={cache.data.linkField}
                        acceptLabel={cache.data.acceptLabel}
                        declineLabel={cache.data.declineLabel}
                        onAccept={cache.data.onAccept}
                        onDecline={cache.data.onDecline}
                     />
               : cache.type === 'event-handler'
                  ? <EventHandler
                     date={cache.data.date}
                     onAccept={cache.data.onAccept}
                     onDecline={cache.data.onDecline}
                     acceptLabel={cache.data.acceptLabel}
                     declineLabel={cache.data.declineLabel}
                  />
               : '' : ''
            }
         </div>
      </div >
   )
};

// need to separate this
const AcceptDecline = ({
   title,
   content,
   acceptLabel,
   declineLabel,
   onAccept,
   onDecline
}) => (
   <>
      <h1>{title}</h1>
      <Line />
      <p>{content}</p>

      <div className='popup-buttons'>
         <Button
            type='button'
            variant='contained'
            className='popup-button-accept'
            onClick={onAccept}
         >{acceptLabel}</Button>
         <Button
            type='button'
            variant='contained'
            className='popup-button-decline'
            onClick={onDecline}
         >{declineLabel}</Button>
      </div>
   </>
);

// need to separate this
const FavoriteEdit = ({
   titleField,
   linkField,
   acceptLabel,
   declineLabel,
   onAccept,
   onDecline
}) => {
   const [newTitle, setNewTitle] = useState(null);
   const [newLink, setNewLink] = useState(null);

   return (
      <>
         <h1>Edit</h1>
         <Line />
         <div className='textfields'>
            <TextField
               id='favorite-edit-title'
               className='edit-textfield'
               name='favorite-edit-title'
               type='text'
               label='New title'
               variant='outlined'
               value={newTitle !== null ? newTitle : titleField}
               onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextField
               id='favorite-edit-link'
               className='edit-textfield'
               name='favorite-edit-link'
               type='text'
               label='New link'
               variant='outlined'
               value={newLink !== null ? newLink : linkField}
               onChange={(e) => setNewLink(e.target.value)}
            />
         </div>

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
                  // here we should pass a state with the value of textfield
               onClick={() => {
                  onAccept(newTitle, newLink);
                  setTimeout(() => {
                     setNewTitle(null);
                     setNewLink(null);
                  }, 500);
               }}
            >{acceptLabel}</Button>
            <Button
               type='button'
               variant='contained'
               className='popup-button-decline'
               onClick={onDecline}
            >{declineLabel}</Button>
         </div>
      </>
   )
}

// need to separate this
const EventHandler = ({
   date,
   onAccept,
   onDecline,
   acceptLabel,
   declineLabel
}) => {
   const [chosenTitle, setChosenTitle] = useState('');
   const [chosenContent, setChosenContent] = useState('');
   const [selectedDate, setSelectedDate] = useState(date  ? date : new Date().getTime());

   useEffect(() => {
      console.log(date);
      if (date) {
         setSelectedDate(date);
      } else {
         setSelectedDate(new Date().getTime());
      }
   }, [date]);

   useEffect(() => {
      console.log(selectedDate);
   }, [selectedDate])

   return (
      <>
         <h1>Add new event</h1>
         <div className='textfields'>
            <TextField
               id='event-title-field'
               className='edit-textfield'
               name='event-title'
               type='text'
               label='Title'
               variant='outlined'
               value={chosenTitle}
               onChange={(e) => setChosenTitle(e.target.value)}
            />
            <TextField
               id='event-content-field'
               className='edit-textfield'
               name='event-content'
               type='text'
               label='Content'
               variant='outlined'
               value={chosenContent}
               onChange={(e) => setChosenContent(e.target.value)}
            />
            <TextField
               id='date'
               label='Event date'
               type='date'
               // defaultValue={}
               className='date-picker'
               InputLabelProps={{
                  shrink: true,
               }}
               value={new Date(selectedDate).toLocaleDateString('hu-HU').split('. ').join('-').replace('.', '')}
               onChange={(e) => setSelectedDate(e.target.value)}
            />
         </div>

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
               onClick={(e) => {
                  onAccept(chosenTitle, chosenContent, selectedDate);
                  setTimeout(() => {
                     setChosenTitle('');
                     setChosenContent('');
                     setSelectedDate(new Date().getTime());
                  }, 500);
               }}
            >{acceptLabel}</Button>
            <Button
               type='button'
               variant='contained'
               className='popup-button-decline'
               onClick={onDecline}
            >{declineLabel}</Button>
         </div>
      </>
   )
}

export default Popup;