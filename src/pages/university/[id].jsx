import React, {useEffect, useRef} from 'react';
import style from './detail.module.css'
import Image from "next/image";
import {universities} from "@/app/services/universities/universites";
import {useBaseContext} from "@/app/context/BaseContext";
import {decodeToken} from "@/app/utils/jwtDecode";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {mainUrlFiles} from "@/app/services/base";
import ScrollContainer from "react-indiana-drag-scroll";

function Id({university}) {
    const {user} = useBaseContext()
    const router = useRouter()

    const scrollRef = useRef(null);



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
                    {university.image && <img src={mainUrlFiles + university.image} alt={'example'} width={100} height={100}/>}
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
                    <ScrollContainer className={style.rightInfoFinance} >
                        {university.faculty.map(vl => (
                            <div className={style.finance} key={vl.id} >
                                {vl.translations['ru'].title}
                            </div>
                        ))}
                    </ScrollContainer>
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
                    <div style={{position:"relative",overflow:"hidden"}}><a
                        href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"
                        style={{color:'#eee',fontSize:'12px',position:'absolute',top:'0px'}}>Ташкент</a><a
                        href="https://yandex.uz/maps/10335/tashkent/house/YkAYdA9jTUcOQFprfX9xdnxhYg==/?ll=69.281312%2C41.309118&utm_medium=mapframe&utm_source=maps&z=16.57"
                        style={{color:'#eee',fontSize:'12px',position:'absolute',top:'14px'}}>Улица Истикбол, 12 — Яндекс
                        Карты</a>
                        <iframe
                            src="https://yandex.uz/map-widget/v1/?ll=69.281312%2C41.309118&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTIyNTAxMTcyEi5Pyrt6YmVraXN0b24sIFRvc2hrZW50LCBJc3RpcWJvbCBrb8q7Y2hhc2ksIDEyIgoNHpGKQhVlOiVC&z=16.57" height="400" frameBorder="1" allowFullScreen="true"
                            width="560"
                            style={{position: 'relative'}}></iframe>
                    </div>
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
    return {
        props: {
            university: data,
        },
    }
}

export default Id

