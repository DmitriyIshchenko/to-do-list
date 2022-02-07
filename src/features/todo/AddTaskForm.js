import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, selectAllLists } from "./todoSlice";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../styles/AddTaskForm.css"

const formatDate = (date) => {
    return date.toISOString().substring(0, 10);
}

export default function AddTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lists = useSelector(state => selectAllLists(state.todo));

    const listId = useParams().listId;

    const [task, setTask] = useState("");
    const [date, setDate] = useState(formatDate(new Date()));
    const [targetListId, setTargerListId] = useState(listId);

    const handleAddTask = () => {
        dispatch(addTask(targetListId, task, date));
        navigate(`/${targetListId}`)
    }

    const canSave = task !== "";
    const renderedRadios = lists.map(list => {
        const isChecked = targetListId === list.listId;
        return <label key={list.listId} htmlFor={list.title} className='add-task-form__option'>
            <span className='add-task-form__option-title'>{list.title}</span>

            <input
                className='add-task-form__option-hidden-input'
                type="radio"
                id={list.title}
                name="list"
                value={list.listId}
                checked={isChecked}
                onChange={(e) => setTargerListId(e.target.value)} />

            <span className="add-task-form__option-radio-btn" style={
                {
                    border: `3px solid ${list.colorTheme}`,
                    background: isChecked ? list.colorTheme : "white"
                }
            }></span>
        </label>

    })

    return <form className='add-task-form create-list-form'>
        <Link to={`/${listId}`} className='add-task-form__link create-list-form__link'></Link>

        <h1 className='add-task-form__title create-list-form__title'>New task</h1>

        <label className="add-task-form__task-label create-list-form__option-title" htmlFor='task'>Task</label>
        <input className='add-task-form__input create-list-form__input'
            type="text"
            id="task"
            placeholder='What are you planning?'
            value={task}
            onChange={(e) => setTask(e.target.value)} />

        <label className="add-task-form__date-label create-list-form__option-title" htmlFor='date'>Date</label>
        <input
            className='add-task-form__date-input'
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)} />

        <div className='add-task-form__controls create-list-form__controls'>
            {renderedRadios}
        </div>

        <button className="add-task-form__save-btn create-list-form__save-btn" disabled={!canSave} onClick={handleAddTask}>
            <FontAwesomeIcon className='add-task-form__save-btn-icon create-list-form__save-btn-icon' icon="plus" />add task
        </button>
    </form>


}
