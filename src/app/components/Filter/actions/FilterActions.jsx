import React, {useEffect, useState} from 'react';
import style from './filteractions.module.css'
import {useFilterContext} from "@/app/context/FilterContext";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {log} from "next-translate/loadNamespaces";
import { set } from 'nprogress';

function FilterActions(props) {
    const {t} = useTranslation()

    const [change, setChange] = useState(1)
    const [info, setInfo] = useState({})
    const {showSideBar, setShowSideBar, setParams, setLoading} = useFilterContext()
    const router = useRouter()
    const initialDrop ={
        title: t('filter.choose_region'),
        active: false,
    }
    const [dropDown, setDropDown] = useState(initialDrop)

    useEffect(() => {
        setDropDown(initialDrop)
    },[i18n.language])

    useEffect(_ => {
        if (Object.keys(router.query).length !== 0 && change === 1) {
            setInfo({...info, [router.query.education_type]: router.query.education_type})
            setParams(Object.keys({[router.query.education_type]: router.query.education_type}).join('&'))
        }
        setParams(Object.keys(info).join('&'))
        setLoading(true)
    }, [change])


    const active = (object) => {
        setChange(change + 1)
        console.log(info)
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
        <div className={`${style.main} ${showSideBar ? '' : `${style.main_active } ${style.hide}`} `}>
            <h1 className={style.title}>{t('filter.filter')}</h1>
            <div onClick={_ => setShowSideBar(!showSideBar)}
                 className={`${style.arrow} ${showSideBar ? '' : style.arrow_active}`}>
                <img src="/icons/arrow.svg" alt=""/>
            </div>
            <label htmlFor="select" className={style.label}>
                <div id="select" className={style.select} onClick={_ => {
                    setDropDown({...dropDown, active: !dropDown.active})
                }}>
                    <p>{dropDown.title}</p>
                </div>
                <div className={`${style.selectBody} ${dropDown.active && style.selectBody_active}`}>
                    {props.regions.map(value => <div className={style.option} key={value.id} onClick={_ => {
                        setDropDown({title: value.title, active: false})
                        active(value)
                    }}>{value.title}</div>)}
                </div>
            </label>
            <p className={style.buttonsTitle}>{t('filter.education_speciality')}</p>
            <div className={style.buttons}>
                {props.educationTypes.map(value => <button key={value.id}
                                                           className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                           onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.form_education')}</p>

            <div className={style.buttons}>
                {props.educationForms.map(value => <button key={value.id}
                                                           className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                           onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.science')}</p>
            <div className={style.buttonsItems}>
                {props.subjects.map(value => <button
                    key={value.id}
                    onClick={() => active(value)}
                    className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}>
                    {value.translations[i18n.language] && value.translations[i18n.language].title}
                </button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.level')}</p>
            <div className={style.buttons}>
                {props.educationDegrees.map(value => <button key={value.id}
                                                             className={`${style.button} ${info[`${value.name}=${value.id}`] && style.active}`}
                                                             onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <button className={`${style.button} ${style.blue}`} onClick={_ => setShowSideBar(!showSideBar)}>{t('filter.search')}
            </button>
        </div>
    );
}

export default FilterActions;