export default function handleDragAndDrop(arr) {
  const ul = document.querySelector('.task-ul');
  const draggables = ul.querySelectorAll('.draggable');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  const getNodeItemIndex = (item, ar) => {
    let index;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].textContent === item) {
        index = i;
        break;
      }
    }

    return index + 1;
  };

  const getDraggedItem = () => {
    const currUl = ul.querySelectorAll('.draggable');

    arr.forEach((item) => {
      item.index = getNodeItemIndex(item.description, currUl);
    });
  };

  const sortArr = (arr) => arr.sort((a, b) => a.index - b.index);

  const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(dragging)'),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  };

  ul.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(ul, e.clientY);
    const draggable = document.querySelector('.dragging');

    if (afterElement == null) {
      ul.appendChild(draggable);
    } else {
      ul.insertBefore(draggable, afterElement);
    }

    getDraggedItem();

    // sort array based on index
    sortArr(arr);
  });
}