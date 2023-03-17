import React, {useEffect, useState} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";
import {ceil} from "lodash";

function Options() {
    const {data, setActive, active} = useTestContext()

    const [defaultTime, setDefaultTime] = useState(1500);
    const [time, setTime] = useState(defaultTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
                setDefaultTime(defaultTime -1)
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const startTimer = () => {
        setIsActive(true);
    };

    useEffect(() => {
        localStorage.setItem('time', defaultTime)
    }, [defaultTime])

    useEffect(() => startTimer(), [])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(_ => {
    }, [active])

    const activeOption = (obj) => {
        setActive(data.find(el => obj.id === el.id))
    }

    return (<div className={style.options}>
        <img src="/other/ban.png" alt=""/>
        <h1 className={style.title}>{tests[0].subject.title}</h1>

        <div className={style.time}> {formatTime(time)}</div>
        <div className={style.optionsContent}>
            {data.map(value => <div key={value.id} onClick={_ => activeOption(value)}
                                    className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                {value.id}
            </div>)}
        </div>
    </div>);
}

export default Options;