import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Line from '../Line';
import '../style/Settings.css';

const ExportingImporting = ({ createNotification, setPopup }) => {
   
   const [eventsImport, setEventsImport] = useState('');
   const [settingsImport, setSettingsImport] = useState('');

   // import functions for events and settings
   const importEvents = () => {
      try {
         if (!eventsImport) {
            throw new Error('No importing value.');
         }

         const events = JSON.parse(eventsImport);

         if (events.showElements || events.greeting || events.favoritesArray || events.backgroundColor) {
            throw new Error('Invalid events import!');
         }

         if (typeof events === 'object') {
            localStorage.setItem('events', JSON.stringify(events));
            createNotification('Success', 'You have imported events!', 'success');
            // easy way:
            window.location.reload(true);
         }
      } catch (err) {
         setEventsImport('');
         createNotification('Error', err.message, 'danger');
      }
   }

   const importSettings = () => {
      try {
         if (!settingsImport) {
            throw new Error('No importing value.');
         }

         const data = JSON.parse(settingsImport);

         if (data.showElements && data.greeting && data.favoritesArray && data.backgroundColor) {
            localStorage.setItem('data', JSON.stringify(data));
            createNotification('Success', 'You have imported settings!', 'success');
            // easy way:
            window.location.reload(true);
         } else {
            throw new Error('Invalid settings import!');
         }
      } catch (err) {
         setSettingsImport('');
         createNotification('Error', err.message, 'danger');
      }
   }

   // export (copy to clipboard) functions for events and settings
   const exportEvents = () => {
      try {
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
      } catch (err) {
         createNotification('Error', err.message, 'danger');
      }
   }

   const exportSettings = () => {
      try {
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
      } catch (err) {
         createNotification('Error', err.message, 'danger');
      }
   }

   // reset for default settings
   const resetSettings = () => {
		try {
			const data = JSON.parse(localStorage.getItem('data'));
			if (!data) {
				throw new Error('There are no saved settings.');
			} 

			setPopup({
				type: 'accept-decline',
				open: true,
				data: {
               title: 'Reset settings',
               content: 'Are you sure you want to delete your saved settings?',
               acceptLabel: 'Reset',
               declineLabel: 'Cancel',
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
               value={eventsImport}
               onChange={(e) => setEventsImport(e.target.value)}
            />

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={importEvents}
            >Import</Button>

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={exportEvents}
            >Copy events data</Button>
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
               value={settingsImport}
               onChange={(e) => setSettingsImport(e.target.value)}
            />

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={importSettings}
            >Import</Button>

            <Button
               type='button'
               variant='contained'
               color='primary'
               onClick={exportSettings}
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