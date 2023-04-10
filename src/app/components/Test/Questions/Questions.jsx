import React, {useEffect, useState} from 'react';
import style from './questions.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function Questions(props) {
    const {active, tests, setTests, setActive} = useTestContext()
    const [check, setCheck] = useState({})
    const {t} = useTranslation()
    useEffect(_ => {
        const local = JSON.parse(localStorage.getItem('active'))
        if (local !== null) {
            setActive(local)
        }
    }, [check])

    const chose = (obj) => {
        const answers = active.answers.map(value => {
            if (value.id === obj.id) return {...value, done: true}
            return {...value, done: false}
        })
        const newData = tests.map(value => {
            if (value.id === active.id) {
                return {
                    ...value, done: true, answers
                }
            }
            return value
        })
        setTests(newData)
        localStorage.setItem('tests', JSON.stringify(newData))
        localStorage.setItem('active', JSON.stringify({...active, answers}))
    }

    const next = (obj) => {
        if (obj.id === tests[tests.length - 1].id) {
            toast.success(t("toasts.test_success"))
            localStorage.removeItem('tests')
            localStorage.setItem('time', '0')
            localStorage.removeItem('active')
            return
        }
        const newActive = tests[tests.findIndex(value => value.id === obj.id) + 1]
        console.log(newActive)
        setActive(newActive)
    }

    return active ? (<div className={style.questions}>
        <h1 className={style.title}>Вопрос {active.id}</h1>
        <div className={style.description}>
            {active.translations['ru'].title}
        </div>
        <div className={style.answers}>
            {active.answers.map(value => (
                <label key={value.id} className={style.label}>
                    <input type="radio" name='answer' onChange={_ => {
                        chose(value)
                        setCheck(value)
                    }}
                           checked={(value === check) || (value.done)}/>
                    {value.translations['ru'].title}
                </label>
            ))}
            <button onClick={_ => next(active)}
                    className={style.button}>{active.id === tests[tests.length - 1].id ? t("test.exit") : t('text.next')}</button>
        </div>
    </div>) : (<div className={style.questions}>
        <h1 className={style.title}>{t("test.choose")}</h1>
    </div>)
}

export default Questions;