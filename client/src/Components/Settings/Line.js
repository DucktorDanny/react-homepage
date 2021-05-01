import './style/Settings.css';

const Line = ({lineColor, heightPx, widthPercent}) => {
   return (
      <div className='line' style={{
         background: `linear-gradient(to right, transparent, ${lineColor || 'white'}, transparent)`,
         height: `${heightPx || '1'}px`
      }}></div>
   )
}

export default Line;