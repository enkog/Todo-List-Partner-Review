export default function taskComplete(arrs) {
  const { li, arr, actions } = arrs;
  const arrItem = arr.find((element) => element.description === li.textContent);
  arrItem.completed = !arrItem.completed;

  actions.updateOne(arrItem);
}