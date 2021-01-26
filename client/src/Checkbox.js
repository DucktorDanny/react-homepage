import './Styles/Settings.css';

const Checkbox = ({ htmlName, onClick, labelText, chekced }) => {
	return (
		<label className='container' htmlFor={ htmlName } onClick={ onClick } >{ labelText }
			<input name={ htmlName } type='checkbox' checked={ chekced } readOnly />
			<span className='checkmark'></span>
		</label>
	)
}

export default Checkbox;