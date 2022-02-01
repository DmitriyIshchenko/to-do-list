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
        <div className='link-back'>
            <Link to="/"><FontAwesomeIcon icon="angle-left" /></Link>
        </div>

        <header className='list-header'>
            <ProgressRing radius={25} strokeWidth={3} strokeColor={list.colorTheme} icon={list.icon} progress={getProgress(todos)} />
            <div>
                <h1>{title}</h1>
                <h3>{todos.lenght === 1 ? `1 task` : `${todos.length} tasks`}</h3>
            </div>
        </header>

        <ul className='single-list'>
            {renderedTodos}
        </ul>

        <Link className="add-task-btn" to={`/list/${listId}/new-task`}>
            <div>+</div>
            Add new task
        </Link>
    </div>;
}
