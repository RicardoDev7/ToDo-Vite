(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=c(o);fetch(o.href,r)}})();const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function w(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let h;const E=new Uint8Array(16);function v(){if(!h){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");h=crypto.getRandomValues.bind(crypto)}return h(E)}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:S};function A(e,t,c){e=e||{};const i=e.random??e.rng?.()??v();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,w(i)}function I(e,t,c){return y.randomUUID&&!e?y.randomUUID():A(e)}class P{constructor(t){this.id=I(),this.description=t,this.done=!1,this.creationDate=new Date}}const u={All:"All",Pending:"Pending",Completed:"Completed"},d={todos:[],filter:u.All},F=()=>{U(),console.log("Init Store")},U=()=>{const e=localStorage.getItem("state");if(!e)return;const{todos:t=[],filter:c=u.All}=JSON.parse(e);d.filter=c,d.todos=t},f=()=>{localStorage.setItem("state",JSON.stringify(d))},D=(e=u.All)=>{switch(e){case u.Completed:return d.todos.filter(t=>t.done);case u.Pending:return d.todos.filter(t=>!t.done);default:return[...d.todos]}},M=e=>{if(!e)throw new Error("Se requiere la descripción del todo");d.todos.push(new P(e)),f()},O=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},k=e=>{d.todos=d.todos.filter(t=>t.id!==e),f()},B=()=>{d.todos=d.todos.filter(e=>!e.done),f()},H=(e=u.All)=>{d.filter=e,f()},N=()=>d.filter,l={initStore:F,getTodos:D,addTodo:M,toogleTodo:O,deleteTodo:k,deleteCompleted:B,setFilter:H,getCurrentFilter:N,Filters:u},V=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list" id="ulListTodos">\r
        </ul>\r
    </section>\r
    <footer class="footer">\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filter" href="#/" data-name="All">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filter" href="#/active" data-name="Pending">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filter" href="#/completed" data-name="Completed">Completados</a>\r
            </li>\r
        </ul>\r
        <button class="clear-completed" id="btnClearCompleted">Borrar completados</button>\r
    </footer>\r
</section>\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,q=e=>{let t=document.getElementById(e);if(!t)throw new Error(`Element ${e} not found`);t.innerHTML=l.getTodos(l.Filters.Pending).length},x=e=>{if(!e)throw new Error("A todo is required");const{done:t,description:c,id:i}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""} />
            <label>${c}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,r=document.createElement("li");return r.setAttribute("data-id",i),t&&r.classList.add("completed"),r.innerHTML=o,r};let g;const R=(e,t=[])=>{if(g||(g=document.getElementById(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(c=>{g.append(x(c))})},m={ulListTodos:"ulListTodos",newTodoInput:"new-todo-input",btnClearCompleted:"btnClearCompleted",filtersLI:".filter",pendingCount:"pending-count"},$=e=>{const t=()=>{const n=l.getTodos(l.getCurrentFilter());R(m.ulListTodos,n),c()},c=()=>{q(m.pendingCount)};(()=>{const n=document.createElement("div");n.innerHTML=V,document.querySelector(e).append(n),t()})();const i=document.getElementById(m.newTodoInput),o=document.getElementById(m.ulListTodos),r=document.getElementById(m.btnClearCompleted),p=document.querySelectorAll(m.filtersLI);i.addEventListener("keyup",n=>{if(n.key!=="Enter")return;let a=n.target.value;a.trim().length!==0&&(l.addTodo(a),t(),n.target.value="")}),o.addEventListener("click",n=>{const a=n.target.closest("[data-id]");n.target.className!="destroy"?b(a):T(a),t()}),r.addEventListener("click",()=>{l.deleteCompleted(),t()}),p.forEach(n=>{n.addEventListener("click",a=>{p.forEach(L=>L.classList.remove("selected")),a.target.classList.add("selected"),C(a.target.getAttribute("data-name")),t()})});const b=n=>l.toogleTodo(n.getAttribute("data-id")),T=n=>l.deleteTodo(n.getAttribute("data-id")),C=n=>{switch(n){case"All":l.setFilter(l.Filters.All);break;case"Pending":l.setFilter(l.Filters.Pending);break;case"Completed":l.setFilter(l.Filters.Completed);break}}};l.initStore();$("#app");
