import React, {useEffect, useState} from 'react';
import style from './filteractions.module.css'
import {useFilterContext} from "@/app/context/FilterContext";
import {useRouter} from "next/router";

function FilterActions(props) {
    const [change, setChange] = useState(1)
    const [info, setInfo] = useState({})
    const {showSideBar, setShowSideBar, setParams} = useFilterContext()
    const router = useRouter()

    useEffect(_ => {
        if (Object.keys(router.query).length !== 0 && change === 1) {
            setInfo({...info, [router.query.education_form]: router.query.education_form})
            setParams(Object.keys({[router.query.education_form]: router.query.education_form}).join('&'))
        }
        setParams(Object.keys(info).join('&'))
    }, [change])


    const active = (object) => {
        setChange(change + 1)
        if (info[`${object.name}=${object.id}`]) {
            const newObj = Object.keys(info).filter(key =>
                key !== `${object.name}=${object.id}`).reduce((obj, key) => {
                    obj[key] = info[key];
                    return obj;
                }, {}
            )
            setInfo(newObj)
            return
        }
        setInfo(prev => ({...prev, [`${object.name}=${object.id}`]: object.id}))
    }


    return (
        <div className={`${style.main} ${showSideBar ? '' : style.main_active}`}>
            <h1 className={style.title}>Фильтр</h1>
            <div onClick={_ => setShowSideBar(!showSideBar)}
                 className={`${style.arrow} ${showSideBar ? '' : style.arrow_active}`}>
                <img src="/icons/arrow.svg" alt=""/>
            </div>
            <label htmlFor="select" className={style.label}>
                <select name="" id="select" className={style.select} onChange={e => {
                    console.log(e.target.value)
                }}>
                    <option value="">Выберите регион…</option>
                    {props.regions.map(value => <option key={value.id}
                                                        value={value.title}>{value.title}</option>)}
                </select>
            </label>
            <p className={style.buttonsTitle}>Тип учебного заведения:</p>
            <div className={style.buttons}>
                {props.educationForms.map(value => <button key={value.id}
                                                           className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                           onClick={_ => active(value)}>{value.title}</button>)}
            </div>
            <p className={style.buttonsTitle}>Форма обучения:</p>
            <div className={style.buttons}>
                {props.educationTypes.map(value => <button key={value.id}
                                                           className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                           onClick={_ => active(value)}>{value.title}</button>)}
            </div>
            <p className={style.buttonsTitle}>Предметы:</p>
            <div className={style.buttonsItems}>
                {props.subjects.map(value => <button
                    key={value.id}
                    onClick={() => active(value)}
                    className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}>
                    {value.title}
                </button>)}
            </div>
            <p className={style.buttonsTitle}>Уровень Образования:</p>
            <div className={style.buttons}>
                {props.educationDegrees.map(value => <button key={value.id}
                                                             className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                             onClick={_ => active(value)}>{value.title}</button>)}
            </div>
        </div>
    );
}

export default FilterActions;