import { v4 } from 'node-uuid';

// Fake in-memory database implementation
//Adding fake database
const fakeDatabase = {
    todos: [
        {
          id: v4(),
          text: 'hello',
          completed: false
        },
        {
            id: v4(),
            text: 'hi',
            completed: false
          },
          {
            id: v4(),
            text: 'hey',
            completed: true
          }
        ]
};

//adding artificial delay
const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

// Faking as if it Returns data with promise from server
export const fetchTodos = (filter) => 
    delay(500).then ( () => {
        switch(filter){
            case 'all':
                return fakeDatabase.todos;

            case 'active':
                return fakeDatabase.todos.filter(t => !t.completed);

            case 'completed':
                return fakeDatabase.todos.filter(t => t.completed);

            default:
                throw new Error(`Unknown filter: ${filter}.`)
            
        }
});