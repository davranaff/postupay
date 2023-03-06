import React, {useEffect, useState} from 'react';
import style from './filterresult.module.css'
import Image from "next/image";
import {useFilterContext} from "@/app/context/FilterContext";
import Link from "next/link";
import {filter} from "@/app/services/filter/filter";
import {useBaseContext} from "@/app/context/BaseContext";

function FilterResult() {
    const {data, setData, showSideBar, params, setShowSideBar} = useFilterContext()
    const [search, setSearch] = useState('')
    const [saves, setSaves] = useState({
        active: false,
        datas: [],
    })
    const { user } = useBaseContext()


    useEffect(_ => {
        if (search) {
            setTimeout(_ => filter.getSearchResult(search).then(r => setData(r.data)), 500)
        }
    }, [search, params])

    async function getSaves() {
        if (user.active &&  saves.datas) {}
    }

    return (
        <div className={`${style.main} ${!showSideBar ? style.main_active : ''}`}>
            <h1 className={style.mainTitle}>Список Высших Учебных Заведений</h1>
            <div className={style.mainM}>
                <h1 className={style.mainTitleM}>{saves.active ? 'Сохраненные ВУЗы' : 'Список ВУЗов'}</h1>
                <div>
                    <img onClick={_ => {
                        getSaves()
                        setSaves({...saves, active: !saves.active})
                    }} src="/icons/save.svg" alt=""/>
                    <button className={style.button} onClick={_ => setShowSideBar(!showSideBar)}>{showSideBar ? 'Поиск' : 'Фильтр'}</button>
                </div>
            </div>
            <label htmlFor="search" className={style.label}>
                <input value={search} onInput={e => setSearch(e.target.value)} id='search' type="text"
                       className={style.input} placeholder='Поиск…'/>
            </label>
            <h1 className={style.mainTitle}>Результаты:</h1>
            <div className={style.resultContent}>
                {
                    !saves.active ? data.length ? data.map(value => <Link href={`university/${value.id}`} key={value.id}>
                    <div className={style.filterItem}>
                        <Image src={'/other/ban.png'} alt={'example'} width={0} height={0}
                               className={style.filterItemImg}/>
                        <div className={style.filterItemContent}>
                            <h3 className={style.filterItemContentTitle}>
                                {value.translations['ru'].title}
                            </h3>
                            <p className={style.filterItemContentSubtitle}>
                                {value.translations['ru'].address}
                            </p>
                        </div>
                    </div>
                </Link>) : <h2 className={style.empty}>Пусто...</h2> : saves.datas.length ? data.map(value => <Link href={`university/${value.id}`} key={value.id}>
                    <div className={style.filterItem}>
                        <Image src={'/other/ban.png'} alt={'example'} width={0} height={0}
                               className={style.filterItemImg}/>
                        <div className={style.filterItemContent}>
                            <h3 className={style.filterItemContentTitle}>
                                {value.translations.title}
                            </h3>
                            <p className={style.filterItemContentSubtitle}>
                                {value.city.title}
                            </p>
                        </div>
                    </div>
                </Link>) : <h2 className={style.empty}>Пусто...</h2>
                }
            </div>
        </div>
    );
}

export default FilterResult;