import Checkbox from '../Checkbox';

import '../style/Settings.css';

const ClockSettings = ({ twentyFourClockMode, setTwentyFourClockMode, showSeconds, setShowSeconds }) => {
   return (
      <>
         <h2>Clock settings</h2>
         <div className='clock-settings'>
            <Checkbox
               htmlName='24-hour-mode'
               onClick={ () => { setTwentyFourClockMode(!twentyFourClockMode) } }
               labelText='24-hour mode'
               chekced={ twentyFourClockMode }
            />
            <Checkbox
               htmlName='show-seconds'
               onClick={ () => { setShowSeconds(!showSeconds) } }
               labelText='Show seconds'
               chekced={ showSeconds }
            />
         </div>
      </>
   )
}

export default ClockSettings;