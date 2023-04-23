import { useEffect, useState} from 'react'
import style from '../../../pages/university/detail.module.css'
import {auth} from "@/app/services/auth/auth";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import Image from "next/image";


function UniversityTest({university}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()

    useEffect(_ => {
        if (JSON.parse(localStorage.getItem('user'))) {
            auth.getResultProfile(localStorage.getItem('Authorization'), JSON.parse(localStorage.getItem('user')).id)
            .then(res => {
                filter(res.data.reverse())
                setLoading(true)
            })
            .catch(err => console.log(err))
        }
        setLoading(true)
    }, [])

    function filter(result) {
        const arr = []
        for (const element of university.subject) {
            const obj = result.filter(value => {
                if (value.university.id === element.id && university.id === value.university.id && !arr.includes(value)) {
                    return value
                }
                return null
            })
            arr.push(...obj)
        }
        let ball = 0
        arr.forEach(value => {
            ball += value.score / (value.test_subject_histories.length / 4)
        })
        ball = Math.floor(100 * (ball / university.subject.length))
        setData(ball)
    }

    return (
    <>
        {loading ? data ? <>
            <div className={style.progress}>
                        <div className={style.backGround} style={
                            {
                                width: `${data}%`,
                                backgroundColor: data < 60 && '#F4DCD6'
                            }
                        }>
                            <div className={style.wave1}></div>
                            <div className={style.wave2}></div>
                        </div>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: {university.translations[i18n.language] && university.translations[i18n.language].title}</h2>
                        <p>{university.subject.map(value => value.translations[i18n.language] && value.translations[i18n.language].title).join(' | ')}</p>
                    </div>
                    <h1>{data}%</h1>
                </div>
                <div onClick={_ => goTest()} className={style.blockTestButton}>
                    {t('university.pass_test')}
                </div>
        </> : <>
        <div className={style.progress}>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: {university.translations[i18n.language] && university.translations[i18n.language].title}</h2>
                        <p>{university.subject.map(value => value.translations[i18n.language] && value.translations[i18n.language].title).join(' | ')}</p>
                    </div>
                    <h1>0%</h1>
                </div>
                <div onClick={_ => goTest()} className={style.blockTestButton}>
                    {t('university.pass_test')}
                </div>
        </> : <div className={style.loadingContainer}>
                <div className={style.ldsDualRing}>

                </div>
            </div> }
    </>
    )
}

export default UniversityTest