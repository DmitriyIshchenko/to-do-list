import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById } from './todoSlice';
import { Link } from "react-router-dom";
import SingleTask from './SingleTask';
import ProgressRing from './ProgressRing';

const getProgress = (todos) => {
    const doneAmount = todos.filter(todo => todo.isDone).length;
    return doneAmount / todos.length * 100 || 0;
}

export default function SingleList() {

    const listId = useParams().listId;
    const list = useSelector(state => selectListById(state, listId))
    const { title, todos } = list;
    const renderedTodos = todos.map(todo => <li key={todo.taskId}><SingleTask todo={todo} listId={listId} /></li>)
    return <div>
        <Link to="/">all lists</Link>
        <h2>{title}</h2>
        <ProgressRing radius={20} strokeWidth={4} strokeColor={list.colorTheme} progress={getProgress(todos)} />
        <h3>{todos.lenght === 1 ? `1 task` : `${todos.length} tasks`}</h3>
        <ul>
            {renderedTodos}
        </ul>
        <Link to={`/list/${listId}/new-task`}><button>add new task</button></Link>
    </div>;
}
