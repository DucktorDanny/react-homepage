import { TextField, Button } from '@material-ui/core';
import Line from '../Settings/Line';
import './style/Popup.css';

const Popup = ({
   type,
   open,
   datas
}) => {
   const onDeclineByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         datas.onDecline();
      }
   }
   return (
      <div onClick={onDeclineByBackground} className={open === true ? 'popup-container' : open === false ? 'popup-container popup-container-hidden' : 'popup-load'} >
         <div className='popup-box'>
            {
               type === 'accept-decline'
                  ? <AcceptDecline
                     title={datas.title}
                     content={datas.content}
                     acceptLabel={datas.acceptLabel}
                     declineLabel={datas.declineLabel}
                     onAccept={datas.onAccept}
                     onDecline={datas.onDecline}
                  />
               : type === 'favorite-edit'
                     ? <FavoriteEdit
                        titleField={datas.titleField}
                        linkField={datas.linkField}
                        acceptLabel={datas.acceptLabel}
                        declineLabel={datas.declineLabel}
                        onAccept={datas.onAccept}
                        onDecline={datas.onDecline}
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

const EventEdit = ({
   title,
   content,
   date
}) => {
   return (
      <>
         
      </>
   )
}

export default Popup;