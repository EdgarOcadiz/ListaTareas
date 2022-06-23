export class Todo {
    
    static fromJson({id, nomTarea, completado, fechaCreado} ){
        
        const tempTodo = new Todo( nomTarea );
        
        tempTodo.id          = id;
        tempTodo.completado  = completado;
        tempTodo.fechaCreado = fechaCreado;

        return tempTodo;
    }
    
    constructor( tarea ) {

        this.nomTarea = tarea;

        this.id         = new Date().getTime();
        this.completado = false;
        this.fechaCreado= new Date();

    }
}