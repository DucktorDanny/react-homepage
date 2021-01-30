import FavoriteListElement from './FavoriteListElement';
import './style/Settings.css';

const FavoriteList = ({ favorites, removeFunction }) => {
	return (
		<div className='favorite-list'>

			{
				favorites.map((fav, i) => {
					return(
						<FavoriteListElement key={ i } data_key={ i } name={ fav.name } url={ fav.url }  removeFunction={ removeFunction } />
					);
				})
			}

		</div>
	)
}

export default FavoriteList;