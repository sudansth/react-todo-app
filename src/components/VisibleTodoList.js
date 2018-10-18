import React, { Component } from 'react'
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { withRouter } from 'react-router'
import {getVisibleTodos } from '../reducers/todos'
import { fetchTodos } from '../api/fakeDatabase'

// A good place to call the API would be inside componented mount life cycle hook.
//Since we can't override the life cycle hooks of generated components, we have to create a new React component. 
class VisibleTodoList extends Component {
  //defining the componented mount life cycle hook inside my visible todo list component class
  componentDidMount(){
    // fetchTodos returns the promise therefore can use then()
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    if(this.props.filter !== prevProps.filter  ){
      this.fetchData();
    }
  }

   fetchData(){
     const {filter, fetchTodos } = this.props;
     fetchTodos(filter);
  }

  render(){
    const {toggleTodo , ...rest } = this.props;
    return <TodoList 
              onTodoClick={toggleTodo}
              {...rest} 
            />
  }
}
 
//Function maps the state to the props
// which takes state and return the relevant state
const mapStateToTodoListProps = (state, history) => {
    const filter = history.match.params.filter || 'all';
    return {
        todos: getVisibleTodos( state.todos, filter ),
        filter 
    }
  };

  //Function that maps dispatch to the props
  // const mapDispatchToTodoListProps = (dispatch) => {    >> Replaced by the shorthand declaration { onTodoClick: toggleTodo}
  //   return {
  //     onTodoClick: (id) => {
  //       dispatch(toggleTodo(id))   
  //     }  
  //   };
  // }

  //generating VisibleTodoList container component using connect that renders the presentational component TodoList
  // declaring VisibleTodoList as variable now instead of class. 
   VisibleTodoList = withRouter( connect(  //can't assign same name for two component, so reassigning
    mapStateToTodoListProps,
    //mapDispatchToTodoListProps
    //{ onTodoClick: toggleTodo, receiveTodos }
    actions
  )(VisibleTodoList) );  //connect is the curried function, so calling it twice
   //passing the VisibleTodoList class component

  export default VisibleTodoList;