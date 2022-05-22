import React from 'react';
import cl from './MyButton.module.scss';
const MyButton = ({img,text,disabled,...props}) => {
    return (
        <button {...props}disabled={disabled} className={cl.MyButton }>
            <img src={img} alt=''/> {text}
        </button>
    );
}

export default MyButton;