import React, {useEffect, useState} from 'react';
import style from './filteractions.module.css'
import {useFilterContext} from "@/app/context/FilterContext";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import { element } from 'prop-types';

function FilterActions(props) {
    const {t} = useTranslation()

    const [info, setInfo] = useState({})
    const {showSideBar, setShowSideBar, setParams, setLoading} = useFilterContext()
    const router = useRouter()
    const initialDrop ={
        title: t('filter.choose_region'),
        active: false,
    }
    const [change, setChange] = useState(false)
    const [dropDown, setDropDown] = useState(initialDrop)

    useEffect(() => {
        setDropDown(initialDrop)
    },[i18n.language])

    useEffect(_ => {
        filt()
        setLoading(true)
    }, [change])

    function filt() {
        if (Object.keys(router.query).length !== 0) {
            Object.keys(router.query).forEach((value, index) => {
                if (typeof router.query[value] === "object") {
                    router.query[value].forEach(item => {
                        setInfo({...info, [value]: item})
                    })
                    setParams(Object.keys({...info, [Object.keys(router.query)[index]]: router.query[value]}).join('&'))
                    return
                }
                setInfo({...info, [Object.keys(router.query)[index]]: router.query[value]})
                setParams(Object.keys({...info, [Object.keys(router.query)[index]]: router.query[value]}).join('&'))
            })
            return
        }
        setParams(Object.keys(info).join('&'))
    }

    const active = (object) => {
        let newArr = []
        if (Object.keys(router.query).length) {
            Object.keys(router.query).forEach((element, index) => {
                if (typeof router.query[element] === "object") {
                    router.query[element].forEach(item => {
                        newArr.push(`${element}=${item}`)
                    })
                    return
                }
                newArr.push(`${element}=${Object.values(router.query)[index]}`)
            })
        }
        if (!newArr.includes(`${object.name}=${object.id}`)) {
            newArr.push(`${object.name}=${object.id}`)
            router.replace(`filter?${newArr.join('&')}`)
            setChange(!change)
            return
        }
        newArr = newArr.filter(value => value !== `${object.name}=${object.id}`)
        router.replace(`filter?${newArr.join('&')}`)
        setChange(!change)
    }

    // const newObj = Object.keys(info).filter(key =>
            //     key !== `${object.name}=${object.id}`).reduce((obj, key) => {
            //         obj[key] = info[key];
            //         return obj;
            //     }, {}
            // )
            // setInfo(newObj)

    function checkName(value) {
        const arr = []
        Object.keys(router.query).forEach((element) => {
            if (typeof router.query[element] === "object") {
                router.query[element].forEach(item => {
                    arr.push(`${element}=${item}`)
                })
                return
            }
            arr.push(`${element}=${router.query[element]}`)
        })
        return [value, arr.includes(`${value.name}=${value.id}`)]
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
                                                           className={`${style.button} ${checkName(value)[1] && style.active}`}
                                                           onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.form_education')}</p>

            <div className={style.buttons}>
                {props.educationForms.map(value => <button key={value.id}
                                                           className={`${style.button} ${checkName(value)[1] && style.active}`}
                                                           onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.science')}</p>
            <div className={style.buttonsItems}>
                {props.subjects.map(value => <button
                    key={value.id}
                    onClick={() => active(value)}
                    className={`${style.button} ${checkName(value)[1] && style.active}`}>
                    {value.translations[i18n.language] && value.translations[i18n.language].title}
                </button>)}
            </div>
            <p className={style.buttonsTitle}>{t('filter.level')}</p>
            <div className={style.buttons}>
                {props.educationDegrees.map(value => <button key={value.id}
                                                             className={`${style.button} ${checkName(value)[1] && style.active}`}
                                                             onClick={_ => active(value)}>{value.translations[i18n.language] && value.translations[i18n.language].title}</button>)}
            </div>
            <button className={`${style.button} ${style.blue}`} onClick={_ => setShowSideBar(!showSideBar)}>{t('filter.search')}
            </button>
        </div>
    );
}

export default FilterActions;