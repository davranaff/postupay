import React, {useEffect} from 'react';
import style from './options.module.css'
import {useTestContext} from "@/app/context/TestContext";

function Options() {
    const { data, setActive, active } = useTestContext()

    useEffect(_ => {
    }, [active])

    const activeOption = (obj) => {
        setActive(data.find( el => obj.id === el.id ))
    }

    return (
        <div className={style.options}>
            <img src="/other/ban.png" alt=""/>
            <h1 className={style.title}>Математика</h1>
            <div className={style.time}>21:32</div>
            <div className={style.optionsContent}>
                {
                    data.map( value => <div key={value.id} onClick={_ => activeOption(value)} className={`${style.option} ${(value === active || value.done) && style.option_active}`}>
                    {value.id}
                </div> )}
            </div>
        </div>
    );
}

export default Options;