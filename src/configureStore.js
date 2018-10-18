import { createStore } from 'redux';
import todoApp from './reducers';
//import { loadState, saveState } from './localStorage';
//import throttle from 'lodash/throttle';


const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if(!console.group){
    return rawDispatch;
  }
  
  return(action) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color:green', store.getState());
    console.groupEnd(action.type);
    return returnValue;

  }
}

const addPromiseSupportoDispatch = (store) =>{
  const rawDispatch = store.dispatch;
  return (action) => {
    if( typeof (action.then) === 'function' ){
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

/* Configures the store */
const configureStore = () => {
 //const persistedState = loadState();  >> Not using localStorage to create fake data
  const store = createStore(
    todoApp,
    //persistedState  //Redux allows to pass the persistent state as second argument to create store function
  );
  
  //if(process.env.NODE_ENV !== 'production'){
    store.dispatch = addLoggingToDispatch(store);
    //} 
    store.dispatch = addPromiseSupportoDispatch(store);
    
 //Subscribing to the saveState()
//  store.subscribe(throttle(() => {  //throttle function from lodash package is used to limit the action repetation 
//    saveState({
//      todos : store.getState().todos
//    });
//  }, 1000)); // Here the saveState is called only Once per second

 return store;
}

export default configureStore;
 