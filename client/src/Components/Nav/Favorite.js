import './style/Nav.css';

const Favorite = ({ name, url, onMouseEnter, onMouseLeave }) => {
   return (
      <div className='fav-icon' onMouseEnter={() => onMouseEnter(name)} onMouseLeave={onMouseLeave}>
         <a href={ url }>
            <img className='url-img' src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${ url }`} alt="tests" />
         </a>
         <label htmlFor='title' className='fav-title'>{ name }</label>
         <label htmlFor='title' className='fav-full-title'>{ name }</label>
      </div>
   )
}

export default Favorite;