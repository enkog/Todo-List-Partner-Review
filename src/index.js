import './style.css';
import dragAndDrop from './dragAndSort.js';
import taskComplete from './completed.js';
import LocalStorageActions from './localStorageActions.js';
import Task from './task.js';

function displayTodo(arr, actions) {
  const taskListDiv = document.querySelector('.task-list');
  const ul = document.createElement('ul');
  ul.className = 'task-ul';
  taskListDiv.appendChild(ul);

  arr.forEach((e) => {
    const li = document.createElement('li');
    li.className = 'list-item draggable';
    li.setAttribute('draggable', 'true');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = e.completed;
    const tasks = { li, arr, actions };
    checkBox.addEventListener('click', taskComplete.bind(null, tasks));
    const label = document.createElement('label');
    const labelMenu = document.createElement('i');
    labelMenu.className = 'fas fa-ellipsis-v';

    label.appendChild(document.createTextNode(e.description));
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(labelMenu);
    ul.appendChild(li);
  });

  dragAndDrop(arr, actions);
}
const actions = new LocalStorageActions();
const localTodos = actions.get();

if (localTodos.length === 0) {
  actions.add(todoArr);
  displayTodo(todoArr, actions);
} else {
  displayTodo(localTodos, actions);
}