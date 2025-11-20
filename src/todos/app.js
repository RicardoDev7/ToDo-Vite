import html from './app.html?raw';

/**
 * 
 * @param {String} elementID 
 */
export const App = (elementID) => {
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
    })();
}