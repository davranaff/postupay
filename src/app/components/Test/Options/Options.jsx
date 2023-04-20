import React, {useEffect, useState} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {mainUrlFiles} from "@/app/services/base";
import {useRouter} from "next/navigation";
import SingletonRouter , { Router, useRouter as clientRouter } from 'next/router'
import Modal from "@/app/components/Modal/Modal";
import Link from "next/link";
import i18n from "i18next";

function Options(props) {
    const route = useRouter()
    const {tests, setActive, active, setNumber, setCurrent} = useTestContext()
    const [defaultTime, setDefaultTime] = useState(1500);
    const [time, setTime] = useState(defaultTime);
    const clientRoute = clientRouter()
    const [isActive, setIsActive] = useState(false)
    const [showTime, setShowTime] = useState(true)
    const [showModal, setShowModal] = useState(true)
    const [leave, setLeave] = useState(false)
    const [subjectValue, setSubjectValue] = useState(null)

    async function leavef(value, index) {
        setLeave(true)
        setShowModal(true)
        setSubjectValue(value)
        setCurrent(index)
    }

    


    useEffect(_ => {
        setTime(localStorage.getItem('time') ? Number(localStorage.getItem('time')) : 1500)
    }, [])

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
                localStorage.setItem('time', defaultTime - 1)
                setDefaultTime(localStorage.getItem('time') || 1500)
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            route.push('/profile')
        }

        return () => clearInterval(interval);
    }, [isActive, time]);
    useEffect(() => {
        const storedSeconds = localStorage.getItem('time');
        if (storedSeconds !== null) {
            setDefaultTime(parseInt(storedSeconds));
        }
    }, [])

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
        <img src={props.university ? mainUrlFiles + props.university.image : "/icons/logo.svg"} alt=""/>
        <h1 className={style.title}>{tests && tests.tests && tests.tests[0].subject.title}</h1>

        {showTime ? <div className={style.time}> {formatTime(time)} <AiTwotoneEyeInvisible color="#6C6F82"
                                                                                           onClick={() => setShowTime(false)}/>
            </div> :
            <div className={style.time}> -- : -- <AiTwotoneEye color="#6C6F82" onClick={() => setShowTime(true)}/></div>
        }


        <div className={style.optionsContent}>
            {tests && tests.tests && tests.tests.map((value, index) => <div key={value.id} onClick={_ => activeOption(value, index + 1)}
                                     className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                {index + 1}
            </div>)}


            <Modal open={showModal} >
                {leave ? <div className={style.startModal}>
                    <h1 className={style.modalText}>Вы хотите завершить и перейти на след. тест?</h1>
                    <br/>
                    <Link href={`test?subject=${subjectValue.id}&tk_=${localStorage.getItem('Authorization')}`}  className={`${style.button} ${style.no}`}
                            onClick={() => {
                                setShowModal(false)
                                localStorage.removeItem('time')
                                localStorage.removeItem('tests')
                                setTime(defaultTime)
                            }}
                    >Да
                    </Link>
                    <button className={style.button} onClick={_ => setShowModal(false)}>Нет</button>
                </div>  : <div className={style.startModal}>
                    <h1 className={style.modalText}>Начать тест?</h1>
                    <br/>
                    <button className={style.button} onClick={startTimer}>Да</button>
                    <Link href={`/university/${tests && tests.tests && tests.tests[0].university}`}  className={`${style.button} ${style.no}`}
                            onClick={() => setShowModal(false)}
                    >Нет
                    </Link>
                </div>}
            </Modal>
        </div>
        {props.university.subject.map((value, index) => <button key={value.id} 
        className={`${style.buttonSubject} + ${clientRoute.query.subject == value.id && style.no}`}
        disabled={clientRoute.query.subject == value.id ? true : false}
        onClick={_ => leavef(value, index)}>
            {value.translations[i18n.language].title}
            </button>)}
    </div>);
}

export default Options;