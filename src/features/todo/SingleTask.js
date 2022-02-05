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
    return <li className='single-task'>

        <label className='single-task-label'>
            <input type="checkbox" checked={isDone} onChange={handleToggleStatus} />
            <p>{task}</p>
            <span className='checkmark'></span>
        </label>

        <div className="menu">
            <button className="menu-btn" onClick={handleShowMenu}><FontAwesomeIcon icon="ellipsis-h" /></button>
            <div className={showMenu === taskId ? "menu-content show-menu" : "menu-content"}>
                <button onClick={handleDelete}>Delete</button>
                <Link to={`/list/${listId}/${taskId}/edit`}>Edit</Link>
            </div>
        </div>

    </li >;
}