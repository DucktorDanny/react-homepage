import { Component } from 'react';
import { Button } from '@material-ui/core';
import Line from '../Settings/Line';
import './style/Popup.css';

class Popup extends Component {
   constructor() {
      super();
      
      this.state = {
         title: 'Test',
         content: 'I just wanna test that my component is working just like this... :)',
         acceptLabel: 'Reset',
         declineLabel: 'Cancel',
      }
   }

   // { title, content, acceptLabel, declineLabel }
   static create({ type, datas }) {
      const acceptDeclinePopup = () => {
         document.querySelector('.popup-container').style.display = 'block';
      }

      try {
         if (!type) {
            throw new Error('Popup type is required!');
         }

         switch(type) {
            case 'accept-decline':
               acceptDeclinePopup(); 
               break;
            default: 
               throw new Error('Popup type unknown.');
         }
      } catch (err) {
         console.error(err.message);
      }
   }
   
   static close() {
      document.querySelector('.popup-container').style.display = 'none';
   }

   render() {
      const { title, content, acceptLabel, declineLabel } = this.state;
      return (
         <div className='popup-container'>
            <div className='popup-box'>
               <h1>{title}</h1>
               <Line />
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
                     onClick={ Popup.close }
                  >{declineLabel}</Button>
               </div>
            </div>
         </div>
      )
   }
}

export default Popup;