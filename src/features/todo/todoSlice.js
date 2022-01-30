import { createSlice, current, nanoid } from '@reduxjs/toolkit';

const initialState = {
    lists: [
        {
            title: "work",
            todos: [
                {
                    task: "work-task-0",
                    taskId: "0",
                    isDone: true
                },
                {
                    task: "work-task-1",
                    taskId: "1",
                    isDone: false
                }
            ],
            listId: "1"
        },

        {
            title: "home",
            todos: [
                {
                    task: "home-task-0",
                    taskId: "0",
                    isDone: true
                }
            ],
            listId: "2"
        }
    ]
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createList: {
            reducer: (state, action) => {
                state.lists.push(action.payload);
            },
            prepare: (title) => {
                return {
                    payload: {
                        listId: nanoid(),
                        title,
                        todos: []
                    }
                }
            }
        },
        addTask: {
            reducer: (state, action) => {
                const { listId, ...data } = action.payload;
                const targetList = state.lists.find(list => list.listId === listId);
                targetList.todos.push(data);
            },
            prepare: (listId, task) => {
                return {
                    payload: {
                        listId,
                        task,
                        taskId: nanoid(),
                        isDone: false
                    }
                }
            }
        },
        toggleTaskStatus: (state, action) => {
            const { listId, taskId, isDone } = action.payload;
            const target = state.lists.find(list => list.listId === listId)
                .todos.find(todo => todo.taskId === taskId);
            target.isDone = !isDone;
        },
        deleteTask: (state, action) => {
            const { listId, taskId } = action.payload;

            let listIndex = state.lists.findIndex(list => list.listId === listId);
            let targetIndex = state.lists[listIndex].todos.findIndex(todo => todo.taskId === taskId);

            let before = state.lists[listIndex].todos.slice(0, targetIndex);
            let after = state.lists[listIndex].todos.slice(targetIndex + 1);

            state.lists[listIndex].todos = [...before, ...after];
        }
    }
})
export const selectAllLists = state => state.todo.lists;
export const selectListById = (state, listId) => state.todo.lists.find(item => item.listId === listId);

export const { createList, addTask, toggleTaskStatus, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;