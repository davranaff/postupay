import React, {useEffect, useState} from 'react';
import style from './questions.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {value} from "lodash/seq";
import {toast} from "react-toastify";

function Questions(props) {
    const {active, data, setData, setActive} = useTestContext()
    const [check, setCheck] = useState({})

    const chose = (obj) => {
        setCheck(obj)
        const options = active.options.map(value => {
            if (value.id === obj.id) return {...value, checked: true}
            return {...value, checked: false}
        })
        const newData = data.map(value => {
            if (value.id === active.id) {
                return {...value, done: true, options: options}
            }
            return value
        })
        setData(newData)
        localStorage.setItem('data', JSON.stringify(newData))
    }

    const next = (obj) => {
        if (obj === data[data.length - 1]) {
            toast.success('Успешно завершили наш тест')
            localStorage.removeItem('data')
            return
        }
        const newActive = data[data.findIndex( value => value === obj ) + 1]
        setActive(newActive)
    }

    return (
        <div className={style.questions}>
            <h1 className={style.title}>Вопрос {active.id}</h1>
            <div className={style.description}>
                {active.question}
            </div>
            <div className={style.answers}>
                {active.options.map(value => <label key={value.id} className={style.label}>
                    <input type="radio" name='answer' onChange={_ => chose(value)}
                           checked={value === check || value.checked}/>
                    {value.question}
                </label>)}
                <button onClick={_ => next(active)}
                        className={style.button}>{active === data[data.length - 1] ? 'Завершить попытку' : 'Следующий вопрос'}</button>
            </div>
        </div>
    );
}

export default Questions;