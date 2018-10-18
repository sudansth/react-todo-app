import { ADD_TODO, TOGGLE_TODO } from '../actions/actions'
import todo from './todo'
import { combineReducers } from 'redux';

// 1- Renamed the reducer to ByID and rather than add a new item at the end or map over every item, 
//now it's going to change the value in the lookup table 
// 2- Anytime the ByID reducer receives an action, it's going to return the copy of its mapping between the 
//IDs and the actual todos with updated todo for the current action. I will let another reducer that keeps 
//track of all the added IDs.
const byId = (state = {}, action) => {
    switch (action.type) {
      case ADD_TODO:
      case TOGGLE_TODO:
        return {...state, 
                  [action.id]: todo( state[action.id], action)
                  //For the addTodo action, the corresponding todo will not exist in the lookup table yet. 
                  //We're calling the todo reducer with undefined as the first argument. The todo reducer would 
                  //then return a new todo object when handling addTodo so this object will get assigned under 
                  //the action ID key inside the next version of the lookup table.
        };
        //return state.map(t => todo(t, action));
      default:
        return state;
    }
  };
 
  // Another reducer that keeps track of all the added todo IDs. Manages just the array of IDs of the todos

  const allIds = (state = [], action ) => {
    switch(action.type){
      case ADD_TODO:
        return [...state, action.id];  // Every time a todo is added, it returns a new array with this ID of 
                                        // the new todo at the very end. 
      default:
        return state;
    }
  } 

  // need to export the single reducer from the todos file, so going to use combined reducers again to 
  //combine the ByID and the AllIDs reducers.
  const todos = combineReducers({
    byId,
    allIds
  });

  export default todos;

  // getAllTodos function transforms a todos object into an array, this array maintains the existing 
  //contract within getVisibleTodos
  // Since the state has changed, I needed to update the selectors that depend on it.
  //get all todos just assembles all the todos objects from the state by mapping the IDs to the lookup table.
  const getAllTodos = (state) => state.allIds.map(id => state.byId[id] );
                                              //For every ID, we get the todo from state.byId

// creating getVisibleTodos Selector (not Reducer) because it gets the data from the store
// Reducers always sets the data to the store while Selectors get the data from the store
//the state refers to the state of just the corresponding reducer, which in this case is an array of todos

/* --> Colocating Selectors with Reducers
 * The file that determines the internal structure of todos is the file that contains the todos reducer. 
 * This is why placing get visible todos implementation right into the file with reducers, 
 * and I'm making it a named export.
 */
 export const getVisibleTodos = (
  state,
  filter
 ) => {
  const allTodos = getAllTodos(state); // obtaining array of todos
  switch(filter){
      case 'all':
          return allTodos;

      case 'active':
          return allTodos.filter( t => !t.completed );

      case 'completed':
          return allTodos.filter( t => t.completed );
     
      default:
          throw new Error(`Unknown filter: ${filter}.`)
   }
}