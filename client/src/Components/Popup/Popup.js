import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
// import { Grid } from '@material-ui/core';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Line from '../Settings/Line';
import './style/Popup.css';

const Popup = ({
   type,
   open,
   data
}) => {
   const [cache, setCache] = useState(null);

   const onDeclineByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         data.onDecline();
      }
   }

   useEffect(() => {
      // console.log(type, open, data);
      if (type && open && data) {
         setCache({
            type, open, data
         });
      } else if (cache && !type && !open && !data) {
         setCache({...cache, open: false});
      }
   }, [type, open, data]);

   useEffect(() => {
      console.log(cache);
      if (cache) {
         console.log(cache.data);
      }
   }, [cache]);

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
         {/* <Line /> */}
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

const EventHandler = ({
   title,
   content,
   date,
   onAccept,
   onDecline,
   acceptLabel,
   declineLabel
}) => {
   const [chosenTitle, setChosenTitle] = useState(title || '');
   const [chosenContent, setChosenContent] = useState(content || '');
   const [selectedDate, setSelectedDate] = useState(date || new Date());

   const handleTitleChange = (e) => {
      setChosenTitle(e.target.value);
   }

   const handleContentChange = (e) => {
      setChosenContent(e.target.value);
   }

   const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
   }

   return (
      <>
         <h1>Add new event</h1>
         <div className='textfields'>
            {/* <h2>Title</h2> */}
            <TextField
               id='event-title-field'
               className='edit-textfield'
               name='event-title'
               type='text'
               label='Title'
               variant='outlined'
               onChange={handleTitleChange}
            />
            {/* <h2>Content</h2> */}
            <TextField
               id='event-content-field'
               className='edit-textfield'
               name='event-content'
               type='text'
               label='Content'
               variant='outlined'
               onChange={handleContentChange}
            />
            <TextField
               id='date'
               label='Event date'
               type='date'
               defaultValue={new Date().toLocaleDateString('hu-HU').split('. ').join('-').replace('.', '')}
               className='date-picker'
               InputLabelProps={{
                  shrink: true,
               }}
               onChange={handleDateChange}
            />
         </div>

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
               onClick={(e) => onAccept(chosenTitle, chosenContent, selectedDate)}
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