import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const store = configureStore();

console.log(store.getState());

ReactDOM.render(
    //Provides access to its child and grandchild using Context
    <Root store={ store } />,
    document.getElementById('root')
 );


// const todo = (state, action) => {
//     switch (action.type) {
//       case 'ADD_TODO':
//         return {
//           id: action.id,
//           text: action.text,
//           completed: false
//         };
  
//       case 'TOGGLE_TODO':
//         if (state.id !== action.id) {
//           return state;
//         }
//         return {
//           ...state,
//           completed: !state.completed
//         };

//       default:
//         return state;
//     }
//   };
  
  // const todos = (state = [], action) => {
  //   switch (action.type) {
  //     case 'ADD_TODO':
  //       return [...state, todo(undefined, action)];
  //     case 'TOGGLE_TODO':
  //       return state.map(t => todo(t, action));

  //     default:
  //       return state;
  //   }
  // };
  
  //Reducer to filter visibility - SHOW_ALL, SHOW_ACTIVE and SHOW_COMPLETED
  // const visibilityFilter = (state = 'SHOW_ALL', action) => {
  //   switch (action.type) {
  //     case 'SET_VISIBILITY_FILTER':
  //       return action.filter;
  
  //     default:
  //       return state;
  //   }
  // };
  

  // Action Creator for Add Todo ; useful for documentation and for large applications
  // let nextTodoId = 0;
  // export const addTodo = (text) => ({
  //       type:'ADD_TODO',
  //       id: nextTodoId++,
  //       text
  // });

  // //Action Creator for Set Visibility Filter
  // export const setVisibilityFilter = (filter) => ({
  //       type: 'SET_VISIBILITY_FILTER',
  //       filter: filter  
  // });

  // export const toggleTodo = (id) => ({
  //       type: 'TOGGLE_TODO',
  //       id
  //   });

  // Update to the Link Component because the old FilterLink and Footer component doesn't use much of the props data 
  // instead it just passes to its child, for e.g, the visibilityFilter was not being used by the FilterLink and Footer comp
  // but was still being passed as props from the Footer component to the FilterLink
  // > Here the parent component needed to know more about what data the child component need.
  // const Link = ({
  //       active,
  //       children,
  //       onClick
  //        }) => {
  //         if(active){
  //          return ( <span>{children}</span>);
  //         } 
  //          return(
  //           <a href='#' 
  //               onClick={e => {
  //                   e.preventDefault();
  //                   onClick();
  //               }}
  //           >
  //           {children}
  //           </a>
  //         );  
  //       };
  
  //creating FilterLink container component using connect
  // const mapStateToFilterLinkProps = ( state, ownProps ) => {
  //   return {
  //     active: 
  //     ownProps.filter === state.visibilityFilter  // here it is using components own Props not the childs props
  //   };
  // };
  // const mapDispatchToFilterLinkProps = (
  //   dispatch,
  //   ownProps
  // ) => {
  //   return {
  //     onClick: () =>
  //       dispatch (setVisibilityFilter(ownProps.filter))
  //     }
  // };
  // //creating FilterLink container component using connect
  // const FilterLink = connect(
  //   mapStateToFilterLinkProps,
  //   mapDispatchToFilterLinkProps
  // )(Link);

