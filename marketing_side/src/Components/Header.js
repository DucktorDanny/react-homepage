const Header = ({startPagePhoto, buttons}) => {
   return (
      <header>
         <h1>Ducktor Homepage</h1>
         <img src={startPagePhoto} alt='Start page example photo' />
         <div>
            {buttons.map((button, key) => (
               <button key={key} onClick={() => {
                  window.location.href = button.url;
               }}>{button.name}</button>
            ))}
         </div>
         <label htmlFor='Chrome add'>You need to be a tester to add it to Chrome!</label>
      </header>
   )
}

export default Header;