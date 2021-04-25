import TodoCard from './TodoCard';
import './style/DailyTodoEvents.css';

const AllDailyTodo = ({ dailyTodo, onTodo, onRemove, setTodoDone }) => {

   const hasDailyTodos = () => {
      let isThereAnyDailyTodo = false;
      if (dailyTodo) {
         Object.entries(dailyTodo).forEach(todo => {
            if (todo[1].length > 0) {
               isThereAnyDailyTodo = true;
            }
         });
      }
      return isThereAnyDailyTodo;
   }

   const objectEntriesWithIntKeys = (obj) => {
      try {
         const basicObjectEntries = Object.entries(obj);
         const convertedEntries = [];
         basicObjectEntries.forEach(element => {
            convertedEntries.push([
               parseInt(element[0]),
               element[1]
            ]);
         });
         const result = convertedEntries.sort((a, b) => a[0] - b[0]);
         return result;
      } catch (err) {
         console.log(err.message);
      }
      return;
   }

   return (
      <>
         {
            hasDailyTodos()
               ? objectEntriesWithIntKeys(dailyTodo).map((date, i) => (
                  date[1].map((todo, j) => {
                     const key = `all-${i}-${j}`;
                     return (
                        <TodoCard
                           key={key}
                           id={j}
                           title={todo.title}
                           content={todo.content}
                           done={todo.done}
                           setTodoDone={setTodoDone}
                           date={date[0] }
                           onTodo={onTodo}
                           onRemove={onRemove}
                           showDate
                        />
                     )
                  })
               ))
               : <h2>There are no to do!</h2>
         }
      </>
   )
}

export default AllDailyTodo;