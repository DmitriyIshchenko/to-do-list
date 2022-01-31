import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectTaskById, editTask } from "./todoSlice";

export default function EditTaskForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listId, taskId } = useParams();
    const target = useSelector(state => selectTaskById(state.todo, listId, taskId));
    const [editInput, setEditInput] = useState(target.task);

    const handleEdit = () => {
        dispatch(editTask({ listId, taskId, editedTask: editInput }));
        navigate(`/list/${listId}`);
    }

    const canSave = editInput !== "";

    return <div>
        <h2>Edit</h2>
        <input type="text" value={editInput} onChange={e => setEditInput(e.target.value)} />
        <button disabled={!canSave} onClick={handleEdit}>save</button>
    </div>;
}
