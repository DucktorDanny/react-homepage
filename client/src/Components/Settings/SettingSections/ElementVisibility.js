import Checkbox from '../Checkbox';

import '../style/Settings.css';

const ElementVisibility = ({
   showFavorites, setShowFavorites,
   showGreeting, setShowGreeting,
   showCalendar, setShowCalendar,
   showNotifications, setShowNotifications
}) => {

   return (
      <>
         <h2>Element visibility</h2>
         <div className='element-visibility'>
            <Checkbox htmlName='show-favorites' onClick={() => { setShowFavorites(!showFavorites) }} labelText='Show favorites' chekced={showFavorites} />
            <Checkbox htmlName='show-greeting' onClick={() => { setShowGreeting(!showGreeting) }} labelText='Show greeting' chekced={showGreeting} />
            <Checkbox htmlName='show-calendar' onClick={() => { setShowCalendar(!showCalendar) }} labelText='Show calendar' chekced={showCalendar} />
            <Checkbox htmlName='show-notifications' onClick={() => { setShowNotifications(!showNotifications) }} labelText='Show notifications' chekced={showNotifications} />
         </div>
      </>
   )
}

export default ElementVisibility;