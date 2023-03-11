import React, {useEffect, useState} from 'react';
import style from "@/pages/profile/profile.module.css";
import ProfileResult from "@/app/components/Profile/ProfileResult";
import ProfileSaves from "@/app/components/Profile/ProfileSaves";
import {auth} from "@/app/services/auth/auth";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {universities} from "@/app/services/universities/universites";

function Profile({check}) {
    const [data, setData] = useState({
        results: [],
        saves: [],
    })
    const [checkout, setCheckout] = useState(check)
    const router = useRouter()
    const [userInfo, setUserInfo] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(_ => {
        auth.getProfile(
            localStorage.getItem('Authorization')
        ).then(res => {setUserInfo(res.data)}).catch(err => {toast.warn('У вас нету доступа!')})
        universities.getFavourites(localStorage.getItem('Authorization'))
            .then(res => console.log(res.data)).catch(err => {toast.warn('У вас нету доступа!')})
    }, [])

    return (
        <>
            <div className={style.profileInfo}>
                <div className={style.profileName}>
                    {userInfo && !edit ? `${userInfo.first_name} ${userInfo.last_name}` : "Иванов Иван"}
                </div>
                <div className={style.profileId}>
                    <p>ID: {userInfo && userInfo.id}</p>
                    <button className={style.button}
                            onClick={_ => setCheckout(!checkout)}>{!checkout ? 'Сохраненные ВУЗы' : 'Тестирование'}</button>
                </div>
            </div>
            <h1 className={style.result}>{
                !checkout ? 'Результаты тестирования:' : 'Сохраненные ВУЗы:'
            }</h1>
            {
                !checkout ? <ProfileResult results={data.results}/> : <ProfileSaves saves={data.saves}/>
            }
        </>
    );
}

export default Profile;