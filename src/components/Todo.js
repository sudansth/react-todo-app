import React from 'react';

//Creating Presentational Component
const Todo = (
    props   //props can be used where we need computation on the props data
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

export default Todo;