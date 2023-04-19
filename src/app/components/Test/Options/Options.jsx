import React, {useEffect, useState} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {mainUrlFiles} from "@/app/services/base";
import {useRouter} from "next/navigation";
import Modal from "@/app/components/Modal/Modal";
import Link from "next/link";

function Options(props) {
    const route = useRouter()
    const {tests, setActive, active, setNumber} = useTestContext()

    const [defaultTime, setDefaultTime] = useState(1500);
    const [time, setTime] = useState(defaultTime);

    const [isActive, setIsActive] = useState(false)
    const [showTime, setShowTime] = useState(true)
    const [showModal, setShowModal] = useState(true)

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

    // useEffect(() => startTimer(), [])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const activeOption = (obj, index) => {
        setActive(tests.find(el => obj.id === el.id))
        setNumber(index)
    }

    console.log(tests.length && tests[0].university)
    return (<div className={style.options}>
        <img src={props.university ? mainUrlFiles + props.university.image : "/icons/logo.svg"} alt=""/>
        <h1 className={style.title}>{tests[0] && tests[0].subject.title}</h1>

        {showTime ? <div className={style.time}> {formatTime(time)} <AiTwotoneEyeInvisible color="#6C6F82"
                                                                                           onClick={() => setShowTime(false)}/>
            </div> :
            <div className={style.time}> -- : -- <AiTwotoneEye color="#6C6F82" onClick={() => setShowTime(true)}/></div>
        }


        <div className={style.optionsContent}>
            {tests.map((value, index) => <div key={value.id} onClick={_ => activeOption(value, index + 1)}
                                     className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                {index + 1}
            </div>)}


            <Modal open={showModal}>
                <div className={style.startModal}>
                    <h1 className={style.modalText}>Начать тест?</h1>
                    <br/>
                    <button className={style.button} onClick={startTimer}>Да</button>
                    <Link href={tests.length ? `/university/${tests[0].university}` : '/'}  className={`${style.button} ${style.no}`}
                            onClick={() => setShowModal(false)}
                    >Нет
                    </Link>
                </div>
            </Modal>
        </div>
    </div>);
}

export default Options;