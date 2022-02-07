import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById } from './todoSlice';
import { Link } from "react-router-dom";
import SingleTask from './SingleTask';
import ProgressRing from './ProgressRing';
import { getProgress } from './Lists';

import "../../styles/SingleList.css"

const getSortedTodos = arr => {
    const todos = [...arr];
    const sorted = {};
    todos.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let todo of todos) {
        if (sorted.hasOwnProperty(todo.date)) {
            sorted[todo.date].push(todo);
        } else {
            sorted[todo.date] = [todo];
        }
    }
    return sorted;
}

const formatTitle = dateStr => {
    let date = new Date(dateStr).setHours(0, 0, 0, 0);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    today = today.getTime();
    tomorrow = tomorrow.getTime();

    if (date === today) {
        return "Today"
    } else if (date === tomorrow) {
        return "Tomorrow";
    } else if (date - today <= 24 * 60 * 60 * 1000 * 4 && date - today > 0) {
        date = new Date(date);
        return date.toLocaleDateString("en-US", { weekday: "long" });
    } else {
        date = new Date(date);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    }
}

export default function SingleList() {

    const listId = useParams().listId;
    const list = useSelector(state => selectListById(state.todo, listId))
    const { title, todos } = list;

    const [showMenu, setShowMenu] = useState("");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sortedTodos = getSortedTodos(todos);

    const renderedTodos = Object.entries(sortedTodos).map(([date, tasks]) => {
        const dateTitle = formatTitle(date);
        return <article key={date}>
            <h2 className='single-list__content-subtitle'>{dateTitle}</h2>
            <ul className='single-list__content-list'>
                {tasks.map(todo => {
                    return <SingleTask
                        key={todo.taskId}
                        todo={todo}
                        listId={listId}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />
                })}
            </ul>
        </article>
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

        <section className='single-list__content'>
            {renderedTodos}
            <Link className="single-list__add-task-btn" to={`/list/${listId}/new-task`}>
                <div className='single-list__add-task-btn-icon' style={{ background: list.colorTheme }}></div>
                <span className='single-list__add-task-btn-text'>Add new task</span>
            </Link>
        </section>

    </div>;
}
