import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectTaskById, editTask } from "./todoSlice";
import { Link } from "react-router-dom";
import Error from './Error';

import "../../styles/EditTaskForm.css"

export default function EditTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { listId, taskId } = useParams();

    const [editInput, setEditInput] = useState("");
    const [editDateInput, setEditDateInput] = useState("");
    const target = useSelector(state => selectTaskById(state.todo, listId, taskId));

    useEffect(() => {
        if (target) {
            setEditInput(target.task);
            setEditDateInput(target.date);
        }
    }, [target])

    if (!target) { //updating page resets the state to its initial state
        return <Error />
    }

    const handleEdit = () => {
        dispatch(editTask({ listId, taskId, editedTask: editInput, editedDate: editDateInput }));
        navigate(`/${listId}`);
    }

    const canSave = editInput !== "";

    return <form className='edit-task-form create-list-form'>
        <Link to={`/${listId}`} className='edit-task-form__link create-list-form__link'></Link>
        <h1 className='edit-task-form__title create-list-form__title'>Edit task</h1>

        <label className="edit-task-form__task-label create-list-form__option-title" htmlFor='task'>Task</label>
        <input
            className='edit-task-form__input create-list-form__input'
            type="text"
            value={editInput}
            onChange={e => setEditInput(e.target.value)} />

        <label className="edit-task-form__date-label create-list-form__option-title" htmlFor='date'>Date</label>
        <input
            className='edit-task-form__date-input  add-task-form__date-input'
            id="date"
            type="date"
            value={editDateInput}
            onChange={e => setEditDateInput(e.target.value)} />

        <button className="edit-task-form__save-btn create-list-form__save-btn" disabled={!canSave} onClick={handleEdit}>save</button>
    </form>
}
