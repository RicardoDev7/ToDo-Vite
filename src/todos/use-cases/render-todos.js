import { createTodoHtml } from "./create-todo-html";

let element;

export const renderTodos = (elementID, todos = []) =>{
    if(!element) element = document.getElementById(elementID);
    if(!element) throw new Error(`Element ${elementID} not found`);
    element.innerHTML = '';
    todos.forEach(x => {
        element.append(createTodoHtml(x));
    });
}