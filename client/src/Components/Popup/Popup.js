import { TextField, Button } from '@material-ui/core';
import Line from '../Settings/Line';
import './style/Popup.css';


const Popup = ({
   type,
   open,
   datas
}) => {

   return (
      <div className='popup-container' style={{
         display: open ? 'block' : 'none'
      }}>
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
                     />
                     : <div style={{ display: 'none' }} />
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
         <h1>{ title }</h1>
         <Line />
         <p>{ content }</p>

         <div className='popup-buttons'>
            <Button
               type='button'
               variant='contained'
               className='popup-button-accept'
               onClick={onAccept}
            >{ acceptLabel }</Button>
            <Button
               type='button'
               variant='contained'
               className='popup-button-decline'
               onClick={onDecline}
            >{ declineLabel }</Button>
         </div>
      </>
);

const FavoriteEdit = ({ titleField, linkField, acceptLabel, declineLabel }) => (
   <>
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
         >{ acceptLabel }</Button>
         <Button
            type='button'
            variant='contained'
            className='popup-button-decline'
         >{ declineLabel }</Button>
      </div>
   </>
);

export default Popup;