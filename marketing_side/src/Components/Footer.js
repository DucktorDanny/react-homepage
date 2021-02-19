const Footer = ({ Logo }) => {
   return (
      <footer>
         <label htmlFor='Current version'>Currently available: v1.4</label>
         <label htmlFor='Footer text'>Made by ducktorD. 2021</label>
         <img src={Logo} alt='ducktorD logo' />
      </footer>
   )
}

export default Footer;