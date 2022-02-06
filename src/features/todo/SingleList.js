import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById } from './todoSlice';
import { Link } from "react-router-dom";
import SingleTask from './SingleTask';
import ProgressRing from './ProgressRing';
import { getProgress } from './Lists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../styles/SingleList.css"

export default function SingleList() {

    const listId = useParams().listId;
    const list = useSelector(state => selectListById(state.todo, listId))
    const { title, todos } = list;

    const [showMenu, setShowMenu] = useState("");

    const renderedTodos = todos.map(todo => {
        return <SingleTask
            key={todo.taskId}
            todo={todo}
            listId={listId}
            showMenu={showMenu}
            setShowMenu={setShowMenu} />
    })

    return <div className='single-list'>
        <Link to="/" className='single-list__link create-list-form__link'></Link>

        <header className='single-list__header'>
            <div className='single-list__progress-ring'>
                <ProgressRing radius={25} strokeWidth={3} strokeColor={list.colorTheme} icon={list.icon} progress={getProgress(todos)} />
            </div>
            <h1 className='single-list__title'>{title}</h1>
            <h2 className='single-list__task-amount'>{todos.length === 1 ? `1 task` : `${todos.length} tasks`}</h2>
        </header>

        <ul className='single-list__content'>
            {renderedTodos}
            <li className="single-list__add-task">
                <Link className="single-list__add-task-btn" to={`/list/${listId}/new-task`}>
                    <div className='single-list__add-task-btn-icon' style={{ background: list.colorTheme }}></div>
                    <span className='single-list__add-task-btn-text'>Add new task</span>
                </Link>
            </li>
        </ul>
    </div>;
}
