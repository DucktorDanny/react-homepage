import { useState } from 'react';

import Burger from '@animated-burgers/burger-arrow';
import '@animated-burgers/burger-arrow/dist/styles.css';
import './Styles/Nav.css';

const Nav = () => {
   const [opened, setOpened] = useState(false);

   const clicked = () => {
      setOpened(!opened);
   }

   return (
      <nav>
         <section>
            
         </section>
         <Burger direction='right' isOpen={ opened } onClick={clicked} />
      </nav>
   )
}

export default Nav;