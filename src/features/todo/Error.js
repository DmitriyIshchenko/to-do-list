import React from 'react';
import { Link } from 'react-router-dom';

import "../../styles/Error.css"

export default function Error() {
    return <div className='error todo'>
        <h1 className='error__title create-list-form__title'>Error</h1>
        <h2 className='error__description create-list-form__option-title'>Page not found</h2>
        <Link className='error__link' to="/">Back to home</Link>
    </div>;
}
