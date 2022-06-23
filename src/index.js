import './styles.css';

import { Todo, TodoList } from './classes';
import { CrearTodoHtml } from './js/componentes';



export const toDoList = new TodoList();



// const tarea = new Todo('Aprender JS');
// toDoList.nuevoToDo(tarea);
// CrearTodoHtml(tarea);
// toDoList.nuevoToDo(tarea2);

toDoList.todos.forEach( todo => CrearTodoHtml( todo ));  //carga las tareas en HTML
// console.log( toDoList );

//console.log(toDoList);