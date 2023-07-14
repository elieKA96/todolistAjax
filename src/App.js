import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/Addtodo';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function fetchTodoList(){
      try{
        const response = await fetch('https://restapi.fr/api/todo');
        if (response.ok) {
          const todos = await response.json();
          if(Array.isArray(todos)) {
            setTodoList(todos);
          }else{
            setTodoList([todos])
          }
        }else{
          console.log('Erreur');
        }
      } catch(e){
        console.log('Erreur');
      } finally {
        setLoading(false);
      }
    }
    fetchTodoList();
  },[])

  function addTodo(newtodo) {
    
    setTodoList([...todoList, newtodo]);
  }

  function deleteTodo(deletedTodo) {
    setTodoList(todoList.filter((todo) => todo._id !== deletedTodo._id));
  }

  function updateTodo(updateTodo) {
    setTodoList(todoList.map(todo => todo._id === updateTodo._id ? updateTodo : todo))
  }

  
  return (
    <div className="d-flex justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Liste de tâches</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours</p>
        ): (
          <TodoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        )}
      </div>
    </div>
  );
}

export default App;