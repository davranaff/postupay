import { SignInContext } from '@/app/context/SignInContext';
import { SignUpContext } from '@/app/context/SignUpContext';
import React, { useContext } from 'react';
import style from './button.module.css'

function Button({
    text = 'example',
    size = 'medium',
    disabled = false,
    type = 'submit',
    full = true,
    isForm = true,
   
}) {
    

    const {isLoading, setIsLoading} =  text === 'Регистрация'||
    text === "Ro’yxatdan o’tish"  ? useContext(SignUpContext) : useContext(SignInContext)
    return (
        <button
            type={type}
            className={`${style.button} ${style.medium}
            ${isLoading ? style.disabled : style.active}
            ${full && style.fullWidth} ${isForm && style.isForm}`}
            disabled = {isLoading}
            >
            {text}
        </button>
    );
}

export default Button;