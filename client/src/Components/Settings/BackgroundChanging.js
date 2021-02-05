import { useState, useEffect } from 'react';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './style/Settings.css';

const PrettoSlider = withStyles({
   root: {
     height: 8,
   },
   thumb: {
     height: 24,
     width: 24,
     backgroundColor: '#fff',
     border: '2px solid currentColor',
     marginTop: -8,
     marginLeft: -12,
     '&:focus, &:hover, &$active': {
       boxShadow: 'inherit',
     },
   },
   active: {},
   valueLabel: {
     left: 'calc(-50% + 4px)',
   },
   track: {
     height: 8,
     borderRadius: 4,
   },
   rail: {
     height: 8,
     borderRadius: 4,
   },
 })(Slider);

const BackgroundChanging = ({ R, G, B }) => {
   const [ red, setRed ] = useState(R);
	const [ green, setGreen ] = useState(G);
	const [ blue, setBlue ] = useState(B);

	const changeRed = (event, newValue) => setRed(newValue);
	const changeGreen = (event, newValue) => setGreen(newValue);
	const changeBlue = (event, newValue) => setBlue(newValue);
	
	useEffect(() => {
		document.querySelector('body').style.background = `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), #a4a4a4)`;
	}, [red, green, blue]);

   return (
      <div className='background-sliders'>
       
         <h3>Red</h3>
         <PrettoSlider
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            value={ red }
            min={ 0 }
            max={ 255 }
            onChange={ changeRed }
            style={{
               color: 'red'
            }}
         />

         <h3>Green</h3>
         <PrettoSlider
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            value={ green }
            min={ 0 }
            max={ 255 }
            onChange={ changeGreen }
            style={{
               color: 'green'
            }}
         />

         <h3>Blue</h3>
         <PrettoSlider
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            value={ blue }
            min={ 0 }
            max={ 255 }
            onChange={ changeBlue }
            style={{
               color: 'blue'
            }}
         />
      </div>
   )
}

export default BackgroundChanging;