import { createTodoHtml } from "./create-todo-html";

export const renderTodos = (elementID, todos = []) =>{
    let html = document.getElementById(elementID);
    todos.forEach(x => {
        html.append(createTodoHtml(x));
    });
}