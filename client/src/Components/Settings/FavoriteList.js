import { useEffect, useRef } from 'react';
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

		const type = 'favorite-edit';
		const titleField = favorites[favoriteIndex].name;
		const linkField = favorites[favoriteIndex].url;
		const acceptLabel = 'Edit';
		const declineLabel = 'Cancel';

		console.log(titleField, linkField);

		setPopup({
			type,
			open: true,
			datas: {
				titleField, linkField, acceptLabel, declineLabel,
				onAccept: () => {
					try {
						modifyFavorite(
							document.querySelector('#favorite-edit-title').value,
							document.querySelector('#favorite-edit-link').value,
							favoriteIndex
						);
						closeEditPopup({ type, titleField, linkField, acceptLabel, declineLabel });
					} catch(err) {
						createNotification('Error', err.message, 'danger');
					}
				},
				onDecline: () => {
					closeEditPopup({ type, titleField, linkField, acceptLabel, declineLabel });		
				}
			}
		});
	}

	const modifyFavorite = (name, url, idx) => {

		const isNameValid = name.length <= 20;
		const isUrlValid = url.includes('http://') || url.includes('https://') || url === '';

		if (isNameValid && isUrlValid) {
			if (name === '' && url === '') {
				throw new Error('There are no changes!');
			}
			
			const favoriteElements = favorites;
			
			if (name !== '') favoriteElements[idx].name = name;
			if (url !== '') favoriteElements[idx].url = url;
			
			setFavorites(favoriteElements);
			saveChanges();
		} else if (!isNameValid) {
			throw new Error('The new name is too long!');
		} else if (!isUrlValid) {
			throw new Error('Invalid URL! It need contain https:// or http://!');
		}
	}

	const closeEditPopup = ({ type, titleField, linkField, acceptLabel, declineLabel }) => {
		document.querySelector('#favorite-edit-title').value = '';
		document.querySelector('#favorite-edit-link').value = '';
		setPopup({
			type,
			open: false,
			datas: {
				titleField, linkField, acceptLabel, declineLabel
			}
		});
	}	

	const removeFavorite = (e) => {
		const favoriteIndex = parseInt(e.target.getAttribute('id'));

		const title = 'Remove favorite';
		const content = `Are you sure you want to remove the '${ favorites[favoriteIndex].name }' favorite?`;
		const acceptLabel = 'Yes';
		const declineLabel = 'Cancel';

		const closePopup = () => {
			setPopup({
				type: 'accept-decline',
				open: false,
				datas: {
					title, content, acceptLabel, declineLabel,
				}
			});
		};

		console.log(favorites[favoriteIndex]);
		setPopup({
			type: 'accept-decline',
			open: true,
			datas: {
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
					closePopup();
				},
				onDecline: () => {
					closePopup();
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

	return (
		<>
			<h2>Favorite changes</h2>
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