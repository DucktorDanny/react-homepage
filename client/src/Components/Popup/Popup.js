import { useState } from 'react';
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
   const onDeclineByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         data.onDecline();
      }
   }
   return (
      <div onClick={onDeclineByBackground} className={open === true ? 'popup-container' : open === false ? 'popup-container popup-container-hidden' : 'popup-load'} >
         <div className='popup-box'>
            {
               type === 'accept-decline'
                  ? <AcceptDecline
                     title={data.title}
                     content={data.content}
                     acceptLabel={data.acceptLabel}
                     declineLabel={data.declineLabel}
                     onAccept={data.onAccept}
                     onDecline={data.onDecline}
                  />
               : type === 'favorite-edit'
                     ? <FavoriteEdit
                        titleField={data.titleField}
                        linkField={data.linkField}
                        acceptLabel={data.acceptLabel}
                        declineLabel={data.declineLabel}
                        onAccept={data.onAccept}
                        onDecline={data.onDecline}
                     />
               : type === 'event-handler'
               ? <EventHandler
                     date={data.date}
                     onAccept={data.onAccept}
                     onDecline={data.onDecline}
                     acceptLabel={data.acceptLabel}
                     declineLabel={data.declineLabel}
                  />
               : ''
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
   return (
      <>
         <h1>Edit</h1>
         <Line />
         <div className='textfields'>
            <h2>{titleField}</h2>
            <TextField
               id='favorite-edit-title'
               className='edit-textfield'
               name='favorite-edit-title'
               type='text'
               label='New title'
               variant='outlined'
            />
            <h2>{linkField}</h2>
            <TextField
               id='favorite-edit-link'
               className='edit-textfield'
               name='favorite-edit-link'
               type='text'
               label='New link'
               variant='outlined'
            />
         </div>

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