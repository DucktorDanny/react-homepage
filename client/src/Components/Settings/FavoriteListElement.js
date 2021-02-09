// import { Button } from '@material-ui/core';
import './style/Settings.css';

const FavoriteListElement = ({ data_key, name, url, removeFunction }) => {
   return (
      <div id={ `${data_key}-fav-lement` } className='favorite-list-element'>
         <div className='fav-list-header'>
            <div className='edit-icon'>
               <svg id={ data_key } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
            </div>
            <h3>{ name }</h3>
            <div className='remove-icon' onClick={ removeFunction }>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"/></svg>
            </div>
         </div>

         <a href={ url }><h4>{ url }</h4></a>

         {/* <Button
				variant='contained'
				color='secondary'
            onClick={ removeFunction }
			>Remove</Button> */}
      </div>
   )
}

export default FavoriteListElement;