import { v4 } from 'node-uuid';
import * as api from '../api/fakeDatabase'
/*
 *  Action types
 */
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 *  Other Constants
 */
export const visibilityFilters = {
    SHOW_ALL : 'SHOW_ALL',
    SHOW_ACTIVE : 'SHOW_ACTIVE',
    SHOW_COMPLETED : 'SHOW_COMPLETED'
}

/*
 * Action Creators
 */
let nextTodoId = 0;
//Action creator for Add Todo
export const addTodo = (text) => ({
      type:'ADD_TODO',
      //id: (nextTodoId++).toString(),
      id: v4(),   //using node-uuid to generate unique id's
      text
});

//Action Creator for Set Visibility Filter
// export const setVisibilityFilter = (filter) => ({    >> Removed as the FilterLink is now handles by Link from router
//       type: 'SET_VISIBILITY_FILTER',
//       filter 
// });

export const toggleTodo = (id) => ({
      type: 'TOGGLE_TODO',
      id
  });

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

export const fetchTodos = (filter) => 
    api.fetchTodos(filter).then( response =>
        receiveTodos(filter, response)   // returns promise
);
    

    
  
