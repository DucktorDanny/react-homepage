import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

import '../style/Settings.css';

const AddingNewFavorite = ({ favorites, setFavorites, createNotification }) => {
   
   const [newFavName, setNewFavName] = useState('');
   const [newFavUrl, setNewFavUrl] = useState('');
   const [ isNewFavUrlValid, setIsNewFavUrlValid ] = useState(false);

   const addNewFavorite = () => {
      try {
         if (newFavName === '' || newFavUrl === '') {
            throw new Error('Name and url are required!');
         }

         if (!isNewFavUrlValid) {
            throw new Error('Url is invalid!');
         }

         const newFav = {
            name: newFavName,
            url: newFavUrl,
         };

         setFavorites([...favorites, newFav]);
         setNewFavName('');
         setNewFavUrl('');
      } catch (err) {
         createNotification('Error', err.message, 'danger');
      }
   }

   useEffect(() => {
      setIsNewFavUrlValid(
         (newFavUrl.includes('http://') || newFavUrl.includes('https://'))
      );
   }, [newFavUrl]);

   return (
      <>
         <h2>Add new favorite</h2>
         <div className='favorite-add'>
            <TextField
               id='favorite-add-name'
               className='textfield'
               name='favorite-add-name'
               type='text'
               label='Name'
               variant='outlined'
               value={newFavName}
               onChange={(e) => setNewFavName(e.target.value)}
               inputProps={{
                  maxLength: 20,
               }}
               helperText={newFavName.length === 20 ? 'This is the maximum length' : ''}
            />
            <TextField
               id='favorite-add-url'
               className='textfield'
               name='favorite-add-link'
               type='text'
               label='Link'
               variant='outlined'
               value={newFavUrl}
               onChange={(e) => setNewFavUrl(e.target.value)}
               error={!isNewFavUrlValid && newFavUrl.length > 7 }
               helperText={!isNewFavUrlValid && newFavUrl.length > 7 ? 'Url needs to start with https:// or http://' : ''}
            />
            <Button
               variant='contained'
               color='primary'
               onClick={addNewFavorite}
            >Add</Button>
         </div>
      </>
   )
}

export default AddingNewFavorite;