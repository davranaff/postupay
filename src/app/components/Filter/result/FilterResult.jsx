import React, {useEffect, useState} from 'react';
import style from './filterresult.module.css'
import Image from "next/image";
import {useFilterContext} from "@/app/context/FilterContext";
import Link from "next/link";
import {filter} from "@/app/services/filter/filter";
import {useBaseContext} from "@/app/context/BaseContext";
import {useTranslation} from "react-i18next";
import {mainUrlFiles} from "@/app/services/base";
import i18n from "@/i18n";
import {useRouter} from "next/router";
import {auth} from "@/app/services/auth/auth";


function FilterResult() {
    const {data, setData, showSideBar, params, setShowSideBar, used, loading, setLoading} = useFilterContext()
    const [search, setSearch] = useState('')
    
    const [saves, setSaves] = useState({
        active: false,
        datas: [],
    })
    const { user } = useBaseContext()
    const {t} = useTranslation()

    useEffect(_ => {
        // getSaves()
        if (used > 1 || search) {
            filter.getSearchResult(search).then(r => {
                setData(r.data)
                setLoading(false)
            })
            return
        }
        setLoading(false)
    }, [search, params])




    async function getSaves() {
        if (user.active &&  saves.datas) {
            // auth.getFavourites(localStorage.getItem('Authorization'))
            // .then(res => setSaves({...saves, datas: res.data}))
            // .catch(err => console.log(err))
        }
    }

    console.log(data.find(v => v.id === 1))
    return (
        <div className={`${style.main} ${!showSideBar ? style.main_active : ''}`}>
            <h1 className={style.mainTitle}>{t('filter.list')}</h1>
            <div className={style.mainM}>
                <h1 className={style.mainTitleM}>{saves.active ? 'Сохраненные ВУЗы' : 'Список ВУЗов'}</h1>
                <div>
                    <img onClick={_ => {
                        getSaves()
                        setSaves({...saves, active: !saves.active})
                    }} src={saves.active ? '/icons/save.svg' : '/icons/rectangle.svg'} alt=""/>
                    <button className={`${style.button} ${!showSideBar ? style.white : ''}`} onClick={_ => setShowSideBar(!showSideBar)}>Фильтр</button>
                </div>
            </div>
            <label htmlFor="search" className={style.label}>
                <input value={search} onInput={e => {
                    setLoading(true)
                    setSearch(e.target.value)
                }} id='search' type="text"
                       className={style.input} placeholder={t('filter.search') + '...'}/>
            </label>
            <h1 className={style.mainTitle}>{t('filter.results')}:</h1>
            <div className={`${style.resultContent} ${!showSideBar ? style.resultContent_hidden : ''}`}>
                {!loading ?
                    !saves.active ? data.length ? data.map(value => <Link href={`university/${value.id}`} key={value.id}>
                        <div className={style.filterItem}>
                            <img src={value.image ? value.image : "/icons/logo.svg"} alt={value.translations['ru'].title} className={style.filterItemImg}/>
                            <div className={style.filterItemContent}>
                                <h3 className={style.filterItemContentTitle}>
                                    {value.translations[i18n.language] && value.translations[i18n.language].title }
                                </h3>
                                <p className={style.filterItemContentSubtitle}>
                                    {value.translations[i18n.language] && value.translations[i18n.language].address }
                                </p>
                            </div>
                        </div>
                    </Link>) : <h2 className={style.mainTitle}>Ничего не найдено</h2> : saves.datas.length ? data.map(value => <Link href={`university/${value.id}`} key={value.id}>
                        <div className={style.filterItem}>
                            <Image src={value.university.image ? value.university.image : '/icons/logo.svg'} alt={value.university.title[i18n.language]} width={0} height={0}
                                className={style.filterItemImg}/>
                            <div className={style.filterItemContent}>
                                <h3 className={style.filterItemContentTitle}>
                                    {value.university.title[i18n.language] && value.university.title[i18n.language] }
                                </h3>
                                <p className={style.filterItemContentSubtitle}>
                                    {value.university.address[i18n.language] && value.university.address[i18n.language] }
                                </p>
                            </div>
                        </div>
                    </Link>) : <h2 className={style.mainTitle}>Ничего не найдено</h2>
                    : (
                        <div className={style.loadingContainer}>
                            <div className={style.ldsDualRing}>

                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default FilterResult;
