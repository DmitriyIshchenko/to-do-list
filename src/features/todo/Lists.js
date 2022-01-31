import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectAllLists } from './todoSlice';

export default function Lists() {

    const lists = useSelector(state => selectAllLists(state));
    const renderedLists = lists.map(list => <li key={list.listId} style={{ color: list.colorTheme }}><Link to={`/list/${list.listId}`}>{list.title}</Link></li>)

    return <div>
        <ul>
            {renderedLists}
        </ul>
        <button><Link to="/create-list">create list</Link></button>
    </div>;
}
