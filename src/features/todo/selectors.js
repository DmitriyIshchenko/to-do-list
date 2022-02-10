export const selectAllLists = state => state.lists;

export const selectListById = (state, listId) => state.lists.find(item => item.listId === listId);

export const selectTaskById = (state, listId, taskId) => {
  const list = selectListById(state, listId);
  if (list) return list.todos.find(todo => todo.taskId === taskId);
}

export const selectSortedTodos = (state, listId) => {
  const list = selectListById(state, listId);
  if (!list) return;

  const todos = [...list.todos];
  todos.sort((a, b) => new Date(a.date) - new Date(b.date));

  const result = {};
  todos.forEach(todo => {
    if (result.hasOwnProperty(todo.date)) {
      result[todo.date].push(todo);
    } else {
      result[todo.date] = [todo];
    }
  })

  return result;
}