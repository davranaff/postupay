import React, {useEffect, useState} from 'react';
import style from './questions.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {test} from "@/app/services/test/test";
import { useRouter } from 'next/router';
import i18n from "i18next";

function Questions(props) {
    const {active,
         tests,
         setTests,
         setActive,
         number,
         current,
         setLeaveTest,
         setShowModal,
         showModal,
         setSubjectValue,
         setLeave,
         leave} = useTestContext()
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
                university: props.university.id,
                subject: tests.id,
                questions: questions,
            }
            test.postTests(data).then(res => {
                toast.success(t("toasts.test_success"))
                localStorage.removeItem('tests')
                localStorage.removeItem('time')
                localStorage.removeItem('active')
            }).catch(err => {
                toast.success(t("err"))
            })
            let value = props.university.subject[current + 1]
            setActive(null)
            if (value) {
                route.push(`test?subject=${value.id}&tk_=${localStorage.getItem('Authorization')}&university=${props.university.id}`)
                return
            }
            route.push(`/profile`)
            return
        }
        const newActive = tests.tests[tests.tests.findIndex(value => value.id === obj.id) + 1]
        setActive(newActive)
    }


    return active ? (<div className={style.questions}>
        <h1 className={style.univerTitle}>{props.university && props.university.translations[i18n.language].title}</h1>
        <hr className={style.hr}/>
        <div className={style.question}>
            <h1 className={style.title}>{t('test.question')} {number}</h1>
            <button className={style.button} onClick={_ => {
                setSubjectValue(active.subject)
                setShowModal(true)
                setLeaveTest(true)
            }}>{t('test.out_from')}</button>
        </div>

        <div className={style.description}>
            {active.translations[i18n.language] && active.translations[i18n.language].title}
        </div>
        <div className={style.answers}>
            {active.answers.map(value => (
                <label key={value.id} className={style.label}>
                    <input type="radio" name='answer' onChange={_ => {
                        chose(value)
                        setCheck(value)
                    }}
                           checked={(value === check) || (value.done)}/>
                    {value.translations[i18n.language] && value.translations[i18n.language].title}
                </label>
            ))}

            <button onClick={_ => next(active)}
                    className={style.button}>{active.id === tests.tests[tests.tests.length - 1].id
                        ? props.university.subject[props.university.subject.findIndex(value => value.id === tests.tests[0].subject.id) + 1] ? t("test.exit") : t('test.finish') 
                        : t("test.next")
                        }
                            </button> 
        </div>
    </div>) : (<div className={style.questions}>
        <h1 className={style.univerTitle}>{props.university && props.university.translations[i18n.language].title}</h1>
        <hr className={style.hr}/>
        <h1 className={style.title}>{t("test.choose")}</h1>
    </div>)
}

export default Questions;