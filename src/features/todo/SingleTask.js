import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from "./todoSlice";
import { Link } from "react-router-dom";

export default function SingleTask({ todo, listId }) {

    const dispatch = useDispatch();
    const { taskId, task, isDone } = todo;

    const handleToggleStatus = () => {
        dispatch(toggleTaskStatus({ taskId, isDone, listId }))
    }

    const handleDelete = () => {
        dispatch(deleteTask({ listId, taskId }))
    }

    return <>
        <input type="checkbox" checked={isDone} onChange={handleToggleStatus} />
        {task}
        <button onClick={handleDelete}>delete</button>
        <Link to={`/list/${listId}/${taskId}/edit`}>edit</Link>
    </>;
}
