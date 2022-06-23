import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoToDo( toDo ) {
        this.todos.push( toDo );
        this.guardarLocalStorage();
    }

    eliminarToDo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id ); //regresa todos los elementos que no coincidan con el ID
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for( const todo of this.todos ){
            //console.log(id, todo.id);
            if( todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado ); //regresa los elementos no completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) ); 

    }

    cargarLocalStorage() {
        
        this.todos = ( localStorage.getItem('todo') ) 
                        ? JSON.parse( localStorage.getItem('todo')) 
                        : [];

        this.todos = this.todos.map( Todo.fromJson );


    }
}