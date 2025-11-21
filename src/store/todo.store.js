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

const addTodo = (description) => {
    throw new Error('Not Implemented');
}

const toogleTodo = (todoID) => {
    throw new Error('Not Implemented');
}

const deleteTodo = (todoID) => {
    throw new Error('Not Implemented');
}

const deleteCompleted = () => {
    throw new Error('Not Implemented');
}

const setFilter = (newFilter = Filters.All) => {
    throw new Error('Not Implemented');
}

const getCurrentFilter = () => {
    throw new Error('Not Implemented');
}

export default {
    initStore, addTodo, toogleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter
}