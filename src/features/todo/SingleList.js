import React from 'react';
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
    const list = useSelector(state => selectListById(state, listId))
    const { title, todos } = list;

    const renderedTodos = todos.map(todo => <SingleTask key={todo.taskId} todo={todo} listId={listId} />)

    return <div className='single-list-container'>
        <Link to="/" className='link-back'><FontAwesomeIcon icon="angle-left" /></Link>

        <header className='list-header'>
            <ProgressRing radius={25} strokeWidth={3} strokeColor={list.colorTheme} icon={list.icon} progress={getProgress(todos)} />
            <div>
                <h1>{title}</h1>
                <h2>{todos.lenght === 1 ? `1 task` : `${todos.length} tasks`}</h2>
            </div>
        </header>

        <ul className='single-list'>
            {renderedTodos}
        </ul>

        <Link className="add-task-btn" to={`/list/${listId}/new-task`}>
            <div style={{ background: list.colorTheme }}>+</div>
            Add new task
        </Link>
    </div>;
}
