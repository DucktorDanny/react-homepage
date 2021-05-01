import React, { useRef } from 'react';
import TodoCard from './TodoCard';
import DateSeparator from './DateSeparator';
import './style/DailyTodoEvents.css';

const AllDailyTodo = ({ dailyTodo, onTodo, onRemove, setTodoDone }) => {
   const dateSeparatorValue = useRef(Number);

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
                     const todoKey = `all-${i}-${j}`;
                     let showSeparator = false;
                     if (!dateSeparatorValue.current || j === 0 || (dateSeparatorValue.current && dateSeparatorValue.current !== date[0])) {
                        showSeparator = true;
                     }
                     dateSeparatorValue.current = date[0];

                     if (showSeparator) {
                        console.log(`separator-${date[0]}-${i}`);
                     }
                     console.log(i);

                     return (
                        <React.Fragment key={todoKey}>
                           {showSeparator ? <DateSeparator date={new Date(date[0]).toDateString()} /> : ''}
                           <TodoCard
                              id={j}
                              title={todo.title}
                              content={todo.content}
                              done={todo.done}
                              setTodoDone={setTodoDone}
                              date={date[0] }
                              onTodo={onTodo}
                              onRemove={onRemove}
                              // showDate
                           />
                        </React.Fragment>
                     )
                  })
               ))
               : <h2>There are no to do!</h2>
         }
      </>
   )
}

export default AllDailyTodo;