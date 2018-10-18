import React from 'react';
import Todo from './Todo';

//Creating Presentational Component
//It acts as a Container Component
const TodoList = ({
        todos,
        onTodoClick
  }) => (
         <ul>
              { todos.map( todo => 
                <Todo 
                  key = {todo.id}  //react unique key for the element - reacts property
                  {...todo} // all the properties of the todo, the 'text' and 'completed' end up as props on the todo component
                  onClick = {() => onTodoClick(todo.id)}
                />
              )}
         </ul>
  );

  export default TodoList;

    