import { Button } from '@material-ui/core';
import './Styles/Settings.css';

const FavoriteListElement = ({ data_key, name, url, removeFunction }) => {
   return (
      <div id={ `${data_key}-fav-lement` } className='favorite-list-element'>
         <h3>{ name }</h3>
         <h4>{ url }</h4>

         <Button
				variant='contained'
				color='primary'
            onClick={ removeFunction }
			>Remove</Button>
      </div>
   )
}

export default FavoriteListElement;