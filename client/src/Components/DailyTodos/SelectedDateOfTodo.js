import TodoCard from './TodoCard';
// import { Button } from '@material-ui/core';
import './style/DailyTodoEvents.css';

const SelectedDateOfTodo = ({ date, dailyTodo, onRemove, setTodoDone, todoEdit }) => {

   return (
      <>
         {
            dailyTodo && dailyTodo.length !== 0
               ? dailyTodo.map((todo, id) => (
                   <TodoCard
                     key={`selected-${id}`}
                     id={id}
                     title={todo.title}
                     content={todo.content}
                     done={todo.done}
                     setTodoDone={setTodoDone}
                     date={date}
                     onTodo={todoEdit}
                     onRemove={onRemove}
                     marginTop={id === 0 ? '1rem' : ''}
                  />
               ))
               : <h2>There are no todo!</h2>
         }
      </>
   )
}

export default SelectedDateOfTodo;