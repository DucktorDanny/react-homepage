import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import '../style/Settings.css';

const AddingNewFavorite = ({ favorites, setFavorites, createNotification }) => {

   const [ isFavoriteNameValid, setIsFavoriteNameValid ] = useState(true);
	const [ isFavoriteUrlValid, setIsFavoriteUrlValid ] = useState(true);

   const checkAddForm = (e) => {
		const favoriteField = e.target;

		if (favoriteField.value === '' && favoriteField.name === 'favorite-add-link') {
			setIsFavoriteUrlValid(true);
		} else if (favoriteField.name === 'favorite-add-name') {
			setIsFavoriteNameValid(favoriteField.value.length <= 20);
		}
	}

   const addNewFavorite = () => {
		const form = document.querySelector('.settings-form');
		const formData = new FormData(form);

		const name = formData.get('favorite-add-name');
		const url = formData.get('favorite-add-link');

		try {
			const isNameValid = name.length <= 20;
			const isUrlValid = url.includes('http://') || url.includes('https://') || url === '';
			
			setIsFavoriteNameValid(isNameValid);
			setIsFavoriteUrlValid(isUrlValid);
			
			if (name === '' || url === '') {
				throw new Error('Name and Url is required!');
			}

			if (isNameValid && isUrlValid) {
				const newFavorite = {
					name: name,
					url: url
				};
	
				setFavorites([...favorites, newFavorite]);
	
				form.reset();
			}
		} catch (err) {
			createNotification('Error', err.message, 'danger');
		}
	}

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
               onChange={checkAddForm}
               error={!isFavoriteNameValid}
               helperText={!isFavoriteNameValid ? 'The name is too long' : ''}
            />
            <TextField
               id='favorite-add-url'
               className='textfield'
               name='favorite-add-link'
               type='text'
               label='Link'
               variant='outlined'
               onChange={checkAddForm}
               error={!isFavoriteUrlValid}
               helperText={!isFavoriteUrlValid ? 'Url is invalid' : ''}
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