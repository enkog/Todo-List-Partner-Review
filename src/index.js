import "./style.css";

const todoArr = [
  { description: "Go to the mall", completed: false, index: 1 },
  { description: "Do the laundry", completed: false, index: 2 },
  { description: "Complete todo list project", completed: false, index: 3 },
];

function displayTodo(arr) {
  const taskListDiv = document.querySelector(".task-list");
  const ul = document.createElement("ul");
  taskListDiv.appendChild(ul);

  arr.forEach((e) => {
    const li = document.createElement("li");
    li.className = "list-item";
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const label = document.createElement("label");
    const labelMenu = document.createElement("i");
    labelMenu.className = "fas fa-ellipsis-v";

    label.appendChild(document.createTextNode(e.description));
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(labelMenu);
    ul.appendChild(li);
  });
}

displayTodo(todoArr);
