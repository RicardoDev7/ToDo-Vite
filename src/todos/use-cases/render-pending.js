import todoStore from "../../store/todo.store";

export const renderPending = (elementID) => {
    let element = document.getElementById(elementID);
    if(!element) throw new Error(`Element ${elementID} not found`);
    element.innerHTML = todoStore.getTodos(todoStore.Filters.Pending).length;
}