/* The connect above replaces all these 

  // Container for the Link
  class  FilterLink extends React.Component{
      componentDidMount(){
        const {store} = this.context;
        this.unsubscribe =  store.subscribe( () =>
          this.forceUpdate() //react method
        );
      }

      componentWillUnmount(){
        this.unsubscribe();
      }

      render(){
        const props = this.props;
        const {store} = this.context;
        const state = store.getState(); //redux store state
        console.log( state )
        return(
          <Link 
              
              
            >
              {props.children}
            </Link>
        );
      }
    }

    //ContextType declaration, so the FilterLink receives the relevant context from the Provider
    FilterLink.contextTypes = {
      store: PropTypes.object
    }
*/
    //Creating Presentational Component
  //   const Todo = (
  //     // onClick,
  //     // completed,
  //     // text
  //     props   //props can be used where we need computation on the props data
  //   ) => {
  //     return (
  //     <li
  //         onClick = {props.onClick} 
  //         style={{textDecoration:props.completed ? 'line-through' : 'none',
  //            color:props.completed ? 'green' : 'red'}}
  //      >
  //         { props.text }
  //      </li>
  //   )
  // }

    //Creating Presentational Component
    //It acts as a Container Component
    // const TodoList = ({
    //   todos,
    //   onTodoClick
    // }) => (
    //    <ul>
    //         { todos.map( todo => 
    //           <Todo 
    //             key = {todo.id}  //react unique key for the element - reacts property
    //             {...todo} // all the properties of the todo, the 'text' and 'completed' end up as props on the todo component
    //             onClick = {() => onTodoClick(todo.id)}
    //           />
    //         )}
    //    </ul>
    // );

    //Creating Presentational Component, its not clear as it act as Container Component 
    //React Functional Component

    // Context is not a stable api, therefore 
    // let AddTodo = ({ dispatch }) => {
    //   let input;
    //   return (
    //     //Wrapping into <div> because a component needs to have a single root element
    //     <div> 
    //       <input 
    //         ref={node =>{ input = node; }} 
    //         onKeyPress={
    //             (e) => {
    //                if (e.key === 'Enter') {
    //                 dispatch(addTodo(input.value))  
    //                 input.value = '';
    //               }
    //         }
    //       }
    //         />
    //         <button onClick={() => {
    //           dispatch(addTodo(input.value))
    //             input.value = '';
    //           }}>
    //           Add Todo
    //         </button>
    //       </div>
    //   );
    //  };
     //reassign it now so that the consuming component does not need to specify the dispatch prop 
     //because it will be injected by the component generated by the connect code.
    //AddTodo = connect()(AddTodo); // no need of store if  are not computing, so not passing it as argument
    //The connect code without any arguments is going to generate a container component that does not subscribe 
    //to this chore. However, that will pass dispatch to the component that it wraps. In this case, it wraps my at 
    //to-do component
   
    // Here the Footer component doesn't care about the values of the prop, it doesn't actually use 
    // the visibilityFilter and onFilterClick. It just passes to the child component, FilterLink
    // and hence, the props definition has been removed.
    // const Footer = () =>
    // {
    // return (
    //   <p>
    //        Show:
    //           {' '}
    //           <FilterLink 
    //               filter='SHOW_ALL'  > All </FilterLink>
    //           {', '}
    //           <FilterLink  
    //               filter='SHOW_ACTIVE' > Active </FilterLink>
    //           {', '}
    //           <FilterLink 
    //               filter='SHOW_COMPLETED' > Completed </FilterLink>
    //       </p>
    // );
    // };

    //getVisibleTodos Reducer
    // const getVisibleTodos = (
    //     todos,
    //     filter
    // ) => {
    //     switch(filter){
    //         case 'SHOW_ALL':
    //             return todos;

    //         case 'SHOW_ACTIVE':
    //             return todos.filter(
    //                 t => !t.completed 
    //             );

    //         case 'SHOW_COMPLETED':
    //             return todos.filter(
    //                 t => t.completed
    //             );
    //     }
    // }

  // Root Reducer 'todoApp.js'/'index.js'
  // const todoApp = combineReducers({
  //   todos,
  //   visibilityFilter
  // });

//Function maps the state to the props
// which takes state and return the relevant state
// const mapStateToTodoListProps = (state) => {
//   return {
//       todos: getVisibleTodos(
//         state.todos,
//         state.visibilityFilter
//       )   
//   };
// }
// //Function that maps dispatch to the props
// const mapDispatchToTodoListProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))   
//     }  
//   };
// }
// //generating VisibleTodoList container component using connect that renders the presentational component TodoList
// // declaring VisibleTodoList as variable now instead of class. 
// const VisibleTodoList = connect(
//   mapStateToTodoListProps,
//   mapDispatchToTodoListProps
// )(TodoList)   //connect is the curried function, so calling it twice

/*  The VisibleTodoList is not required as it is done using connect

  //Container component re-renders when store state changes and unsubscribe from store when they unmount
  // And take the current state of the store and use them to display presentation component with some props
  class VisibleTodoList extends React.Component{
    componentDidMount(){
      const { store } = this.context;  //Getting store for the context
      this.unsubscribe =  store.subscribe( () =>
        this.forceUpdate() //react method
      );
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    render(){ 
      const props = this.props;
      const {store} = this.context;
      const state = store.getState();

      return (
        <TodoList
            
            onTodoClick={id => 
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
            }
          />
       )
     }

  }

  //It is requied to specify the special field "contextTypes", if not specified that the component will 
  // not receive the relevant context
  VisibleTodoList.contextTypes = {
     store: PropTypes.object
  }
  */

  //React Component TodoApp
  // const TodoApp = () => (
  //       <div>
  //         <AddTodo />          
  //         <VisibleTodoList />
  //         <Footer />   
  //       </div>
  //     );
  
  // Using Context
  // class Provider extends React.Component {
  //   //To make the store available for the grand-childrens as part of the context
  //   getChildContext(){
  //     return {
  //         store: this.props.store //Here it only provides the store as the context
  //     };
  //   }

  //   //Renders children
  //   render(){
  //     return this.props.children;
  //   }

  // }
  // // Need to define the childContextTypes for the context to be accessible to the childrens
  // Provider.childContextTypes = {
  //   store: React.PropTypes.objects
  // };

   /*
    *  Removing manually creating persisted state by using the localStorage
    */
  
  // const persistedState = {  // Initial Default values adding manually
  //   todos: [{
  //       id: '0',
  //       text: 'Welcome back!',
  //       completed: false
  //   }],
  //   visibilityFilter: undefined
  // };