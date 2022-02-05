import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    lists: [
        {
            title: "work",
            todos: [
                {
                    task: "Write a report",
                    taskId: "0",
                    isDone: true
                },
                {
                    task: "Meeting at 10:30",
                    taskId: "1",
                    isDone: false
                }
            ],
            listId: "1",
            colorTheme: "#FF0000",
            icon: "briefcase"
        },

        {
            title: "home",
            todos: [
                {
                    task: "Wash the dishes",
                    taskId: "0",
                    isDone: true
                }
            ],
            listId: "2",
            colorTheme: "#00FF00",
            icon: "home"
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
            prepare: (title, colorTheme, icon) => {
                return {
                    payload: {
                        listId: nanoid(),
                        colorTheme,
                        title,
                        todos: [],
                        icon
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
            const target = selectTaskById(state, listId, taskId);
            target.isDone = !isDone;
        },
        deleteTask: (state, action) => {
            const { listId, taskId } = action.payload;
            let todos = selectListById(state, listId).todos;
            let target = todos.findIndex(todo => todo.taskId === taskId);
            todos.splice(target, 1);
        },
        editTask: (state, action) => {
            const { listId, taskId, editedTask } = action.payload;
            const target = selectTaskById(state, listId, taskId);
            target.task = editedTask;
        }
    }
})
export const selectAllLists = state => state.lists;
export const selectListById = (state, listId) => state.lists.find(item => item.listId === listId);
export const selectTaskById = (state, listId, taskId) => {
    return state.lists.find(list => list.listId === listId)
        .todos.find(todo => todo.taskId === taskId);
}

export const { createList, addTask, toggleTaskStatus, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;