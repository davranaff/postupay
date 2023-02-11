import React, {useEffect, useState} from 'react';
import style from './filterresult.module.css'
import Image from "next/image";
import {useFilterContext} from "@/app/context/FilterContext";
import Link from "next/link";
import {filter} from "@/app/services/filter/filter";

function FilterResult() {
    const {data, setData, showSideBar, params} = useFilterContext()
    const [search, setSearch] = useState('')

    useEffect(_ => {
        if (search) {
            setTimeout(_ => filter.getSearchResult(search).then(r => setData(r.data)), 500)
        }
        console.log(data)
    }, [search, params])

    return (
        <div className={`${style.main} ${!showSideBar ? style.main_active : ''}`}>
            <h1 className={style.mainTitle}>Список Высших Учебных Заведений</h1>
            <label htmlFor="search" className={style.label}>
                <input value={search} onInput={e => setSearch(e.target.value)} id='search' type="text"
                       className={style.input} placeholder='Поиск…'/>
            </label>
            <h1 className={style.mainTitle}>Результаты:</h1>
            <div className={style.resultContent}>
                {data.length ? data.map(value => <Link href={`university/${value.id}`} key={value.id}>
                    <div className={style.filterItem}>
                        <Image src={'/other/ban.png'} alt={'example'} width={0} height={0}
                               className={style.filterItemImg}/>
                        <div className={style.filterItemContent}>
                            <h3 className={style.filterItemContentTitle}>
                                {value.title}
                            </h3>
                            <p className={style.filterItemContentSubtitle}>
                                {value.city.title}
                            </p>
                        </div>
                    </div>
                </Link>) : <h2>Пусто...</h2>}
            </div>
        </div>
    );
}

export default FilterResult;