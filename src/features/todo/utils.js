export const formatDate = (date) => {
  return date.toISOString().substring(0, 10);
}

export const getProgress = (todos) => {
  const doneAmount = todos.filter(todo => todo.isDone).length;
  return doneAmount / todos.length * 100 || 0;
}

export const formatTitle = dateStr => {
  let date = new Date(dateStr).setHours(0, 0, 0, 0);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  today = today.getTime();
  tomorrow = tomorrow.getTime();

  if (date === today) {
    return "Today"
  } else if (date === tomorrow) {
    return "Tomorrow";
  } else if (date - today <= 24 * 60 * 60 * 1000 * 4 && date - today > 0) {
    date = new Date(date);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    date = new Date(date);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  }
}

export const isExpired = dateStr => {
  let date = new Date(dateStr).setHours(0, 0, 0, 0);
  let today = new Date().setHours(0, 0, 0, 0);
  return today - date > 0;
}