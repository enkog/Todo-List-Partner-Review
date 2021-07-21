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
  });
}
