import Checkbox from '../Checkbox';

import '../style/Settings.css';

const ElementVisibility = ({
   showFavorites, setShowFavorites,
   showGreeting, setShowGreeting,
   showCalendar, setShowCalendar,
   showNotifications, setShowNotifications
}) => {
   /**
    * I was thinking that the useStates and useEffects what belongs mainly to these should be here,
    * but I came to that conclusion that this might be much easier if I have access to all of them there.
    * However I might try it again where I would have getters and in Settings.js I would have access to these.
    * 
    * Think about it...
    */
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