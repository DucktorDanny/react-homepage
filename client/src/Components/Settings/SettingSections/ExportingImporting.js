import { TextField, Button } from '@material-ui/core';
import Line from '../Line';
import '../style/Settings.css';

const ExportingImporting = ({ createNotification, setPopup }) => {
   
   const setImportedData = (type) => {
		// verify data
		try {
         if (type === 'settings') {
            const importSettingsField = document.querySelector('#import-settings-field');
            console.log(importSettingsField);
            
            if (!importSettingsField.value) {
               throw new Error('No importing value.');
            }

            const data = JSON.parse(importSettingsField.value);
   
            if (data.showElements && data.greeting && data.favoritesArray && data.backgroundColor) {
               localStorage.setItem('data', JSON.stringify(data));
               createNotification('Success', 'You have imported settings!', 'success');
               
               // easy way:
               window.location.reload(true);
            }
         } else if (type === 'events') {
            const importEventsField = document.querySelector('#import-events-field');
            console.log(importEventsField);
            
            if (!importEventsField.value) {
               throw new Error('No importing value.');
            }

            const events = JSON.parse(importEventsField.value);

            if (typeof events === 'object') {
               localStorage.setItem('events', JSON.stringify(events));
               createNotification('Success', 'You have imported events!', 'success');
               
               // easy way:
               window.location.reload(true);
            }

         } else {
            throw new Error('Invalid importing type.');
         }
		} catch (err) {
			createNotification('Error', err.message, 'danger');
		}
   }
   
   const copySettingsData = (type) => {
		try {
         if (type === 'settings') {
            const data = localStorage.getItem('data');
      
            if (!data) {
               throw new Error('You have no saved data!');
            }
   
            navigator.clipboard.writeText(data)
               .then(() => {
                  createNotification('Success', 'You have copied your settings!', 'success');
               })
               .catch((err) => {
                  throw new Error(`Error in copying: ${err.message}`);
               });
         } else if (type === 'events') {
            const events = localStorage.getItem('events');

            if (!events) {
               throw new Error('You have no events!');
            }

            navigator.clipboard.writeText(events)
               .then(() => {
                  createNotification('Success', 'You have copied your events!', 'success');
               })
               .catch((err) => {
                  throw new Error(`Error in copying: ${err.message}`);
               });
         } else {
            throw new Error('Invalid importing type.');
         }
		} catch(err) {
			createNotification('Error', err.message, 'danger');
		}
   }
   
   const resetSettings = () => {
		try {
			const datas = JSON.parse(localStorage.getItem('data'));
			if (!datas) {
				throw new Error('There are no saved settings.');
			} 

			const type = 'accept-decline';
			const title = 'Reset settings';
			const content = 'Are you sure you want to delete your saved settings?';
			const acceptLabel = 'Reset';
			const declineLabel = 'Cancel';

			setPopup({
				type,
				open: true,
				data: {
					title, content, acceptLabel, declineLabel,
					onAccept: () => {
						localStorage.removeItem('data');
						// easy way:
						window.location.reload(true);
						setPopup({});
					},
					onDecline: () => {
						setPopup({});
					}
				}
			});
		} catch(err) {
			createNotification('Error', err.message, 'danger');
		}
	}

   return (
      <>
         <h2>Import and export events</h2>
         <div className='imp-exp'>
            <TextField
               id='import-events-field'
               className='textfield'
               name='import-events'
               type='text'
               label='Copied events'
               variant='outlined'
            />

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={() => setImportedData('events')}
            >Import</Button>

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={() => copySettingsData('events')}
            >Copy settings data</Button>
         </div>

         <Line />

         <h2>Import, export and reset settings</h2>
         <div className='imp-exp'>
            <TextField
               id='import-settings-field'
               className='textfield'
               name='import-events'
               type='text'
               label='Copied settings'
               variant='outlined'
            />

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={() => setImportedData('settings')}
            >Import</Button>

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={() => copySettingsData('settings')}
            >Copy settings data</Button>

            <Button
               type='button'
               variant='contained'
               className='reset-settings'
               onClick={resetSettings}
            >Reset settings</Button>
         </div>
      </>
   )
}

export default ExportingImporting;