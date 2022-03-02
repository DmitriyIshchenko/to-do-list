import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectAllLists } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledProgressBar from '../../common/StyledProgressBar';
import { getProgress } from "../../common/utils"

import "../../styles/Lists.css"

export default function Lists() {

  const lists = useSelector(state => selectAllLists(state.todo));

  const renderedLists = lists.map(list => {
    const progress = getProgress(list.todos)
    return <li className="todo__list-item" key={list.listId}>
      <StyledProgressBar progress={progress} colorTheme={list.colorTheme} />

      <Link to={`/${list.listId}`} className='todo__list-item-link'>

        <div className='todo__list-item-icon'>
          <FontAwesomeIcon icon={list.icon} style={{ color: list.colorTheme, opacity: 0.7 }} />
        </div>

        <h2 className='todo__list-item-title'>{list.title}</h2>

        <h3 className='todo__list-item-task-amount'>
          {list.todos.length === 1 ? "1 task" : `${list.todos.length} tasks`}
        </h3>

      </Link>
    </li>
  })

  return <div className='todo'>
    <h1 className='todo__title'>To-do list</h1>

    <ul className='todo__list'>
      {renderedLists}
      <li className='todo__list-item todo__list-item-create'>
        <Link className="todo__create-button" to="/create-list"><FontAwesomeIcon icon="plus" /></Link>
      </li>
    </ul>
  </div>;

}
