import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        };
  
      case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }
        return {
          ...state,
          completed: !state.completed
        };
      default:
        return state;
    }
  };
  
  const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, todo(undefined, action)];
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));

      default:
        return state;
    }
  };
  
  //Reducer to filter visibility - SHOW_ALL, SHOW_ACTIVE and SHOW_COMPLETED
  const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
  
      default:
        return state;
    }
  };
  
  //FilterLink React Component
  const FilterLink = ({
        filter,
        currentFilter,
        children
         }) => {
          if( currentFilter === filter){
           return ( <span>{children}</span>);
          } 
           return(
            <a href='#' 
                onClick={e => {
                    e.preventDefault();
                    store.dispatch({
                        type:"SET_VISIBILITY_FILTER",
                        filter
                    });
                }}
            >
            {children}
            </a>
          );  
        };

    //Creating Presentational Component
    const Todo = (
      // onClick,
      // completed,
      // text
      props
    ) => {
      return (
      <li
          onClick = {props.onClick} 
          style={{textDecoration:props.completed ? 'line-through' : 'none',
             color:props.completed ? 'green' : 'red'}}
       >
          { props.text }
       </li>
    )
  }

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

    
    //Creating Presentational Component
    //React Functional Component
    const AddTodo = ({
      onAddClick
    }) => {
      let input;
      return (
        //Wrapping into <div> because a component needs to have a single root element
        <div> 
          <input 
            ref={node =>{ input = node; }} />
            <button onClick={() => {
                onAddClick(input.value);
                input.value = '';
              }}>
              Add Todo
            </button>
          </div>
      );

    //getVisibleTodos Reducer
    const getVisibleTodos = (
        todos,
        filter
    ) => {
        switch(filter){
            case 'SHOW_ALL':
                return todos;

            case 'SHOW_ACTIVE':
                return todos.filter(
                    t => !t.completed 
                );

            case 'SHOW_COMPLETED':
                return todos.filter(
                    t => t.completed
                );
        }
    }
  
  
  // Root Reducer 'todoApp.js'
  const todoApp = combineReducers({
    todos,
    visibilityFilter
  });
  
 
  const store = createStore(todoApp);
  
  let nextTodoId = 0;
  const { Component } = React;

  //React Component TodoApp
  class TodoApp extends Component {
    render() {
        const {  //Destructuring the TODOs and the visibility Filter from the props
            todos,
            visibilityFilter
        } = this.props;

        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter     
        );
      console.log(this.props)
      return (
        <div>
          <AddTodo 
              onAddClick = { text =>
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text
                })  
              }
           />
          
          <TodoList  //acts as a container component
              todos= {visibleTodos} 
                onTodoClick = { id => 
                  store.dispatch({
                    type:'TOGGLE_TODO',
                    id
                  })
                }     
          />
          
          <p>
              Show:
              {' '}
              <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} > All </FilterLink>
              {' '}
              <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}> Active </FilterLink>
              {' '}
              <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}> Completed </FilterLink>
          </p>
        </div>
      );
    }
  }
  
  const render = () => {
    ReactDOM.render(
      <TodoApp
       {...store.getState()}
      />,
      document.getElementById('root')
    );
  };
  
  store.subscribe(render);
  render();
