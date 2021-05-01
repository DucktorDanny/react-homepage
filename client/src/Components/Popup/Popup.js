import { useState, useRef, useEffect } from 'react';
// import { TextField, Button } from '@material-ui/core';
// import Line from '../Settings/Line';
import AcceptDecline from './PopupTypes/AcceptDecline';
import FavoriteEdit from './PopupTypes/FavoriteEdit';
import EventHandler from './PopupTypes/EventHandler';
import EventEdit from './PopupTypes/EventEdit';
import './style/Popup.css';

const Popup = ({
   type,
   open,
   data
}) => {
   const [cache, setCache] = useState(null);
   const cacheRef = useRef(null);

   const onDeclineByBackground = (e) => {
      if (e.target.classList.contains('popup-container')) {
         data.onDecline();
      }
   }

   useEffect(() => {
      // console.log(type, open, data);
      if (type && open && data) {
         cacheRef.current = {
            type, open, data
         };
         setCache(cacheRef.current);
      } else if (cacheRef.current && !type && !open && !data) {
         setCache({...cacheRef.current, open: false});
      }
   }, [type, open, data]);

   return (
      <div 
         onClick={onDeclineByBackground}
         className={ cache
            ? cache.open === true
               ? 'popup-container'
               : cache.open === false
                  ? 'popup-container popup-container-hidden'
                  : 'popup-load' 
            : '' }
      >
         <div className='popup-box'>
            {
               cache ?
               cache.type === 'accept-decline'
                  ? <AcceptDecline
                     title={cache.data.title}
                     content={cache.data.content}
                     acceptLabel={cache.data.acceptLabel}
                     declineLabel={cache.data.declineLabel}
                     onAccept={cache.data.onAccept}
                     onDecline={cache.data.onDecline}
                  />
               : cache.type === 'favorite-edit'
                     ? <FavoriteEdit
                        titleField={cache.data.titleField}
                        linkField={cache.data.linkField}
                        acceptLabel={cache.data.acceptLabel}
                        declineLabel={cache.data.declineLabel}
                        onAccept={cache.data.onAccept}
                        onDecline={cache.data.onDecline}
                     />
               : cache.type === 'event-handler'
                  ? <EventHandler
                     date={cache.data.date}
                     onAccept={cache.data.onAccept}
                     onDecline={cache.data.onDecline}
                     acceptLabel={cache.data.acceptLabel}
                     declineLabel={cache.data.declineLabel}
                  />
               : cache.type === 'event-edit'
                  ? <EventEdit
                        date={cache.data.date}
                        titleField={cache.data.titleField}
                        linkField={cache.data.linkField}
                        acceptLabel={cache.data.acceptLabel}
                        declineLabel={cache.data.declineLabel}
                        onAccept={cache.data.onAccept}
                        onDecline={cache.data.onDecline}
                     />
               : '' : ''
            }
         </div>
      </div >
   )
};

export default Popup;