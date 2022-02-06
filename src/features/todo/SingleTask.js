import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from "./todoSlice";
import { Link } from "react-router-dom";

import "../../styles/SingleTask.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SingleTask({ todo, listId, showMenu, setShowMenu }) {

    const dispatch = useDispatch();
    const { taskId, task, isDone } = todo;

    const handleToggleStatus = () => {
        dispatch(toggleTaskStatus({ taskId, isDone, listId }))
    }

    const handleDelete = () => {
        dispatch(deleteTask({ listId, taskId }))
    }

    const handleShowMenu = () => {
        if (!showMenu || showMenu !== taskId) {
            setShowMenu(taskId);
        } else if (showMenu === taskId) {
            setShowMenu("")
        }
    }
    return <li className='single-list__task'>

        <label className='single-list__task-label'>
            <input className="single-list__task-hidden-input" type="checkbox" checked={isDone} onChange={handleToggleStatus} />
            <span className='single-list__task-text'>{task}</span>
            <span className='single-list__task-checkmark'></span>
        </label>

        <div className="single-list__task-menu">
            <button className="single-list__task-menu-btn" onClick={handleShowMenu}>
                <FontAwesomeIcon icon="ellipsis-h" />
            </button>

            <div className={showMenu === taskId ? "single-list__task-menu-content single-list__task-menu-content-show"
                : "single-list__task-menu-content"}>
                <button className='single-list__task-delete' onClick={handleDelete}>Delete</button>
                <Link className='single-list__task-edit' to={`/list/${listId}/${taskId}/edit`}>Edit</Link>
            </div>
        </div>

    </li >;
}