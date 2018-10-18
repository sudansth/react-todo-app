import { combineReducers } from 'redux';
import todos , * as fromTodos from './todos';  //name space import syntax that puts all the exports on an object,

  // Root Reducer 'todoApp.js'
  const todoApp = combineReducers({
    todos
  });
  export default todoApp;
  
  // Add a named selector export here, as well. It is also called get visible todos, 
  // and it also accepts the state and the filter, but the state corresponds to the state of the combined reducer.
  export const getVisibleTodos = (state, filter) =>
      fromTodos.getVisibleTodos(state.todos, filter);