import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createList, selectAllLists } from './todoSlice';

export default function CreateList() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const lists = useSelector(state => selectAllLists(state));

    const [title, setTitle] = useState("");
    const [colorTheme, setColorTheme] = useState("#0000FF");
    const canSave = lists.every(item => item.title !== title) && title;

    const handleCreate = () => {
        const response = dispatch(createList(title, colorTheme));
        navigate(`/list/${response.payload.listId}`);
    }

    return <section>
        <h2>Create a list</h2>
        <form>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="color" value={colorTheme} onChange={(e) => setColorTheme(e.target.value)} />
            <button type="button" onClick={handleCreate} disabled={!canSave}>create</button>
        </form>
    </section>;
}
