import { Button } from '@material-ui/core';
import './style/Settings.css';

const FavoriteListElement = ({ data_key, name, url, removeFunction }) => {
   return (
      <div id={ `${data_key}-fav-lement` } className='favorite-list-element'>
         <h3>{ name }</h3>
         <a href={ url }><h4>{ url }</h4></a>

         <Button
				variant='contained'
				color='secondary'
            onClick={ removeFunction }
			>Remove</Button>
      </div>
   )
}

export default FavoriteListElement;