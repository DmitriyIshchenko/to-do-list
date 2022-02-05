import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createList, selectAllLists } from './todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../styles/CreateListForm.css"

export default function CreateList() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const lists = useSelector(state => selectAllLists(state.todo));

    const [title, setTitle] = useState("");
    const [colorTheme, setColorTheme] = useState("#0000FF");
    const [icon, setIcon] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false)

    const canSave = lists.every(item => item.title !== title) && title;

    const handleCreate = () => {
        const response = dispatch(createList(title, colorTheme, icon));
        navigate(`/list/${response.payload.listId}`);
        setShowDropdown(false);
    }

    const icons = [
        "graduation-cap",
        "briefcase",
        "home",
        "dumbbell",
        "book",
        "hammer",
        "shopping-cart",
        "birthday-cake",
        "box-open",
        "capsules",
        "dog",
        "laptop",
        "palette",
        "music"
    ]

    const iconDropdownContent = icons.map((icon, index) => {
        return <FontAwesomeIcon key={index} onClick={() => setIcon(icon)} icon={icon} style={{ color: colorTheme }} />
    })

    return <form className='create-list-form'>
        <Link to="/" className='link-back'><FontAwesomeIcon icon="angle-left" /></Link>

        <header>
            <h1>Create new list</h1>
        </header>

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className='options'>

            <button type="button" className="icon-dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
                <FontAwesomeIcon icon={icon} style={{ color: colorTheme }} />
                <span style={{ transform: `rotate(${showDropdown ? 45 : -45}deg)` }}></span>
            </button>
            <div className={showDropdown ? "icon-dropdown show-dropdown" : "icon-dropdown"}>
                {iconDropdownContent}
            </div>

            <div className='color-picker'>
                <input type="color" value={colorTheme} onChange={(e) => setColorTheme(e.target.value)} />
            </div>

        </div>

        <button className='save-btn' type="button" onClick={handleCreate} disabled={!canSave}>
            <FontAwesomeIcon icon="plus" /> add list
        </button>

    </form>;
}
