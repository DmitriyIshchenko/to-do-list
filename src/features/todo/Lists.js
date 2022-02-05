import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectAllLists } from './todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledProgressBar from './StyledProgressBar';

import "../../styles/Lists.css"

export const getProgress = (todos) => {
    const doneAmount = todos.filter(todo => todo.isDone).length;
    return doneAmount / todos.length * 100 || 0;
}

export default function Lists() {

    const lists = useSelector(state => selectAllLists(state.todo));

    const renderedLists = lists.map(list => {
        const progress = getProgress(list.todos)
        return <li key={list.listId}>
            <StyledProgressBar progress={progress} colorTheme={list.colorTheme} />

            <Link to={`/list/${list.listId}`} className='list-link'>

                <div className='list-icon'>
                    <FontAwesomeIcon icon={list.icon} style={{ color: list.colorTheme, opacity: 0.7 }} />
                </div>

                <p className='list-title'>{list.title}</p>

                <p className='list-tasks-amount'>
                    {list.todos.length === 1 ? "1 task" : `${list.todos.length} tasks`}
                </p>

            </Link>
        </li>
    })

    return <div className='to-do-container'>
        <header>
            <h1>To-do list</h1>
        </header>

        <ul className='lists-container'>
            {renderedLists}
            <li className='btn-create'><Link to="/create-list"><FontAwesomeIcon icon="plus" /></Link></li>

        </ul>
    </div>;

}
