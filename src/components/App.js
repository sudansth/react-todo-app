import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

 /* In react router 4, the props passed down are { match, location, history }, 
  * and you can get params from match (match.params)
  */
 const App = () => ( 
    <div>
      <AddTodo />          
      <VisibleTodoList />
      <Footer />   
    </div>
  );

  export default App;