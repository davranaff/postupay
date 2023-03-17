import React from 'react';
import style from './detail.module.css'
import Image from "next/image";
import {universities} from "@/app/services/universities/universites";
import {useBaseContext} from "@/app/context/BaseContext";
import {decodeToken} from "@/app/utils/jwtDecode";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

function Id({university}) {
    const {user} = useBaseContext()
    const router = useRouter()

    async function saveUni() {
        if (user.active) {
            const decoded = decodeToken(user.access)
            await universities.saveUniversity(decoded.id, university.id, localStorage.getItem('Authorization'))
                .then(res => {
                    toast.success('Вуз сохранён')
                })
                .catch(e => {
                    toast.error('Что-то пошло не так!')
                })
            return
        }
        toast.warn('Пройдите регистрацию!')
    }

    function goTest() {
        router.push(`test/?subject=${university.id}&tk_=${localStorage.getItem('Authorization')}`)
    }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.leftInfo}>
                    <Image src={'/other/ban.png'} alt={'example'} width={100} height={100}/>
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
                            <p><a href={'https://t.me/' + university.telegram}>{university.telegram}</a></p>
                        </div>
                    </div>}
                    {university.instagram && <div className={style.leftInfoItem}>
                        <img src={'/icons/Insta.svg'} alt={'telephone'}/>
                        <div className={style.leftInfoItemContent}>
                            <p><a href={'https://instagram.com/' + university.instagram}>{university.instagram}</a></p>
                        </div>
                    </div>}
                </div>
                <div className={style.rightInfo}>
                    <h1 className={style.rightInfoTitle}>{university.translations['ru'].title}</h1>
                    <button className={style.button} onClick={_ => saveUni()}>Сохранить ВУЗ</button>
                    <div className={style.rightInfoDescription}>
                        {university.translations['ru'].description}
                    </div>
                    <div className={style.rightInfoFinance}>
                        {university.faculty.map(vl => <div className={style.finance}>
                            {vl.translations['ru'].title}
                        </div>)}
                    </div>
                </div>
            </div>
            <div className={style.blockTest}>
                <div className={style.progress}>
                    <Image src={'/icons/check.svg'} alt={'check'} width={0} height={0}/>
                    <div className={style.progressContent}>
                        <h2>Тест: {university.translations['ru'].title}</h2>
                        <p>{university.subject.map(value => value.translations['ru'].title).join(' | ')}</p>
                    </div>
                    <h1>0%</h1>
                </div>
                <div onClick={_ => goTest()} className={style.blockTestButton}>
                    Пройти тестирование
                </div>
            </div>
            <div className={style.foot}>
                <div className={style.footMap}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6096.650588605307!2d64.42101051081836!3d39.77231752448985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500777455a1019%3A0x401e16fbb9a122ad!2sLabi%20Hovuz!5e0!3m2!1sru!2s!4v1675852563721!5m2!1sru!2s"
                        width="600" height="450" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={style.footContacts}>
                    <div className={style.footContactsInfo}>
                        {university.phone_number &&
                            <p>Телефон: <a href={'tel:' + university.phone_number}>{university.phone_number}</a></p>}
                        {university.email &&
                            <p>Электронная почта: <a href={'mailto:' + university.email}>{university.email}</a></p>}
                        {university.postcode && <p>Почтовый индекс: {university.postcode}</p>}
                        {university.website &&
                            <p>Официальный сайт: <a href={university.website}>{university.website}</a></p>}
                    </div>
                    <div className={style.footContactsAddress}>
                        <p>
                            {university.translations['ru'].address}
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
    console.log(data)
    return {
        props: {
            university: data,
        },
    }
}

export default Id