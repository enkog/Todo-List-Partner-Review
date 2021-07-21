export default class LocalStorageActions {
    constructor() {
      this.localStorage = localStorage;
    }
  
    add(arr) {
      this.localStorage.setItem('Todos', JSON.stringify(arr));
    }
  
    remove(arr, index) {
      const todos = arr.filter((todo, i) => i !== index);
      this.localStorage.setItem('Todos', JSON.stringify(todos));
    }
  
    updateOne(item) {
      const todos = this.get();
      // get index of item
      const index = todos.findIndex((todo) => todo.description === item.description);
  
      // replace item at index
      todos.splice(index, 1, item);
  
      // add todo
      this.add(todos);
    }
  
    updateAll(arr) {
      this.localStorage.removeItem('Todos');
      this.add(arr);
    }
  