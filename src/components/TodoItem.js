import { useState } from "react";

export default function TodoItem({
    todo,
    deleteTodo,
    updateTodo
  }) {

    const [loading, setLoading] = useState(false);

    async function tryUpdateTodo(newTodo){
      try{
        setLoading(true);
        const {_id, ...newTodoWithoutId} = newTodo;
        const response = await fetch(`https://restapi.fr/api/todo/${todo._id}`,{
          method: 'PATCH',
          body: JSON.stringify(newTodoWithoutId),
          headers: {
            "Content-Type": "application/json",
          }
        })
        if(response.ok) {
          const newTodo = await response.json();
          updateTodo(newTodo);
        }
        else{
          console.log("Erreur");
        }
      }catch(e){
        console.log("Erreur");
      }finally {
        setLoading(false);
      }
    }

    async function handleClickDeleteTodo(){
      try{
        setLoading(true);
        const response =  await fetch(`https://restapi.fr/api/todo/${todo._id}`,{
          method:'DELETE',
        }
        );
        if(response.ok){
          deleteTodo(todo);
        }else{
          console.log("erreur");
        }

      }catch(e){
        console.log("erreur");
      }finally{
        setLoading(false);
      }
    }

    return (
      <li
        className={"mb-10 d-flex flex-row justify-content-center align-items-center p-10"}
      >
        {loading ?(<span className="flex-fill mr-15">Chargement...</span>):
        <span className="flex-fill mr-15">
        {todo.content} {todo.done && '✅'}
        </span>
        }
        
        <button
          className="btn btn-primary mr-15"
          onClick={(e) => {
            e.stopPropagation();
            tryUpdateTodo({...todo, done:!todo.done})
          }}
        >
          Valider
        </button>
        <button
          className="btn btn-primary mr-15"
          onClick={(e) => {
            e.stopPropagation();
            tryUpdateTodo({...todo, edit: true})
          }}
        >
          Modifier
        </button>
        <button
          className="btn btn-reverse-primary"
          onClick={(e) => {
            e.stopPropagation();
            handleClickDeleteTodo();
          }}
        >
          Supprimer
        </button>
      </li>
    );
  }

// pattern alternatif // fonction intermediare
/**<button onClick={()=> deleteTodo(todo._id)} className="btn btn-primary-reverse mr-15">Supprimer</button>
 * 
 */

//${todo.selected ? "selected": ""}