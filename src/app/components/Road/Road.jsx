import style from './road.module.css'
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";

function Road(props) {
    const {t} = useTranslation()
    const data=
        [
            {id: 1, title: t('home.way.choose_special'), active: false},
            {id: 2, title: t('home.way.choose_univer'), active: false},
            {id: 3, title: t('home.way.apply'), active: false},
            {id: 4, title: t('home.way.pass_exam'), active: false},
            {id: 5, title: t('home.way.submit_application'), active: false},
            {id: 6, title: t('home.way.quoting'), active: false},
            {id: 7, title: t('home.way.pay'), active: false},
            {id: 8, title: t('home.way.congrates'), active: false},
        ]

    const [items, setItems] = useState(data)
    useEffect(() => {
        setItems(data)
    },[i18n.language])


    return (
        <div className={style.main}>
            <h1 className={style.title}>{t('home.way.process')}</h1>
            <div className={style.content}>
                { items.map( value => <RoadItem key={value.id} item={value} update={setItems} /> ) }
            </div>
        </div>
    );
}


function RoadItem({ item }) {

    return (
        <div className={`${style.roadItem} ${item.active ? style.roadItem__active : ''}`}>
            <div className={style.roadItem__circle}>
                {item.id}
            </div>
            <p className={style.roadItem__title}>{item.title}</p>
        </div>
    );
}


export default Road