import React, {useEffect, useState} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {AiTwotoneEye, AiTwotoneEyeInvisible} from "react-icons/ai";
import {mainUrlFiles} from "@/app/services/base";
import {useRouter} from "next/navigation";

function Options(props) {
    const route = useRouter()
    const {tests, setActive, active} = useTestContext()

    const [defaultTime, setDefaultTime] = useState( 1500);
    const [time, setTime] = useState(defaultTime);

    const [isActive, setIsActive] = useState(false)
    const [showTime, setShowTime] = useState(true)

    useEffect(_ => {
        setTime(localStorage.getItem('time') ? Number(localStorage.getItem('time'))  : 1500)
    }, [])

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
                setDefaultTime(defaultTime -1)
                localStorage.setItem('time', defaultTime -1)
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            route.push('/profile')
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const startTimer = () => {
        setIsActive(true);
    };

    useEffect(() => startTimer(), [])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const activeOption = (obj) => {
        setActive(tests.find(el => obj.id === el.id))
    }
    return (<div className={style.options}>
        <img src={props.university && mainUrlFiles + props.university.image} alt=""/>
        <h1 className={style.title}>{tests[0] && tests[0].subject.title}</h1>

        {showTime ?  <div className={style.time}> {formatTime(time)}   <AiTwotoneEyeInvisible  color="#6C6F82" onClick={() => setShowTime(false)}/></div> :
            <div className={style.time}> -- : --   <AiTwotoneEye  color="#6C6F82" onClick={() => setShowTime(true)} /></div>
        }



        <div className={style.optionsContent}>
            {tests.map(value => <div key={value.id} onClick={_ => activeOption(value)}
                                    className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                {value.id}
            </div>)}
        </div>
    </div>);
}

export default Options;