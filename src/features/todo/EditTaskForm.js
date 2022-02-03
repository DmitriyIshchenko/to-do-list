import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectTaskById, editTask } from "./todoSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../styles/EditTaskForm.css"

export default function EditTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listId, taskId } = useParams();
    const target = useSelector(state => selectTaskById(state.todo, listId, taskId));

    const [editInput, setEditInput] = useState(target.task);

    const handleEdit = () => {
        dispatch(editTask({ listId, taskId, editedTask: editInput }));
        navigate(`/list/${listId}`);
    }

    const canSave = editInput !== "";

    return <form className='edit-task-form'>
        <Link to={`/list/${listId}`} className='link-back'><FontAwesomeIcon icon="angle-left" /></Link>
        <header>
            <h1>Edit task</h1>
        </header>
        <input type="text" value={editInput} onChange={e => setEditInput(e.target.value)} />
        <button className="save-btn" disabled={!canSave} onClick={handleEdit}>save</button>
    </form>
}
