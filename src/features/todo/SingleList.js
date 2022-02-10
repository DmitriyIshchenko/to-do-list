import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById, selectSortedTodos } from './selectors';
import { Link } from "react-router-dom";
import SingleTask from './SingleTask';
import ProgressRing from './ProgressRing';
import Error from './Error'
import { getProgress, formatTitle } from './utils';

import "../../styles/SingleList.css"

export default function SingleList() {

  const listId = useParams().listId;
  const list = useSelector(state => selectListById(state.todo, listId));
  const sortedTodos = useSelector(state => selectSortedTodos(state.todo, listId));

  const [showMenu, setShowMenu] = useState("");

  if (!list) {
    return <Error />
  }

  const { title, todos } = list;

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
      <Link className="single-list__add-task-btn" to={`/${listId}/new-task`}>
        <div className='single-list__add-task-btn-icon' style={{ background: list.colorTheme }}></div>
        <span className='single-list__add-task-btn-text'>Add new task</span>
      </Link>
    </section>

  </div>;
}
