import React, {useEffect, useState} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {mainUrlFiles} from "@/app/services/base";
import {useRouter} from "next/navigation";
import SingletonRouter, {Router, useRouter as clientRouter} from 'next/router'
import Modal from "@/app/components/Modal/Modal";
import Link from "next/link";
import i18n from "i18next";
import {test} from "@/app/services/test/test";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function Options(props) {
    const route = useRouter()
    const {tests,
         setActive,
         active,
         setNumber,
         setCurrent,
         leaveTest,
         subjectValue,
         setSubjectValue,
         showModal,
         setShowModal,
         leave,
         setLeave} = useTestContext()
    const [defaultTime, setDefaultTime] = useState(props.time);
    const [time, setTime] = useState(defaultTime);
    const clientRoute = clientRouter()
    const [isActive, setIsActive] = useState(false)
    const [showTime, setShowTime] = useState(true)
    const {t} = useTranslation()


    async function leavef(value, index) {
        setLeave(true)
        setShowModal(true)
        setSubjectValue(value)
        setCurrent(index)
    }


    async function leaved() {
        setLeave(false)
        localStorage.removeItem('time')
        localStorage.removeItem('tests')
        setTime(defaultTime)
        setIsActive(false)
        setActive(null)
        let questions = []
        for (let question of tests.tests) {
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
        localStorage.removeItem('tests')
        localStorage.removeItem('active')
        test.postTests(data, localStorage.getItem('Authorization')).then(res => {
            toast.success(t("toasts.test_success"))
            route.push(`test?subject=${subjectValue.id}&tk_=${localStorage.getItem('Authorization')}&university=${props.university.id}`)
        }).catch(err => {
            toast.success(t("err"))
        })
    }

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            route.push('/profile')
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const startTimer = () => {
        setShowModal(false)
        setIsActive(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const activeOption = (obj, index) => {
        setActive(tests.tests.find(el => obj.id === el.id))
        setNumber(index)
    }

    return (<div className={style.options}>
        <h1 className={style.univerTitleOption}>{props.university && props.university.translations[i18n.language].title}</h1>
        <hr className={style.hrOption}/>
        <img src={props.university.image ? mainUrlFiles + props.university.image : "/icons/logo.svg"} alt=""/>
        <h1 className={style.title}>{tests && tests.tests && tests.tests[0].subject.title}</h1>

        {showTime ? <div className={style.time}> {formatTime(time)} <AiTwotoneEyeInvisible color="#6C6F82"
                                                                                           onClick={() => setShowTime(false)}/>
            </div> :
            <div className={style.time}> -- : -- <AiTwotoneEye color="#6C6F82" onClick={() => setShowTime(true)}/></div>
        }


        <div className={style.optionsContent}>
            {tests && tests.tests && tests.tests.map((value, index) => <div key={value.id}
                                                                            onClick={_ => activeOption(value, index + 1)}
                                                                            className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                {index + 1}
            </div>)}


            <Modal open={showModal}>
                {leave ? <div className={style.startModal}>
                    <h1 className={style.modalText}>{t('test.really_want')}</h1>
                    <br/>
                    <Link
                        href={`test?subject=${subjectValue.id}&tk_=${localStorage.getItem('Authorization')}&university=${props.university.id}`}
                        className={`${style.button} ${style.no}`}
                        onClick={() => leaved()}
                    >Да
                    </Link>
                    <button className={style.button} onClick={_ => setShowModal(false)}>Нет</button>
                </div>  : leaveTest ? <div className={style.startModal}>
                    <h1 className={style.modalText}>{t('test.leave')}</h1>
                    <br/>
                    <Link href={`${tests.tests[0].university}`} 
                    className={`${style.button} ${style.no}`}
                    onClick={() => {
                            setShowModal(false)
                            localStorage.removeItem('tests')
                            localStorage.removeItem('active')
                        }}>
                        Да
                    </Link>
                    <button className={`${style.button}`}
                            onClick={() => setShowModal(false)}
                    >Нет
                    </button>
                </div> : <div className={style.startModal}>
                    <h1 className={style.modalText}>{t('test.start')}</h1>
                    <br/>
                    <button className={style.button} onClick={startTimer}>Да</button>
                    <Link href={tests.length ? `/university/${tests && tests.tests && tests.tests[0].university}` : '/'}
                          className={`${style.button} ${style.no}`}
                          onClick={() => setShowModal(false)}
                    >Нет
                    </Link>
                </div>}
            </Modal>
        </div>
        {props.university.subject.map((value, index) => <button key={value.id} 
        className={`${style.buttonSubject} + ${clientRoute.query.subject == value.id && style.yes}`}
        disabled={clientRoute.query.subject == value.id ? true : false}
        onClick={_ => {
            leavef(value, index)
        }}>
            {value.translations[i18n.language] && value.translations[i18n.language].title}
        </button>)}
    </div>);
}

export default Options;