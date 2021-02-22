// import { Button } from '@material-ui/core';
import './style/Settings.css';

const FavoriteListElement = ({ data_key, name, url, editFunction, removeFunction }) => {
   return (
      <div id={ `${data_key}-fav-lement` } className='favorite-list-element'>
         <div className='fav-list-header'>
            <div id={ data_key } className='edit-icon' onClick={editFunction}>
               <svg id={ data_key } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={ data_key } d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"/></svg>
            </div>

            <h3>{ name }</h3>

            <div id={ data_key } className='remove-icon' onClick={ removeFunction }>
               {/* <svg id={ data_key } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={ data_key } d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"/></svg> */}
               <svg id={ data_key } xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path id={ data_key } d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z" /></svg>
            </div>
         </div>

         <a href={ url }><h4>{ url }</h4></a>
      </div>
   )
}

export default FavoriteListElement;