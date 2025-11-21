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
    console.log(state);
    console.log('Init Store');
}

const loadStore = () => {
    throw new Error('Not Implemented');
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
}

const toogleTodo = (todoID) => {
    state.todos = state.todos.map(x => {
        if(x.id === todoID) x.done = !x.done;
        return x;
    });
}

const deleteTodo = (todoID) => {
    state.todos = state.todos.filter(x => x.id !== todoID);
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(x => x.done);
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore, getTodos, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter
}