import Line from '../../Settings/Line';
import { Button } from '@material-ui/core';

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

 export default AcceptDecline;