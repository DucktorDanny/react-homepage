const Nav = ({ buttons }) => {
   return (
      <nav>
         <h1>Ducktor Homepage</h1>
         <div>
            {buttons.map((button, key) => (
               <button key={key} onClick={() => {
                  window.location.href = button.url;
               }}>{button.name}</button>
            ))}
         </div>
      </nav>
   )
}

export default Nav;