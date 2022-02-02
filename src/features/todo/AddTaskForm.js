import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, selectAllLists } from "./todoSlice";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../styles/AddTaskForm.css"

export default function AddTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lists = useSelector(state => selectAllLists(state));

    const listId = useParams().listId;

    const [task, setTask] = useState("");
    const [targetListId, setTargerListId] = useState(listId);

    const handleAddTask = () => {
        dispatch(addTask(targetListId, task));
        navigate(`/list/${targetListId}`)
    }

    const canSave = task !== "";
    const renderedRadios = lists.map(list => {
        const isChecked = targetListId === list.listId;
        return <label key={list.listId} htmlFor={list.title} className='custom-radio-label'>{list.title}
            <input
                type="radio"
                id={list.title}
                name="list"
                value={list.listId}
                checked={isChecked}
                onChange={(e) => setTargerListId(e.target.value)} />
            <span className="custom-radio" style={
                {
                    border: `3px solid ${list.colorTheme}`,
                    background: isChecked ? list.colorTheme : "white"
                }
            }></span>
        </label>

    })

    return <form className='add-task-form'>
        <Link to={`/list/${listId}`} className='link-back'><FontAwesomeIcon icon="angle-left" /></Link>
        <header>
            <h1>New task</h1>
        </header>

        <input type="text" placeholder='What are you planning?' value={task} onChange={(e) => setTask(e.target.value)} />

        <div className='add-task-controls'>
            {renderedRadios}
        </div>

        <button className="save-btn" disabled={!canSave} onClick={handleAddTask}>
            <FontAwesomeIcon icon="plus" />add task
        </button>
    </form>


}
