import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todos';

const ElementIDs = {
    ulListTodos: 'ulListTodos'
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
}