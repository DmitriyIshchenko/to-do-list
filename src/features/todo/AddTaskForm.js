import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, selectAllLists } from "./todoSlice";

export default function AddTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lists = useSelector(state => selectAllLists(state));

    const listId = useParams().listId;

    const [task, setTask] = useState("");
    const [targetListId, setTargerListId] = useState(listId);

    const handleAddTask = () => {
        dispatch(addTask(targetListId, task));
        navigate(`/list/${targetListId}`)
    }

    const renderedRadios = lists.map(list => {
        return <label key={list.listId} htmlFor={list.title}>{list.title}
            <input
                type="radio"
                id={list.title}
                name="list"
                value={list.listId}
                checked={targetListId === list.listId}
                onChange={(e) => setTargerListId(e.target.value)} />
        </label>

    })

    return <section>
        <h2>new task</h2>
        <form>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <div>
                {renderedRadios}
            </div>
            <button onClick={handleAddTask}>add task</button>
        </form>
    </section>;
}
