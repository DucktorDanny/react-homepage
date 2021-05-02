import { useState, useEffect } from 'react';
import Line from '../../Settings/Line';
import { TextField, Button } from '@material-ui/core';

const EventEdit = ({
	date,
	titleField,
	linkField,
	acceptLabel,
	declineLabel,
	onAccept,
	onDecline,
}) => {
	const [newTitle, setNewTitle] = useState(null);
	const [newContent, setNewContent] = useState(null);
	const [newDate, setNewDate] = useState(date  ? date : new Date().getTime());

	useEffect(() => {
		console.log(date);
		if (date) {
			setNewDate(date);
		} else {
			setNewDate(new Date().getTime());
		}
	 }, [date]);
  
	 useEffect(() => {
		console.log(newDate);
	 }, [newDate])

	return (
		<>
			<h1>Edit</h1>
			<Line />
			<div className='textfields'>
				<TextField
					id='favorite-edit-title'
					className='edit-textfield'
					name='favorite-edit-title'
					type='text'
					label='Title'
					variant='outlined'
					value={newTitle !== null ? newTitle : titleField}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<TextField
					id='favorite-edit-link'
					className='edit-textfield'
					name='favorite-edit-link'
					type='text'
					label='Content'
					variant='outlined'
					value={newContent !== null ? newContent : linkField}
					onChange={(e) => setNewContent(e.target.value)}
				/>
				<TextField
					id='date'
					label='Event date'
					type='date'
					// defaultValue={}
					className='date-picker'
					InputLabelProps={{
						shrink: true,
					}}
					value={new Date(newDate).toLocaleDateString('hu-HU').split('. ').join('-').replace('.', '')}
					onChange={(e) => setNewDate(e.target.value)}
				/>
			</div>

			<div className='popup-buttons'>
				<Button
					type='button'
					variant='contained'
					className='popup-button-accept'
					// here we should pass a state with the value of textfield
					onClick={() => {
						onAccept(newDate, newTitle, newContent);
						setTimeout(() => {
							setNewDate(new Date().getTime());
							setNewTitle(null);
							setNewContent(null);
						}, 500);
					}}
				>{acceptLabel}</Button>
				<Button
					type='button'
					variant='contained'
					className='popup-button-decline'
					onClick={onDecline}
				>{declineLabel}</Button>
			</div>
		</>
	);
}

export default EventEdit;