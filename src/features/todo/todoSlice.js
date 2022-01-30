import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    lists: [
        {
            title: "work",
            todos: ["work-task-0", "work-task-1"],
            listId: "1"
        },
        {
            title: "home",
            todos: ["home-task-0"],
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
        }
    }
})
export const selectAllLists = state => state.todo.lists;
export const selectListById = (state, listId) => state.todo.lists.find(item => item.listId === listId);

export const { createList } = todoSlice.actions;
export default todoSlice.reducer;