import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderPending } from './use-cases';
import { renderTodos } from './use-cases/render-todos';

const ElementIDs = {
    ulListTodos: 'ulListTodos',
    newTodoInput: 'new-todo-input',
    btnClearCompleted: 'btnClearCompleted',
    filtersLI: '.filter',
    pendingCount: 'pending-count'
}

/**
 * 
 * @param {String} elementID 
 */
export const App = (elementID) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.ulListTodos, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.pendingCount);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.getElementById(ElementIDs.newTodoInput);
    const todoListUL = document.getElementById(ElementIDs.ulListTodos);
    const btnClearCompleted = document.getElementById(ElementIDs.btnClearCompleted);
    const liFilters = document.querySelectorAll(ElementIDs.filtersLI);

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

    btnClearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    liFilters.forEach(element => {
        element.addEventListener('click', (element) => {
            liFilters.forEach(x => x.classList.remove('selected'));
            element.target.classList.add('selected');
            setFilterByLi(element.target.getAttribute('data-name'));
            displayTodos();
        });
    });

    const toogleTodo = (element) => todoStore.toogleTodo(element.getAttribute('data-id'));
    
    const deleteTodo = (element) => todoStore.deleteTodo(element.getAttribute('data-id'));

    const setFilterByLi = (value) => {
        switch (value) {
            case 'All':
                todoStore.setFilter(todoStore.Filters.All);
                break;
            case 'Pending':
                todoStore.setFilter(todoStore.Filters.Pending);
                break;
            case 'Completed':
                todoStore.setFilter(todoStore.Filters.Completed);
                break;
        }
    }
    
}