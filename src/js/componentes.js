import { Todo }    from "../classes";
import { toDoList} from '../index'

const divTodoList = document.querySelector('.todo-list');
const inputTarea  = document.querySelector('.new-todo');
const btnBorrarTodos  = document.querySelector('.clear-completed');
const ulFiltros  = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const CrearTodoHtml = ( tarea ) => {
    
    const htmlTodo = `
        <li class=" ${(tarea.completado) ? "completed" :  '' }"  data-id="${ tarea.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${(tarea.completado) ? 'checked' : ''}>
                <label> ${ tarea.nomTarea } </label>
                <button class="destroy"></button>
            </div>
        </li>`;

    const divElement = document.createElement( 'div' );
    divElement.innerHTML = htmlTodo;

    divTodoList.append( divElement.firstElementChild );
    return divElement.firstChild;
}

inputTarea.addEventListener( 'keyup', ( event ) => {
    // console.log(event.key, inputTarea.value, inputTarea.value.length);
    
    if(event.keyCode === 13 && inputTarea.value.length > 0 ) {
        // console.log(inputTarea.value);

        const nuevaTarea = new Todo( inputTarea.value ); 
        toDoList.nuevoToDo( nuevaTarea );
        //console.log('despues de crear la tarea', toDoList);
        CrearTodoHtml( nuevaTarea );
        inputTarea.value = '';
    }
    // console.log(event);
});

divTodoList.addEventListener( 'click', ( event ) => {
   
    const nombreElemento = event.target.localName;
    const todoElementoLi   = event.target.parentElement.parentElement;
    const todoId         = todoElementoLi.getAttribute( 'data-id' );
    
    if( nombreElemento.includes( 'input' )) {
        toDoList.marcarCompletado( todoId );
        todoElementoLi.classList.toggle( 'completed' );

    } else if(nombreElemento.includes( 'button' )) {
        toDoList.eliminarToDo( todoId );            //elimina la tarea del arreglo
        divTodoList.removeChild(todoElementoLi);  //quita de la lista HTML

    }
    //console.log(divTodoList.children.length, toDoList );
});

btnBorrarTodos.addEventListener('click', () => {
    toDoList.eliminarCompletados();

    for(let i = divTodoList.children.length - 1; i >= 0; i-- ){
        const elemento = divTodoList.children[i];
                
        if( elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        
        }
    }
});

ulFiltros.addEventListener( 'click', (event) => {
    
    const filtro = event.target.text;
    if ( !filtro ) {
        //console.log( event.target.text  );
        return;
    }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children ){
        //console.log(elemento);

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})