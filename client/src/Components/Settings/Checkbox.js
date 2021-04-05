import './style/Settings.css';

const Checkbox = ({ htmlName, onClick, labelText, chekced }) => {
	return labelText
	? (
		<label className='container' htmlFor={ htmlName } onClick={ onClick } >{ labelText }
			<input name={ htmlName } type='checkbox' checked={ chekced } readOnly />
			<span className='checkmark'></span>
		</label>
	)
	: (
		<div className='container' htmlFor={ htmlName } onClick={ onClick } style={{ marginLeft: '0', marginRight: '0' }}>
			<input name={ htmlName } type='checkbox' checked={ chekced } readOnly />
			<span className='checkmark'></span>
		</div>
	)
}

export default Checkbox;