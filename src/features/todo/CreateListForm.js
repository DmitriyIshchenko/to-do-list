import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createList, selectAllLists } from './todoSlice';

export default function CreateList() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const lists = useSelector(state => selectAllLists(state));

    const [title, setTitle] = useState("");
    const canSave = lists.every(item => item.title !== title) && title;

    const handleCreate = () => {
        const response = dispatch(createList(title));
        navigate(`/list/${response.payload.listId}`);
    }

    return <section>
        <h2>Create a list</h2>
        <form>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="button" onClick={handleCreate} disabled={!canSave}>create</button>
        </form>
    </section>;
}
