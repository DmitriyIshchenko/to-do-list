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
        return <div key={icon} className='create-list-form__icon-dropdown-item'><FontAwesomeIcon key={index} onClick={() => setIcon(icon)} icon={icon} style={{ color: colorTheme }} /></div>
    })

    return <form className='create-list-form'>
        <Link to="/" className='create-list-form__link'></Link>

        <h1 className='create-list-form__title'>New list</h1>

        <input className='create-list-form__input'
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

        <div className='create-list-form__controls'>
            <h2 className='create-list-form__option-title'>Color</h2>
            <div className='create-list-form__color-picker'>
                <input
                    className='create-list-form__color-picker-input'
                    type="color"
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)} />
            </div>

            <h2 className='create-list-form__option-title'>Icon</h2>
            <button type="button" className="create-list-form__icon-dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
                <div className='create-list-form__selected-icon'>
                    <FontAwesomeIcon
                        icon={icon}
                        style={{ color: colorTheme }} />
                </div>
                <span className="create-list-form__icon-dropbtn-span"
                    style={{ transform: `rotate(${showDropdown ? 45 : -45}deg)` }}></span>
            </button>

            <div className={showDropdown ? "create-list-form__icon-dropdown create-list-form__icon-dropdown-show"
                : "create-list-form__icon-dropdown"}>
                {iconDropdownContent}
            </div>
        </div>

        <button className='create-list-form__save-btn' type="button" onClick={handleCreate} disabled={!canSave}>
            <FontAwesomeIcon className='create-list-form__save-btn-icon' icon="plus" /> add list
        </button>

    </form>;
}
