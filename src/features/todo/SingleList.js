import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById } from './todoSlice';
import { Link } from "react-router-dom";

export default function SingleList() {

    const listId = useParams().listId;
    const list = useSelector(state => selectListById(state, listId))
    const { title, todos } = list;
    const renderedTodos = todos.map(todo => <li key={todo.taskId}>{todo.task}</li>)

    return <div>
        <Link to="/">all lists</Link>
        <h2>{title}</h2>
        <h3>{todos.lenght === 1 ? `1 task` : `${todos.length} tasks`}</h3>
        <ul>
            {renderedTodos}
        </ul>
        <Link to={`/list/${listId}/new-task`}><button>add new task</button></Link>
    </div>;
}
