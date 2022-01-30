import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    lists: [
        {
            title: "work",
            todos: [
                {
                    task: "work-task-0",
                    taskId: "0"
                },
                {
                    task: "work-task-1",
                    taskId: "1"
                }
            ],
            listId: "1"
        },

        {
            title: "home",
            todos: [
                {
                    task: "home-task-0",
                    taskId: "0"
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
                const { listId, task, taskId } = action.payload;
                const targetList = state.lists.find(list => list.listId === listId);
                targetList.todos.push({ task, taskId })
            },
            prepare: (listId, task) => {
                return {
                    payload: {
                        listId,
                        task,
                        taskId: nanoid()
                    }
                }
            }
        }
    }
})
export const selectAllLists = state => state.todo.lists;
export const selectListById = (state, listId) => state.todo.lists.find(item => item.listId === listId);

export const { createList, addTask } = todoSlice.actions;
export default todoSlice.reducer;