import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from "./todoSlice";
import { Link } from "react-router-dom";

import "../../styles/SingleTask.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SingleTask({ todo, listId }) {

    const dispatch = useDispatch();
    const { taskId, task, isDone } = todo;

    const handleToggleStatus = () => {
        dispatch(toggleTaskStatus({ taskId, isDone, listId }))
    }

    const handleDelete = () => {
        dispatch(deleteTask({ listId, taskId }))
    }

    return <li className='single-task'>

        <label className='single-task-label'>
            <input type="checkbox" checked={isDone} onChange={handleToggleStatus} /><p>{task}</p>
            <span className='checkmark'></span>
        </label>

        <div>
            <button className="delete-btn" onClick={handleDelete}>
                <FontAwesomeIcon icon="trash-alt" />
            </button>
            <Link className="edit-btn" to={`/list/${listId}/${taskId}/edit`}>
                <FontAwesomeIcon icon="pen" />
            </Link>
        </div>

    </li >;
}
