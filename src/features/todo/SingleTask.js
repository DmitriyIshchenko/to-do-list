import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus } from "./todoSlice";

export default function SingleTask({ todo, listId }) {

    const dispatch = useDispatch();
    const { taskId, task, isDone } = todo;

    const handleToggleStatus = () => {
        dispatch(toggleTaskStatus({ taskId, isDone, listId }))
    }

    return <>
        <input type="checkbox" checked={isDone} onChange={handleToggleStatus} />
        {task}
    </>;
}
