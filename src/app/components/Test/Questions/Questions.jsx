import React, {useEffect, useState} from 'react';
import style from './questions.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {test} from "@/app/services/test/test";
import { useRouter } from 'next/router';

function Questions(props) {
    const {active, tests, setTests, setActive, number, current} = useTestContext()
    const [check, setCheck] = useState({})
    const {t} = useTranslation()
    const route = useRouter()

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
        const newData = tests.tests.map(value => {
            if (value.id === active.id) {
                return {
                    ...value, done: true, answers
                }
            }
            return value
        })
        setTests(prev => ({...prev, tests: newData}))
        localStorage.setItem('tests', JSON.stringify(newData))
        localStorage.setItem('active', JSON.stringify({...active, answers}))
    }
    const next = (obj) => {
        if (obj.id === tests.tests[tests.tests.length - 1].id) {
            let questions = []
            for(let question of tests.tests){
                let obj = {}
                let counter = 1
                let answers = []
                for (const answer of question['answers']) {
                    let object = {}
                    if (counter === 4) {
                        counter = 1
                        obj.subjectquestion_id = answer['subject_question'].id
                        obj.answers = answers

                    }
                    object.id = answer.id
                    object.status = answer.done
                    answers.push(object)
                    counter++
                }
                questions.push(obj)
            }
            const data = {
                user: JSON.parse(localStorage.getItem('user')).id,
                university: tests.tests[0].university,
                subject: tests.tests[0].subject.id,
                questions: questions,
            }
            test.postTests(data).then(res => {
                toast.success(t("toasts.test_success"))
                localStorage.removeItem('tests')
                localStorage.removeItem('time')
                localStorage.removeItem('active')
                let value = props.university.subject[current + 1]
                if (value) {
                    route.push(`test?subject=${value.id}&tk_=${localStorage.getItem('Authorization')}`)
                    return
                }
                route.push(`/profile`)
            }).catch(err => {
                toast.success(t("err"))
            })
            return
        }
        const newActive = tests.tests[tests.tests.findIndex(value => value.id === obj.id) + 1]
        setActive(newActive)
    }

    return active ? (<div className={style.questions}>
        <h1 className={style.title}>Вопрос {number}</h1>
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
                    className={style.button}>{active.id === tests.tests[tests.tests.length - 1].id ? t("test.exit") : t('text.next')}</button>
        </div>
    </div>) : (<div className={style.questions}>
        <h1 className={style.title}>{t("test.choose")}</h1>
    </div>)
}

export default Questions;