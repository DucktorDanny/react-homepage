import './style/Nav.css';

const Favorite = ({ name, url }) => {
   return (
      <a href={ url }>
         <img className='url-img' src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${ url }`} alt="tests" />
         <div className='data'>
            <label htmlFor="data">{ name }</label>
         </div>
      </a>
   )
}

export default Favorite;