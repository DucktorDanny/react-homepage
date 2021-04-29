import { useEffect, useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { createPortal } from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FavoriteListElement from './FavoriteListElement';
import './style/Settings.css';

const useDraggableInPortal = () => {
	const self = useRef({}).current;

	useEffect(() => {
		const div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.pointerEvents = 'none';
		div.style.top = '0';
		div.style.width = '100%';
		div.style.height = '100%';
		self.elt = div;
		document.body.appendChild(div);
		return () => {
			document.body.removeChild(div);
		};
	}, [self]);

	return (render) => (provided, ...args) => {
		const element = render(provided, ...args);
		if (provided.draggableProps.style.position === 'fixed') {
			return createPortal(element, self.elt);
		}
		return element;
	};
};

const FavoriteList = ({ favorites, setFavorites, setPopup, saveChanges, createNotification }) => {
	const renderDraggable = useDraggableInPortal();

	// ___INSERTED___

	const editFavorite = (e) => {
		setPopup(Object);
		const favoriteIndex = parseInt(e.target.getAttribute('id'));

		const titleField = favorites[favoriteIndex].name;
		const linkField = favorites[favoriteIndex].url;
		
		setPopup({
			type: 'favorite-edit',
			open: true,
			data: {
				titleField,
				linkField,
				acceptLabel: 'Edit',
				declineLabel: 'Cancel',
				onAccept: (newTitle, newLink) => {
					try {
						if (!newTitle && !newLink) {
							throw new Error('There were no changes!');
						}
						modifyFavorite(
							newTitle || titleField,
							newLink || linkField,
							favoriteIndex
						);
						setPopup({});
					} catch(err) {
						createNotification('Error', err.message, 'danger');
					}
				},
				onDecline: () => {
					setPopup({});
				}
			}
		});
	}

	const modifyFavorite = (name, url, idx) => {
		console.log('Modify favorite: ', name, url);
		const isNameValid = name.length <= 20;
		const isUrlValid = url.includes('http://') || url.includes('https://') || url === '';

		if (isNameValid && isUrlValid) {
			if (name === '' && url === '') {
				throw new Error('There are no changes!');
			}

			setFavorites(favs => favs.map((element, index) => {
				if (idx === index) {
					element.name = name;
					element.url = url;
				}
				return element;
			}));
		} else if (!isNameValid) {
			throw new Error('The new name is too long!');
		} else if (!isUrlValid) {
			throw new Error('Invalid URL! It need contain https:// or http://!');
		}
	}	

	const removeFavorite = (e) => {
		const favoriteIndex = parseInt(e.target.getAttribute('id'));

		const title = 'Remove favorite';
		const content = `Are you sure you want to remove the '${ favorites[favoriteIndex].name }' favorite?`;
		const acceptLabel = 'Yes';
		const declineLabel = 'Cancel';

		console.log(favorites[favoriteIndex]);
		setPopup({
			type: 'accept-decline',
			open: true,
			data: {
				title, content, acceptLabel, declineLabel,
				onAccept: () => {
					// remove in a state array:
					// (made this way because other methods like splice doesnt re-render...)
					let test = [];
					for (let i = 0; i < favorites.length; i++) {
						if (i !== favoriteIndex) {
							test.push(favorites[i]);
						}
					}
					setFavorites(test);
					setPopup({});
				},
				onDecline: () => {
					setPopup({});
				}
			}
		});		
	}

	const reorder = (arr, from, to) => {
		if (arr) {
			arr.splice(to, 0, arr.splice(from, 1)[0]);
			return arr;
		}
		return;
	}

	const onDragEnd = (result) => {
		console.log('onDragEnd');
		// if the destinatin is null don't do anything
		if (!result.destination) {
			return;
		}

		// We need te re-order the array by these indexes
		if (favorites) {
			let newArray = [];
			const orderedArray = reorder(favorites, result.source.index, result.destination.index);
			// reset the array state
			for (let i = 0; i < orderedArray.length; i++) {
				newArray.push(orderedArray[i]);
			}
			setFavorites(newArray);
		}
	}

	// ___INSERTED___

	const [showElements, setShowElements] = useState(false);

	const collapsing = (e) => {
		const droppable = document.querySelector('.droppable');
		const arrow = document.querySelector('.rotate');
		setShowElements(!showElements);
		// console.log(droppable);
		if (droppable.style.maxHeight) {
			droppable.style.maxHeight = null;
			droppable.style.opacity = 0;
			droppable.style.pointerEvents = 'none';
			droppable.style.paddingBottom = '0';
			arrow.style.transform = 'rotate(0deg)';
			setTimeout(() => {
				droppable.style.overflow = 'hidden';
			}, 400);
		} else {
			droppable.style.maxHeight = `${droppable.scrollHeight}px`;
			droppable.style.opacity = 1;
			droppable.style.paddingBottom = '10px';
			droppable.style.pointerEvents = 'all';
			droppable.style.overflow = 'visible';
			arrow.style.transform = 'rotate(180deg)';
		}
	}

	return (
		<>
			<h2 style={{
				marginBottom: '0'
			}}>Favorite elements remove/edit</h2>
			<Button
               type='button'
               variant='contained'
               color='primary'
               onClick={collapsing}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="rotate" fill="#ffffff" viewBox="0 0 24 24">
					<path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
				</svg>
			</Button>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='droppable'
						>
							{favorites.map((fav, index) => (
								<Draggable key={`${index}-fav`} draggableId={`${index}-fav`} index={index}>
									{renderDraggable(provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className='draggable'
										>
											<FavoriteListElement
												key={index}
												data_key={index}
												name={fav.name}
												url={fav.url}
												editFunction={editFavorite}
												removeFunction={removeFavorite}
											/>
										</div>
									))}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

		</>
	)
}

export default FavoriteList;