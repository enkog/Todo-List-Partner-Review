import './style.css';
import dragAndDrop from './dragAndSort.js';
import taskComplete from './completed.js';
import LocalStorageActions from './localStorageActions.js';
import Task from './task.js';
import TaskUtils from './taskUtils.js';

const actions = new LocalStorageActions();
const taskUtils = new TaskUtils(actions);
const localTodos = actions.get();

const editTodo = (ctx) => {
  const {
    li, labelMenu, deleteIcon, label,
  } = ctx;
  labelMenu.classList.add('hidden');
  deleteIcon.classList.remove('hidden');
  const currDesc = li.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-todo-input';
  editInput.value = currDesc;
  li.removeChild(label);
  li.appendChild(editInput);
};

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

    const label = document.createElement('label');
    const labelMenu = document.createElement('i');
    labelMenu.className = 'fas fa-ellipsis-v';

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'far fa-trash-alt hidden';

    const tasks = { li, arr, actions };
    checkBox.addEventListener('click', taskComplete.bind(null, tasks));

    label.appendChild(document.createTextNode(e.description));
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(labelMenu);
    li.appendChild(deleteIcon);
    ul.appendChild(li);
  });

  dragAndDrop(arr, actions);
}

displayTodo(localTodos, actions);

const addBtn = document.querySelector('.fa-level-down-alt');
const addOnEnter = document.querySelector('.add-todo-input');

const addTodo = () => {
  const description = addOnEnter.value;
  const index = localTodos.length + 1;
  const task = new Task(description, index);
  if (description.length > 0) {
    taskUtils.addTask(task, actions);
    window.location.reload();
  }
};

function handleEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.click();
  }
}

addBtn.addEventListener('click', addTodo);
addOnEnter.addEventListener('keyup', handleEnter);
