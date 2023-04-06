import style from './seluni.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";


function SelUni() {
    const {t} = useTranslation()
    const initialState = [
        {
            id: 1,
            title: t('home.sel_univer.private'),
            query: 'education_type=1',
            checked: false
        },
        {
            id: 2,
            title: t('home.sel_univer.state'),
            query: 'education_type=2',
            checked: false
        },
        {
            id: 3,
            title: t('home.sel_univer.foreign'),
            query: 'education_type=3',
            checked: false
        },

    ]
    const [list, setList] = useState(initialState)

    useEffect(( ) => {
        setList(initialState)
    }, [i18n.language])
    return (
        <div className={style.main}>
            {list.map(value => <Check key={value.id} check={value} setList={setList}/>)}
        </div>
    );
}


function Check({check, setList}) {
    const router = useRouter()

    const handleState = () => {
        setList(prevState => prevState.map(value => {
            if (value.id === check.id) return {...value, checked: !value.checked}
            return {...value, checked: false}
        }))
        router.push(`/filter/?education_type=${check.query}`)
    }
    return (
        <label className={`${style.item} ${check.checked && style.item__active}`} onClick={handleState}>
            <span>{check.title}</span>
        </label>
    );
}

export default SelUni;
