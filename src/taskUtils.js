export default class TaskUtils {
  constructor(actions) {
    this.actions = actions;
  }

  getTasks() {
    return this.actions.get();
  }

  addTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.actions.add(tasks);
  }

  editTaskDesc(desc, index) {
    const tasks = this.getTasks();
    const currTask = tasks[index];
    currTask.description = desc;
    this.actions.updateAll(tasks);
  }

  deleteTask(index) {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].index = i + 1;
    }
    this.actions.updateAll(tasks);
  }

  clearCompleted() {
    const localTasks = this.actions.get();
    const tasks = localTasks.filter((task) => task.completed === false);
    this.actions.updateAll(tasks);
  }
}