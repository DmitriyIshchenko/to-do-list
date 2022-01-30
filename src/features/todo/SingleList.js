import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectListById } from './todoSlice';
import { Link } from "react-router-dom";

export default function SingleList() {

    const listId = useParams().listId;
    const list = useSelector(state => selectListById(state, listId))
    return <div>
        <Link to="/">all lists</Link>
        <p>{`${list.title} list`}</p>
    </div>;
}
