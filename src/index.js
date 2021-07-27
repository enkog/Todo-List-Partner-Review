import './style.css';
import dragAndDrop from './dragAndSort.js';
import taskComplete from './completed.js';
import LocalStorageActions from './localStorageActions.js';
import Task from './task.js';
import TaskUtils from './taskUtils.js';

const actions = new LocalStorageActions();
const taskUtils = new TaskUtils(actions);
const localTodos = actions.get();

const completedTask = document.querySelector('.todo-footer');
const addBtn = document.querySelector('.fa-level-down-alt');
const addOnEnter = document.querySelector('.add-todo-input');

// Edit description
const editTodo = (ctx) => {
  const {
    li, labelMenu, deleteIcon, label,
  } = ctx;

  // hide three dots
  labelMenu.classList.add('hidden');

  // show delete icon
  deleteIcon.classList.remove('hidden');

  // make field editable
  const currDesc = li.textContent;

  // create an input field and prepopulate with current description
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-todo-input';
  editInput.value = currDesc;
  editInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // call edit
      const idx = localTodos.findIndex((todo) => todo.description === currDesc);

      taskUtils.editTaskDesc(editInput.value, idx);

      // reload page
      window.location.reload();
    }
  });

  // replace li's textcontent with editinput
  li.removeChild(label);
  li.appendChild(editInput);
};

const deleteTodo = (li) => {
  // find input class edit-todo-input in li
  const input = li.querySelector('.edit-todo-input');
  const description = input.value;

  const idx = localTodos.findIndex((todo) => todo.description === description);

  // delete task at given index
  taskUtils.deleteTask(idx);

  // reload page
  window.location.reload();
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
    checkBox.className = 'check';
    checkBox.checked = e.completed;

    const label = document.createElement('label');
    const labelMenu = document.createElement('i');
    labelMenu.className = 'fas fa-ellipsis-v';

    const tickIcon = document.createElement('i');
    tickIcon.className = 'fas fa-check hidden';

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'far fa-trash-alt hidden';

    const tasks = { li, arr, actions };
    tickIcon.addEventListener('click', () => {
      taskComplete(tasks);
      tickIcon.classList.add('hidden');
      checkBox.classList.remove('hidden');
      checkBox.checked = e.completed;
      label.style.textDecoration = 'none';
    });

    checkBox.addEventListener('click', () => {
      taskComplete(tasks);
      checkBox.classList.add('hidden');
      tickIcon.classList.remove('hidden');
      label.style.textDecoration = 'line-through';
    });

    labelMenu.addEventListener('click', editTodo.bind(null, {
      li, labelMenu, deleteIcon, label,
    }));

    deleteIcon.addEventListener('click', deleteTodo.bind(null, li));

    label.appendChild(document.createTextNode(e.description));
    li.appendChild(checkBox);
    li.appendChild(tickIcon);
    li.appendChild(label);
    li.appendChild(labelMenu);
    li.appendChild(deleteIcon);
    ul.appendChild(li);
  });

  dragAndDrop(arr, actions);
}

displayTodo(localTodos, actions);

const addTodo = () => {
  const description = addOnEnter.value;

  const index = localTodos.length + 1;
  // create new task object
  const task = new Task(description, index);

  // add new task to storage
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

//Clear completed tasks
completedTask.addEventListener('click', () => {
  taskUtils.clearCompleted();
  window.location.reload();
});