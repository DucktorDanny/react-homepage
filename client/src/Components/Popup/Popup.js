import { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Line from '../Settings/Line';
import './style/Popup.css';

class Popup extends Component {
   constructor() {
      super();
      
      this.state = {
         title: 'Hello World',
         content: 'I just wanna test that my component is working just like this... :)',
         acceptLabel: 'Reset',
         declineLabel: 'Cancel',
      }
   }

   // { title, content, acceptLabel, declineLabel }
   static create({ type, datas }) {
      const acceptDeclinePopup = () => {
         document.querySelector('#accept-decline').style.display = 'block';
      }

      const favoriteEditPopup = () => {
         document.querySelector('#favorite-edit').style.display = 'block';
      }

      try {
         if (!type) {
            throw new Error('Popup type is required!');
         }

         switch(type) {
            case 'accept-decline': {
               acceptDeclinePopup(); 
               break;
            }
            case 'favorite-edit': {
               favoriteEditPopup();
               break;
            }
            default: {
               throw new Error('Popup type unknown.');
            }
         }
      } catch (err) {
         console.error(err.message);
      }
   }
   
   static close() {
      document.querySelector('#accept-decline').style.display = 'none';
      document.querySelector('#favorite-edit').style.display = 'none';
   }

   render() {
      const { title, content, acceptLabel, declineLabel } = this.state;
      return (
         <>
            <AcceptDecline
               title={ title }
               content={ content }
               acceptLabel={ acceptLabel }
               declineLabel={ declineLabel }
            />
            <FavoriteEdit
               titleField={ title }
               acceptLabel={ acceptLabel }
               declineLabel={ declineLabel }
            />
         </>
      )
   }
}

const AcceptDecline = ({ title, content, acceptLabel, declineLabel }) => (
   <div id='accept-decline' className='popup-container'>
      <div className='popup-box'>
         { title
         ? <>
            <h1>{title}</h1>
            <Line />
         </>
         : ''}
         
         <p>{content}</p>

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
            >{acceptLabel}</Button>
            <Button
               type='button'
               variant='contained'
               className='popup-button-decline'
               onClick={Popup.close}
            >{declineLabel}</Button>
         </div>
      </div>
   </div>
);

const FavoriteEdit = ({ titleField, linkField, acceptLabel, declineLabel }) => (
   <div id='favorite-edit' className='popup-container'>
      <div className='popup-box'>

         <TextField
            id='favorite-edit-title'
            className='textfield'
            name='favorite-edit-title'
            type='text'
            label='Title'
            variant='outlined'
            defaultValue={ titleField }
         />

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
            >{acceptLabel}</Button>
            <Button
               type='button'
               variant='contained'
               className='popup-button-decline'
               onClick={ Popup.close }
            >{declineLabel}</Button>
         </div>
      </div>
   </div>
);

export default Popup;