import React, {useEffect, useRef, useState} from 'react';
import style from './detail.module.css'
import Image from "next/image";
import {universities} from "@/app/services/universities/universites";
import {useBaseContext} from "@/app/context/BaseContext";
import {decodeToken} from "@/app/utils/jwtDecode";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {mainUrlFiles} from "@/app/services/base";
import ScrollContainer from "react-indiana-drag-scroll";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {auth} from "@/app/services/auth/auth";

function Id({university}) {

    const {user} = useBaseContext()
    const router = useRouter()
    const [isSaved ,setIsSaved ] = useState(null)

    function telegram() {
        const a = university.telegram.split("/")
        return `@${a[a.length - 1]}`
    }

    const {t} = useTranslation()

    function instagram() {
        const a = university.instagram.split('/')
        return `${a[a.length - 2]}`
    }

    const loadSaved = () => {
        auth.getFavourites(localStorage.getItem('Authorization'))
            .then(res => setIsSaved(res.data.find(item => item.university.id === university.id)))
            .catch(err => console.log(err))
    }

    async function saveUni() {
        if (user.active) {
            await universities.saveUniversity(JSON.parse(localStorage.getItem('user')).id, university.id, localStorage.getItem('Authorization'))
                .then(res => {
                    toast.success(t('toasts.saved_univer'))
                    loadSaved()
                })
                .catch(e => {
                    toast.error(t('toasts.something'))
                })
            return
        }
        toast.warn(t('toast.move_register'))
    }

    async function delUni() {
        if (user.active) {
            await universities.deleteUniversity(isSaved.id, localStorage.getItem('Authorization'))
                .then(res => {
                    toast.success("вуз удалён")
                    loadSaved()
                })
                .catch(e => {
                    toast.error(t('toasts.something'))
                })
            return
        }
        toast.warn(t('toast.move_register'))
    }

    function goTest() {
        router.push(`test/?subject=${university.id}&tk_=${localStorage.getItem('Authorization')}`)
    }
    useEffect(_ => {
       loadSaved()
    }, [])



    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.leftInfo}>
                    {university.image ?
                        <img src={mainUrlFiles + university.image} alt={'example'} width={150} height={150}/> :
                        <img src='/icons/logo.svg/' alt={'example'} width={100} height={100}/>}
                    <br/>
                    {university.phone_number && <div className={style.leftInfoItem}>
                        <img src={'/icons/telephone.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={'tel:' + university.phone_number}>{university.phone_number}</a></p>
                        </div>
                    </div>}
                    {university.email && <div className={style.leftInfoItem}>
                        <img src={'/icons/mail.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={'mailto:' + university.email}>{university.email}</a></p>
                        </div>
                    </div>}
                    {university.postcode && <div className={style.leftInfoItem}>
                        <img src={'/icons/info.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p>{university.postcode}</p>
                        </div>
                    </div>}
                    {university.website && <div className={style.leftInfoItem}>
                        <img src={'/icons/ethernet.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={university.website}>{university.website}</a></p>
                        </div>
                    </div>}
                    {university.telegram && <div className={style.leftInfoItem}>
                        <img src={'/icons/Teleg.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={university.telegram}>{telegram()}</a></p>
                        </div>
                    </div>}
                    {university.instagram && <div className={style.leftInfoItem}>
                        <img src={'/icons/Insta.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={university.instagram}>{instagram()}</a></p>
                        </div>
                    </div>}
                </div>
                <div className={style.rightInfo}>
                    <h1 className={style.rightInfoTitle}>{university.translations[i18n.language] && university.translations[i18n.language].title}</h1>
                    <button className={`${style.button} ${isSaved ? style.savedButton : ""}`} onClick={_ => isSaved ? delUni() : saveUni()}>{isSaved ? "ВУЗ Сохранен" : "Сохранить ВУЗ"}</button>
                    <div className={style.rightInfoDescription}>
                        {university.translations[i18n.language] && university.translations[i18n.language].description}
                    </div>
                    <ScrollContainer className={style.rightInfoFinance}>
                        {university.faculty.map(vl => (
                            <div className={style.finance} key={vl.id}>
                                {vl.translations[i18n.language] && vl.translations[i18n.language].title}
                            </div>
                        ))}
                    </ScrollContainer>
                </div>
            </div>
            <div className={style.blockTest}>
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
            </div>
            <div className={style.foot}>
                <div className={style.footMap}>
                    <iframe
                        src={university.map && university.map}
                        width={600} height={400} style={{border: 0}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={style.footContacts}>
                    <div className={style.footContactsInfo}>
                        {university.phone_number &&
                            <p>{t('university.phone')} <a href={'tel:' + university.phone_number}>{university.phone_number}</a></p>}
                        {university.email &&
                            <p>{t('university.email')} <a href={'mailto:' + university.email}>{university.email}</a></p>}
                        {university.postcode && <p>{t('university.index')} {university.postcode}</p>}
                        {university.website &&
                            <p>{t('university.official_site')}<a href={university.website}>{university.website}</a></p>}
                    </div>
                    <div className={style.footContactsAddress}>
                        <p>
                            {university.translations[i18n.language] && university.translations[i18n.language].address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {params} = context

    const data = await universities.getOne(params.id).then(res => res.data)

    return {
        props: {
            university: data,
        },
    }
}

export default Id

