import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

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
                inputProps={{
                   maxLength: 16
                }}
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

 export default EventHandler;