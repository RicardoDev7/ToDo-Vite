import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito')
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log('Init Store');
}

const loadStore = () => {
    const initialData = localStorage.getItem('state');
    if(!initialData) return;
    const {todos = [], filter = Filters.All} = JSON.parse(initialData);
    state.filter = filter;
    state.todos = todos;
}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (newFilter = Filters.All) => {
    switch(newFilter){
        case Filters.Completed : state.todos.filter(x => x.done);
        case Filters.Pending : state.todos.filter(x => !x.done);
        default: return [...state.todos];
    }
}

const addTodo = (description) => {
    if(!description) throw new Error('Se requiere la descripción del todo');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

const toogleTodo = (todoID) => {
    state.todos = state.todos.map(x => {
        if(x.id === todoID) x.done = !x.done;
        return x;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoID) => {
    state.todos = state.todos.filter(x => x.id !== todoID);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    debugger;
    state.todos = state.todos.filter(x => !x.done);
    saveStateToLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore, getTodos, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter
}