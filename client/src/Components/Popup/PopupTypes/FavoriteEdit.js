import { useState } from 'react';
import Line from '../../Settings/Line';
import { TextField, Button } from '@material-ui/core';

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

 export default FavoriteEdit;