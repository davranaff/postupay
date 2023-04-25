import React, { useEffect, useRef, useState } from 'react';
import style from './Input.module.css'
import { useSingUpContext } from "@/app/context/SignUpContext";
import { useSingInContext } from "@/app/context/SignInContext";
import { AiTwotoneEye, AiTwotoneEyeInvisible  } from 'react-icons/ai'

function Input({ nameOfInput = 'example', type = 'text', required = true, name }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const { data, setData, success } = useSingUpContext() !== null ? useSingUpContext() : useSingInContext()
    const [showPassword, setShowPassword] = useState(type)

    useEffect(_ => {
        if (success === null) {
            setData(prev => [...prev, { name: name, value: '' }])
        }

        setError(false)
    }, [success])

    function endFocused() {
        !value.length && setError(true)
        if (type === 'password' && value.length < 8) {
            setError(true)
        }
        setTimeout(_ => setError(false), 2000)
    }


    function changeInput(e) {
        setValue(e.target.value)
        setData(prev => prev.map(obj => {
            if (obj.name === name) {
                return { ...obj, value: e.target.value }
            }
            return obj
        }))
    }


    return (
        <label htmlFor={nameOfInput} className={`${style.label}`}>
            <input
                type={type === 'password' ? showPassword : type}
                name={name}
                id={nameOfInput}
                value={value}
                required={required}
                placeholder={nameOfInput}
                onChange={e => changeInput(e)}
                className={`${style.input}  ${error && style.error}`}
                minLength={type === 'password' ? 8 : 1}
                onBlur={endFocused}
            />
            {type === 'password' && (
                showPassword === 'password' ? 
                <AiTwotoneEye color="#6C6F82" onClick={() => setShowPassword('text')} /> :
                <AiTwotoneEyeInvisible  color="#6C6F82" onClick={() => setShowPassword('password')}/>
                )}
        </label>
    );
}

export default Input;