import React, {useEffect, useRef, useState} from 'react';
import style from './Input.module.css'
import {useSingUpContext} from "@/app/context/SignUpContext";
import {useSingInContext} from "@/app/context/SignInContext";

function Input({nameOfInput = 'example', type = 'text', required = true, name}) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const {data, setData, success} = useSingUpContext() !== null ? useSingUpContext() : useSingInContext()

    useEffect(_ => {
        if (success === null) {
            setData(prev => [...prev, {name: name, value: ''}])
        }
        if (success === false) {
            setError(true)
        }
        setValue('')
    }, [success])

    function endFocused() {
        value.length === 0 && setError(true)
        !success && setError(true)
        if (type === 'password' && value.length < 8) {
            setError(true)
        }
        setTimeout(_ => setError(false), 2000)
    }


    function changeInput(e) {
        setValue(e.target.value)
        setData(prev => prev.map(obj => {
            if (obj.name === name) {
                return {...obj, value: e.target.value}
            }
            return obj
        }))
    }


    return (
        <label htmlFor={nameOfInput} className={`${style.label}`}>
            <input
                type={type}
                name={name}
                id={nameOfInput}
                value={value}
                required={required}
                placeholder={nameOfInput}
                onChange={e => changeInput(e)}
                className={`${style.input}  ${error && style.error}`}
                minLength={type === 'password' ? 8 : 4}
                onBlur={endFocused}
            />
        </label>
    );
}

export default Input;