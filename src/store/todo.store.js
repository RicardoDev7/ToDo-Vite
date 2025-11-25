import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed'
}

const state = {
    todos: [],
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

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (newFilter = Filters.All) => {
    switch(newFilter){
        case Filters.Completed : return state.todos.filter(x => x.done);
        case Filters.Pending : return state.todos.filter(x => !x.done);
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
    state.todos = state.todos.filter(x => !x.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore, getTodos, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter, Filters
}