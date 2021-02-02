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

const FavoriteList = ({ favorites, removeFunction, onDragEnd }) => {
	const renderDraggable = useDraggableInPortal();

	return (
		// <div className='favorite-list'>
		// 	{
		// 		favorites.map((fav, i) => {
		// 			return(
		// 				<FavoriteListElement key={ i } data_key={ i } name={ fav.name } url={ fav.url }  removeFunction={ removeFunction } />
		// 			);
		// 		})
		// 	}
		// </div>
		// <div className='favorite-list'>
		<DragDropContext onDragEnd={ onDragEnd }>
			<Droppable droppableId='droppable'>
				{(provided, snapshot) => (
					<div
						{ ...provided.droppableProps }
						ref={ provided.innerRef }
						className='droppable'
						// style={{
						// 	display: 'flex',
						// 	flexDirection: 'column',
						// 	alignItems: 'center',
						// 	width: '100%',
						// 	border: '1px solid red',
						// }}
					>
						{favorites.map((fav, index) => (
							<Draggable key={ `${index}-fav` } draggableId={ `${index}-fav` } index={ index }>
								{renderDraggable(provided => (
									<div
										ref={ provided.innerRef }
										{ ...provided.draggableProps }
										{ ...provided.dragHandleProps }
										className='draggable'
									>
										<FavoriteListElement key={ index } data_key={ index } name={ fav.name } url={ fav.url }  removeFunction={ removeFunction } />
									</div>
								))}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
// </div>
	)
}

export default FavoriteList;