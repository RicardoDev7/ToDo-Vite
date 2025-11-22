import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todos';

const ElementIDs = {
    ulListTodos: 'ulListTodos',
    newTodoInput: 'new-todo-input'
}

/**
 * 
 * @param {String} elementID 
 */
export const App = (elementID) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.ulListTodos, todos);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.getElementById(ElementIDs.newTodoInput);
    const todoListUL = document.getElementById(ElementIDs.ulListTodos);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.key !== 'Enter') return;
        let value = event.target.value;
        if(value.trim().length === 0) return;
        todoStore.addTodo(value);
        displayTodos();
        event.target.value = '';
    });
    
    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        event.target.className != "destroy" ? toogleTodo(element) : deleteTodo(element);
        displayTodos();
    });

    const toogleTodo = (element) => todoStore.toogleTodo(element.getAttribute('data-id'));
    
    const deleteTodo = (element) => todoStore.deleteTodo(element.getAttribute('data-id'));
    
}