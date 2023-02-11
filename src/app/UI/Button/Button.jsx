import React from 'react';
import style from './button.module.css'

function Button({
                    text = 'example',
                    size = 'medium',
                    disabled = false,
                    type = 'submit',
                    full = true,
                    isForm = true
                }) {
    return (
        <button
            type={type}
            className={`${style.button} ${style.medium} ${disabled ? style.disabled : style.active} ${full && style.fullWidth} ${isForm && style.isForm}`}>
            {text}
        </button>
    );
}

export default Button;